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

const getById = (req, res, next) => {
	userService.getUserById(req.params.id)
		.then(user => {
			user ? res.json(user) : res.status(404).json({ message: 'User not found with given ID' });
		})
		.catch(err => {
			console.log("Error while fetching details by id", err);
			// next(err);
		})
}

const deleteUser = (req, res, next) => {
	userService.deleteUserById(req.params.id)
		.then(user => {
			user ? res.json({ message: 'User is successfully removed', user: user }) :
				res.status(404).json({ message: 'User not found by given ID, so cannot be deleted' })
		})
		.catch(err => { 
			console.log("Error while deleting user details",err); 
			// next(err) 
		})
}

const updateUser = (req, res, next) => {
	userService.updateUserById(req.params.id, req.body)
	.then(user => {
		console.log("User details updated successfully");
		res.json({ message: 'Details are successfully updated', updatedDetails: user });
	})
	.catch(err => {
		console.log("User updatation failed due to err:",err);
		res.json({ message: 'This Email address is already registered with us. Please try different one.', Error: err });
		// next(err);
	})
}
myRouter.post('/login', login);
myRouter.post('/register', register);
myRouter.get('/:id', authService.verifyToken, getById);
myRouter.delete('/:id', authService.verifyToken, deleteUser);
myRouter.put('/:id', authService.verifyToken, updateUser);

module.exports = myRouter;