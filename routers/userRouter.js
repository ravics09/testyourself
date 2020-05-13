const express = require('express');
const myRouter = express.Router();
const userService = require('../services/userServices');
const authService = require('../services/authService');

const login = (req, res, next) => {
	userService.loginUser(req.body)
		.then(user => {
			const to = 'authentication';
			authService.generateToken(res, next, user, to);
		})
		.catch(err => {
			console.log('Error in validate user details:', err);
			//next(err);
		})
}

const register = (req, res, next) => {
	userService.createUser(req.body)
		.then(user => {
			res.json(user)
		})
		.catch(err => {
			console.log('there is an error on registration', err);
			//next(err);
		})
}

myRouter.post('/login', login);
myRouter.post('/register', register);

module.exports = myRouter;