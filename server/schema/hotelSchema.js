const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    HID: {
        type: Number,
        required: true,
        unique: true
    },
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
    location: {
        type: String,
        required: true,
    },
    availableRooms: {
        type: Number,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    }
})

module.exports = new mongoose.model('hotel', hotelSchema);