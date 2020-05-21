const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    topicName: { 
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    quesCode: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    question: {
        type: String,
        required: true,
        trim: true
    },
    answer: {
        type: String,
        trim: true
    },
    options: {
        optionA: {
            type: String,
            trim: true
        },
        optionB: {
            type: String,
            trim: true
        },
        optionC: {
            type: String,
            trim: true
        },
        optionD: {
            type: String,
            trim: true
        }
    }
});

testSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Test', testSchema);