const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    contact: {
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        mobile: {
            type: String,
            trim: true
        },
        address: {
            houseNumber: {
                type: String,
                trim: true
            },
            city: {
                type: String,
                trim: true
            },
            street: {
                type: String,
                trim: true
            },
            state: {
                type: String,
                trim: true
            },
            pincode: {
                type: Number,
                trim: true
            },
        }
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);