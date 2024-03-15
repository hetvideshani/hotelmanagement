const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    RID: {
        type: Number,
        required: true,
    },
    HID: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    picture: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
    }
})

module.exports = new mongoose.model('room', roomSchema);