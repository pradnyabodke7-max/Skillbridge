const mongoose = require('mongoose');
const Career = require('../models/Career');

// GET /api/careers
exports.getCareers = async (req, res) => {
  try {
    const careers = await Career.find().sort({ name: 1 });
    res.json(careers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch careers', error: err.message });
  }
};

// GET /api/careers/:id
exports.getCareerById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid career id' });
    }

    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }
    res.json(career);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch career', error: err.message });
  }
};