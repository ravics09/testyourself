const express = require('express');
const testRouter = express.Router();
const testService = require('../services/testServices');

const addQuestion = (req, res, next) => {
    testService.addQuestion(req.body)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log("Error while add question operation",err);
            // next(err);
        })
}

const getTestDataByTopicName = (req, res, next) => {
	testService.getTestDataByTopic(req.params.name)
		.then(test => {
			test ? res.json(test) : res.status(404).json({ message: 'Test data not found with given name' });
		})
		.catch(err => {
			console.log("Error while fetching details by id", err);
			// next(err);
		})
}

const getQuestionByCode = (req, res, next) => {
	testService.getDataByQuesCode(req.params.quesCode)
		.then(test => {
			test ? res.json(test) : res.status(404).json({ message: 'Question not found with given code' });
		})
		.catch(err => {
			console.log("Error while fetching details by id", err);
			// next(err);
		})
}

const updateQuestion = (req, res, next) => {
	testService.updateQuestionByCode(req.params.quesCode, req.body)
	.then(data => {
		// console.log("Question details updated successfully");
		res.json({ message: 'Details are successfully updated', updatedQuestion: data });
	})
	.catch(err => {
		console.log("Question updatation failed due to err:",err);
		// next(err);
	})
}

testRouter.post('/insertTestData', addQuestion);
testRouter.get('/:name', getTestDataByTopicName);
testRouter.get('/:name/:quesCode', getQuestionByCode);
testRouter.put('/:quesCode', updateQuestion);

module.exports = testRouter;