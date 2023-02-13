# FULLSTACK LIBRARY:
## LIBRARY APP ENDPOINTS WITH PROTECTED ROUTES.

It's a crud api for user, books and requested books using NodeJS v18.13.0
This application also use Expres, Mongo, TypeScript and Docker

## LIBRARY APP LAYOUT

It's a crud frontend app for user, books and requested books using React, Vite@4.0.0 and TypeScript

### Requirements

- Node.js v18.13.0, npm and TypeScript, Vite@4.0.0

### Getting started

Run the following command on your local environment to start the backend server:

```
git clone https://github.com/Carvajalo/LibraryApp.git
cd api
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

Don't forget starting the backend server, ant then run the following command on your local environment to start the frotned application:

```
cd frontend
npm install
```

Now, open http://localhost:5173/ with your favorite browser to see your project.


---

**NOTE 1**
If you want to run it in your machine you have to delete .env file on api/.evn or change MONGO_HOST to default mongohost. 

**Note 2:** 
The default port value for mongo local database connection is: 17.0.0.1 


---

### PWD

The tree working directory is:

```bash
├── api                                  # Backend server
└── frontend                             # frontend application

```

### Authors

- [@Carvajalo](https://github.com/Carvajalo)

[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/carvajalo/)
### Libs

```
Backend: 
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

Frontend:
    "dependencies": 
        "@types/jsonwebtoken": "^9.0.1"
        "axios": "^1.3.2"
        "jsonwebtoken": "^9.0.0"
        "react": "^18.2.0"
        "react-dom": "^18.2.0"
        "react-router-dom": "^6.8.1"

    "devDependencies":
        "@types/axios": "^0.14.0"
        "@types/mongoose": "^5.11.97"
        "@types/react": "^18.0.26"
        "@types/react-dom": "^18.0.9"
        "@types/react-router-dom": "^5.3.3"
        "@vitejs/plugin-react": "^3.0.0"
        "typescript": "^4.9.3"
        "vite": "^4.0.0"

```
### Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


### Documentation

Public documentation: https://documenter.getpostman.com/view/24932039/2s935sngaM
