const { pool } = require('../db');

class Enrollment {
    static async getAll() {
        const [rows] = await pool.query(`
            SELECT e.*,
                   CONCAT(s.student_fname, ' ', s.student_lname) as student_name,
                   c.class_description,
                   co.course_code, co.course_desc,
                   sec.section_name
            FROM enrollments e
            LEFT JOIN students s ON e.student_id = s.student_id
            LEFT JOIN classes c ON e.class_id = c.class_id
            LEFT JOIN courses co ON c.course_id = co.course_id
            LEFT JOIN sections sec ON c.section_id = sec.section_id
            ORDER BY e.enrollment_id DESC
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query(`
            SELECT e.*,
                   CONCAT(s.student_fname, ' ', s.student_lname) as student_name,
                   c.class_description,
                   co.course_code, co.course_desc,
                   sec.section_name
            FROM enrollments e
            LEFT JOIN students s ON e.student_id = s.student_id
            LEFT JOIN classes c ON e.class_id = c.class_id
            LEFT JOIN courses co ON c.course_id = co.course_id
            LEFT JOIN sections sec ON c.section_id = sec.section_id
            WHERE e.enrollment_id = ?
        `, [id]);
        return rows[0];
    }

    static async getByStudentId(studentId) {
        const [rows] = await pool.query(`
            SELECT e.*,
                   c.class_description,
                   co.course_code, co.course_desc,
                   sec.section_name,
                   CONCAT(t.teacher_fname, ' ', t.teacher_lname) as teacher_name
            FROM enrollments e
            LEFT JOIN classes c ON e.class_id = c.class_id
            LEFT JOIN courses co ON c.course_id = co.course_id
            LEFT JOIN sections sec ON c.section_id = sec.section_id
            LEFT JOIN teachers t ON c.teacher_id = t.teacher_id
            WHERE e.student_id = ?
            ORDER BY e.enrollment_date DESC
        `, [studentId]);
        return rows;
    }

    static async create(enrollmentData) {
        const { student_id, class_id, enrollment_date, grade, status } = enrollmentData;
        const [result] = await pool.query(
            'INSERT INTO enrollments (student_id, class_id, enrollment_date, grade, status) VALUES (?, ?, ?, ?, ?)',
            [student_id, class_id, enrollment_date, grade, status || 'active']
        );
        return result.insertId;
    }

    static async update(id, enrollmentData) {
        const { student_id, class_id, enrollment_date, grade, status } = enrollmentData;
        const [result] = await pool.query(
            'UPDATE enrollments SET student_id = ?, class_id = ?, enrollment_date = ?, grade = ?, status = ? WHERE enrollment_id = ?',
            [student_id, class_id, enrollment_date, grade, status, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM enrollments WHERE enrollment_id = ?', [id]);
        return result.affectedRows;
    }

    static async search(searchTerm) {
        const [rows] = await pool.query(`
            SELECT e.*,
                   CONCAT(s.student_fname, ' ', s.student_lname) as student_name,
                   c.class_description,
                   co.course_code, co.course_desc
            FROM enrollments e
            LEFT JOIN students s ON e.student_id = s.student_id
            LEFT JOIN classes c ON e.class_id = c.class_id
            LEFT JOIN courses co ON c.course_id = co.course_id
            WHERE s.student_fname LIKE ? OR s.student_lname LIKE ? OR co.course_code LIKE ?
            ORDER BY e.enrollment_id DESC
        `, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]);
        return rows;
    }
}

module.exports = Enrollment;
