const path = require('path');
const fs = require('fs');
exports.getFileByName = (req, res) => {
 const folder = req.params.folder;
 const fileBaseName = req.params.filename;
 const supportedExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];
 const folderPath = path.join(__dirname, '..', 'public', 'documents', folder);
 let matchedFile = null;
 for (const ext of supportedExtensions) {
   const filePath = path.join(folderPath, fileBaseName + ext);
   if (fs.existsSync(filePath)) {
     matchedFile = filePath;
     break;
   }
 }
 if (matchedFile) {
   return res.sendFile(matchedFile);
 } else {
   return res.status(404).json({ error: 'File not found' });
 }
};
