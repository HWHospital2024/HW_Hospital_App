const { LabResult } = require('./labResult.model');

// Controller function to create a new lab result
exports.createLabResult = async (req, res) => {
  try {
    const { patientId, result } = req.body;
    const labResult = await LabResult.create({ patientId, result });
    res.status(201).json({ message: 'Lab result created successfully', labResult });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get all lab results
exports.getAllLabResults = async (req, res) => {
  try {
    const labResults = await LabResult.find();
    res.json(labResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Controller function to get a lab result by ID
exports.getLabResultById = async (req, res) => {
  try {
    const labResult = await LabResult.findById(req.params.id);
    if (!labResult) {
      return res.status(404).json({ message: 'Lab result not found' });
    }
    res.json(labResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
