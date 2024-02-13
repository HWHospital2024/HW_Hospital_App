//Patient Route configuration is all called here

const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const mongoose = require('mongoose');
const Patient = require('../Models/Patient.model')
const PatientController = require ('../Controller/Patient.Controller')

router.get('/',PatientController.getAllPatients);

router.post('/',PatientController.createNewPatient);

router.get('/:id',PatientController.getPatientBYID);

router.patch('/:id',PatientController.updatePatientbyID);

router.delete('/:id',PatientController.deletePatientbyID);

module.exports = router;
