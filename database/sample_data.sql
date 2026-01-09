-- Sample Test Data for Student Management System
USE student_management_db;

-- Insert Degrees
INSERT INTO degrees (degree_desc) VALUES
('Bachelor of Science in Computer Science'),
('Bachelor of Science in Information Technology'),
('Bachelor of Science in Software Engineering'),
('Bachelor of Arts in Business Administration'),
('Bachelor of Science in Data Science');

-- Insert Students
INSERT INTO students (student_fname, student_lname, degree_id, email, phone) VALUES
('John', 'Doe', 1, 'john.doe@email.com', '555-0101'),
('Jane', 'Smith', 1, 'jane.smith@email.com', '555-0102'),
('Michael', 'Johnson', 2, 'michael.j@email.com', '555-0103'),
('Emily', 'Brown', 3, 'emily.brown@email.com', '555-0104'),
('David', 'Williams', 1, 'david.w@email.com', '555-0105'),
('Sarah', 'Davis', 4, 'sarah.davis@email.com', '555-0106'),
('Robert', 'Miller', 2, 'robert.m@email.com', '555-0107'),
('Lisa', 'Wilson', 5, 'lisa.wilson@email.com', '555-0108');

-- Insert Teachers
INSERT INTO teachers (teacher_fname, teacher_lname, email, phone) VALUES
('Dr. James', 'Anderson', 'j.anderson@university.edu', '555-1001'),
('Prof. Patricia', 'Martinez', 'p.martinez@university.edu', '555-1002'),
('Dr. Christopher', 'Taylor', 'c.taylor@university.edu', '555-1003'),
('Prof. Linda', 'Garcia', 'l.garcia@university.edu', '555-1004'),
('Dr. William', 'Rodriguez', 'w.rodriguez@university.edu', '555-1005');

-- Insert Courses
INSERT INTO courses (course_code, course_desc, credits) VALUES
('CS101', 'Introduction to Computer Science', 3),
('CS201', 'Data Structures and Algorithms', 4),
('CS301', 'Database Management Systems', 3),
('IT150', 'Web Development Fundamentals', 3),
('SE250', 'Software Engineering Principles', 4),
('DS300', 'Machine Learning Basics', 3),
('BA101', 'Business Administration Fundamentals', 3),
('CS401', 'Advanced Programming', 4);

-- Insert Sections
INSERT INTO section (section_name) VALUES
('Section A'),
('Section B'),
('Section C'),
('Section D'),
('Section E');

-- Insert Classes
INSERT INTO classes (class_description, course_id, section_id, teacher_id, semester, year, room_number, schedule) VALUES
('Intro to CS - Morning Section', 1, 1, 1, 'Fall', 2025, 'Room 101', 'MWF 9:00-10:00'),
('Intro to CS - Afternoon Section', 1, 2, 1, 'Fall', 2025, 'Room 102', 'TTh 2:00-3:30'),
('Data Structures - Advanced', 2, 1, 2, 'Fall', 2025, 'Room 201', 'MWF 10:00-11:30'),
('Database Management', 3, 1, 3, 'Fall', 2025, 'Room 301', 'TTh 9:00-10:30'),
('Web Development', 4, 2, 4, 'Fall', 2025, 'Room 150', 'MWF 1:00-2:00'),
('Software Engineering', 5, 1, 5, 'Fall', 2025, 'Room 250', 'TTh 11:00-1:00'),
('Machine Learning', 6, 3, 2, 'Fall', 2025, 'Room 350', 'MWF 3:00-4:00'),
('Business Admin', 7, 1, 4, 'Fall', 2025, 'Room 401', 'TTh 10:00-11:30');

-- Insert Enrollments (Students enrolled in classes)
INSERT INTO enrollments (student_id, class_id, enrollment_date, grade, status) VALUES
(1, 1, '2025-08-15', 'A', 'active'),
(1, 3, '2025-08-15', 'B+', 'active'),
(1, 4, '2025-08-15', NULL, 'active'),
(2, 1, '2025-08-15', 'A-', 'active'),
(2, 5, '2025-08-15', NULL, 'active'),
(3, 2, '2025-08-16', 'B', 'active'),
(3, 5, '2025-08-16', NULL, 'active'),
(4, 6, '2025-08-16', NULL, 'active'),
(5, 1, '2025-08-17', 'B+', 'active'),
(5, 3, '2025-08-17', NULL, 'active'),
(6, 8, '2025-08-17', 'A', 'active'),
(7, 2, '2025-08-18', NULL, 'active'),
(7, 5, '2025-08-18', NULL, 'active'),
(8, 7, '2025-08-18', 'A-', 'active');
