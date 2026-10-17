const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema(
  {
    order: { type: Number, required: true },
    skill: { type: String, required: true },
    description: { type: String, default: '' },
    weeks: { type: Number, default: 2 },
    resourceTitle: { type: String, default: '' },
    resourceUrl: { type: String, default: '' },
  },
  { _id: false }
);

const roadmapSchema = new mongoose.Schema(
  {
    career: { type: mongoose.Schema.Types.ObjectId, ref: 'Career', required: true, unique: true },
    careerName: { type: String, required: true },
    steps: { type: [stepSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Roadmap', roadmapSchema);