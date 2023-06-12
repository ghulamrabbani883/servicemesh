const express = require('express');
const { newBooking, updateBooking, getBooking, deleteBooking, getBookingById,getBookingforAdmin } = require('../controllers/bookingController');
const { isAuthentic, isAuthorized } = require('../authenticate/auth');
const bookingRoute = express.Router()

bookingRoute.post('/newbooking', isAuthentic, newBooking)
bookingRoute.delete('/deletebooking/:id', isAuthentic, deleteBooking)
bookingRoute.put('/updatebooking/:id', isAuthentic, updateBooking)
bookingRoute.get('/mybookings/', isAuthentic, getBooking)
bookingRoute.get('/bookings', isAuthentic, isAuthorized, getBookingforAdmin)
bookingRoute.get('/booking/:id', isAuthentic, getBookingById)

module.exports = bookingRoute