const Enrollment = require('../models/Enrollment');

exports.getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.getAll();
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEnrollmentById = async (req, res) => {
    try {
        const enrollment = await Enrollment.getById(req.params.id);
        if (!enrollment) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }
        res.json(enrollment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEnrollmentsByStudent = async (req, res) => {
    try {
        const enrollments = await Enrollment.getByStudentId(req.params.studentId);
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createEnrollment = async (req, res) => {
    try {
        const enrollmentId = await Enrollment.create(req.body);
        const newEnrollment = await Enrollment.getById(enrollmentId);
        res.status(201).json(newEnrollment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateEnrollment = async (req, res) => {
    try {
        const affectedRows = await Enrollment.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }
        const updatedEnrollment = await Enrollment.getById(req.params.id);
        res.json(updatedEnrollment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteEnrollment = async (req, res) => {
    try {
        const affectedRows = await Enrollment.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }
        res.json({ message: 'Enrollment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.searchEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.search(req.query.q || '');
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
