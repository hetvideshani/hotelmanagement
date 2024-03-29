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

module.exports = roomRouter;
