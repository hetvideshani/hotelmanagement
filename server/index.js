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
app.use(require('./routers/roomRouter.js'));
app.use(require('./routers/userRouter.js'));
app.use(require('./routers/bookingRouter.js'));

app.listen(process.env.PORT, () => {
    console.log("Server is started at port - " + process.env.PORT);
})