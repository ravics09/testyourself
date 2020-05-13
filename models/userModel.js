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
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        trim: true
    },
});
userSchema.set('toJSON', {virtuals:true});

module.exports = mongoose.model('User', userSchema);