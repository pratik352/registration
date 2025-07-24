// const { PrismaClient, AttendanceStatus } = require('@prisma/client');
// const prisma = new PrismaClient();


// const markAttendance = async (employee_id) => {
//   return await prisma.employees.update({
//     where: { employee_id },
//     data: { attendance_status: AttendanceStatus.Present }
//   });
// };


// const unmarkAttendance = async (employee_id) => {
//   return await prisma.employees.update({
//     where: { employee_id },
//     data: { attendance_status: AttendanceStatus.Absent }
//   });
// };

// module.exports = {
//   markAttendance,
//   unmarkAttendance
// };
const { PrismaClient, AttendanceStatus } = require('@prisma/client');
const prisma = new PrismaClient();

const markAttendance = async (uuid) => {
  console.log("uuid : " + uuid)
  const employee = await prisma.employees.findFirst({
    where: { uuid },
  });

  if (!employee) {
    throw new Error('Employee not found');
  }

  console.log("emp: "+ JSON.stringify(employee))
  if (employee.attendance_status == AttendanceStatus.Present) {
    throw new Error('QR already scanned. Attendance already marked.');
  }

  return await prisma.employees.update({
    where: { employee_id:employee.employee_id },
    data: { attendance_status: AttendanceStatus.Present },
  });
};

const unmarkAttendance = async (uuid) => {
  const employee = await prisma.employees.findFirst({
    where: { uuid },
  });

  if (!employee) {
    throw new Error('Employee not found');
  }

  return await prisma.employees.update({
    where: { employee_id:employee.employee_id },
    data: { attendance_status: AttendanceStatus.Absent },
  });
};

module.exports = {
  markAttendance,
  unmarkAttendance,
};
