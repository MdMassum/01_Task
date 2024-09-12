const express = require('express');
const { createUser,
    getSingleUser,
    getAllUser,
    updateUser,
    updatePassword,
    deleteUser, loginUser, logout } = require('../controllers/userController');

const { isAuthenticatedUser} = require('../middleware/auth');

const router = express.Router();

// for creating user -->
router.post('/createUser',createUser)

// for user login -->
router.post('/login',loginUser)

// for user logout -->
router.get('/logout',isAuthenticatedUser,logout)

// for user details -->
router.get('/getUser/:id',isAuthenticatedUser,getSingleUser)

// for getting all users -->
router.get('/getAllUser',isAuthenticatedUser,getAllUser)

// for updating user detail -->
router.put('/updateUser/:id',isAuthenticatedUser,updateUser)

// for updating user password -->
router.put('/updatePassword/:id',isAuthenticatedUser,updatePassword)

// for updating user profile -->
router.delete('/deleteUser/:id',isAuthenticatedUser,deleteUser)

module.exports = router;