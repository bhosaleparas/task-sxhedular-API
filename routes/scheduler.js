const express = require('express');
const router = express.Router();
const {
  scheduleProcesses,
  validateProcessInput
} = require('../controllers/scheduler');

// POST endpoint for scheduling processes
router.post('/schedule', validateProcessInput, scheduleProcesses);

module.exports = router;