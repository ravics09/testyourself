const db = require('../config/connection');
const bcrypt = require('bcryptjs');

const User = db.User;

const createUser = async (userData) => {
	const user = new User(userData);

	let u = false;
	let e = false;

	if (await User.findOne({ userName: userData.userName }))
		u = true;

	if (await User.findOne({ email: userData.email }))
		e = true;

	if (u && e) {
		// throw 'UserName with' + userData.userName + and + 'Email with' + userData.email + 'is already registered. Please login with your credentials.'
		return {
			response: 'UserName with' + userData.userName + 'and' + 'Email with' + userData.email + 'is already registered. Please login with your credentials.'
		}
	} else if (u) {
		// throw 'UserName with' + userData.userName + 'is already registered. Please try other username.'
		return {
			response: 'UserName with' + userData.userName + 'is already registered. Please try other username.'
		}
	} else if (e) {
		// throw 'Email with' + userData.email + 'is already registered. Please try other email address.'
		return {
			response: 'Email with' + userData.email + 'is already registered. Please try other email address.'
		}
	}


	if (userData.password) {
		user.password = bcrypt.hashSync(userData.password, 10);
	}

	await user.save();

	return {
		response: {
			message: 'You have registered successfully. Please login here !!',
			userInfo: user
		}
	}
}

const loginUser = async (userData) => {
	const user = await User.findOne({ userName: userData.userName });

	if (user && bcrypt.compareSync(userData.password, user.password)) {
		return user;
	} else {
		return {
			response: 'Username or Password is incorrect. Please try again with correct details.'
		}
	}
}

const getUserById = async (id) => {
	const user = await User.findById(id).select('-password'); // Avoid to fetch password 
	return user;
}

const deleteUserById = async (id) => {
	return await User.findByIdAndDelete(id);
}

const updateUserById = async(id, userData) => {
	const user = await User.findById(id);

	if(!user){ console.log("User not found for given id")}

	if(userData.firstName){
		var firstName = userData.firstName;
		user.firstName = firstName;
	}

	if(userData.lastName){
		var lastName = userData.lastName;
		user.lastName = lastName;
	}

	if(userData.email){
		const tempEmail = User.findOne({email: userData.email});
		if((user.email !== userData.email) && tempEmail){
			console.log("This Email address is already registered with us. Please try different one.")
		} else {
			user.email = userData.email;
		}
	}

	const updatedUser = await User.findById(id).update(userData);
	return await User.findById(id).select('-password'); // Avoid to add password send along with updated info
}

module.exports = { createUser, loginUser, getUserById, deleteUserById, updateUserById };