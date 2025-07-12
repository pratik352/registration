const { PrismaConfig } = require('../config');

const seedEmployees = async () => {
  const prisma = PrismaConfig.prisma;

  try {
    // Clear existing data
    await prisma.employee.deleteMany();

    // Seed sample employees
    const employees = [
      {
        employeeId: 'EMP001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@company.com',
        phone: '+1-555-0101',
        department: 'Engineering',
        position: 'Senior Software Engineer',
        salary: 85000.00,
        isActive: true
      },
      {
        employeeId: 'EMP002',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@company.com',
        phone: '+1-555-0102',
        department: 'Marketing',
        position: 'Marketing Manager',
        salary: 75000.00,
        isActive: true
      },
      {
        employeeId: 'EMP003',
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike.johnson@company.com',
        phone: '+1-555-0103',
        department: 'Sales',
        position: 'Sales Representative',
        salary: 65000.00,
        isActive: true
      },
      {
        employeeId: 'EMP004',
        firstName: 'Sarah',
        lastName: 'Williams',
        email: 'sarah.williams@company.com',
        phone: '+1-555-0104',
        department: 'HR',
        position: 'HR Specialist',
        salary: 60000.00,
        isActive: true
      },
      {
        employeeId: 'EMP005',
        firstName: 'David',
        lastName: 'Brown',
        email: 'david.brown@company.com',
        phone: '+1-555-0105',
        department: 'Finance',
        position: 'Financial Analyst',
        salary: 70000.00,
        isActive: true
      }
    ];

    for (const employee of employees) {
      await prisma.employee.create({
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