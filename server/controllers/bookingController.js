const bookingModel = require('../models/bookingModel')

const newBooking = async (req,res)=>{
    try {
        const booking = await bookingModel.create(req.body);
        //Sending mail to customer

        //Sending mail to provider

        return res.json({success:true,message:"Service is booked",bookingDetails:booking})
    } catch (error) {
        return res.json({success:false,message:"Error in booking",error:error})
    }
}
const deleteBooking = async (req,res)=>{
    const id = req.params.id;
    console.log(id)
    try {
        // const isBooking  = await bookingModel.findOne({_id:id})
        // if(!isBooking){
        //     return res.json({success:false,message:'No booking available to delete'})
        // }
        const deletedBooking = await bookingModel.deleteOne({_id:id})
        return res.json({success:true,message:"Booking is deleted",deletedBooking})
    } catch (error) {
       return res.json({success:false,message:'Error in deleting booking',error:error}) 
    }
}
const updateBooking = async (req,res)=>{
    try {
        console.log(req.params.id)
        console.log(req.body);
        const updatedBooking = await bookingModel.updateOne({ _id: req.params.id }, req.body, {
            new: true,
          });
        return res.json({success:true,message:"Booking is updated",updateBookingDetails:updatedBooking})
    } catch (error) {
       return res.json({success:false,message:'Error in updating booking',error:error}) 
    }
}
const getBooking = async (req,res)=>{
    try {
        // {user:req.user._id}
        const allBooking  = await bookingModel.find()
        if(allBooking.length == 0){
            return res.json({success:false,message:'No booking available'})
        }
        return res.json({success:true,yourBooking:allBooking})
    } catch (error) {
       return res.json({success:false,message:'Error in fetching bookings',error:error}) 
    }
}
const getBookingforAdmin = async (req,res)=>{
    try {
        const allBooking  = await bookingModel.find()
        if(allBooking.length == 0){
            return res.json({success:false,message:'No booking available'})
        }
        return res.json({success:true,bookings:allBooking})
    } catch (error) {
       return res.json({success:false,message:'Error in fetching bookings',error:error}) 
    }
}
const getBookingById = async (req,res)=>{
    const id = req.params.id;
    try {
        const isBooking  = await bookingModel.findById(id)
        if(!isBooking){
            return res.json({success:false,message:'No booking available'})
        }
        return res.json({success:true,message:"Booking is updated",booking:isBooking})
    } catch (error) {
       return res.json({success:false,message:'Error in fetching booking',error:error}) 
    }
}


module.exports = {newBooking,deleteBooking,updateBooking,getBooking,getBookingById,getBookingforAdmin}