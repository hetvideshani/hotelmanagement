const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './config.env' });

const app = express();
app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

require('./db/conn.js');
app.use(require('../server/router/roomRouter.js'));
app.use(require('../server/router/userRouter.js'));

// app.get('/', (req, res) => {
//     return res.json("Hello from Get");
// })

// import getRoom from "./router/roomRouter.js";

// app.get('/', (req, res) => { getRoom(req, res) });
// app.post('/addroom', async (req, res) => { addRoom(req, res) });

app.listen(process.env.PORT, () => {
    console.log("Server is started at port - " + process.env.PORT);
})