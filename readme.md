# Reimbursement Management System

A role-based reimbursement approval system built with Node.js, Express, TypeScript, PostgreSQL, and Drizzle ORM.

## Overview

The system allows employees to submit reimbursement requests and routes them through a multi-level approval workflow:

```text
Employee
   |
   v
Reporting Manager (RM)
   |
   v
Accounts Payable Executive (APE)
   |
   v
Chief Financial Officer (CFO)
   |
   v
Paid
```

## Features

### Authentication & Authorization

* JWT-based authentication
* Secure password hashing
* Role-based access control

Supported Roles:

* EMP (Employee)
* RM (Reporting Manager)
* APE (Accounts Payable Executive)
* CFO (Chief Financial Officer)

---

## Database Schema

### Users

| Field         | Type        | Description          |
| ------------- | ----------- | -------------------- |
| id            | Primary Key | User ID              |
| name          | String      | User Name            |
| email         | String      | Unique Email         |
| password_hash | String      | Hashed Password      |
| role          | Enum        | EMP / RM / APE / CFO |
| manager_id    | Foreign Key | References Users.id  |

### Relationships

```text
RM
├── EMP1
├── EMP2
└── EMP3
```

Each employee can have a reporting manager.

---

### Reimbursements

| Field       | Type        | Description          |
| ----------- | ----------- | -------------------- |
| id          | Primary Key | Reimbursement ID     |
| employee_id | Foreign Key | References Users.id  |
| title       | String      | Expense Title        |
| description | Text        | Expense Description  |
| amount      | Decimal     | Reimbursement Amount |
| status      | Enum        | Workflow Status      |
| rm_comment  | Text        | RM Remarks           |
| ape_comment | Text        | APE Remarks          |
| created_at  | Timestamp   | Creation Time        |
| updated_at  | Timestamp   | Last Update Time     |

---

Supported Status Values:

* SUBMITTED
* RM_APPROVED
* RM_REJECTED
* APE_APPROVED
* APE_REJECTED
* PAID

---

## Role Permissions

### Employee

* Register/Login
* Submit reimbursement requests
* View own reimbursements
* Track reimbursement status

### Reporting Manager (RM)

* View reimbursements of reporting employees
* Approve reimbursement requests
* Reject reimbursement requests
* Add manager comments

### APE

* View RM-approved reimbursements
* Approve requests
* Reject requests
* Add finance comments

### CFO

* View approved reimbursements
* Mark reimbursement as PAID
* Monitor reimbursement workflow

---

## API Modules

```text
src/
└── app/
    ├── auth/
    ├── users/
    ├── reimbursements/
    ├── approvals/
    └── payments/
```

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* Drizzle ORM

### Authentication

* JWT
* bcrypt

### Validation

* Zod

---

## Seed Credentials

### CFO Account

```text
Email: cfo@org.com
Password: CFO#ORG@April2026
```

---



## Getting Started

```bash
git clone <repository-url>

npm install

npm run dev
```

Server starts on:

```text
http://localhost:3000
```

---

## License

This project is developed for learning and assessment purposes.
