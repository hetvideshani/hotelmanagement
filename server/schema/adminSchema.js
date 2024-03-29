const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    emailID: {
        type: String,
        required: true,
        unique: true
    },
    contactNo: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model('admin', adminSchema);