const express = require('express');
const bookingRouter = express.Router();
const mongoose = require('mongoose');
const booking = require('../schema/bookingSchema');
const bookingSchema = require('../schema/bookingSchema');

bookingRouter.post('/bookroom', async (req, res) => {
    console.log(req.body);
    const { name, email, contactNo, age, payment, totalRooms, checkin, checkout, members, RID } = req.body;

    try {
        const newBooking = new booking({ name, email, contactNo, age, payment, totalRooms, checkin, checkout, members, RID });

        await newBooking.save();
        console.log(newBooking);

        return res.status(200).json({ message: 'room booked successfully' });
    } catch (err) {
        console.log(err);
    }
})

bookingRouter.get('/booking/:email', async (req, res) => {
    try {
        console.log(req.params.email);
        const booking = await bookingSchema.find();

        let send = [];

        for (let i of booking) {
            if (i.email == req.params.email) {
                send.push(i);
            }
        }

        console.log(send);
        console.log(booking);
        return res.json(send);
    } catch (error) {
        console.log(error);
    }
})

bookingRouter.get('/getAllBooking', async (req, res) => {
    const bookings = await bookingSchema.find();

    return res.status(200).json(bookings);
})

module.exports = bookingRouter