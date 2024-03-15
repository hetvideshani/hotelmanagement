const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const roomSchema = new mongoose.Schema({
    RID: {
        type: Number,
        required: true,
    },
    HID: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    picture: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    emailID: {
        type: String,
        required: true,
        unique: true
    },
    contactNo: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }],
    saved: [{
        room: {
            type: roomSchema,
        }
    }]
})

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

module.exports = new mongoose.model('user', userSchema);