# 🚀 Invex Server

**Invex Server** is a role-based admin & project management backend built with  
**Node.js, Express, TypeScript, and MongoDB**.

It implements **invite-only user onboarding**, **JWT authentication**,  
**role-based access control (RBAC)**, and **soft delete strategies**.

> Built as part of a **Mid-Level Full Stack Developer Assessment**

---

## 🧠 System Overview

Invex Server powers a system where:

- ❌ Users **cannot self-register**
- ✅ Admins invite users via **email/token**
- 🔐 Secure **JWT-based authentication**
- 🧑‍💼 Role-based permissions (**ADMIN | MANAGER | STAFF**)
- 📁 Projects are managed using **soft delete**
- 🚫 Deactivated users **cannot log in**

---

## 🛠 Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Zod Validation
- bcrypt (password hashing)

---

## 📦 Features

### 🔐 Authentication & Authorization

- JWT-based login
- Invite-based registration
- Password hashing with bcrypt
- Role-based route protection
- User status enforcement (**ACTIVE / INACTIVE**)

---

### 👥 User Management (Admin Only)

- View all users (paginated-ready)
- Change user roles
- Activate / deactivate users
- Soft delete support

---

### ✉️ Invitation System

- Admin-generated invite tokens
- Role assigned at invite time
- Invite expiration handling
- Token-based registration flow

---

### 📁 Project Management

- All authenticated users can create projects
- Only admins can update or delete projects
- Projects use **soft delete**
- Role-based access enforcement

---

## 📂 Project Structure

```
src/
├── app/
│ ├── modules/
│ │ ├── auth/
│ │ ├── user/
│ │ ├── invite/
│ │ └── project/
│ ├── middlewares/
│ ├── constants/
│ └── config/
├── server.ts
└── app.ts
```

---

## 🧾 Entities

### User

- `id`
- `name`
- `email`
- `password`
- `role` (ADMIN | MANAGER | STAFF)
- `status` (ACTIVE | INACTIVE)
- `invitedAt`
- `createdAt`

### Invite

- `id`
- `email`
- `role`
- `token`
- `expiresAt`
- `acceptedAt`
- `invitedBy`

### Project

- `id`
- `name`
- `description`
- `status` (ACTIVE | ARCHIVED | DELETED)
- `isDeleted`
- `createdBy`
- `createdAt`
- `updatedAt`

---

## 🔗 API Endpoints

### Auth

| Method | Endpoint               | Access      |
| ------ | ---------------------- | ----------- |
| POST   | `/auth/login`          | Public      |
| POST   | `/auth/register`       | Invite Only |
| POST   | `/auth/invite`         | Admin       |
| POST   | `/auth//refresh-token` | Public      |

---

### Users (Admin)

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | `/users`            |
| PATCH  | `/users/:id/role`   |
| PATCH  | `/users/:id/status` |

---

### Projects

| Method | Endpoint        | Access              |
| ------ | --------------- | ------------------- |
| POST   | `/projects`     | Authenticated       |
| GET    | `/projects`     | Authenticated       |
| PATCH  | `/projects/:id` | Admin               |
| DELETE | `/projects/:id` | Admin (Soft Delete) |

---

## 🔐 Role-Based Access Control

| Action         | ADMIN | MANAGER | STAFF |
| -------------- | ----- | ------- | ----- |
| Invite Users   | ✅    | ❌      | ❌    |
| Manage Users   | ✅    | ❌      | ❌    |
| Create Project | ✅    | ❌      | ✅    |
| Edit Project   | ✅    | ❌      | ❌    |
| Delete Project | ✅    | ❌      | ❌    |
| View Projects  | ✅    | ✅      | ✅    |

---

## ⚙️ Environment Setup

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=mongodb://localhost:27017/invex
JWT_ACCESS_SECRET=your_secret
JWT_ACCESS_EXPIRES_IN=1d
BCRYPT_SALT_ROUNDS=10
```

## ▶️ Running the Project

### Development

```
- bun install

* bun run dev
```

### Build

```
bun run build
```

### Production

```
bun run prod
```

## 🧪 Validation & Error Handling

- Zod-based request validation

* Centralized error handling middleware

* Consistent HTTP status codes

* Clean error responses

## 🧩 Architecture Highlights

- Modular folder-based architecture

- Clear separation of concerns

- Reusable middleware for auth & validation

- Scalable RBAC enforcement

- Production-ready ES module setup

## 📈 Enhancements (Bonus)

- Refresh token support

- Pagination & filters

- Email service integration

# 👨‍💻 Author

- Invex Server
- Built by Pallab Sarker Mid-Level Full Stack
- Developer Assessment Project
