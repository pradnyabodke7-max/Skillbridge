const mongoose = require('mongoose');
const Job = require('../models/Job');

// GET /api/jobs  (optional filters: ?category=Frontend Developer&level=Beginner)
exports.getJobs = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.careerCategory = req.query.category;
    if (req.query.level) filter.experienceLevel = req.query.level;

    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: err.message });
  }
};

// GET /api/jobs/:id
exports.getJobById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid job id' });
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch job', error: err.message });
  }
};