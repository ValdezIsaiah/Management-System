const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Get full enrollment report
router.get('/enrollment', reportController.getEnrollmentReport);

// Get report by class
router.get('/class/:classId', reportController.getReportByClass);

// Get report by student
router.get('/student/:studentId', reportController.getReportByStudent);

module.exports = router;
