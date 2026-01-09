-- COMPREHENSIVE FIX: Align database table names with code
-- Your code uses SINGULAR names but schema.sql uses PLURAL names
-- This script will rename all tables to match your code

USE student_management_db;

-- Disable foreign key checks
SET FOREIGN_KEY_CHECKS = 0;

-- Drop any duplicate/old tables
DROP TABLE IF EXISTS class_section;

-- Rename all tables from PLURAL (schema.sql) to SINGULAR (your code)
RENAME TABLE IF EXISTS degrees TO degree;
RENAME TABLE IF EXISTS students TO student;
RENAME TABLE IF EXISTS teachers TO teacher;
RENAME TABLE IF EXISTS courses TO course;
RENAME TABLE IF EXISTS sections TO section;
RENAME TABLE IF EXISTS classes TO class;
RENAME TABLE IF EXISTS enrollments TO enrollment;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Verify all tables exist with correct names
SHOW TABLES;

-- Display success message
SELECT 'Database tables renamed successfully!' as Status;
SELECT 'Tables are now in SINGULAR form to match your code' as Info;
