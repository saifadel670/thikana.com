mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    email:{ type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    phoneNumber:String ,
    description:String,
    image: String,
    address: String
   
})
var user = mongoose.model('user',UserSchema)
module.exports = user