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

testRouter.post('/insertTestData', addQuestion);
testRouter.get('/:name', getTestDataByTopicName);
testRouter.get('/:name/:quesCode', getQuestionByCode);

module.exports = testRouter;