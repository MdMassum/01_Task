## Overview :
    This repository contains a Node.js application. The application is a RESTful API that interacts with a MongoDB database using Mongoose.It uses Mongoose to connect to a MongoDB database and provides APIs to retrieve, store, update, and delete data.


## Directory Structure : Backend/

    server.js: The main application file that sets up the server.

    app.js: This file contains all the available routes.

    config/: A directory containing configuration files.
        db.js: A file that exports a function to connect to the MongoDB database using Mongoose.
        config.env: An environment file that contains environment variables.

    models/: A directory containing Mongoose models.
        userModel.js: A file that defines a User model.

    routes/: A directory containing route files.
        userRoute.js: A file that defines routes for the User model.

    package.json: A file that contains metadata about the project and its dependencies.


## Environment Variables : 
    The application uses the following environment variables:

        PORT: The port number on which the server listens. Defaults to 3000.
        MONGODB_URL: The URI of the MongoDB database.
        JWT_SECRET : secret key of jwt token


## Database : 
    The application uses a MongoDB database to store data. The database is connected using Mongoose.


## Model :
    User Model:
        The User model is defined in models/userModel.js. It has the following properties:

        name: A string representing the user's name.
        email: A string representing the user's email address.
        password: A string representing the user's Password.


## Routes :
    User Routes
        The User routes are defined in routes/user.js. The following routes are available:
        
        GET     /getUser/:id         : Retrieves a single user.
        GET     /getAllUser          : Retrieves a list of all users.
        POST    /createUser          : Creates a new user.
        POST    /login               : login a user.
        GET     /logout              : logout a user.
        PUT     /updateUser/:id      : Updates an existing user.
        PUT     /updatePassword/:id  : Updates Password of an existing user.
        DELETE  /deleteUser/:id      : Deletes an existing user


## Error Handling :
    The application uses the following error handling mechanisms:

        Uncaught exceptions are caught using process.on('uncaughtException').
        Unhandled promise rejections are caught using process.on('unhandledRejection').


## Error Handler Middleware :
    This middleware function is responsible for handling errors that occur during the execution of the application. It catches errors, sets a default status code and message, and returns a JSON response to the client.

    Parameters:
        err: The error object that was thrown.
        req: The request object.
        res: The response object.
        next: The next middleware function in the stack.

    Error Handling:
        The middleware function handles two specific types of errors:

            CastError:
                If the error is a CastError, it means that a wrong MongoDB ID was passed.
                The error message is set to Resource not found, Invalid: ${err.path}.
                The error status code is set to 400.

            Duplicate Key Error :
                If the error code is 11000, it means that a duplicate key error occurred in MongoDB (e.g. trying to register with an    email that              already exists).
                The error message is set to Duplicate ${Object.keys(err.keyValue)} Entered.
                The error status code is set to 400.

        Response :
            The middleware function returns a JSON response to the client with the following properties:
                success: A boolean indicating whether the request was successful (always false in this case).
                message: The error message.


## Testing:
    The application uses Postman to test the API endpoints.
    postman test link : 
`https://assignment-7873.postman.co/workspace/Team-Workspace~2385dd1d-fc62-4556-886a-4d0692660b2a/collection/35181588-070f111e-2cfe-4d28-bea0-05682f3cbf41?action=share&creator=35181588`


## Version Control:
    The application uses Git for version control. The repository is hosted on GitHub.


## Deployement

Deployed the backend part on render
link : ``