const express = require('express');
const userRouter = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const user = require('../schema/userSchema');
const room = require('../schema/roomSchema');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const authenticate = require('../middleware/checkuser.js');

userRouter.get("/getAllUser", async (req, res) => {
    const allUser = await user.find();

    return res.status(200).send(allUser);
})

userRouter.post("/userSignup", async (req, res) => {
    let { name, emailID, contactNo, location, password } = req.body;

    if (!name || !emailID || !contactNo || !location || !password) {
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

        const newUser = new user({ name, emailID, contactNo, location, password });
        const token = await newUser.generateAuthToken();

        res.cookie('jwt', token, {
            maxAge: 5 * 60 * 1000,
            http: true
        })

        await newUser.save();
        console.log(newUser);
        return res.status(200).json({ message: 'user registered successfully' });
    } catch (err) {
        console.log(err);
    }
})

userRouter.get("/checkUser/:id", async (req, res) => {
    try {
        const findUser = await user.findOne({ emailID: req.params.id });

        if (findUser) {
            console.log(findUser);
            return res.status(200).send(findUser)
        } else {
            return res.status(200).send({})
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
})

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

    const token = await Loginuser.generateAuthToken();
    console.log(token);

    res.cookie("jwtToken", token, {
        maxAge: 15 * 60 * 1000,
        httpOnly: true
    })

    res.status(200).send({ message: "Found the required user with email" + user.email + " and password " + user.password });
})

userRouter.post('/gOuthSignup', async (req, res) => {
    try {
        const { name, emailID, picture } = req.body;
        const checkUser = await user.findOne({ emailID: emailID });

        if (!checkUser) {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const generatedContactNo = Number.parseInt(Math.random() * 10000000000);
            console.log("Generated password " + generatedPassword);
            console.log("Generated Contact No. " + generatedContactNo);

            const hashedPassword = await bcrypt.hash(generatedPassword, 10);

            const newUser = new user({
                name: name,
                emailID: emailID,
                password: hashedPassword,
                contactNo: generatedContactNo,
                location: "Kuchh BHI"
            })

            const token = await newUser.generateAuthToken();

            res.cookie('jwt', token, {
                maxAge: 5 * 60 * 1000,
                http: true
            })

            await newUser.save();
            console.log(newUser);
        } else {
            const token = await checkUser.generateAuthToken();

            res.cookie("jwtToken", token, {
                maxAge: 5 * 60 * 1000,
                httpOnly: true
            })
        }

        return res.status(200).json({ message: 'user registered successfully' });
    } catch (error) {
        res.status(400).send({ message: "Couldn't connect with google." })
    }
})

userRouter.post('/addToWishlist/:roomid', authenticate, async (req, res) => {
    try {
        let currentUser = await user.findOne({ _id: req.user._id });
        const addRoom = await room.findOne({ _id: req.params.roomid });
        currentUser.saved = currentUser.saved.concat({ room: addRoom })

        await currentUser.save();

        return res.status(200).json({ currentUser });
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Item can't be add to wishlist." })
    }
})

userRouter.patch('/deleteRoom/:roomid', authenticate, async (req, res) => {
    try {
        let currentUser = await user.findOne({ _id: req.user._id });

        console.log(currentUser.saved);

        let roomToRemove
        for (let i in currentUser.saved) {
            console.log(currentUser.saved[i]._id);
            if (currentUser.saved[i]._id.equals(req.params.roomid)) {
                roomToRemove = i;
                break
            }
        }

        currentUser.saved.splice(roomToRemove, 1);

        console.log(currentUser.saved);

        await currentUser.save();

        return res.status(200).json({ currentUser });
    } catch (err) {
        console.log(err);
    }
})

userRouter.get('/getLoggedUser', authenticate, async (req, res) => {
    try {
        let currentUser = req.user;

        return res.status(200).json({ currentUser });
    } catch (error) {
        res.status(400).send({ message: "Wishlist can't be add to showed." })
    }
})

userRouter.get('/logoutUser', authenticate, async (req, res) => {
    try {
        let currentUser = await user.findOne({ _id: req.user._id });

        currentUser.tokens = [];

        await currentUser.save();
        res.clearCookie('jwt')
        res.clearCookie('jwtToken')
        return res.status(200).json({ currentUser });
    } catch (err) {
        res.status(400).send({ message: "User couldn't log out." })
    }
})

module.exports = userRouter;