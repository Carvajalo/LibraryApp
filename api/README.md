# BACKEND:
## LIBRARY APP ENDPOINTS WITH PROTECTED ROUTES.

It's a crud api for user, books and requested books using NodeJS v18.13.0
This application also use Expres, Mongo, TypeScript and Docker
### Requirements

- Node.js v18.13.0, npm and TypeScript

### Getting started

Run the following command on your local environment:

```
git clone https://github.com/Carvajalo/LibraryApp.git
cd LibraryApp
npm install
```

If you had TypeScript locally installed, you can run locally in development mode using:

```
npm run dev
```

But if you doesn't have it you have to run before starting the project the following commands on your root pwd: 

```
npm i typescript
npm run dev

```

If you got a problem running the project because tsc errors, you could also install typeScript globally running on poweshell as administrator: 

´´´
npm install -g typescript
´´´

Then starting the project with the commands below

Now, open http://localhost:3001/ with your favorite browser to see your project. On top of that, You can modify .env variables to setup the port and the MONGO_HOST as well to make your own database setup.

---

**NOTE 1**
If you want to run it in your machine you have to delete .env file or change MONGO_HOST to default mongohost. 

**Note 2:** 
The default port value for mongo local database connection is: 17.0.0.1 


---

### PWD

The tree working directory is:

```bash
├── src                                     # PWD
│
├───controllers                             # Methods and DB actions
│       book.controller.ts                  # Books CRUD Methods
│       clean.controller.ts                 # Clean loanHistory, borrowedBooks and Requested books data from User, Books and Request
│       login.controller.ts                 # Login endpoints and JWT 
│       notSupported.controller.ts          # Not supported routes in case of need
│       requestBook.controller.ts           # Requested books routes
│       user.controller.ts                  # Andmin and normal user CRUD controller 
│
├───middlewares                             # Middleware endpoints protection
│       auth.middleware.ts                  # Admin and user JWT generation
│       user.middleware.ts                  # User auth middleware validation
│
├───models                                  # Schema deffinition
│       book.ts                             # Books model
│       requestBook.ts                      # User requested books model
│       user.ts                             # User model and schema methods
│
├───routes                                  # Routes deffinition
│       book.routes.ts                      # Book Routes
│       clean.routes.ts                     # Clean books-users loan data
│       login.routes.ts                     # Login - SignUp routes
│       requestBooks.routes.ts              # Request Routes
│       user.routes.ts                      # User Routes
│
├───services
│       jwt.service.ts                      # JWT methods abstraction
│
└───utils
├───────idValidation.ts
│   app.ts                                  # App configuration: Port - middlewares - Routes
│   config.ts                               # Env configuration
│   database.ts                             # Database connection
│   index.ts                                # Server connection (initialization)
│   README.md                               # README file
└───

```

### Authors

- [@Carvajalo](https://github.com/Carvajalo)

[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/carvajalo/)
### Libs

```

dependencies:
    "bcrypt": "^5.1.0"
    "cors": "^2.8.5"
    "dotenv": "^16.0.3"
    "express": "^4.18.2"
    "jsonwebtoken": "^9.0.0"
    "mongoose": "^6.9.0"
    "morgan": "^1.10.0"
    "multer": "^1.4.5-lts.1"

devDependencies:
    "@types/bcrypt": "^5.0.0"
    "@types/cors": "^2.8.13"
    "@types/dotenv": "^8.2.0"
    "@types/express": "^4.17.16"
    "@types/jsonwebtoken": "^9.0.1"
    "@types/mongoose": "^5.11.97"
    "@types/morgan": "^1.9.4"
    "@types/multer": "^1.4.7"

```
### Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


### Documentation

Public documentation: https://documenter.getpostman.com/view/24932039/2s935sngaM
