const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const patientController = require("../Controller/Patient.Controller");

router.post(
  "/patients",
  auth,
  permit("clerk"),
  patientController.createPatient
); //register patient with basic details

router.get(
  "/patients",
  auth,
  permit("clerk", "doctor", "nurse", "paramedic"),
  patientController.getAllPatients
);
router.get(
  "/patients/id/:id",
  auth,
  permit("clerk", "doctor", "nurse", "paramedic"),
  patientController.getPatientById
);

router.get(
  "/patients/details",
  auth,
  permit("clerk", "doctor", "nurse", "paramedic"),
  patientController.getPatientByDetails
);

router.patch(
  "/patients/:id",
  auth,
  permit("clerk", "doctor", "nurse", "paramedic"),
  patientController.updatePatientById
);

router.get(
  "/doctors/:doctorName/appointments",
  patientController.getDoctorAppointments
);

router.get(
  "/patients/appointments/:patientID",
  patientController.getPatientAppointments
);

router.get(
  "/patients/curappointments/:patientID",
  patientController.getPatientactAppointments
);

router.get(
  "/patients/treatments/:patientID",
  patientController.getPatientTreatments
);

router.get(
  "/patients/curtreatments/:patientID",
  patientController.getPatientactTreatments
);

router.get(
  "/doctors/:doctorName/referrals",
  patientController.getDoctorReferrals
);
// router.delete("/patients/:id", patientController.deletePatientById);

module.exports = router;
