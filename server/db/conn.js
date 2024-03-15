const mongoose = require('mongoose');
const dotenv = require('dotenv');

const DB = process.env.DATABASE;

mongoose.connect(DB
    , {
        useNewUrlParser: true
    }).then(() => {
        console.log("Connected successfully");
    }).catch(err => {
        console.log(err);
    })
