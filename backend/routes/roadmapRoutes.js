const express = require('express');
const router = express.Router();
const { getRoadmapByCareer } = require('../controllers/roadmapController');

router.get('/career/:careerId', getRoadmapByCareer);

module.exports = router;