

// const fs = require('fs');
// const xlsx = require('xlsx');
// const path = require('path');
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

// (async () => {
//   try {
//     const workbook = xlsx.readFile(path.join(__dirname, 'employees.xlsx'));
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const employees = xlsx.utils.sheet_to_json(sheet);

//     for (const emp of employees) {
//       if (!emp.employee_id || !emp.first_name || !emp.last_name || !emp.whatsapp_number) {
//         console.log(`Skipping invalid row:`, emp);
//         continue;
//       }

//       try {
//         await prisma.employees.create({
//           data: {
//             employee_id: emp.employee_id,
//             first_name: emp.first_name,
//             last_name: emp.last_name,
//             aadhar_link: emp.aadhar_link || null,
//             whatsapp_number: String(emp.whatsapp_number),
//             city: emp.city || '',
//             attendance_status: 'Absent',
//           },
//         });

//         console.log(`✅ Inserted: ${emp.employee_id} ${emp.first_name}`);
//       } catch (err) {
//         console.error(` DB Insert failed for ${emp.employee_id}:`, err.message);
//       }
//     }

//     console.log('All employee data imported.');
//   } catch (err) {
//     console.error('Failed to process Excel:', err.message);
//   } finally {
//     await prisma.$disconnect();
//   }
// })();
const fs = require('fs');
const xlsx = require('xlsx');
const path = require('path');
const { PrismaClient,Is_qr_sent } = require('@prisma/client');

const prisma = new PrismaClient();

(async () => {
  try {
    const workbook = xlsx.readFile(path.join(__dirname, 'employees.xlsx'));
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const employees = xlsx.utils.sheet_to_json(sheet);

    for (const emp of employees) {
      if (!emp.employee_id || !emp.first_name || !emp.last_name || !emp.whatsapp_number) {
        console.log(`⚠️ Skipping invalid row:`, emp);
        continue;
      }

      try {
        const existing = await prisma.employees.findUnique({
          where: { employee_id: emp.employee_id },
        });

        if (existing) {
          console.log(`ℹ️ Already exists: ${emp.employee_id} ${emp.first_name}`);
          continue;
        }

        await prisma.employees.create({
          data: {
            employee_id: emp.employee_id,
            first_name: emp.first_name,
            last_name: emp.last_name,
            email: emp.email || null,
            whatsapp_number: String(emp.whatsapp_number),
            city: emp.city || '',
            attendance_status: 'Absent',
            uuid:emp.uuid ,             
            is_qr_sent:Is_qr_sent.failed        
          },
        });

        console.log(`✅ Inserted: ${emp.employee_id} ${emp.first_name}`);
      } catch (err) {
        console.error(`❌ Unexpected error for ${emp.employee_id}:`, err.message);
      }
    }

    console.log('\n✅ All employee data processed.');
  } catch (err) {
    console.error('❌ Failed to process Excel:', err.message);
  } finally {
    await prisma.$disconnect();
  }
})();
