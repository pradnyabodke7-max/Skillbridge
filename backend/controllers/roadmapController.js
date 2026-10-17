const mongoose = require('mongoose');
const Roadmap = require('../models/Roadmap');

const parseSkills = (value) =>
  (value || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

// GET /api/roadmaps/career/:careerId?skills=HTML,CSS
exports.getRoadmapByCareer = async (req, res) => {
  try {
    const { careerId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(careerId)) {
      return res.status(400).json({ message: 'Invalid career id' });
    }

    const roadmap = await Roadmap.findOne({ career: careerId });
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found for this career' });
    }

    const userSkills = parseSkills(req.query.skills);

    // Skills the student already has are marked done; the rest get a week-by-week plan
    let week = 1;
    const steps = [...roadmap.steps]
      .sort((a, b) => a.order - b.order)
      .map((step) => {
        const data = step.toObject();
        const done = userSkills.includes(data.skill.toLowerCase());

        if (done) {
          return { ...data, done: true, startWeek: null, endWeek: null };
        }

        const startWeek = week;
        week += data.weeks;
        return { ...data, done: false, startWeek, endWeek: week - 1 };
      });

    const totalSteps = steps.length;
    const completedSteps = steps.filter((s) => s.done).length;
    const totalWeeks = week - 1;

    res.json({
      careerId: roadmap.career,
      careerName: roadmap.careerName,
      steps,
      totalSteps,
      completedSteps,
      progressPercent: totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100),
      totalWeeks,
      totalMonths: Math.ceil(totalWeeks / 4),
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to build roadmap', error: err.message });
  }
};