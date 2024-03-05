const mongoose = require("mongoose");

const wardSchema = new mongoose.Schema(
  {
    wardNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    wardName: {
      type: String,
      required: true,
    },
    totalBeds: {
      type: Number,
      required: true,
    },
    availableBeds: {
      type: Number,
      required: true,
    },
    dept: {
      type: String,
      enum: [
        "OPD",
        "IPD",
        "ICU",
        "ER",
        "OT",
        "Ward",
        "Pharmacy",
        "Lab",
        "Radiology",
        "Admin",
        "HR",
        "Finance",
        "IT",
        "Maintenance",
        "Security",
        "Canteen",
        "Housekeeping",
        "Laundry",
        "Ambulance",
        "Mortuary",
        "BloodBank",
        "Physiotherapy",
        "Dietary",
        "Library",
        "Reception",
        "Billing",
        "Insurance",
        "QualityAssurance",
        "Purchase",
        "Stores",
        "Transport",
        "Biomedical",
      ],
      required: true,
    },
    doctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
      },
    ],
    patients: [
      {
        patient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "patients  ",
        },
        doctor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Staff",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ward", wardSchema);
