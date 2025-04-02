import mongoose, { Document, Schema } from "mongoose";

const AdminSchema = mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true
    },
    password:{
        type:String,
        required:true
    }
})

const AdminModel = mongoose.model("Admin", AdminSchema)

module.exports = AdminModel