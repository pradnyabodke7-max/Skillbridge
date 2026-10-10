const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: '' },
    requiredSkills: { type: [String], default: [] },
    icon: { type: String, default: 'Briefcase' },
    color: { type: String, default: '#e6e0fb' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Career', careerSchema);