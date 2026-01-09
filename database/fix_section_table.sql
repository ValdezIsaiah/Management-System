-- Complete Fix for Section Table Duplication Issue
-- Run this in XAMPP phpMyAdmin to clean up and standardize

USE student_management_db;

-- Step 1: Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;

-- Step 2: Drop the class_section table if it exists (old/duplicate table)
DROP TABLE IF EXISTS class_section;

-- Step 3: Check which section table exists
-- If you have 'sections' (plural) - which is what schema.sql creates
-- If you have 'section' (singular) - which is what setup_section.sql creates

-- Step 4: Rename 'sections' to 'section' to match your code
-- (Only run this if you currently have 'sections' table)
-- If you already have 'section' table, skip this
RENAME TABLE IF EXISTS sections TO section;

-- Step 5: Make sure section table has correct structure
-- This will work whether it was 'section' or 'sections'
ALTER TABLE section 
    MODIFY COLUMN section_id INT AUTO_INCREMENT PRIMARY KEY,
    MODIFY COLUMN section_name VARCHAR(50) NOT NULL UNIQUE;

-- Step 6: Check if classes table has section_id column
-- If not, we need to add it
SHOW COLUMNS FROM classes LIKE 'section_id';

-- Step 7: Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Step 8: Verify the section table exists
SELECT 'Section table structure:' as Info;
DESCRIBE section;

SELECT 'All sections:' as Info;
SELECT * FROM section;

-- Step 9: Verify classes table references section correctly
SELECT 'Classes table structure (check section_id):' as Info;
DESCRIBE classes;

-- Step 10: Show any existing foreign key constraints
SELECT 
    CONSTRAINT_NAME,
    TABLE_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM
    INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE
    TABLE_SCHEMA = 'student_management_db'
    AND REFERENCED_TABLE_NAME IS NOT NULL
ORDER BY TABLE_NAME;
