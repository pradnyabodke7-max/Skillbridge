const mongoose = require('mongoose');
const Job = require('../models/Job');

// Turns "React, HTML" into ['React', 'HTML']
const parseSkills = (value) =>
  (value || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

// Adds matchPercent, matchedSkills and missingSkills to a job
const withMatch = (job, userSkills) => {
  const userSkillsLower = userSkills.map((s) => s.toLowerCase());
  const required = job.requiredSkills;

  const matchedSkills = required.filter((s) =>
    userSkillsLower.includes(s.toLowerCase())
  );
  const missingSkills = required.filter(
    (s) => !userSkillsLower.includes(s.toLowerCase())
  );
  const matchPercent =
    required.length === 0
      ? 0
      : Math.round((matchedSkills.length / required.length) * 100);

  return { ...job.toObject(), matchPercent, matchedSkills, missingSkills };
};

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

// GET /api/jobs/match?skills=React,HTML,CSS  (optional: &category=Frontend Developer)
exports.getMatchedJobs = async (req, res) => {
  try {
    const userSkills = parseSkills(req.query.skills);

    if (userSkills.length === 0) {
      return res
        .status(400)
        .json({ message: 'Please provide skills, e.g. ?skills=React,HTML' });
    }

    const filter = {};
    if (req.query.category) filter.careerCategory = req.query.category;

    const jobs = await Job.find(filter);
    const results = jobs.map((job) => withMatch(job, userSkills));

    results.sort((a, b) => b.matchPercent - a.matchPercent);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to match jobs', error: err.message });
  }
};

// GET /api/jobs/:id  (optional: ?skills=React,HTML to include match details)
exports.getJobById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid job id' });
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const userSkills = parseSkills(req.query.skills);
    if (userSkills.length > 0) {
      return res.json(withMatch(job, userSkills));
    }

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch job', error: err.message });
  }
};