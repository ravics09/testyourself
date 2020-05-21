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

const getTestDataByTopic = async (name) => {
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

const getDataByQuesCode = async (code) => {
	const test = await Test.findOne({ 'quesCode': code });
	if (test) return test;
	else {
		return {
			response: {
				message: 'No test data found !!'
			}
		}
	}

}

const updateQuestionByCode = async(code, questionData) => {
	const test = await Test.findOne({ 'quesCode': code });
	console.log("question info",test);
	if(!test){ console.log("question info not found for given code")}

	if(questionData.question){
		var question = questionData.question;
		test.question = question;
	}

	if(questionData.answer){
		var answer = questionData.answer;
		test.answer = answer;
	}


	const updatedQuestion = await Test.findOne({ 'quesCode': code }).update(questionData);
	return await Test.findOne({ 'quesCode': code }); // Avoid to add password send along with updated info
}

module.exports = { addQuestion, getTestDataByTopic, getDataByQuesCode, updateQuestionByCode };