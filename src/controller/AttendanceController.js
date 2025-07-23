// const attendanceService = require('../services/attendanceService');

// const SuccessResponse = require('../utils/common/SuccessResponse');
// const ErrorResponse = require('../utils/common/ErrorResponse');


// const mark= async (req, res) => {
//   const { employee_id } = req.body;

//   try {
//     const result = await attendanceService.markAttendance(employee_id);

//     return res.status(200).json({
//       ...SuccessResponse,
//       message: 'Attendance marked as Present',
//       data: result,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       ...ErrorResponse,
//       message: 'Failed to mark attendance',
//       error,
//     });
//   }
// };


// const unmark= async (req, res) => {
//   const { employee_id } = req.body;

//   try {
//     const result = await attendanceService.unmarkAttendance(employee_id);

//     return res.status(200).json({
//       ...SuccessResponse,
//       message: 'Attendance marked as Absent',
//       data: result,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       ...ErrorResponse,
//       message: 'Failed to unmark attendance',
//       error,
//     });
//   }
// };

// module.exports = {
//   mark,
//   unmark
// };
const attendanceService = require('../services/attendanceService');
const SuccessResponse = require('../utils/common/SuccessResponse');
const ErrorResponse = require('../utils/common/ErrorResponse');

const mark = async (req, res) => {
  const { employee_id } = req.body;

  try {
    const result = await attendanceService.markAttendance(employee_id);

    return res.status(200).json({
      ...SuccessResponse,
      message: 'Attendance marked as Present',
      data: result,
    });
  } catch (error) {
    const statusCode = error.message === 'QR already scanned. Attendance already marked.' 
      ? 400 
      : error.message === 'Employee not found'
      ? 404
      : 500;

    return res.status(statusCode).json({
      ...ErrorResponse,
      message: error.message,
    });
  }
};

const unmark = async (req, res) => {
  const { employee_id } = req.body;

  try {
    const result = await attendanceService.unmarkAttendance(employee_id);

    return res.status(200).json({
      ...SuccessResponse,
      message: 'Attendance marked as Absent',
      data: result,
    });
  } catch (error) {
    const statusCode = error.message === 'Employee not found' ? 404 : 500;

    return res.status(statusCode).json({
      ...ErrorResponse,
      message: error.message,
    });
  }
};

module.exports = {
  mark,
  unmark,
};
