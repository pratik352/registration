const express = require('express');
const router = express.Router();

//Routes
const attendanceRoutes = require('./attendanceRoute');
const demoRoute = require('./demo.route')
const employeeRoutes = require('./EmployeeRoute');
const userRoutes = require('./user.route');
const aadharRoutes = require('./aadharRoutes');


// Route definitions
router.use('/attendance', attendanceRoutes);
router.use('/demo', demoRoute);
router.use('/employee', employeeRoutes)
router.use("/aadhar", aadharRoutes);
router.use('/user', userRoutes);

module.exports = router;
