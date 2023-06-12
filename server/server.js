const express = require('express');
const app = express()
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config({path:'./config/config.env'})
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('./config/config.js')
const userRoute  = require('./routes/userRoute.js')
const bookingRoute = require('./routes/bookingRoute.js')
const serviceRoute = require('./routes/serviceRoute.js')

app.use(cookieParser())
app.use(express.json({limit: '50mb'}))
app.use(cors({credentials: true, origin: 'http://localhost:3006'}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.get('/',(req,res)=>{
    res.send("Hello from servicemesh server")
})

app.use('/user', userRoute)
app.use('/service', serviceRoute)
app.use('/booking',bookingRoute)

app.listen(process.env.PORT,()=>{
    console.log(`server is runnning at ${process.env.PORT}`)
})

