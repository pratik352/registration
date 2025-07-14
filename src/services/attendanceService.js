const { PrismaClient, AttendanceStatus } = require('@prisma/client');
const prisma = new PrismaClient();

//without async-await
// const markAttendance = (employee_id) => {
//   return prisma.emp_management.update({
//     where: { employee_id },
//     data: { attendance_status: 'Present' }
//   });
// };

const markAttendance = async (employee_id) => {
  return await prisma.emp_management.update({
    where: { employee_id },
    data: { attendance_status: AttendanceStatus.Present }
  });
};

//without async-await
// const unmarkAttendance = (employee_id) => {
//   return prisma.emp_management.update({
//     where: { employee_id },
//     data: { attendance_status: 'Absent' }
//   });
// };

const unmarkAttendance = async (employee_id) => {
  return await prisma.emp_management.update({
    where: { employee_id },
    data: { attendance_status: AttendanceStatus.Absent }
  });
};

module.exports = {
  markAttendance,
  unmarkAttendance
};
