const express = require("express");
const router = express.Router();
const { getQuestions, submitTest, getResults } = require("../controllers/aptitudeController");

router.get("/questions", getQuestions);
router.post("/submit", submitTest);
router.get("/results", getResults);

module.exports = router;