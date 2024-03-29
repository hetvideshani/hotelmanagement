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

bookingRouter.get('/getOneBooking/:id', async (req, res) => {
    try {
        const booking = await bookingSchema.findOne({ _id: req.params.id });

        return res.status(200).json(booking);
    } catch (error) {
        console.log(error);
    }
})

bookingRouter.delete('/deleteBooking/:id', async (req, res) => {
    try {
        console.log("Hello");
        const deleteUser = await bookingSchema.findByIdAndDelete({ _id: req.params.id })

        const allBooking = await bookingSchema.find();
        return res.status(200).json(allBooking);
    } catch (error) {
        console.log(error);
    }
})

bookingRouter.patch('/updateBooking/:id', async (req, res) => {
    try {
        let update = req.body.booking;
        console.log(update);
        let currentBooking = await bookingSchema.findOne({ _id: req.params.id });

        Object.keys(update).forEach(field => {
            currentBooking[field] = update[field];
        })

        await currentBooking.save();

        return res.status(200).json({ message: "User Updated" });
    } catch (error) {
        console.log(error);
    }
})

module.exports = bookingRouter