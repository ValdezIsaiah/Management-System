const Student = require('../models/Student');

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.getAll();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.getById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new student
exports.createStudent = async (req, res) => {
    try {
        const studentId = await Student.create(req.body);
        const newStudent = await Student.getById(studentId);
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update student
exports.updateStudent = async (req, res) => {
    try {
        const affectedRows = await Student.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        const updatedStudent = await Student.getById(req.params.id);
        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete student
exports.deleteStudent = async (req, res) => {
    try {
        const affectedRows = await Student.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search students
exports.searchStudents = async (req, res) => {
    try {
        const students = await Student.search(req.query.q || '');
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
