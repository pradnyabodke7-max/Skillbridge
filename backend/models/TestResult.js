const mongoose = require("mongoose");

const testResultSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    categoryScores: [
      {
        category: String,
        correct: Number,
        total: Number,
        percentage: Number,
      },
    ],
    answers: [
      {
        question: { type: mongoose.Schema.Types.ObjectId, ref: "AptitudeQuestion" },
        selectedIndex: Number,
        isCorrect: Boolean,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("TestResult", testResultSchema);