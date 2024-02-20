//Every Model is defined here

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    Patient_id: {
        type: Number,
        require: true,
        unique: true
    },
    ID_type: {
        type: String,
        validate: {
          validator: function(value) {
            // Check if gender is either "male" or "female"
            return value === 'Emirates' || value === 'Passport';
          },
          message: props => `${props.value} is not a valid gender, must be either "Emirates" or "Passport"`
        }
      },
    Patient_name: {
        type: String,
        require: true
    },
    DOB: {
        type: Date,
        validate: {
          validator: function(value) {
            // Check if date_of_birth is less than the current date
            return value < new Date();
          },
          message: props => `${props.value} should be less than the current date`
        }
      },
    Gender: {
        type: String,
        validate: {
            validator: function(value) {
            // Check if gender is either "male" or "female"
            return value === 'male' || value === 'female';
            },
            message: props => `${props.value} is not a valid gender, must be either "male" or "female"`
        }
    },
    Address: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Phone_number: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        validate: {
            validator: function(value) {
              // Regular expression for email validation
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: props => `${props.value} is not a valid email address`
          }
    },
    Country: {
        type: String,
        required: true
    },
    Nationality: {
        type: String,
        required: true
    },
    emr_contact_name: {
        type: String,
        require: true
    },
    emr_contact_number: {
        type: Number,
        require: true
    },
    Insurance_provider: {
        type: String
    },
    Insurance_provider_number: {
        type: Number
    }
    },
 {   collection: 'Patient' // Specify the collection name here 
    });


const Patient = mongoose.model('Patient',PatientSchema);
module.exports = Patient;


//export default ArticleModel;
