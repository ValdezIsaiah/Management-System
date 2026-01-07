const Class = require('../models/Class');

exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Class.getAll();
        res.json(classes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getClassById = async (req, res) => {
    try {
        const classData = await Class.getById(req.params.id);
        if (!classData) {
            return res.status(404).json({ error: 'Class not found' });
        }
        res.json(classData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createClass = async (req, res) => {
    try {
        const classId = await Class.create(req.body);
        const newClass = await Class.getById(classId);
        res.status(201).json(newClass);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateClass = async (req, res) => {
    try {
        const affectedRows = await Class.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Class not found' });
        }
        const updatedClass = await Class.getById(req.params.id);
        res.json(updatedClass);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteClass = async (req, res) => {
    try {
        const affectedRows = await Class.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Class not found' });
        }
        res.json({ message: 'Class deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.searchClasses = async (req, res) => {
    try {
        const classes = await Class.search(req.query.q || '');
        res.json(classes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
