mongoose = require("mongoose")
const projectSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    cost:{ type: String, required: true },
    description: { type: String, required: true },
    material: { type: String, required: true },
    image: {type:String, data:Buffer, required: true},
    engineerId: { type: String, required: true },
    engineerName: { type: String, required: true }
   
})
var project = mongoose.model('project',projectSchema)
module.exports = project