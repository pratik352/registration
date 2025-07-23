const fs = require('fs');
const xlsx = require('xlsx');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcodeTerminal = require('qrcode-terminal');
const { generateQRCodeForEmployee } = require('../utils/qrcode/qrcode');

const prisma = new PrismaClient();

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true, args: ['--no-sandbox'] }
});

client.on('qr', (qr) => {
  console.log(' Scan this QR code in WhatsApp:');
  qrcodeTerminal.generate(qr, { small: true });
});

client.on('ready', async () => {
  console.log('WhatsApp client is ready!');

  const workbook = xlsx.readFile(path.join(__dirname, 'employees.xlsx'));
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const employees = xlsx.utils.sheet_to_json(sheet);

  for (const emp of employees) {
    try {
      // Insert into DB
      const savedEmployee = await prisma.employees.create({
        data: {
          employee_id: emp.employee_id,
          first_name: emp.first_name,
          last_name: emp.last_name,
          aadhar_link: emp.aadhar_link || null,
          whatsapp_number: String(emp.whatsapp_number),
          city: emp.city,
          attendance_status: 'Absent',
        },
      });

      // Generate QR code
      const qrPath = await generateQRCodeForEmployee(savedEmployee.employee_id);
      const media = MessageMedia.fromFilePath(qrPath);

      // Format WhatsApp number
      let number = savedEmployee.whatsapp_number;
      if (!number.startsWith('91')) number = '91' + number;
      number = number.replace(/\D/g, '') + '@c.us';

      // Custom message
      const message = `Hello ${savedEmployee.first_name} ${savedEmployee.last_name},

We're thrilled to invite you to our upcoming offsite event!
To make the check-in process smooth and quick, please scan the attached QR code on *19th of September* without fail. This will help us streamline the registration and ensure you have a fantastic experience. 🌟

If you have any questions or need further information, please reach out to us at 📧 *leher_pune@tmf-group.com*.

📲 *Scan the QR Code on 19th Morning (Mandatory)*
Further updates will be conveyed to you. 📢

Looking forward to seeing you there and having a great time together! 🏖🎊
*Welcome aboard!* 🚀

Best regards,  
The TMF Group *Leher* Team`;

      // Send image + message
      await client.sendMessage(number, media, { caption: message });

      console.log(` Inserted & sent QR to: ${savedEmployee.first_name} ${savedEmployee.last_name} (${savedEmployee.employee_id})`);
    } catch (err) {
      console.error(` Failed for ${emp.employee_id}:`, err.message);
    }
  }

  console.log(' All employees processed.');
});

client.initialize();
