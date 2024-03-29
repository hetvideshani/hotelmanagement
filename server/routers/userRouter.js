const express = require('express');
const userRouter = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const user = require('../schema/userSchema');
const room = require('../schema/roomSchema');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const admin = require('../schema/adminSchema')

userRouter.post("/userSignin", async (req, res) => {
    const { emailID, password } = req.body;

    console.log(emailID, password);

    if (!emailID || !password) {
        return res.status(400).send({ error: 'please enter required details' });
    }

    const Loginuser = await user.findOne({ emailID: emailID });

    if (!Loginuser) {
        return res.status(400).send({ message: 'Invalid details' });
    }

    const isMatch = await bcrypt.compare(password, Loginuser.password);

    if (!isMatch) {
        return res.status(400).send({ message: 'Invalid details' });
    }

    console.log(Loginuser);

    res.status(200).send({ message: "Found the required user with email" + user.email + " and password " + user.password });
});

userRouter.post("/userSignup", async (req, res) => {
    let { name, emailID, contactNo, password } = req.body;

    if (!name || !emailID || !contactNo || !password) {
        return res.status(422).json({ error: 'please fill the fields properly' })
    }
    try {
        const userExist = await user.findOne({ emailID: emailID })

        if (userExist) {
            return res.status(422).json({ error: 'User already exists' });
        }

        let hashPassword = await bcrypt.hash(password, 10);
        password = hashPassword;

        console.log(password);

        const newUser = new user({ name, emailID, contactNo, password });

        await newUser.save();
        console.log(newUser);
        return res.status(200).json({ message: 'user registered successfully' });
    } catch (err) {
        console.log(err);
    }
})

userRouter.post('/addToWishlist', async (req, res) => {
    try {
        console.log(req.body.email);
        console.log(req.body.roomid);
        const currentUser = await user.findOne({ emailID: req.body.email });

        console.log(currentUser);

        const roomToAdd = await room.findOne({ _id: req.body.roomid });

        console.log(roomToAdd);

        currentUser.saved.push({ room: roomToAdd });

        await currentUser.save();

        console.log("SAved");
        return res.status(200).json({ message: 'room saved successfully' });
    } catch (err) {
        console.log(err);
    }
})

userRouter.post('/displayWishlist', async (req, res) => {
    try {
        console.log(req.body);
        const currentUser = await user.findOne({ emailID: req.body.email });

        const wishlist = currentUser.saved;

        console.log(wishlist);

        console.log("Hello");

        return res.status(200).json(wishlist);

    } catch (error) {
        console.log(error);
    }
})

userRouter.post('/removefromwishlist', async (req, res) => {
    try {
        console.log(req.body);
        const currentUser = await user.findOne({ emailID: req.body.email });
        let i = 0;

        for (i = 0; i < currentUser.saved.length; i++) {
            console.log(currentUser.saved[i]);
            if (currentUser.saved[i].room._id == req.body.roomid) {
                break;
            }
        }

        console.log(i);

        currentUser.saved.splice(i, 1);
        await currentUser.save();
        return res.status(200).json({ message: 'room removed successfully from wishlist' });
    } catch (error) {
        console.log(error);
    }
})

userRouter.get('/getalluser', async (req, res) => {
    try {
        const allUser = await user.find();
        console.log(allUser);
        return res.status(200).json(allUser);
    } catch (error) {
        console.log(error);
    }
})

userRouter.get('/getoneuser/:id', async (req, res) => {
    try {
        const currentUser = await user.findOne({ _id: req.params.id });

        return res.status(200).json(currentUser);
    } catch (error) {
        console.log(error);
    }
})

userRouter.delete('/deleteUser/:id', async (req, res) => {
    try {
        console.log("Hello");
        const deleteUser = await user.findByIdAndDelete({ _id: req.params.id })

        const allUser = await user.find();
        return res.status(200).json(allUser);
    } catch (error) {
        console.log(error);
    }
})

userRouter.get('/checkAdmin/:id', async (req, res) => {
    try {
        const isAdmin = await admin.findOne({ emailID: req.params.id })

        if (isAdmin) {
            return res.status(201).json({ message: "It's an admin" });
        }
        return res.status(200).json({ message: "It's not an admin" });
    } catch (error) {
        console.log(error);
    }
})

userRouter.patch('/updateuser/:id', async (req, res) => {
    try {
        let update = req.body.user;
        console.log(update);
        let currentUser = await user.findOne({ _id: req.params.id });

        Object.keys(update).forEach(field => {
            currentUser[field] = update[field];
        })

        await currentUser.save();

        return res.status(200).json({ message: "User Updated" });
    } catch (error) {
        console.log(error);
    }
})

module.exports = userRouter;