#  Full-Stack Development - Codveda Internship

A complete MERN Stack application built during Codveda Technology internship.

##  Tech Stack
- **Frontend:** React.js, React Router, Axios, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + Bcrypt
- **API:** REST API + GraphQL (Apollo Server)

---

##  Tasks Completed

###  Level 1 (Basic)
- **Task 1:** Development Environment Setup
- **Task 2:** REST API with full CRUD operations

###  Level 2 (Intermediate)
- **Task 1:** React Frontend with components, hooks, API calls
- **Task 3:** MongoDB Database Integration with Mongoose, indexing & validation

###  Level 3 (Advanced)
- **Task 1:** JWT Authentication + Role-based Access Control
- **Task 3:** GraphQL API with Apollo Server

---

## 🚀 Running Locally

### Prerequisites
- Node.js installed
- MongoDB installed or MongoDB Atlas account

### Backend (REST API)
```bash
cd backend
npm install
node index.js
```
Runs at → http://localhost:3000

### Backend (GraphQL)
```bash
cd backend
node graphql-server.js
```
Runs at → http://localhost:4000/graphql

### Frontend
```bash
cd frontend
npm install
npm start
```
Runs at → http://localhost:3001

---

## 📁 Project Structure

```
fullstack-task/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── graphql/
│   │   ├── typeDefs.js
│   │   └── resolvers.js
│   ├── library/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── userModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   ├── database.js
│   ├── graphql-server.js
│   └── index.js
└── frontend/
    └── src/
        ├── components/
        │   ├── Navbar.js
        │   ├── UserList.js
        │   ├── AddUser.js
        │   └── EditUser.js
        ├── services/
        │   └── userService.js
        ├── App.js
        └── App.css
```

---

## 🔗 API Endpoints

### REST API
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /auth/signup | Register user | Public |
| POST | /auth/login | Login user | Public |
| GET | /auth/me | Get current user | Protected |
| GET | /users | Get all users | Admin only |
| GET | /users/:id | Get single user | Protected |
| PUT | /users/:id | Update user | Admin only |
| DELETE | /users/:id | Delete user | Admin only |

### GraphQL Queries & Mutations
```graphql
# Signup
mutation { signup(name, email, password, age) { token user { id name role } } }

# Login
query { login(email, password) { token user { name role } } }

# Get all users (admin)
query { getAllUsers { count users { id name email } } }
```

---

## Author
**Riya Mehra**
- Internship at Codveda Technology
- Domain: Full-Stack Development

#CodvedaJourney #CodvedaExperience #FutureWithCodveda
