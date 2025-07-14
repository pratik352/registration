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
- `phoneNumber`: Employee's phone number (optional)

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
    "attendance": false,
    "phoneNumber": "9876543210"
  }
}
```

### Get All Employees (with Pagination)
```
GET /api/employees?page=1&limit=10
```

**Query Parameters:**
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 10): Number of employees per page

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
      "attendance": false,
      "phoneNumber": "9876543210"
    }
    // ... more employees ...
  ],
  "count": 10,
  "total": 100,
  "page": 1,
  "totalPages": 10
}
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with nodemon
- `