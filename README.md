# node-jwt

# JWT Authentication with Express.js


This project demonstrates a simple Express application with JWT authentication. The application provides endpoints for user registration, login, and profile access using JSON web tokens.



# Prerequisites

  Node.js and npm installed.
  Familiarity with Express.js.

# Dependencies

 express - Web server.
 jsonwebtoken - To generate and verify JWTs.
 body-parser - Middleware to parse request bodies.
 cors - Middleware to enable CORS.

# API Endpoints

# POST /register
Registers a new user by providing name, username, email & passwords.

# POST /login
Authenticates a user and returns a JWT. This JWT token can be used to verify user.

# POST /profile
Returns user's profile information if provided with a valid JWT in the Authorization header.

# Middlewares

# verifyToken
Checks the Authorization header for a JWT and verifies it

# Notes
The code uses a hardcoded secret key for JWT. In a real-world application, consider using a secure and environment-specific method for handling keys.
Passwords are stored as plain text in the users array for demonstration purposes. In a real-world application, always hash passwords before storing them.
The users array is a simple in-memory storage. Consider using a database in production applications.

