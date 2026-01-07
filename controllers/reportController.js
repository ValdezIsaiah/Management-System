const Report = require('../models/Report');

exports.getEnrollmentReport = async (req, res) => {
    try {
        const report = await Report.getEnrollmentReport();
        res.json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getReportByClass = async (req, res) => {
    try {
        const report = await Report.getReportByClass(req.params.classId);
        res.json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getReportByStudent = async (req, res) => {
    try {
        const report = await Report.getReportByStudent(req.params.studentId);
        res.json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
