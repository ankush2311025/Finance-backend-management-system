💰 Finance Tracker Backend (NestJS)

A production-ready backend system built using NestJS, designed to manage financial records with secure authentication, role-based access control (RBAC), analytics, and scalable architecture.

---

🚀 Overview

This project simulates a real-world financial management system where users can:

- Track income & expenses
- View financial insights & trends
- Access dashboard analytics
- Perform role-based operations (Admin, Analyst, Viewer)

The system is built with a modular, scalable, and maintainable architecture, following industry best practices.

---

🧠 Key Features

🔐 Authentication & Authorization

- JWT-based authentication
- Secure login/signup system
- Role-Based Access Control (RBAC):
  - Admin → Full access
  - Analyst → Records + Insights
  - Viewer → Read-only access

---

💰 Financial Records Management

- Create, update, delete financial records
- Fields:
  - Amount
  - Type (Income / Expense)
  - Category
  - Date
  - Notes
- Advanced filtering:
  - Date range
  - Category
  - Type

---

📊 Dashboard Module

- Total income
- Total expenses
- Net balance
- Real-time aggregated data

---

📈 Insights Module

- Monthly trends
- Category-wise breakdown
- Financial analytics

---

🏗️ Low Level Design (LLD)

The system follows a clean layered architecture:

Controller → Service → Repository → Database

🔹 Controller Layer

- Handles incoming HTTP requests
- Validates input via DTOs
- Delegates logic to services

🔹 Service Layer

- Contains business logic
- Handles RBAC rules
- Coordinates between multiple repositories

🔹 Repository Layer

- Direct interaction with database using TypeORM
- Encapsulates all queries
- Keeps service layer clean

🔹 Database Layer

- MySQL relational database
- Structured schema for users, records, roles

---

📦 Module Breakdown

Auth Module      → Authentication & JWT
Users Module     → User management & RBAC
Records Module   → Financial transactions
Dashboard Module → Aggregated summaries
Insights Module  → Analytics & trends

---

🛠️ Tech Stack

Technology| Why Used
NestJS| Modular and scalable backend framework
TypeORM| ORM for database abstraction
MySQL| Relational data storage
JWT| Secure authentication
Passport.js| Strategy-based auth
Swagger| API documentation
Class Validator| Input validation
Config Module| Environment management

---

🔐 Security Features

- JWT authentication with expiration
- Role-based route protection
- Input validation using DTOs
- Environment-based secrets
- Guard-based route protection

---

⚙️ Environment Configuration

Create a ".env" file:

PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_NAME=finance_db

JWT_SECRET=your_secret_key
JWT_EXPIRES=1d

---

🚀 Running the Project

npm install
npm run start:dev

---

📄 Swagger API Docs

http://localhost:3000/api-docs

---

📸 Swagger Preview

"Swagger Screenshot" (./assets/swagger.png)

---

🧪 API Testing

- Tested using Postman
- JWT-based secured endpoints

---

🚫 Deployment Status

This project is not deployed due to the following reasons:

- The application uses a local MySQL database, which is not accessible over the internet.
- Free cloud platforms (like Render/Railway) either:
  - Do not support MySQL in free tier
  - Or require paid plans for persistent databases
- Migrating to cloud databases (e.g., PostgreSQL / managed MySQL) was intentionally avoided to keep the setup simple and focused on backend logic.

💡 Note:

The application is fully functional in a local environment and can be deployed by:

- Switching to cloud database (PostgreSQL / PlanetScale)
- Adding Docker support

---

🔄 API Flow

1. Signup user
2. Login → receive JWT token
3. Access protected routes
4. Create financial records
5. View dashboard summary
6. Analyze insights

---

📌 Sample APIs

Auth

- "POST /auth/signup"
- "POST /auth/login"

Users

- "GET /users"
- "GET /users/profile"

Records

- "POST /records"
- "GET /records"

Dashboard

- "GET /dashboard"

Insights

- "GET /insights"

---

💡 Design Decisions

- Implemented RBAC to simulate enterprise systems
- Used DTOs for validation and type safety
- Modular architecture for scalability
- Separation of concerns (Controller-Service-Repo)

---

📈 Future Improvements

- Redis caching
- Queue system (BullMQ)
- Dockerization
- Cloud deployment
- CI/CD pipeline

---

👨‍💻 Author

Ankush Sharma

---

⭐ Final Note

This project demonstrates:

- Backend system design
- Secure authentication
- Clean architecture
- Real-world API design

«Built with a focus on scalability, security, and maintainability.»