import { React } from 'react'

const Extra = () => {
    return (
        <>
            <div className="h-auto w-screen bg-gray-400">
                <div className='h-16'>
                    <div className='w-32  h-full text-5xl flex flex-row justify-center float-start'>
                        HMS
                    </div>
                    <div className='w-48 h-full flex flex-row justify-end float-end'>
                        <div className='flex flex-row-reverse justify-center w-32 text-3xl'>
                            Login
                        </div>
                    </div>
                </div>
                <div>
                    <div className='w-1/5 h-1/2 bg-black rounded-2xl'>
                        <div className='w-full h-2/3 p-2'>
                            <img className='w-full h-full rounded-2xl' src='https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww' />
                        </div>
                        <div className='text-gray-200'>
                            <div className='ml-2'>
                                Room Type
                            </div>
                            <div className='ml-2'>
                                Hotel ID
                            </div>
                            <div className='flex justify-center'>
                                <button className='bg-cyan-600 w-1/3'>Book Now</button>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/5 h-1/2 bg-black rounded-2xl'>
                        <div className='w-full h-2/3 p-2'>
                            <img className='w-full h-full rounded-2xl' src='https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww' />
                        </div>
                        <div className='text-gray-200'>
                            <div className='ml-2'>
                                Room Type
                            </div>
                            <div className='ml-2'>
                                Hotel ID
                            </div>
                            <div className='flex justify-center'>
                                <button className='bg-cyan-600 w-1/3'>Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Extra


// const express = require('express');
// const roomRouter = express.Router();
// const mongoose = require('mongoose');
// const room = require('../schema/roomSchema.js')

// roomRouter.get('/getAllRoom', async (req, res) => {
//     const allRooms = await room.find();

//     return res.status(200).json(allRooms);
// });

// roomRouter.get('/getOneRoom/:id', async (req, res) => {
//     try {
//         const oneRoom = await room.findOne({ _id: req.params.id });

//         return res.status(200).send(oneRoom);
//     }
//     catch (err) {
//         console.log(err);
//     }
// })

// roomRouter.post('/addroom', async (req, res) => {
//     const { RID, HID, category, picture, rating, available } = req.body;

//     if (!RID || !HID || !category || !picture || !rating || !available) {
//         return res.status(422).json({ error: 'please fill the fields properly' })
//     }

//     try {
//         const roomExist = await room.findOne({ RID: req.body.RID });

//         if (roomExist) {
//             return res.status(422).json({ error: 'Room already exists' });
//         }

//         const newRoom = new room({ RID, HID, category, picture, rating, available });

//         await newRoom.save();
//         console.log(newRoom);
//         return res.status(201).json({ message: 'user registered successfully' });
//     }
//     catch (err) {
//         console.log(err);
//     }
// })

// module.exports = roomRouter;
