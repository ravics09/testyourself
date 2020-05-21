const db = require('../config/connection');
const Test = db.Test;

const addQuestion = async (testData) => {
	const test = Test(testData);

	let n = false;
	if (await Test.findOne({ quesCode: testData.quesCode }))
		n = true;

	if (n) {
		return {
			response: {
				message: 'Questions Number' + quesCode + 'is already inserted. Please try other number.'
			}
		}
	}
	await test.save();

	return {
		response: {
			message: 'You have successfully inserted questions !!',
			testInfo: test
		}
	}
}

const getTestDataByName = async (name) => {
	const test = await Test.find({ 'topicName': name });
	if (test) return test;
	else {
		return {
			response: {
				message: 'No test data found !!'
			}
		}
	}

}

module.exports = { addQuestion, getTestDataByName };