const { pool } = require('../db');

class Teacher {
    static async getAll() {
        const [rows] = await pool.query(`
            SELECT t.*, sec.section_name
            FROM teacher t
            LEFT JOIN section sec ON t.section_id = sec.section_id
            WHERE t.status = 'active'
            ORDER BY t.teacherlname, t.teacherfname
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query(`
            SELECT t.*, sec.section_name
            FROM teacher t
            LEFT JOIN section sec ON t.section_id = sec.section_id
            WHERE t.teacher_id = ? AND t.status = 'active'
        `, [id]);
        return rows[0];
    }

    static async create(teacherData) {
        const { teacher_fname, teacher_lname, section_id } = teacherData;
        
        // Validate names: only letters, spaces, and hyphens allowed (no numbers)
        const namePattern = /^[A-Za-z\s\-]+$/;
        if (!namePattern.test(teacher_fname)) {
            throw new Error('First name can only contain letters, spaces, and hyphens (no numbers allowed)');
        }
        if (!namePattern.test(teacher_lname)) {
            throw new Error('Last name can only contain letters, spaces, and hyphens (no numbers allowed)');
        }
        
        // Check for duplicate: same name regardless of section (1-to-1 relationship)
        const [existing] = await pool.query(
            'SELECT teacher_id FROM teacher WHERE teacherfname = ? AND teacherlname = ? AND status = ?',
            [teacher_fname, teacher_lname, 'active']
        );
        
        if (existing.length > 0) {
            throw new Error('A teacher with this name already exists');
        }
        
        const [result] = await pool.query(
            'INSERT INTO teacher (teacherfname, teacherlname, section_id, status) VALUES (?, ?, ?, ?)',
            [teacher_fname, teacher_lname, section_id || null, 'active']
        );
        return result.insertId;
    }

    static async update(id, teacherData) {
        const { teacher_fname, teacher_lname, section_id } = teacherData;
        
        // Validate names: only letters, spaces, and hyphens allowed (no numbers)
        const namePattern = /^[A-Za-z\s\-]+$/;
        if (!namePattern.test(teacher_fname)) {
            throw new Error('First name can only contain letters, spaces, and hyphens (no numbers allowed)');
        }
        if (!namePattern.test(teacher_lname)) {
            throw new Error('Last name can only contain letters, spaces, and hyphens (no numbers allowed)');
        }
        
        // Check for duplicate: same name regardless of section (excluding current teacher)
        const [existing] = await pool.query(
            'SELECT teacher_id FROM teacher WHERE teacherfname = ? AND teacherlname = ? AND status = ? AND teacher_id != ?',
            [teacher_fname, teacher_lname, 'active', id]
        );
        
        if (existing.length > 0) {
            throw new Error('A teacher with this name already exists');
        }
        
        const [result] = await pool.query(
            'UPDATE teacher SET teacherfname = ?, teacherlname = ?, section_id = ? WHERE teacher_id = ?',
            [teacher_fname, teacher_lname, section_id || null, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        // Soft delete: set status to inactive instead of deleting
        const [result] = await pool.query(
            'UPDATE teacher SET status = ? WHERE teacher_id = ?',
            ['inactive', id]
        );
        return result.affectedRows;
    }

    static async reactivate(id) {
        // Reactivate: set status back to active
        const [result] = await pool.query(
            'UPDATE teacher SET status = ? WHERE teacher_id = ?',
            ['active', id]
        );
        return result.affectedRows;
    }

    static async search(searchTerm) {
        const [rows] = await pool.query(
            'SELECT * FROM teacher WHERE (teacherfname LIKE ? OR teacherlname LIKE ?) AND status = ? ORDER BY teacherlname, teacherfname',
            [`%${searchTerm}%`, `%${searchTerm}%`, 'active']
        );
        return rows;
    }

    // Get all teachers including inactive ones (for admin purposes)
    static async getAllIncludingInactive() {
        const [rows] = await pool.query(`
            SELECT t.*, sec.section_name
            FROM teacher t
            LEFT JOIN section sec ON t.section_id = sec.section_id
            ORDER BY t.status DESC, t.teacherlname, t.teacherfname
        `);
        return rows;
    }
}

module.exports = Teacher;
