const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    Patient_id: {
        type: Number,
        require: true
    },
    Patient_name: {
        type: String,
        require: true
    },
    DOB: {
        type: Date,
        required: true
    },
    Address1: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required: true
    },
    Nationality: {
        type: String,
        required: true
    },
    Insurance: {
        type: String,
        required: true
    }},
 {   collection: 'Patient' // Specify the collection name here 
    });


const Patient = mongoose.model('Patient',PatientSchema);
module.exports = Patient;
//export default ArticleModel;
