const express = require('express');
const router = express.Router();
const { resendQR } = require('../../controller/resendqr.controller');

router.get('/resend/:employee_id', resendQR);

module.exports = router;
