const { StatusCodes } = require('http-status-codes');
const EmployeeService = require('../services/employee.service');

class EmployeeController {
  constructor() {
    this.employeeService = new EmployeeService();
  }

  async getEmployeeByEmployeeId(req, res) {
    try {
      const { employeeId } = req.params;

      if (!employeeId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Employee ID is required',
          error: 'Missing employee ID parameter'
        });
      }

      const result = await this.employeeService.getEmployeeByEmployeeId(employeeId);
      
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
        error: error.error
      });
    }
  }

  async getAllEmployees(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const result = await this.employeeService.getAllEmployees(page, limit);
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
        error: error.error
      });
    }
  }
}

module.exports = EmployeeController;