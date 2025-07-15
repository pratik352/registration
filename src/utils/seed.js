const { PrismaConfig } = require('../config');

const seedEmployees = async () => {
  const prisma = PrismaConfig.prisma;

  try {
    // Clear existing data
    await prisma.emp_management.deleteMany();

    // Seed sample employees
    const employees = [
      {
        employeeId: 'EMP001',
        firstName: 'John',
        lastName: 'Doe',
        aadhar_link: 'https://aadhar.gov.in/verify/123456789012',
        attendance: false,
        phoneNumber: '9876543210'
      },
      {
        employeeId: 'EMP002',
        firstName: 'Jane',
        lastName: 'Smith',
        aadhar_link: 'https://aadhar.gov.in/verify/234567890123',
        attendance: true,
        phoneNumber: '8765432109'
      },
      {
        employeeId: 'EMP003',
        firstName: 'Mike',
        lastName: 'Johnson',
        aadhar_link: 'https://aadhar.gov.in/verify/345678901234',
        attendance: false,
        phoneNumber: '7654321098'
      },
      {
        employeeId: 'EMP004',
        firstName: 'Sarah',
        lastName: 'Williams',
        aadhar_link: 'https://aadhar.gov.in/verify/456789012345',
        attendance: true,
        phoneNumber: '6543210987'
      },
      {
        employeeId: 'EMP005',
        firstName: 'David',
        lastName: 'Brown',
        aadhar_link: 'https://aadhar.gov.in/verify/567890123456',
        attendance: false,
        phoneNumber: '5432109876'
      }
    ];

    for (const employee of employees) {
      await prisma.emp_management.create({
        data: employee
      });
    }

    console.log('✅ Database seeded successfully!');
    console.log(`📊 Created ${employees.length} employees`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
};

// Run seeder if this file is executed directly
if (require.main === module) {
  seedEmployees();
}

module.exports = { seedEmployees };