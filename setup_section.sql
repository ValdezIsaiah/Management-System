-- Create section table
CREATE TABLE IF NOT EXISTS section (
    section_id INT AUTO_INCREMENT PRIMARY KEY,
    section_name VARCHAR(50) NOT NULL UNIQUE
);

-- Add sample sections
INSERT IGNORE INTO section (section_name) VALUES 
('1A'), ('1B'), ('1C'), ('2A'), ('2B'), ('2C'), ('3A'), ('3B'), ('3C'), ('4A'), ('4B'), ('4C');

-- Rename class_section_id to section_id in student table
ALTER TABLE student CHANGE COLUMN class_section_id section_id INT NULL;

SELECT 'Section setup complete!' as Status;
