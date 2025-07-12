const { PrismaConfig } = require('../config');
const { StatusCodes } = require('http-status-codes');

class EmployeeService {
  constructor() {
    this.prisma = PrismaConfig.prisma;
  }

  async getEmployeeByEmployeeId(employeeId) {
    try {
      const employee = await this.prisma.employee.findUnique({
        where: {
          employeeId: employeeId
        }
      });

      if (!employee) {
        throw {
          statusCode: StatusCodes.NOT_FOUND,
          message: 'Employee not found',
          error: 'Employee with the provided employee ID does not exist'
        };
      }

      return {
        success: true,
        data: {
          id: employee.id,
          employeeId: employee.employeeId,
          firstName: employee.firstName,
          lastName: employee.lastName,
          aadhar_link: employee.aadhar_link,
          attendance: employee.attendance
        }
      };
    } catch (error) {
      if (error.statusCode) {
        throw error;
      }
      throw {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Error retrieving employee information',
        error: error.message
      };
    }
  }

  async getAllEmployees() {
    try {
      const employees = await this.prisma.employee.findMany({
        select: {
          id: true,
          employeeId: true,
          firstName: true,
          lastName: true,
          aadhar_link: true,
          attendance: true
        }
      });

      return {
        success: true,
        data: employees,
        count: employees.length
      };
    } catch (error) {
      throw {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Error retrieving employees',
        error: error.message
      };
    }
  }
}

module.exports = EmployeeService;