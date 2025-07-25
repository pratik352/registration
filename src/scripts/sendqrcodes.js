const { PrismaClient, Is_qr_sent } = require('@prisma/client');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcodeTerminal = require('qrcode-terminal');
const { generateQRCodeForEmployee } = require('../utils/qrcode/qrcode');

const prisma = new PrismaClient();

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: false, args: ['--no-sandbox'] }
});

let successCount = 0;
let failureCount = 0;

client.on('qr', (qr) => {
  console.log('\n📲 Scan this QR code to log into WhatsApp:\n');
  qrcodeTerminal.generate(qr, { small: true });
});

client.on('ready', async () => {
  console.log('\n✅ WhatsApp client is ready!\n');

  try {
    const employees = await prisma.employees.findMany({
      where: {
        is_qr_sent: Is_qr_sent.failed
      }
    });

    if (employees.length === 0) {
      console.log("🎉 No failed QR records found. Everyone already received their QR!");
      await prisma.$disconnect();
      return;
    }

    let index = 0;

    const sendNext = async () => {
      if (index >= employees.length) {
        console.log(`\n✅ All failed employees processed.`);
        console.log(`✅ Successfully resent: ${successCount}`);
        console.log(`❌ Still failed: ${failureCount}\n`);
        await prisma.$disconnect();
        return;
      }

      const emp = employees[index];

      try {
        const qrPath = await generateQRCodeForEmployee(emp.uuid);
        const media = MessageMedia.fromFilePath(qrPath);

        let number = emp.whatsapp_number;
        if (!number.startsWith('91')) number = '91' + number;
        number = number.replace(/\D/g, '') + '@c.us';

        const message = `Hello ${emp.first_name} ${emp.last_name},

We're thrilled to invite you to our upcoming offsite event!
To make the check-in process smooth and quick, please scan the attached QR code on *19th of September* without fail. 🌟

📲 *Scan the QR Code on 19th Morning (Mandatory)*
Further updates will be conveyed to you. 📢

If you have any questions, email us at *leher_pune@tmf-group.com*

Best regards,  
The TMF Group *Leher* Team`;

        const randomDelay = Math.floor(Math.random() * (15000 - 3000 + 1)) + 3000;
        let countdown = Math.floor(randomDelay / 1000);

        const countdownInterval = setInterval(() => {
          process.stdout.clearLine(0);
          process.stdout.cursorTo(0);
          process.stdout.write(`⏳ Waiting ${countdown} sec before sending next QR...`);
          countdown--;

          if (countdown < 0) {
            clearInterval(countdownInterval);

            (async () => {
              try {
                await client.sendMessage(number, media, { caption: message });
                console.log(`\n✅ Sent QR to: ${emp.first_name} ${emp.last_name} (${emp.employee_id})`);
                successCount++;

                await prisma.employees.update({
                  where: { employee_id: emp.employee_id },
                  data: { is_qr_sent: Is_qr_sent.sent },
                });

              } catch (sendErr) {
                console.error(`\n❌ Failed to send to ${emp.first_name} ${emp.last_name} (${emp.employee_id}):`, sendErr.message);
                failureCount++;

                await prisma.employees.update({
                  where: { employee_id: emp.employee_id },
                  data: { is_qr_sent: Is_qr_sent.failed },
                });
              }

              index++;
              sendNext();
            })();
          }
        }, 1000);

      } catch (err) {
        console.error(`\n❌ Error for ${emp.employee_id}:`, err.message);
        failureCount++;
        index++;
        setTimeout(sendNext, 5000);
      }
    };

    sendNext();

  } catch (err) {
    console.error('❌ Error retrieving employees:', err.message);
    await prisma.$disconnect();
  }
});

client.initialize();
