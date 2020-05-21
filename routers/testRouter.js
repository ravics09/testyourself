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
	testService.getTestDataByName(req.params.id)
		.then(test => {
			test ? res.json(test) : res.status(404).json({ message: 'Test data not found with given name' });
		})
		.catch(err => {
			console.log("Error while fetching details by id", err);
			// next(err);
		})
}

testRouter.post('/insertTestData', addQuestion);
testRouter.get('/:id', getTestDataByTopicName);

module.exports = testRouter;