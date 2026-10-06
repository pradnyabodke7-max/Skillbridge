const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, default: 'Remote' },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Internship', 'Contract'],
      default: 'Full-time',
    },
    experienceLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    careerCategory: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    requiredSkills: { type: [String], default: [] },
    applyLink: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);