const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';
const API_TOKEN = 'secret_token';

const testAPI = async () => {
  try {
    console.log('🧪 Testing Employee API...\n');

    // Test 1: Get all employees
    console.log('1. Testing GET /api/v1/employees');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employees`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      console.log('✅ Success:', response.data);
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 2: Get specific employee
    console.log('2. Testing GET /api/v1/employees/EMP001');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employees/EMP001`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      console.log('✅ Success:', response.data);
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 3: Test without token
    console.log('3. Testing without authorization token');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employees/EMP001`);
      console.log('✅ Success:', response.data);
    } catch (error) {
      console.log('❌ Error (Expected):', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 4: Test with invalid token
    console.log('4. Testing with invalid token');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employees/EMP001`, {
        headers: {
          'Authorization': 'Bearer invalid-token'
        }
      });
      console.log('✅ Success:', response.data);
    } catch (error) {
      console.log('❌ Error (Expected):', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');
 
     // Test 5: Pagination support
     console.log('5. Testing GET /api/v1/employees?page=2&limit=2');
     try {
       const response = await axios.get(`${API_BASE_URL}/v1/employees?page=2&limit=2`, {
         headers: {
           'Authorization': `Bearer ${API_TOKEN}`
         }
       });
       console.log('✅ Success:', response.data);
     } catch (error) {
       console.log('❌ Error:', error.response?.data || error.message);
     }

  } catch (error) {
    console.error('Test failed:', error.message);
  }
};

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI };