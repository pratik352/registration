const express = require('express');
const { authenticateToken } = require('../../middlewares/auth.middleware');
const EmployeeController = require('../../controller/employee.controller');

const router = express.Router();
const employeeController = new EmployeeController();

// Apply authentication middleware to all employee routes
router.use(authenticateToken);

// Get employee by employee ID
router.get('/:employeeId', employeeController.getEmployeeByEmployeeId.bind(employeeController));

// Get all employees (optional endpoint)
router.get('/', employeeController.getAllEmployees.bind(employeeController));

module.exports = router;