const { pool } = require('../db');

class Course {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM course ORDER BY course_desc');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM course WHERE course_id = ?', [id]);
        return rows[0];
    }

    static async create(courseData) {
        const { course_code, course_desc } = courseData;
        const [result] = await pool.query(
            'INSERT INTO course (course_desc) VALUES (?)',
            [course_desc]
        );
        return result.insertId;
    }

    static async update(id, courseData) {
        const { course_code, course_desc } = courseData;
        const [result] = await pool.query(
            'UPDATE course SET course_desc = ? WHERE course_id = ?',
            [course_desc, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM course WHERE course_id = ?', [id]);
        return result.affectedRows;
    }

    static async search(searchTerm) {
        const [rows] = await pool.query(
            'SELECT * FROM course WHERE course_desc LIKE ? ORDER BY course_desc',
            [`%${searchTerm}%`]
        );
        return rows;
    }
}

module.exports = Course;
