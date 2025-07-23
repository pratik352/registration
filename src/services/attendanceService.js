const { PrismaClient, AttendanceStatus } = require('@prisma/client');
const prisma = new PrismaClient();


const markAttendance = async (employee_id) => {
  return await prisma.employees.update({
    where: { employee_id },
    data: { attendance_status: AttendanceStatus.Present }
  });
};


const unmarkAttendance = async (employee_id) => {
  return await prisma.employees.update({
    where: { employee_id },
    data: { attendance_status: AttendanceStatus.Absent }
  });
};

module.exports = {
  markAttendance,
  unmarkAttendance
};
