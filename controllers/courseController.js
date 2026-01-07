const Course = require('../models/Course');

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.getAll();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.getById(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCourse = async (req, res) => {
    try {
        const courseId = await Course.create(req.body);
        const newCourse = await Course.getById(courseId);
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const affectedRows = await Course.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        const updatedCourse = await Course.getById(req.params.id);
        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const affectedRows = await Course.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.searchCourses = async (req, res) => {
    try {
        const courses = await Course.search(req.query.q || '');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
