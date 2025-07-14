const attendanceService = require('../services/attendanceService');

const SuccessResponse = require('../utils/common/SuccessResponse');
const ErrorResponse = require('../utils/common/ErrorResponse');


const mark= async (req, res) => {
  const { employee_id } = req.body;

  try {
    const result = await attendanceService.markAttendance(employee_id);

    return res.status(200).json({
      ...SuccessResponse,
      message: 'Attendance marked as Present',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      ...ErrorResponse,
      message: 'Failed to mark attendance',
      error,
    });
  }
};


const unmark= async (req, res) => {
  const { employee_id } = req.body;

  try {
    const result = await attendanceService.unmarkAttendance(employee_id);

    return res.status(200).json({
      ...SuccessResponse,
      message: 'Attendance marked as Absent',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      ...ErrorResponse,
      message: 'Failed to unmark attendance',
      error,
    });
  }
};

module.exports = {
  mark,
  unmark
};
