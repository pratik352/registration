const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

/**
 * Generates a QR code image for the given employee ID and stores it in /qrcodes.
 * @param {string} employeeId
 * @returns {Promise<string>} Path to saved QR code image
 */
async function generateQRCodeForEmployee(employeeId) {
  const qrFolder = path.join(__dirname, '../../../qrcodes');

  if (!fs.existsSync(qrFolder)) {
    fs.mkdirSync(qrFolder, { recursive: true });
  }

  const qrPath = path.join(qrFolder, `${employeeId}.png`);
  await QRCode.toFile(qrPath, employeeId);
  return qrPath;
}

module.exports = {
  generateQRCodeForEmployee,
};
