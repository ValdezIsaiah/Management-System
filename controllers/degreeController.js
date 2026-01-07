const Degree = require('../models/Degree');

exports.getAllDegrees = async (req, res) => {
    try {
        const degrees = await Degree.getAll();
        res.json(degrees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDegreeById = async (req, res) => {
    try {
        const degree = await Degree.getById(req.params.id);
        if (!degree) {
            return res.status(404).json({ error: 'Degree not found' });
        }
        res.json(degree);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createDegree = async (req, res) => {
    try {
        const degreeId = await Degree.create(req.body);
        const newDegree = await Degree.getById(degreeId);
        res.status(201).json(newDegree);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateDegree = async (req, res) => {
    try {
        const affectedRows = await Degree.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Degree not found' });
        }
        const updatedDegree = await Degree.getById(req.params.id);
        res.json(updatedDegree);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteDegree = async (req, res) => {
    try {
        const affectedRows = await Degree.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Degree not found' });
        }
        res.json({ message: 'Degree deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.searchDegrees = async (req, res) => {
    try {
        const degrees = await Degree.search(req.query.q || '');
        res.json(degrees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
