const mongoose = require("mongoose");
const Ward = require("../Models/ward.model");
// const Doctor = require("./doctor.model");

const wardController = {
  create: async (req, res) => {
    const ward = new Ward(req.body);
    try {
      await ward.save();
      res.status(201).send(ward);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  getAll: async (req, res) => {
    try {
      const wards = await Ward.find({});
      res.send(wards);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  getById: async (req, res) => {
    try {
      const ward = await Ward.findById(req.params.id);
      if (!ward) {
        return res.status(404).send();
      }
      res.send(ward);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  update: async (req, res) => {
    try {
      const ward = await Ward.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!ward) {
        return res.status(404).send();
      }
      res.send(ward);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  delete: async (req, res) => {
    try {
      const ward = await Ward.findByIdAndDelete(req.params.id);
      if (!ward) {
        return res.status(404).send();
      }
      res.send(ward);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  assignDoctor: async (req, res) => {
    try {
      const ward = await Ward.findById(req.params.wardId);
      const doctor = await Doctor.findById(req.params.doctorId);
      if (!ward || !doctor) {
        return res.status(404).send();
      }
      ward.doctors.push(doctor);
      await ward.save();
      res.send(ward);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // ... other methods ...

  addPatient: async (req, res) => {
    try {
      const ward = await Ward.findById(req.params.wardId);
      const patient = await Patient.findById(req.params.patientId);
      if (!ward || !patient) {
        return res.status(404).send();
      }
      if (ward.occupiedBeds >= ward.beds) {
        return res.status(400).send({ error: "No available beds in the ward" });
      }
      ward.patients.push({ patient: patient._id });
      ward.occupiedBeds += 1;
      await ward.save();
      res.send(ward);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  dischargePatient: async (req, res) => {
    try {
      const ward = await Ward.findById(req.params.wardId);
      if (!ward) {
        return res.status(404).send();
      }
      const patient = ward.patients.id(req.params.patientId);
      if (!patient) {
        return res.status(404).send();
      }
      patient.remove();
      ward.occupiedBeds -= 1;
      await ward.save();
      res.send(ward);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // ... other methods ...
};

module.exports = wardController;
