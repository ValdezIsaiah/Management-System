-- Fix Duplicate Section Table Issue
-- Run this in XAMPP phpMyAdmin to remove class_section table and its foreign keys

USE student_management_db;

-- Step 1: Check if class_section table exists and view its foreign keys
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM
    INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE
    TABLE_SCHEMA = 'student_management_db'
    AND (TABLE_NAME = 'class_section' OR REFERENCED_TABLE_NAME = 'class_section');

-- Step 2: Drop foreign keys from class_section if they exist
-- Replace 'constraint_name' with actual constraint names from Step 1 results
-- Example:
-- ALTER TABLE class_section DROP FOREIGN KEY class_section_ibfk_1;
-- ALTER TABLE class_section DROP FOREIGN KEY class_section_ibfk_2;

-- Step 3: Drop any foreign keys from other tables that reference class_section
-- Example:
-- ALTER TABLE other_table DROP FOREIGN KEY fk_class_section;

-- Step 4: Drop the class_section table entirely if not needed
DROP TABLE IF EXISTS class_section;

-- Step 5: Verify only 'sections' table exists (or 'section' depending on which you're using)
SHOW TABLES LIKE '%section%';

-- Step 6: If using 'section' (singular) but schema expects 'sections' (plural),
-- you may need to rename:
-- RENAME TABLE section TO sections;

-- Step 7: Verify the correct foreign keys exist in the classes table
SHOW CREATE TABLE classes;
