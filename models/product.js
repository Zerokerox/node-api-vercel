// ใช้งาน mongoose
const mongoose = require('mongoose')

// connect to MongoDB
const dbUrl = 'mongodb+srv://vercel-admin-user:Zerozero1234@cluster0.76npzdp.mongodb.net/?retryWrites=true&w=majority' 
//ถ้าไม่มีให้สร้างขึ้นมา
// ถ้ามีแล้วให้นำมาใช้
mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true

}).catch(err=>console.log(err))


// design Schema
let productSchema =  mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    description:String 
})

// create Model
let Product =  mongoose.model("products",productSchema)

//export model

module.exports = Product;

//design function to save product info
module.exports.saveProduct = function(model, data){
    model.save(data)

}