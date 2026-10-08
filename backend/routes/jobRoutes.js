const express = require('express');
const router = express.Router();
const {
  getJobs,
  getMatchedJobs,
  getJobById,
} = require('../controllers/jobController');

router.get('/', getJobs);
router.get('/match', getMatchedJobs);
router.get('/:id', getJobById);

module.exports = router;