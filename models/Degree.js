const { pool } = require('../db');

class Degree {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM degree ORDER BY degree_desc');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM degree WHERE degree_id = ?', [id]);
        return rows[0];
    }

    static async create(degreeData) {
        const { degree_desc } = degreeData;
        const [result] = await pool.query('INSERT INTO degree (degree_desc) VALUES (?)', [degree_desc]);
        return result.insertId;
    }

    static async update(id, degreeData) {
        const { degree_desc } = degreeData;
        const [result] = await pool.query('UPDATE degree SET degree_desc = ? WHERE degree_id = ?', [degree_desc, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM degree WHERE degree_id = ?', [id]);
        return result.affectedRows;
    }

    static async search(searchTerm) {
        const [rows] = await pool.query(
            'SELECT * FROM degree WHERE degree_desc LIKE ? ORDER BY degree_desc',
            [`%${searchTerm}%`]
        );
        return rows;
    }
}

module.exports = Degree;
