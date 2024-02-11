const express = require('express');
const router = express.Router();

const Patient = require('../Models/Patient.model')

router.get('/',(req,res,next) => {
    res.send('Getting the list of all patients');
})

router.post('/',(req,res,next) => {
    console.log(req.body);
    const patient = new Patient({
        Patient_id: req.body.Patient_id,
        Patient_name: req.body.Patient_name,
        DOB: req.body.DOB,
        Address1: req.body.Address1,
        City: req.body.City,
        Country: req.body.Country,
        Nationality: req.body.Nationality,
        Insurance: req.body.Insurance 
    });
    patient.save()
    .then(result => {
        console.log(result);
        res.send(result);
    })
    .catch(err => {
        console.log(err.message);
    })    
});

router.get('/:id',(req,res,next) => {
    res.send('Getting a single patient');
})

router.patch('/:id',(req,res,next) => {
    res.send('Updating a single Patient');
});

router.delete('/:id',(req,res,next) => {
    res.send('Deleting a single patient');
});


module.exports = router;
