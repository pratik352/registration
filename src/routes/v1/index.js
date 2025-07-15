const express = require('express');
const router = express.Router();

// Routes
const attendanceRoutes = require('./attendanceRoute');
const demoRoute = require('./demo.route');

// Route definitions
router.use('/attendance', attendanceRoutes);
router.use('/demo', demoRoute);

module.exports = router;
