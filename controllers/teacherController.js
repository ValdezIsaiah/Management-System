const Teacher = require('../models/Teacher');

exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.getAll();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.getById(req.params.id);
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTeacher = async (req, res) => {
    try {
        const teacherId = await Teacher.create(req.body);
        const newTeacher = await Teacher.getById(teacherId);
        res.status(201).json(newTeacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTeacher = async (req, res) => {
    try {
        const affectedRows = await Teacher.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        const updatedTeacher = await Teacher.getById(req.params.id);
        res.json(updatedTeacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const affectedRows = await Teacher.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.searchTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.search(req.query.q || '');
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
