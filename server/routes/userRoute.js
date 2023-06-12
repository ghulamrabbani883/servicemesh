const express = require('express');
const { getAllUsers, register, login, getUserById, deleteUserById, updateUserById, logout } = require('../controllers/userController');
const { isAuthorized, isAuthentic } = require('../authenticate/auth');
const userRoute = express.Router()

userRoute.get('/users', isAuthentic, isAuthorized('admin'),  getAllUsers);
userRoute.post('/register',register)
userRoute.post('/login',login)
userRoute.get('/logout', logout)
userRoute.get('/me', isAuthentic, getUserById)
userRoute.delete('/delete',isAuthentic, deleteUserById)
userRoute.put('/update/:id',isAuthentic, updateUserById)


module.exports = userRoute