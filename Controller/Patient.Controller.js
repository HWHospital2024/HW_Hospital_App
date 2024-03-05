const Patient = require("../Models/Patient.model");

const createPatient = async (req, res) => {
  const patient = new Patient(req.body);
  try {
    await patient.save();
    res.status(201).send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.send(patients);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getPatientById = async (req, res) => {
  const _id = req.params.id;
  try {
    const patient = await Patient.findById(_id);
    if (!patient) {
      return res.status(404).send();
    }
    res.send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getPatientByDetails = async (req, res) => {
  const query = {};
  if (req.query.patientId)
    query["personalDetails.patientId"] = req.query.patientId;
  if (req.query.firstName)
    query["personalDetails.firstName"] = req.query.firstName;
  if (req.query.lastName)
    query["personalDetails.lastName"] = req.query.lastName;
  if (req.query.email) query["personalDetails.email"] = req.query.email;
  if (req.query.contactNumber)
    query["personalDetails.contactNumber"] = req.query.contactNumber;

  try {
    const patient = await Patient.findOne(query);
    if (!patient) {
      return res.status(404).send();
    }
    res.send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePatientById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = Object.keys(Patient.schema.obj);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!patient) {
      return res.status(404).send();
    }
    res.send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deletePatientById = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).send();
    }
    res.send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDoctorAppointments = async (req, res) => {
  const doctorName = req.params.doctorName;

  try {
    const patients = await Patient.find({ "appointments.doctor": doctorName });
    const appointments = patients.map((patient) =>
      patient.appointments.filter(
        (appointment) => appointment.doctor === doctorName
      )
    );
    res.send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getPatientAppointments = async (req, res) => {
  const patientID = req.params.patientID;

  try {
    const patients = await Patient.find({ "_id": patientID });
    const appointments = patients.map((patient) =>
      patient.appointments
    );
    res.send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getPatientactAppointments = async (req, res) => {
  const patientID = req.params.patientID;
  try {
    const currentDate = new Date();
    const patients = await Patient.find({ "_id": patientID });
    const appointments = patients.map((patient) =>
      patient.appointments.filter(
        (appointment) => appointment.date >= currentDate && appointment.status === "Scheduled"
        ));
    res.send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getPatientTreatments = async (req, res) => {
  const patientID = req.params.patientID;

  try {
    const patients = await Patient.find({ "_id": patientID });
    const treatment = patients.map((patient) =>
      patient.treatment
    );
    res.send(treatment);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getPatientactTreatments = async (req, res) => {
  const patientID = req.params.patientID;
  try {
    const currentDate = new Date();
    const patients = await Patient.find({ "_id": patientID });
    const treatment = patients.map((patient) =>
      patient.treatment.filter(
        (treatment) => treatment.endDate >= currentDate 
        ));
    res.send(treatment);
  } catch (error) {
    res.status(500).send(error);
  }
};



const getDoctorReferrals = async (req, res) => {
  const doctorName = req.params.doctorName;

  try {
    const patients = await Patient.find({ "referrals.referredTo": doctorName });
    const referrals = patients.map((patient) =>
      patient.referrals.filter((referral) => referral.referredBy === doctorName)
    );
    res.send(referrals);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  getPatientByDetails,
  updatePatientById,
  deletePatientById,
  getDoctorAppointments,
  getDoctorReferrals,
  getPatientAppointments,
  getPatientactAppointments,
  getPatientTreatments,
  getPatientactTreatments
};
