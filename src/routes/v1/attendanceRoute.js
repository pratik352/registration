const express = require('express');
const router = express.Router();
const AttendanceController = require('../../controller/AttendanceController');

router.patch('/mark', AttendanceController.mark);
router.patch('/unmark', AttendanceController.unmark);

module.exports = router;
