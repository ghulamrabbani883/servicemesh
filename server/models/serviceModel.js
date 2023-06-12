const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required:true
  },
  company: {
    type: String,
  },
  service: {
    type: String,
    required: true,
  },
  description:{
    type:String,
    required:true,
  },
  images: [
    
  ],
  address: {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    // street:{
    //   type:String
    // },
    // pincode: {
    //   type: String,
    // },
  },
});

const serviceModel = mongoose.model("service", serviceSchema);

module.exports =  serviceModel;
