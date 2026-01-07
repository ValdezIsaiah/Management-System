const { pool } = require('../db');

class Class {
    static async getAll() {
        const [rows] = await pool.query(`
            SELECT c.*, 
                   co.course_desc,
                   CONCAT(t.teacherfname, ' ', t.teacherlname) as teacher_name,
                   sec.section_name
            FROM class c
            LEFT JOIN course co ON c.course_id = co.course_id
            LEFT JOIN teacher t ON c.teacher_id = t.teacher_id
            LEFT JOIN section sec ON c.section_id = sec.section_id
            ORDER BY c.class_id DESC
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query(`
            SELECT c.*, 
                   co.course_desc,
                   CONCAT(t.teacherfname, ' ', t.teacherlname) as teacher_name,
                   sec.section_name
            FROM class c
            LEFT JOIN course co ON c.course_id = co.course_id
            LEFT JOIN teacher t ON c.teacher_id = t.teacher_id
            LEFT JOIN section sec ON c.section_id = sec.section_id
            WHERE c.class_id = ?
        `, [id]);
        return rows[0];
    }

    static async create(classData) {
        const { class_description, course_id, section_id } = classData;
        const [result] = await pool.query(
            'INSERT INTO class (class_desc, course_id, section_id) VALUES (?, ?, ?)',
            [class_description, course_id, section_id || null]
        );
        return result.insertId;
    }

    static async update(id, classData) {
        const { class_description, course_id, section_id } = classData;
        const [result] = await pool.query(
            'UPDATE class SET class_desc = ?, course_id = ?, section_id = ? WHERE class_id = ?',
            [class_description, course_id, section_id || null, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM class WHERE class_id = ?', [id]);
        return result.affectedRows;
    }

    static async search(searchTerm) {
        const [rows] = await pool.query(`
            SELECT c.*, 
                   co.course_desc,
                   CONCAT(t.teacherfname, ' ', t.teacherlname) as teacher_name
            FROM class c
            LEFT JOIN course co ON c.course_id = co.course_id
            LEFT JOIN teacher t ON c.teacher_id = t.teacher_id
            WHERE c.class_desc LIKE ? OR co.course_desc LIKE ?
            ORDER BY c.class_id DESC
        `, [`%${searchTerm}%`, `%${searchTerm}%`]);
        return rows;
    }
}

module.exports = Class;
