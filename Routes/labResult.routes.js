const express = require('express');
const router = express.Router();
const labResultController = require('./labResult.controller');

// Route to create a new lab result
router.post('/lab-results', labResultController.createLabResult);

// Route to get all lab results
router.get('/lab-results', labResultController.getAllLabResults);

// Route to get a lab result by ID
router.get('/lab-results/:id', labResultController.getLabResultById);

module.exports = router;
