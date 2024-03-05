// Import necessary modules
const express = require("express");
const wardController = require("../Controller/ward.controller");
const router = express.Router();
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

// Define routes for ward operations
router.post("/wards", wardController.create); // Create a new ward
router.get("/wards", wardController.getAll); // Get all wards
router.get("/wards/:id", wardController.getById); // Get a specific ward by id
router.put("/wards/:id", wardController.update); // Update a specific ward by id
router.delete("/wards/:id", wardController.delete); // Delete a specific ward by id
router.post(
  "/wards/:wardId/doctors/:doctorId",
  auth,
  permit("doctor"),
  wardController.assignDoctor
); // Assign a doctor to a ward
router.post(
  "/wards/:wardId/doctors/:doctorId/patients/:patientId",
  auth,
  permit("doctor"),
  wardController.addPatient
); // Add a patient to a ward
router.delete(
  "/wards/:wardId/patients/:patientId",
  auth,
  permit("doctor"),
  wardController.dischargePatient
); // Discharge a patient from a ward

// Export the router
module.exports = router;
