const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    person: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }
})

module.exports = new mongoose.model('booking', bookingSchema);