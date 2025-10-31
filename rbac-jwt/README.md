# Role-Based Access Control using JWT

This project demonstrates how to secure Node.js API routes using JWT and Role-Based Access Control (RBAC).

## Features
- JWT-based login
- Token verification middleware
- Role-based access (`Admin`, `Moderator`, `User`)
- Sample protected routes

## Test Users
| Username | Password  | Role |
|-----------|------------|------|
| adminuser | admin123   | Admin |
| moduser   | mod123     | Moderator |
| normaluser| user123    | User |

## Routes
- `POST /login`
- `GET /admin-dashboard`
- `GET /moderator-panel`
- `GET /user-profile`

## Usage
```bash
npm install express jsonwebtoken body-parser
node index.js
```
