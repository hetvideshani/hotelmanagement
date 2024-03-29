const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contactNo: {
        type: Number,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    payment: {
        type: String,
        required: true,
    },
    totalRooms: {
        type: Number,
        required: true,
    },
    checkin: {
        type: String,
        required: true
    },
    checkout: {
        type: String,
        required: true
    },
    members: {
        type: Number,
        required: true
    },
    RID: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model('booking', bookingSchema);