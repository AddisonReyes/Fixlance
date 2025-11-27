# Fixlance

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## Description

Web application designed to connect users who need technical services (plumbers, electricians, painters, refrigerator technicians, etc.) with certified professionals who offer those services in their area.

## Main Features

### For Customers

- Search for technicians by category and location
- View detailed profiles with ratings
- Request services and schedule appointments
- Leave reviews and ratings
- Service history

### For Technicians

- Create a professional profile
- Manage service requests
- Accept/reject jobs
- View reviews and average rating

## Endpoint Structure

### Authentication

```
POST /api/auth/register - User registration
POST /api/auth/login - Login
GET /api/users/me - Authenticated user's profile
```

### Technicians

```
GET /api/technicians - List technicians (with filters)
GET /api/technicians/:id - View detailed profile
PUT /api/technicians/:id - Update profile
DELETE /api/technicians/:id - Delete account
```

### Requests

```
POST /api/requests - Create request
GET /api/requests - List requests
PUT /api/requests/:id - Update status
DELETE /api/requests/:id - Cancel request
```

### Reviews

```
POST /api/reviews - Create review
GET /api/reviews/:technicianId - Get reviews of a technician
```

## Data Models

### User

```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  role: "client" | "technician",
  createdAt: Date
}
```

### Technician

```javascript
{
  userId: ObjectId,
  categories: [String],
  pricePerHour: Number,
  description: String,
  location: String,
  photo: String,
  rating: Number
}
```

### Request

```javascript
{
  clientId: ObjectId,
  technicianId: ObjectId,
  description: String,
  date: Date,
  status: "pending" | "accepted" | "completed" | "cancelled"
}
```

### Review

```javascript
{
  requestId: ObjectId,
  technicianId: ObjectId,
  clientId: ObjectId,
  rating: Number,
  comment: String
}
```

## Installation

```bash
# Clone repository
git clone [repository-url]

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Configuration

Create a `.env` file in the backend directory:

```
MONGO_URL_DEV=mongodb://admin:123456@localhost:27017/fix-rd?authSource=admin&retryWrites=true&w=majority
MONGO_URL_PROD=mongodb://admin:<password>@localhost:27017/fix-rd?authSource=admin&retryWrites=true&w=majority
URL=http://localhost:3000
NODE_ENV=dev
PORT=3000
```

## Running the Application

```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm start
```
