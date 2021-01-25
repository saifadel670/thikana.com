mongoose = require("mongoose")
const dataSchema = new mongoose.Schema({
    sender:{ type: String, required: true },
    receiver:{ type: String, required: true },
    senderName:{ type: String, required: true },
    type: { type: String, required: true },
    result: { type: String, required: true },
    content: {type:String, data:Buffer, required: true}
   
})
var data = mongoose.model('data',dataSchema)
module.exports = data