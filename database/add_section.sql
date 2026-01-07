-- Create Section table
CREATE TABLE IF NOT EXISTS section (
    section_id INT AUTO_INCREMENT PRIMARY KEY,
    section_name VARCHAR(50) NOT NULL UNIQUE
);

-- Add sample sections
INSERT IGNORE INTO section (section_name) VALUES 
('1A'), ('1B'), ('2A'), ('2B'), ('3A'), ('3B'), ('4A'), ('4B');

-- Add section_id to student table if it doesn't exist
-- (class_section_id already exists, we'll repurpose it or add section_id)
SELECT 'Section table created and populated' as Status;
