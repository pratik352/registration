# Employee API

A professional REST API for employee management built with Express.js, Prisma ORM, and MySQL. Features token-based authentication and comprehensive employee data management.

## 🚀 Features

- **Token-based Authentication**: Secure API access with static token authorization
- **Prisma ORM**: Type-safe database operations with MySQL
- **Professional Architecture**: Clean separation of concerns with MVC pattern
- **Comprehensive Employee Data**: Full employee information including salary, department, position, etc.
- **Error Handling**: Proper HTTP status codes and error responses
- **Logging**: Request logging with Morgan middleware

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employee_api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your database credentials:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/employee_db"
   PORT=3000
   API_TOKEN="your-secret-api-token-here"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npm run build
   
   # Run database migrations
   npm run db:migrate
   
   # Seed the database with sample data
   npm run db:seed
   ```

5. **Start the server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Schema

The Employee model includes the following fields:

- `id`: Primary key (auto-increment)
- `employeeId`: Unique employee identifier
- `firstName`: Employee's first name
- `lastName`: Employee's last name
- `aadhar_link`: Unique Aadhar verification link
- `attendance`: Attendance status (boolean)

## 🔐 Authentication

The API uses token-based authentication. Include the token in the Authorization header:

```
Authorization: Bearer your-secret-api-token-here
```

## 📡 API Endpoints

### Get Employee by Employee ID
```
GET /api/employees/:employeeId
```

**Headers:**
```
Authorization: Bearer your-secret-api-token-here
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "employeeId": "EMP001",
    "firstName": "John",
    "lastName": "Doe",
    "aadhar_link": "https://aadhar.gov.in/verify/123456789012",
    "attendance": false
  }
}
```

### Get All Employees
```
GET /api/employees
```

**Headers:**
```
Authorization: Bearer your-secret-api-token-here
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "employeeId": "EMP001",
      "firstName": "John",
      "lastName": "Doe",
      "aadhar_link": "https://aadhar.gov.in/verify/123456789012",
      "attendance": false
    }
  ],
  "count": 1
}
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio for database management

## 📁 Project Structure

```
src/
├── config/           # Configuration files
├── controller/       # HTTP request handlers
├── middlewares/      # Custom middleware
├── routes/           # API route definitions
├── services/         # Business logic
├── utils/            # Utility functions
└── server.js         # Express server setup
```

## 🛡️ Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error description"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized (missing token)
- `403` - Forbidden (invalid token)
- `404` - Not Found
- `500` - Internal Server Error

## 🧪 Testing the API

### Using curl:

1. **Get employee by ID:**
   ```bash
   curl -H "Authorization: Bearer your-secret-api-token-here" \
        http://localhost:3000/api/employees/EMP001
   ```

2. **Get all employees:**
   ```bash
   curl -H "Authorization: Bearer your-secret-api-token-here" \
        http://localhost:3000/api/employees
   ```

### Using Postman:

1. Set the Authorization header:
   - Type: Bearer Token
   - Token: `your-secret-api-token-here`

2. Make requests to:
   - `GET http://localhost:3000/api/employees/EMP001`
   - `GET http://localhost:3000/api/employees`

## 🔒 Security Considerations

- Change the default API token in production
- Use environment variables for sensitive data
- Implement rate limiting for production use
- Consider adding request validation middleware
- Use HTTPS in production

## 📝 License

This project is licensed under the ISC License.
    
