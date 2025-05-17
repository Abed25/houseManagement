# House Management Backend

This is the backend server for the House Management application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/houseManagement
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

3. Start the server:
```bash
node server/server.mjs
```

## API Endpoints

### Users
- POST `/api/users` - Register a new user
- POST `/api/users/login` - Login user
- GET `/api/users/profile` - Get user profile (protected route)

### Health Check
- GET `/api/health` - Check server status

## Project Structure
```
server/
├── controllers/     # Route controllers
├── models/         # Database models
├── routes/         # API routes
├── middleware/     # Custom middleware
├── config/         # Configuration files
├── app.mjs         # Express app setup
├── server.mjs      # Server entry point
└── README.md
``` 