const Section = require('../models/Section');

exports.getAllSections = async (req, res) => {
    try {
        const sections = await Section.getAll();
        res.json(sections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSectionById = async (req, res) => {
    try {
        const section = await Section.getById(req.params.id);
        if (!section) {
            return res.status(404).json({ error: 'Section not found' });
        }
        res.json(section);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createSection = async (req, res) => {
    try {
        const sectionId = await Section.create(req.body);
        const newSection = await Section.getById(sectionId);
        res.status(201).json(newSection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSection = async (req, res) => {
    try {
        const affectedRows = await Section.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Section not found' });
        }
        const updatedSection = await Section.getById(req.params.id);
        res.json(updatedSection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteSection = async (req, res) => {
    try {
        const affectedRows = await Section.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Section not found' });
        }
        res.json({ message: 'Section deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.searchSections = async (req, res) => {
    try {
        const sections = await Section.search(req.query.q || '');
        res.json(sections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
