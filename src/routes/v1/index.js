const express = require('express');
const router = express.Router();

//Routes
const attendanceRoutes = require('./attendanceRoute');
const demoRoute = require('./demo.route')
const employeeRoutes = require('./EmployeeRoute')

// Route definitions
router.use('/attendance', attendanceRoutes);
router.use('/demo', demoRoute);
router.use('/employee', employeeRoutes)

module.exports = router;
