-- Student Management System Database Schema (3NF)
-- Drop database if exists and create fresh
DROP DATABASE IF EXISTS student_management_db;
CREATE DATABASE student_management_db;
USE student_management_db;

-- 1. Degree Table (Independent Entity)
CREATE TABLE degrees (
    degree_id INT AUTO_INCREMENT PRIMARY KEY,
    degree_desc VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Student Table (Depends on Degree)
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_fname VARCHAR(50) NOT NULL,
    student_lname VARCHAR(50) NOT NULL,
    degree_id INT NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (degree_id) REFERENCES degrees(degree_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 3. Teacher Table (Independent Entity)
CREATE TABLE teachers (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_fname VARCHAR(50) NOT NULL,
    teacher_lname VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Course Table (Independent Entity)
CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(20) NOT NULL UNIQUE,
    course_desc VARCHAR(100) NOT NULL,
    credits INT DEFAULT 3,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 5. Section Table (Independent Entity)
CREATE TABLE sections (
    section_id INT AUTO_INCREMENT PRIMARY KEY,
    section_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 6. Class Table (Depends on Course, Section, Teacher)
CREATE TABLE classes (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    class_description VARCHAR(200) NOT NULL,
    course_id INT NOT NULL,
    section_id INT NOT NULL,
    teacher_id INT NOT NULL,
    semester VARCHAR(20),
    year INT,
    room_number VARCHAR(20),
    schedule VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (section_id) REFERENCES sections(section_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 7. Enrollment Table (Many-to-Many relationship between Students and Classes)
CREATE TABLE enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    enrollment_date DATE DEFAULT (CURRENT_DATE),
    grade VARCHAR(5),
    status ENUM('active', 'completed', 'dropped', 'withdrawn') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(class_id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE KEY unique_enrollment (student_id, class_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_student_degree ON students(degree_id);
CREATE INDEX idx_student_name ON students(student_lname, student_fname);
CREATE INDEX idx_class_course ON classes(course_id);
CREATE INDEX idx_class_section ON classes(section_id);
CREATE INDEX idx_class_teacher ON classes(teacher_id);
CREATE INDEX idx_enrollment_student ON enrollments(student_id);
CREATE INDEX idx_enrollment_class ON enrollments(class_id);
CREATE INDEX idx_teacher_name ON teachers(teacher_lname, teacher_fname);
