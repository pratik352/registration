const express = require('express');
const router = express.Router();
const aadharController = require('../../controller/aadhar.controller');
// Route: /api/file/:folder/:empID
router.get('/:folder/:filename', aadharController.getFileByName);
module.exports = router;
