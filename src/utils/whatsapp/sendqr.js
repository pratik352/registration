const fs = require('fs');
const qrcode = require('qrcode-terminal');
const path = require('path');
const puppeteer = require('puppeteer'); 
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

let isReady = false;

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: false,
    executablePath: puppeteer.executablePath(), 
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  }
});

client.on('qr', (qr) => {
  console.log('📱 Scan this QR code in WhatsApp:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ WhatsApp client is ready!');
  isReady = true;
});

client.initialize();

/**
 * Sends a WhatsApp message with QR image.
 *
 * @param {string} whatsapp_number - WhatsApp number without country code
 * @param {string} imagePath - Path to QR image
 * @param {string} [caption] - Optional message to include with QR
 */
async function sendWhatsAppWithQR(whatsapp_number, imagePath, caption = '') {
  if (!isReady) {
    console.log('⌛ Waiting for WhatsApp client to be ready...');
    await new Promise((resolve) => {
      client.on('ready', resolve);
    });
  }

  let cleanNumber = whatsapp_number.replace(/\D/g, '');
  if (!cleanNumber.startsWith('91')) {
    cleanNumber = '91' + cleanNumber;
  }
  cleanNumber = cleanNumber + '@c.us';

  const media = MessageMedia.fromFilePath(imagePath);

  try {
    await client.sendMessage(cleanNumber, media, { caption });
    console.log(`✅ Sent QR to ${cleanNumber}`);
  } catch (err) {
    console.error(`❌ Failed to send to ${cleanNumber}:`, err.message);
  }
}

module.exports = sendWhatsAppWithQR;
