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
  referrals: [
    {
      service: {
        type: String,
        enum: [
          "OT",
          "Radiology",
          "Pathology",
          "Blood Bank",
          "Physiotherapy",
          "Operation Theatre",
          "ICU",
          "CCU",
          "Wards",
        ],
      },
      dateReferred: {
        type: Date,
        default: Date.now,
      },
      referredBy: {
        type: String,
      },
      referredTo: {
        // new field
        type: String,
      },
    },
  ],
  diagnosis: [
    {
      condition: {
        type: String,

        trim: true,
      },
      dateDiagnosed: {
        type: Date,
      },
      diagnosedBy: {
        type: String,
      },
    },
  ],
  treatment: [
    {
      treatment: {
        type: String,

        trim: true,
      },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
      prescribedBy: {
        type: String,
      },
    },
  ],
  prescription: [
    {
      medication: {
        type: String,

        trim: true,
      },
      dosage: {
        type: String,

        trim: true,
      },
      frequency: {
        type: String,

        trim: true,
      },
      prescribedBy: {
        type: String,
      },
      presDate: {
        type: Date,
      },
    },
  ],
  dailyProgress: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      notes: {
        type: String,

        trim: true,
      },
      recordedBy: {
        type: String,
      },
    },
  ],
  admissionDetails: {
    admissionDate: {
      type: Date,
      default: Date.now,
    },
    ward: {
      type: String,
      enum: ["General", "OPD", "A&E"],
    },

    admittedBy: {
      type: String,
    },
  },
  dischargeSummary: {
    dischargeDate: {
      type: Date,
    },
    summary: {
      type: String,

      trim: true,
    },
    dischargedBy: {
      type: String,
    },
  },
  homeTreatmentPlan: {
    startDate: {
      type: Date,
    },
    treatmentPlan: {
      type: String,

      trim: true,
    },
    prescribedBy: {
      type: String,
    },
  },
  vitalSigns: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      temperature: {
        type: Number,
      },
      bloodPressure: {
        systolic: {
          type: Number,
        },
        diastolic: {
          type: Number,
        },
      },
      pulseRate: {
        type: Number,
      },
      recordedBy: {
        type: String,
      },
    },
  ],
  medicineAndTreatment: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      medicine: {
        type: String,

        trim: true,
      },
      dosage: {
        type: String,

        trim: true,
      },
      intakeOutputInfo: {
        type: String,

        trim: true,
      },
      prescribedBy: {
        type: String,
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
