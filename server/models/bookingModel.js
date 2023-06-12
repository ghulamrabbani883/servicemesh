const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "service",
  },
  providerName:{
    type:String,
  },
  service: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: String,
  },
  bookingTime: {
    type: String,
  },

  // address: {
  //   city: {
  //     type: String,
  //     required: true,
  //   },
  //   state: {
  //     type: String,
  //     required: true,
  //   },
  //   country: {
  //     type: String,
  //     required: true,
  //   },
  // },
  bookedAt: {
    type: Date,
    default: Date.now(),
  },
});

const bookingModel = mongoose.model("booking", bookingSchema);

module.exports = bookingModel;
