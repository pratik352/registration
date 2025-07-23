
// const { PrismaClient } = require('@prisma/client');
// const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
// const qrcodeTerminal = require('qrcode-terminal');
// const { generateQRCodeForEmployee } = require('../utils/qrcode/qrcode');

// const prisma = new PrismaClient();

// const client = new Client({
//   authStrategy: new LocalAuth(),
//   puppeteer: { headless: true, args: ['--no-sandbox'] }
// });

// client.on('qr', (qr) => {
//   console.log('Scan this QR code in WhatsApp:');
//   qrcodeTerminal.generate(qr, { small: true });
// });

// client.on('ready', async () => {
//   console.log('✅ WhatsApp client is ready!');

//   try {
//     const employees = await prisma.employees.findMany();

//     for (const emp of employees) {
//       try {
//         const qrPath = await generateQRCodeForEmployee(emp.employee_id);
//         const media = MessageMedia.fromFilePath(qrPath);

//         let number = emp.whatsapp_number;
//         if (!number.startsWith('91')) number = '91' + number;
//         number = number.replace(/\D/g, '') + '@c.us';

//         const message = `Hello ${emp.first_name} ${emp.last_name},

// We're thrilled to invite you to our upcoming offsite event!
// To make the check-in process smooth and quick, please scan the attached QR code on *19th of September* without fail. 🌟

// 📲 *Scan the QR Code on 19th Morning (Mandatory)*
// Further updates will be conveyed to you. 📢

// If you have any questions, email us at *leher_pune@tmf-group.com*

// Best regards,  
// The TMF Group *Leher* Team`;

//         await client.sendMessage(number, media, { caption: message });

//         console.log(`✅ Sent QR to: ${emp.first_name} ${emp.last_name} (${emp.employee_id})`);
//       } catch (err) {
//         console.error(`❌ Failed for ${emp.employee_id}:`, err.message);
//       }
//     }

//     console.log('All QR codes sent.');
//   } catch (err) {
//     console.error('Error sending QRs:', err.message);
//   } finally {
//     await prisma.$disconnect();
//   }
// });

// client.initialize();

const { PrismaClient } = require('@prisma/client');
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
  console.log('\n Scan this QR code to log into WhatsApp:\n');
  qrcodeTerminal.generate(qr, { small: true });
});

client.on('ready', async () => {
  console.log('\n✅ WhatsApp client is ready!\n');

  try {
    const employees = await prisma.employees.findMany();

    let index = 0;

    const sendNext = async () => {
      if (index >= employees.length) {
        console.log(`\n✅ All employees processed.`);
        console.log(`\n✅ Successfully sent: ${successCount}`);
        console.log(`❌ Failed: ${failureCount}\n`);
        await prisma.$disconnect();
        return;
      }

      const emp = employees[index];

      try {
        const qrPath = await generateQRCodeForEmployee(emp.employee_id);
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

        // Countdown display
        let countdown = 5;
        const interval = setInterval(() => {
          process.stdout.write(`⏳ Sending next QR in ${countdown} sec...\r`);
          countdown--;
          if (countdown < 0) clearInterval(interval);
        }, 1000);

        setTimeout(async () => {
          try {
            await client.sendMessage(number, media, { caption: message });
            console.log(`\n✅ Sent QR to: ${emp.first_name} ${emp.last_name} (${emp.employee_id})`);
            successCount++;
          } catch (sendErr) {
            console.error(`\n❌ Failed to send to ${emp.employee_id}:`, sendErr.message);
            failureCount++;
          }

          index++;
          sendNext();
        }, 5000);

      } catch (err) {
        console.error(`\n Failed for ${emp.employee_id}:`, err.message);
        failureCount++;
        index++;
        setTimeout(sendNext, 5000);
      }
    };

    sendNext(); // Start recursion

  } catch (err) {
    console.error(' Error retrieving employees:', err.message);
    await prisma.$disconnect();
  }
});

client.initialize();
