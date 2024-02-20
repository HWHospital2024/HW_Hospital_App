//Bed Route configuration is all called here

const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const mongoose = require('mongoose');
const Bed = require('../Models/Bed.model')
const BedController = require ('../Controller/Bed.Controller')

router.get('/',BedController.getAllBeds);

router.post('/',BedController.createNewBed);

router.get('/:id',BedController.getBedBYtype);
router.patch('/:id',BedController.updateBedStatusbyID);
router.delete('/:id',BedController.deleteBedbyID);

module.exports = router;
