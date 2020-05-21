const db = require('../config/connection');
const Test = db.Test;

const addQuestion = async (testData) => {
    const test = Test(testData);
    await test.save();

    return {
		response: {
			message: 'You have successfully inserted questions !!',
			testInfo: test
		}
	}
}

const getTestDataByName = async (name) => {
	const test = await Test.find({'topic.name':name});
	if(test) return test;
	else{
		return {
			response: {
				message: 'No test data found !!'
			}
		}
	}
	
}

module.exports = { addQuestion, getTestDataByName };