const { pool } = require('../db');

class Teacher {
    static async getAll() {
        const [rows] = await pool.query(`
            SELECT t.*, sec.section_name
            FROM teacher t
            LEFT JOIN section sec ON t.section_id = sec.section_id
            ORDER BY t.teacherlname, t.teacherfname
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query(`
            SELECT t.*, sec.section_name
            FROM teacher t
            LEFT JOIN section sec ON t.section_id = sec.section_id
            WHERE t.teacher_id = ?
        `, [id]);
        return rows[0];
    }

    static async create(teacherData) {
        const { teacher_fname, teacher_lname, section_id } = teacherData;
        const [result] = await pool.query(
            'INSERT INTO teacher (teacherfname, teacherlname, section_id) VALUES (?, ?, ?)',
            [teacher_fname, teacher_lname, section_id || null]
        );
        return result.insertId;
    }

    static async update(id, teacherData) {
        const { teacher_fname, teacher_lname, section_id } = teacherData;
        const [result] = await pool.query(
            'UPDATE teacher SET teacherfname = ?, teacherlname = ?, section_id = ? WHERE teacher_id = ?',
            [teacher_fname, teacher_lname, section_id || null, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM teacher WHERE teacher_id = ?', [id]);
        return result.affectedRows;
    }

    static async search(searchTerm) {
        const [rows] = await pool.query(
            'SELECT * FROM teacher WHERE teacherfname LIKE ? OR teacherlname LIKE ? ORDER BY teacherlname, teacherfname',
            [`%${searchTerm}%`, `%${searchTerm}%`]
        );
        return rows;
    }
}

module.exports = Teacher;
