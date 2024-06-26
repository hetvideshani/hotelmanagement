const express = require('express');
const roomRouter = express.Router();
const mongoose = require('mongoose');
const room = require('../schema/roomSchema.js')

roomRouter.get('/getAllRoom', async (req, res) => {
    const allRooms = await room.find();

    return res.status(200).json(allRooms);
});

roomRouter.get('/getOneRoom/:id', async (req, res) => {
    try {
        const oneRoom = await room.findOne({ _id: req.params.id });

        return res.status(200).send(oneRoom);
    }
    catch (err) {
        console.log(err);
    }
})

roomRouter.post('/addroom', async (req, res) => {
    const { RID, HID, HName, category, picture, prize, rating, available } = req.body;

    if (!RID || !HID || !HName || !category || !picture || !prize || !rating || !available) {
        return res.status(422).json({ error: 'please fill the fields properly' })
    }

    try {
        const roomExist = await room.findOne({ RID: req.body.RID });

        if (roomExist) {
            return res.status(422).json({ error: 'Room already exists' });
        }

        const newRoom = new room({ RID, HID, HName, category, picture, prize, rating, available });

        await newRoom.save();
        console.log(newRoom);
        return res.status(201).json({ message: 'user registered successfully' });
    }
    catch (err) {
        console.log(err);
    }
})

roomRouter.delete('/deleteroom/:id', async (req, res) => {
    try {
        console.log("Hello");
        const deleteRoom = await room.findByIdAndDelete({ _id: req.params.id })

        const allRoom = await room.find();
        return res.status(200).json(allRoom);
    } catch (error) {
        console.log(error);
    }
})

roomRouter.patch('/updateroom/:id', async (req, res) => {
    try {
        let update = req.body.room;
        console.log("Hello");
        console.log(update);

        let currentRoom = await room.findOne({ _id: req.params.id });

        Object.keys(update).forEach(field => {
            currentRoom[field] = update[field];
        })

        await currentRoom.save();
        return res.status(200).json({ message: "User Updated" });
    } catch (error) {
        console.log(error);
    }
})

module.exports = roomRouter;
