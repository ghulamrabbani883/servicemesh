const express = require('express');
const { getServices, getServiceById, postService, updateService, deleteServiceById } = require('../controllers/serviceController');
const serviceRoute = express.Router()

serviceRoute.get('/services', getServices)
serviceRoute.get('/service/:id',getServiceById)
serviceRoute.post('/addservice',postService)
serviceRoute.put('/update/:id',updateService)
serviceRoute.delete('/delete/:id',deleteServiceById)



module.exports = serviceRoute