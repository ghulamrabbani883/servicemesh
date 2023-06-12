const mongoose = require('mongoose');

mongoose.connect(process.env.URI,{useNewUrlParser:true}).then(()=>{
    console.log(`connected to DB`)
}).catch((err)=>console.log(`error in connecting ${err}`))