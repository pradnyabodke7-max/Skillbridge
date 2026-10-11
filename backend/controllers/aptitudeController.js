const AptitudeQuestion = require("../models/AptitudeQuestion");
const TestResult = require("../models/TestResult");

const CATEGORIES = ["Logical", "Quantitative", "Verbal", "Technical"];

// GET /api/aptitude/questions?category=Logical&limit=5
// No category = 5 random questions from each category (20 total)
exports.getQuestions = async (req, res) => {
  try {
    const { category, limit } = req.query;
    const pick = (cat, n) =>
      AptitudeQuestion.aggregate([
        { $match: { category: cat } },
        { $sample: { size: n } },
        { $project: { correctIndex: 0, explanation: 0 } }, // hide answers from the browser
      ]);

    let questions = [];
    if (category) {
      questions = await pick(category, parseInt(limit) || 20);
    } else {
      for (const cat of CATEGORIES) {
        questions = questions.concat(await pick(cat, 5));
      }
    }
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/aptitude/submit
// body: { answers: [{ questionId, selectedIndex }] }
exports.submitTest = async (req, res) => {
  try {
    const { answers } = req.body;
    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: "answers array is required" });
    }

    const ids = answers.map((a) => a.questionId);
    const questions = await AptitudeQuestion.find({ _id: { $in: ids } });
    const byId = {};
    questions.forEach((q) => (byId[q._id] = q));

    const stats = {};
    const checked = [];
    let score = 0;

    answers.forEach((a) => {
      const q = byId[a.questionId];
      if (!q) return;
      const isCorrect = q.correctIndex === a.selectedIndex;
      if (isCorrect) score++;
      stats[q.category] = stats[q.category] || { correct: 0, total: 0 };
      stats[q.category].total++;
      if (isCorrect) stats[q.category].correct++;
      checked.push({ question: q._id, selectedIndex: a.selectedIndex, isCorrect });
    });

    const categoryScores = Object.entries(stats).map(([category, s]) => ({
      category,
      correct: s.correct,
      total: s.total,
      percentage: Math.round((s.correct / s.total) * 100),
    }));

    const result = await TestResult.create({
      user: req.user?.id || null, // filled in once the shared JWT middleware exists
      score,
      total: checked.length,
      categoryScores,
      answers: checked,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/aptitude/results
exports.getResults = async (req, res) => {
  try {
    const filter = req.user?.id ? { user: req.user.id } : {};
    const results = await TestResult.find(filter).sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};