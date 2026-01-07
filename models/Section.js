const { pool } = require('../db');

class Section {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM section ORDER BY section_name');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM section WHERE section_id = ?', [id]);
        return rows[0];
    }

    static async create(sectionData) {
        const { section_name } = sectionData;
        const [result] = await pool.query('INSERT INTO section (section_name) VALUES (?)', [section_name]);
        return result.insertId;
    }

    static async update(id, sectionData) {
        const { section_name } = sectionData;
        const [result] = await pool.query('UPDATE section SET section_name = ? WHERE section_id = ?', [section_name, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM section WHERE section_id = ?', [id]);
        return result.affectedRows;
    }

    static async search(searchTerm) {
        const [rows] = await pool.query(
            'SELECT * FROM section WHERE section_name LIKE ? ORDER BY section_name',
            [`%${searchTerm}%`]
        );
        return rows;
    }
}

module.exports = Section;
