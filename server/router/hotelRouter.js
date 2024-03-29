const express = require('express');
const hotelRouter = express.Router();
const mongoose = require('mongoose');
const hotel = require('../schema/hotelSchema')



module.exports = hotelRouter;