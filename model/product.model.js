mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    price:{ type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: String, required: true },
    image: {type:String, data:Buffer, required: true},
    sellerId: { type: String, required: true }
   
})
var product = mongoose.model('product',productSchema)
module.exports = product