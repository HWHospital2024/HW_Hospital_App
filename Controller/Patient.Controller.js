//Controller File containing all the API elements.getPatientBYID

const Patient = require('../Models/Patient.model');
const mongoose = require('mongoose');
const createError = require('http-errors');

module.exports = {
    getAllPatients: async(req,res,next) => {
        //res.send('Getting the list of all patients');
        try{
            const results = await Patient.find({},{ Patient_id : 1, _id : 0, Patient_name :1 });
            res.send(results);
        }catch(error){
            console.log(error.message);
        }
    },
    createNewPatient: async(req,res,next) => {
        //console.log(req.body);
        try {
            const patient = new Patient(req.body);
            const result = await patient.save();
            res.send(result);
        }catch(error){
            console.log(error.message);
        }
    
        /*const patient = new Patient({
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
        }) */   
    },
    
    getPatientBYID: async(req,res,next) => {
        const id = req.params.id;
        try{
            const patient = await Patient.findOne({Patient_id : id});
            if (!patient){
                throw createError(404, "Patient Doesnt exist");
            }
            res.send(patient);
        }catch(error){
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(404,"Invalid Patient ID"));
            }
            next(error);
        }
    },

    updatePatientbyID: async(req,res,next) => {
        try{
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true };
        const result = await Patient.findByIdAndUpdate(id,updates,options);
            console.log(result);
            res.send(result);
        }catch(error){
            console.log(error.message);
        }
    },

    deletePatientbyID: async(req,res,next) => {
        const id = req.params.id;
        try{
            const result = await Patient.findOneAndDelete({Patient_id : id});
            console.log(result);
            res.send(result);
        }catch(error){
            console.log(error.message);
        }
    }
};