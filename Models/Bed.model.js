//Every Model is defined here

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BedSchema = new Schema({
    Bed_type: {
        type: String,
        validate: {
            validator: function(value) {
            return value === 'ICU' || value === 'Special';
            },
            message: props => `${props.value} is not a valid gender, must be either "ICU" or "Special"`
        }
    },
    Bed_Floor: {
        type: Number,
        required: true
    },
    Bed_number: {
        type: String,
        require: true
    },
    Bed_rate: {
        type: Number
    },
    Bed_status: {
        type: String,
        validate: {
            validator: function(value) {
            return value === 'Available' || value === 'Booked';
            },
            message: props => `${props.value} is not a valid gender, must be either "Available" or "Booked"`
        }
    }
    },
    {   collection: 'Bed' // Specify the collection name here 
        });

    const Bed = mongoose.model('Bed',BedSchema);
    module.exports = Bed;

//export default ArticleModel;
