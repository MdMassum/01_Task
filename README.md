# Node App with Mongoose and APIs

This project is a Node app that uses Mongoose to connect to a MongoDB database and provides APIs to retrieve, store, update, and delete data. And all the CRUD operation can only be performed if user is authenticated

## Getting Started

1. Clone the repository: `git clone https://github.com/MdMassum/01_Task.git`
2. Install the dependencies: `npm install`
3. Start the server: `node run dev`

## APIs

1. GET /getUser/:id : Retrieves a single user.
2. GET /getAllUser : Retrieves a list of all users.
3. POST /createUser : Creates a new user.
4. POST /login : login a user.
5. PUT /updateUser/:id : Updates an existing user.
6. PUT /updatePassword/:id : Updates Password of an existing user.
7. DELETE /deleteUser/:id : Deletes an existing user

## Model

The User model is defined in `models/userModel.js`.

## Database

The app connects to a MongoDB database using Mongoose.

## Testing

The application uses Postman to test the API endpoints.
    postman test link : 
        `https://assignment-7873.postman.co/workspace/Team-Workspace~2385dd1d-fc62-4556-886a-4d0692660b2a/collection/35181588-070f111e-2cfe-4d28-bea0-05682f3cbf41?action=share&creator=35181588`

## Version Control

This project uses Git for version control.

## Deployement

Deployed the backend part on render
link : ``
