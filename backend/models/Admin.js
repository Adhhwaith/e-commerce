const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = AdminModel;