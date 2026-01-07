const { pool } = require('../db');

class Report {
    // Get comprehensive enrollment report (matches the sample report format)
    static async getEnrollmentReport() {
        const [rows] = await pool.query(`
            SELECT 
                c.class_id as ClassID,
                c.class_description as ClassDescription,
                s.student_id as StudentID,
                s.student_fname as StudentFName,
                s.student_lname as StudentLName,
                d.degree_id as DegreeID,
                d.degree_desc as DegreeDesc,
                sec.section_name as ClassSection,
                t.teacher_id as TeacherID,
                t.teacher_fname as TeacherFName,
                t.teacher_lname as TeacherLName,
                co.course_id as CourseID,
                co.course_desc as CourseDesc,
                e.grade as Grade,
                e.status as Status,
                e.enrollment_date as EnrollmentDate
            FROM enrollments e
            JOIN students s ON e.student_id = s.student_id
            JOIN classes c ON e.class_id = c.class_id
            JOIN degrees d ON s.degree_id = d.degree_id
            JOIN sections sec ON c.section_id = sec.section_id
            JOIN teachers t ON c.teacher_id = t.teacher_id
            JOIN courses co ON c.course_id = co.course_id
            ORDER BY c.class_id, s.student_lname, s.student_fname
        `);
        return rows;
    }

    // Get report by class
    static async getReportByClass(classId) {
        const [rows] = await pool.query(`
            SELECT 
                c.class_id as ClassID,
                c.class_description as ClassDescription,
                s.student_id as StudentID,
                s.student_fname as StudentFName,
                s.student_lname as StudentLName,
                d.degree_desc as DegreeDesc,
                sec.section_name as ClassSection,
                CONCAT(t.teacher_fname, ' ', t.teacher_lname) as TeacherName,
                co.course_desc as CourseDesc,
                e.grade as Grade,
                e.status as Status
            FROM enrollments e
            JOIN students s ON e.student_id = s.student_id
            JOIN classes c ON e.class_id = c.class_id
            JOIN degrees d ON s.degree_id = d.degree_id
            JOIN sections sec ON c.section_id = sec.section_id
            JOIN teachers t ON c.teacher_id = t.teacher_id
            JOIN courses co ON c.course_id = co.course_id
            WHERE c.class_id = ?
            ORDER BY s.student_lname, s.student_fname
        `, [classId]);
        return rows;
    }

    // Get report by student
    static async getReportByStudent(studentId) {
        const [rows] = await pool.query(`
            SELECT 
                c.class_id as ClassID,
                c.class_description as ClassDescription,
                s.student_id as StudentID,
                CONCAT(s.student_fname, ' ', s.student_lname) as StudentName,
                d.degree_desc as DegreeDesc,
                sec.section_name as ClassSection,
                CONCAT(t.teacher_fname, ' ', t.teacher_lname) as TeacherName,
                co.course_code as CourseCode,
                co.course_desc as CourseDesc,
                e.grade as Grade,
                e.status as Status
            FROM enrollments e
            JOIN students s ON e.student_id = s.student_id
            JOIN classes c ON e.class_id = c.class_id
            JOIN degrees d ON s.degree_id = d.degree_id
            JOIN sections sec ON c.section_id = sec.section_id
            JOIN teachers t ON c.teacher_id = t.teacher_id
            JOIN courses co ON c.course_id = co.course_id
            WHERE s.student_id = ?
            ORDER BY c.class_id
        `, [studentId]);
        return rows;
    }
}

module.exports = Report;
