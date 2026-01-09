const { pool } = require('../db');

class Report {
    // Get comprehensive report of all data
    static async getEnrollmentReport() {
        const [rows] = await pool.query(`
            SELECT 
                c.class_id as ClassID,
                c.class_desc as ClassDescription,
                s.student_id as StudentID,
                s.studentfname as StudentFName,
                s.studentlname as StudentLName,
                d.degree_id as DegreeID,
                d.degree_desc as DegreeDesc,
                sec.section_name as ClassSection,
                t.teacher_id as TeacherID,
                t.teacherfname as TeacherFName,
                t.teacherlname as TeacherLName,
                co.course_id as CourseID,
                co.course_desc as CourseDesc
            FROM student s
            LEFT JOIN degree d ON s.degree_id = d.degree_id
            LEFT JOIN section sec ON s.section_id = sec.section_id
            LEFT JOIN class c ON c.section_id = s.section_id
            LEFT JOIN course co ON c.course_id = co.course_id
            LEFT JOIN teacher t ON c.teacher_id = t.teacher_id
            ORDER BY c.class_id, s.studentlname, s.studentfname
        `);
        return rows;
    }

    // Get report by class
    static async getReportByClass(classId) {
        const [rows] = await pool.query(`
            SELECT 
                c.class_id as ClassID,
                c.class_desc as ClassDescription,
                co.course_desc as Course,
                sec.section_name as Section,
                CONCAT(t.teacherfname, ' ', t.teacherlname) as Teacher,
                s.student_id as StudentID,
                s.studentfname as StudentFName,
                s.studentlname as StudentLName,
                d.degree_desc as Degree
            FROM class c
            LEFT JOIN course co ON c.course_id = co.course_id
            LEFT JOIN section sec ON c.section_id = sec.section_id
            LEFT JOIN teacher t ON c.teacher_id = t.teacher_id
            LEFT JOIN student s ON s.section_id = c.section_id
            LEFT JOIN degree d ON s.degree_id = d.degree_id
            WHERE c.class_id = ?
            ORDER BY s.studentlname, s.studentfname
        `, [classId]);
        return rows;
    }

    // Get report by student
    static async getReportByStudent(studentId) {
        const [rows] = await pool.query(`
            SELECT 
                s.student_id as StudentID,
                CONCAT(s.studentfname, ' ', s.studentlname) as StudentName,
                d.degree_desc as Degree,
                sec.section_name as Section,
                c.class_id as ClassID,
                c.class_desc as ClassDescription,
                co.course_desc as Course,
                CONCAT(t.teacherfname, ' ', t.teacherlname) as Teacher
            FROM student s
            LEFT JOIN degree d ON s.degree_id = d.degree_id
            LEFT JOIN section sec ON s.section_id = sec.section_id
            LEFT JOIN class c ON c.section_id = s.section_id
            LEFT JOIN course co ON c.course_id = co.course_id
            LEFT JOIN teacher t ON c.teacher_id = t.teacher_id
            WHERE s.student_id = ?
            ORDER BY c.class_id
        `, [studentId]);
        return rows;
    }
}

module.exports = Report;
