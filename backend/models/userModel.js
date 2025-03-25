const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : String,
    profilePic : String,
    role : String,
    orderHistory : [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        },
        productName: {
            type: String,
            required: true
        },
        productImage: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true
        },
        orderDate: {
            type: Date,
            default: Date.now
        }
    }],
},{
    timestamps : true
})


const userModel =  mongoose.model("user",userSchema)


module.exports = userModel