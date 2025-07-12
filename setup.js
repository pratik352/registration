const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Employee API...\n');

// Check if .env file exists
if (!fs.existsSync('.env')) {
  console.log('📝 Creating .env file...');
  const envContent = `# Database Configuration
DATABASE_URL="mysql://root:password@localhost:3306/employee_db"

# Server Configuration
PORT=3000

# API Authorization
API_TOKEN="your-secret-api-token-here"
`;
  fs.writeFileSync('.env', envContent);
  console.log('✅ .env file created');
} else {
  console.log('✅ .env file already exists');
}

console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed');
} catch (error) {
  console.log('❌ Error installing dependencies:', error.message);
}

console.log('\n🔧 Generating Prisma client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated');
} catch (error) {
  console.log('❌ Error generating Prisma client:', error.message);
}

console.log('\n🗄️ Setting up database...');
console.log('⚠️  Please make sure your MySQL database is running and accessible');
console.log('⚠️  Update the DATABASE_URL in .env file with your database credentials');

console.log('\n📋 Next steps:');
console.log('1. Update .env file with your database credentials');
console.log('2. Run: npm run db:migrate');
console.log('3. Run: npm run db:seed');
console.log('4. Run: npm run dev');
console.log('5. Test the API with: node test-api.js');

console.log('\n🎉 Setup complete!');