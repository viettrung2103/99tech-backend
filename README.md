# A1
# A2
  
# Jobs API (TypeScript + Express)

A simple REST API for managing jobs and users, built with **TypeScript**, **Express**, **MongoDB/Mongoose**, **JWT auth**, and helpful middlewares.

---

## 🚀 Tech Stack

- **Runtime:** Node.js  
- **Language:** TypeScript  
- **Web Framework:** Express  
- **Database & ODM:** MongoDB + Mongoose  
- **Auth:** JSON Web Tokens (JWT)  
- **Utilities:** dotenv, cors, morgan, bcryptjs  
- **Dev tooling:** ts-node-dev, TypeScript (`tsc`)  
## How to start
### Prerequisit
- must have Mongodb Community instance run
### How to install and run the app on your machine
- Clone this project
- cd a2/
- npm i
- npm run dev
## API and test with POSTMAN
### API
#### Auth
- **POST** `/api/users/signup` – Create an account  
- **POST** `/api/users/login` – Log in and receive a JWT  

#### Jobs
- **GET** `/api/jobs` – List jobs (public)  
- **GET** `/api/jobs/:jobId` – Get a job by ID (public)  

#### Protected (requires `Authorization: Bearer <token>`)
- **POST** `/api/jobs` – Create a job  
- **PUT** `/api/jobs/:jobId` – Update a job  
- **DELETE** `/api/jobs/:jobId` – Delete a job  

---
### Example SignUp Body request
```
{
    "name":"test",
    "username":"test",
    "password":"password"
}
```

### Example Job Body Request
```
{
  "title": "Software Developer",
  "type": "full-time",
  "description": "We are looking for an experienced software developer...",
  "company": {
    "name": "Tech Corp",
    "contactEmail": "jobs@techcorp.com",
    "contactPhone": "+1234567890"
  }
 
}
```
  
# A3
