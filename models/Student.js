const { pool } = require('../db');

class Student {
    // Get all students
    static async getAll() {
        const [rows] = await pool.query(`
            SELECT s.*, d.degree_desc, sec.section_name
            FROM student s
            LEFT JOIN degree d ON s.degree_id = d.degree_id
            LEFT JOIN section sec ON s.section_id = sec.section_id
            ORDER BY s.studentlname, s.studentfname
        `);
        return rows;
    }

    // Get student by ID
    static async getById(id) {
        const [rows] = await pool.query(`
            SELECT s.*, d.degree_desc, sec.section_name
            FROM student s
            LEFT JOIN degree d ON s.degree_id = d.degree_id
            LEFT JOIN section sec ON s.section_id = sec.section_id
            WHERE s.student_id = ?
        `, [id]);
        return rows[0];
    }

    // Create new student
    static async create(studentData) {
        const { student_fname, student_lname, degree_id, section_id } = studentData;
        
        // Validate names: only letters, spaces, and hyphens allowed (no numbers)
        const namePattern = /^[A-Za-z\s\-]+$/;
        if (!namePattern.test(student_fname)) {
            throw new Error('First name can only contain letters, spaces, and hyphens (no numbers allowed)');
        }
        if (!namePattern.test(student_lname)) {
            throw new Error('Last name can only contain letters, spaces, and hyphens (no numbers allowed)');
        }
        
        // Check for duplicate: same name regardless of degree or section (1-to-1 relationship)
        const [existing] = await pool.query(
            'SELECT student_id FROM student WHERE studentfname = ? AND studentlname = ?',
            [student_fname, student_lname]
        );
        
        if (existing.length > 0) {
            throw new Error('A student with this name already exists');
        }
        
        const [result] = await pool.query(
            'INSERT INTO student (studentfname, studentlname, degree_id, section_id) VALUES (?, ?, ?, ?)',
            [student_fname, student_lname, degree_id, section_id || null]
        );
        return result.insertId;
    }

    // Update student
    static async update(id, studentData) {
        const { student_fname, student_lname, degree_id, section_id } = studentData;
        
        // Validate names: only letters, spaces, and hyphens allowed (no numbers)
        const namePattern = /^[A-Za-z\s\-]+$/;
        if (!namePattern.test(student_fname)) {
            throw new Error('First name can only contain letters, spaces, and hyphens (no numbers allowed)');
        }
        if (!namePattern.test(student_lname)) {
            throw new Error('Last name can only contain letters, spaces, and hyphens (no numbers allowed)');
        }
        
        // Check for duplicate: same name regardless of degree or section (excluding current student)
        const [existing] = await pool.query(
            'SELECT student_id FROM student WHERE studentfname = ? AND studentlname = ? AND student_id != ?',
            [student_fname, student_lname, id]
        );
        
        if (existing.length > 0) {
            throw new Error('A student with this name already exists');
        }
        
        const [result] = await pool.query(
            'UPDATE student SET studentfname = ?, studentlname = ?, degree_id = ?, section_id = ? WHERE student_id = ?',
            [student_fname, student_lname, degree_id, section_id || null, id]
        );
        return result.affectedRows;
    }

    // Delete student
    static async delete(id) {
        const [result] = await pool.query('DELETE FROM student WHERE student_id = ?', [id]);
        return result.affectedRows;
    }

    // Search students
    static async search(searchTerm) {
        const [rows] = await pool.query(`
            SELECT s.*, d.degree_desc, sec.section_name
            FROM student s
            LEFT JOIN degree d ON s.degree_id = d.degree_id
            LEFT JOIN section sec ON s.section_id = sec.section_id
            WHERE s.studentfname LIKE ? OR s.studentlname LIKE ?
            ORDER BY s.studentlname, s.studentfname
        `, [`%${searchTerm}%`, `%${searchTerm}%`]);
        return rows;
    }
}

module.exports = Student;
