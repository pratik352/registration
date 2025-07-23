const { PrismaClient } = require('@prisma/client');
const { generateQRCodeForEmployee } = require('../utils/qrcode/qrcode');
const sendWhatsAppWithQR = require('../utils/whatsapp/sendqr');

const prisma = new PrismaClient();

const resendQR = async (req, res) => {
  const { employee_id } = req.params;

  try {
    const emp = await prisma.employees.findUnique({
      where: { employee_id },
    });

    if (!emp) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const qrPath = await generateQRCodeForEmployee(emp.employee_id);

    let number = emp.whatsapp_number;
    if (!number.startsWith('91')) number = '91' + number;
    number = number.replace(/\D/g, '') + '@c.us';

    const message = `Hello ${emp.first_name} ${emp.last_name},

We're thrilled to invite you to our upcoming offsite event!
To make the check-in process smooth and quick, please scan the attached QR code on *20th of September* without fail. 🌟

📲 *Scan the QR Code on 20th Morning (Mandatory)*
Further updates will be conveyed to you. 📢

If you have any questions, email us at *leher_pune@tmf-group.com*

Best regards,  
The TMF Group *Leher* Team`;

    await sendWhatsAppWithQR(number, qrPath, message); 
    res.status(200).json({ message: `QR sent to ${emp.first_name}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send QR', error: err.message });
  }
};

module.exports = { resendQR };
