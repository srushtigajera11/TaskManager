📌 Task Management System API

A scalable company-based Task Management System built with Node.js, Express, and MongoDB following clean architecture principles.

The system supports multi-company isolation, role-based access control, task tracking, comments, and activity history.

🚀 Features
🔐 Authentication & Authorization
JWT-based authentication
Role-based access control (RBAC)
Secure API endpoints
Company-level data isolation
🏢 Company Management
Create company
Update company
Delete company
List companies
Company subscription support
👥 User Management
Create users
Update users
Delete users
Role support:
Super Admin
Admin
User
📁 Project Management
Create project
Update project
Delete project
Assign users to project
Project linked with company
📋 Task Management
Create task
Update task
Delete task
Assign users to task
Filter tasks by status and priority
🆔 Custom Task ID

Task ID auto-generated using project short code.

Example:

CMS-01
CMS-02
📊 Task Status Workflow

7-stage workflow supported:

To-Do
In-Progress
Done
Testing
QA-Verified
Re-Open
Deployment
💬 Comment Module
Add comments on tasks
Update comments
Delete comments
Get comments by task
📈 Activity Tracking

Tracks task status changes:

old status → new status
who updated
timestamp
company isolation
🛠️ Tech Stack
Technology	Usage
Node.js	Backend runtime
Express.js	API framework
MongoDB	Database
Mongoose	ODM
JWT	Authentication
Joi	Validation
bcrypt	Password hashing
dotenv	Environment variables
📂 Project Structure
src
│
├── controllers
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── project.controller.js
│   ├── task.controller.js
│   ├── comment.controller.js
│   ├── activity.controller.js
│
├── services
│   ├── auth.service.js
│   ├── user.service.js
│   ├── project.service.js
│   ├── task.service.js
│   ├── comment.service.js
│   ├── activity.service.js
│
├── models
│   ├── company.model.js
│   ├── user.model.js
│   ├── project.model.js
│   ├── task.model.js
│   ├── comment.model.js
│   ├── activity.model.js
│
├── routes
│   ├── auth.route.js
│   ├── user.route.js
│   ├── project.route.js
│   ├── task.route.js
│   ├── comment.route.js
│   ├── activity.route.js
│
├── middlewares
│   ├── auth.middleware.js
│   ├── validate.middleware.js
│   ├── error.middleware.js
│
├── validations
│   ├── user.validation.js
│   ├── project.validation.js
│   ├── task.validation.js
│   ├── comment.validation.js
│
├── utils
│   ├── AppError.js
│
└── app.js
⚙️ Installation
1. Clone repository
git clone https://github.com/srushtigajera11/task-manager-api.git
cd task-manager-api
2. Install dependencies
npm install
3. Create .env file
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
4. Run server
npm run dev

Server will run on:-

http://localhost:3000
📡 API Endpoints
Auth
Method	Endpoint
POST	/api/auth/login
Company
Method	Endpoint
POST	/api/companies
GET	/api/companies
PATCH	/api/companies/:id
DELETE	/api/companies/:id
Users
Method	Endpoint
POST	/api/users
GET	/api/users
PATCH	/api/users/:id
DELETE	/api/users/:id
Projects
Method	Endpoint
POST	/api/projects
GET	/api/projects
PATCH	/api/projects/:id
DELETE	/api/projects/:id
Tasks
Method	Endpoint
POST	/api/tasks
GET	/api/tasks
PATCH	/api/tasks/:id
DELETE	/api/tasks/:id
PATCH	/api/tasks/:id/status
Comments
Method	Endpoint
POST	/api/comments
GET	/api/comments/task/:taskId
PATCH	/api/comments/:id
DELETE	/api/comments/:id
Activity Logs
Method	Endpoint
GET	/api/activity/task/:taskId
🔒 Role Permissions
Role	Permissions
Admin	create tasks, assign users, manage projects
User	update task status only
Super Admin	manage companies and plans
🧪 Testing

Use Postman to test APIs.

Example request:

POST /api/tasks

{
  "title": "Fix login bug",
  "description": "JWT issue",
  "project": "projectId",
  "assignedTo": "userId",
  "reportTo": "userId",
  "priority": "high"
}

📈 Future Improvements
Real-time updates using Socket.io
Dashboard analytics
File attachments
Task labels

👨‍💻 Author
Name: Srushti Gajera
Role: MERN Stack Developer
