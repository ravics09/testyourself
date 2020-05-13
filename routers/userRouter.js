const express = require('express');
const myRouter = express.Router();
const userService = require('../services/userServices');

const login = (req, res, next) => {
	console.log("login page route");
	res.json("login");
}

const register = (req, res, next) => {
	console.log("register page with details",req.body);
	userService.createUser(req.body)
	.then(user => {
		res.json(user)
	})
	.catch(err => {
		console.log('there is an error on registration',err);
	})
}

myRouter.post('/login', login);
myRouter.post('/register', register);

module.exports = myRouter;