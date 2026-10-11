const mongoose = require("mongoose");

const aptitudeQuestionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["Logical", "Quantitative", "Verbal", "Technical"],
      required: true,
    },
    question: { type: String, required: true },
    options: { type: [String], required: true }, // 4 options: A, B, C, D
    correctIndex: { type: Number, required: true, min: 0, max: 3 },
    explanation: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AptitudeQuestion", aptitudeQuestionSchema);