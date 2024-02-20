//Controller File containing all the API elements for bed

const Bed = require('../Models/Bed.model');
const mongoose = require('mongoose');
const createError = require('http-errors');

module.exports = {
    getAllBeds: async(req,res,next) => {
        //res.send('Getting the list of all Beds');
        try{
            const results = await Bed.find({});
            res.send(results);
        }catch(error){
            console.log(error.message);
        }
    },
    createNewBed: async(req,res,next) => {
        //console.log(req.body);
        try {
            const bed = new Bed(req.body);
            const result = await bed.save();
            res.send(result);
        }catch(error){
            console.log(error.message);
        }
    },
    
    getBedBYtype: async(req,res,next) => {
        const bedtype = req.params.id;

        try{
            const bed = await Bed.findOne({Bed_type : bedtype,Bed_status: "Available"});
            if (!bed){
                throw createError(404, "Bed Doesnt exist");
            }
            res.send(bed);
        }catch(error){
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(404,"Invalid Bed Type"));
            }
            next(error);
        }
    },

    updateBedStatusbyID: async(req,res,next) => {
        try{
            const id = req.params.id;
            const updates = req.body;
            const options = { new: true };
            const result = await Bed.findByIdAndUpdate(id,updates,options);
                res.send(result);
            }catch(error){
                console.log(error.message);
            }
    },

    deleteBedbyID: async(req,res,next) => {
        const id = req.params.id;
        try{
            const result = await Bed.findOneAndDelete({_id : id});
            console.log(result);
            res.send(result);
        }catch(error){
            console.log(error.message);
        }
    }
};