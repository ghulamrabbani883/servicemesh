const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLen:[4,'Name should be minimum of 4 characters'],
        maxLen:[30,"Name cann't exceed 30 characters"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        default:''
    },
    avatar:{
        
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password,saltRounds)
    return next();
})

userSchema.methods.comparePassword = async function(password,dbPassword){
    return await bcrypt.compare(password,dbPassword);
}
userSchema.methods.generateJWT = async function(){
    const token =  jwt.sign({id:this._id}, process.env.SECRET_KEY)
    return token;
    // ,{ expiresIn: process.env.JWT_COOKIE_EXPIRE }
}


module.exports = userModel = mongoose.model('user', userSchema)
