const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
	console.log("Connected to database", process.env.DATABASE_NAME);
});

mongoose.connection.on('error', err => {
	console.log("Database connection error " + err);
});

module.exports = {
	User: require('./../models/userModel'),
	Test: require('./../models/testModel')
}