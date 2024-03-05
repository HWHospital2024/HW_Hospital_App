const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  personalDetails: {
    patientId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    ID_type: {
      type: String,
      validate: {
        validator: function(value) {
          // Check if ID type is either "Emirates" or "Passport"
          return value === 'Emirates' || value === 'Passport';
        },
        message: props => `${props.value} is not a valid gender, must be either "Emirates" or "Passport"`
      }
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      required: true,
      type: Date,
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
    address: {
      type: String,
      required: true,
      trim: true,
    },
    City: {
      type: String,
      required: true,
    },
    EmergencyPhonenumber: {
      type: Number,
      require: true,
    },
    email: {
      type: String,
      validate: {
        validator: function (value) {
          // Check if email is valid
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    Country: {
      type: String,
      required: true,
    },
    Nationality: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      require: true,
    },
    Insurance_provider: {
      type: String,
    },
    Insurance_provider_number: {
      type: Number,
    },
  },
  knownDiseases: [
    {
      name: {
        type: String,
        trim: true,
      },
      dateDiagnosed: {
        type: Date,
      },
    },
  ],
  complaints: [
    {
      complaint: {
        type: String,

        trim: true,
      },
      dateReported: {
        type: Date,
      },
    },
  ],
  appointments: [
    {
      date: {
        type: Date,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      doctor: {
        type: String,
        required: true,
      },
      purpose: {
        type: String,
        required: true,
      },
    dept: {
      type: String,
      enum: [
        "OPD",
        "Emergency"
      ],
      required: true,
    },
      status: {
        type: String,
        enum: ["Scheduled", "Completed", "Cancelled"],
        default: "Scheduled",
      },
    },
  ],
});

module.exports = mongoose.model("Patient", PatientSchema);
