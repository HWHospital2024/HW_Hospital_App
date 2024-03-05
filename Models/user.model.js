const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const staffSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["clerk", "doctor", "nurse", "paramedic"],
      required: true,
    },
    accessRights: {
      type: [String],
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
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving the staff model
staffSchema.pre("save", async function (next) {
  const staff = this;
  if (staff.isModified("password")) {
    staff.password = await bcrypt.hash(staff.password, 8);
  }
  next();
});

module.exports = mongoose.model("Staff", staffSchema);
