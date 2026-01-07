# Student Management System

A comprehensive web-based Student Management System built with Node.js, Express, MySQL, and vanilla JavaScript.

## Features

- **Student Management**: Add, edit, delete, and search students
- **Degree Management**: Manage academic degrees
- **Teacher Management**: Manage teaching staff with section assignments
- **Course Management**: Manage courses
- **Section Management**: Manage class sections (1A, 1B, 1C, etc.)
- **Class Management**: Create and manage classes with courses, sections, and teachers
- **Enrollment Management**: Enroll students in classes and track grades
- **Comprehensive Reports**: Generate enrollment reports

## Database Design

The system uses a normalized database structure (3NF) with the following entities:

1. **Degrees** - Academic degree programs
2. **Students** - Student information linked to degrees and sections
3. **Teachers** - Teaching staff information with section assignments
4. **Courses** - Course details
5. **Sections** - Class section designations
6. **Classes** - Class instances linking courses, sections, and teachers
7. **Enrollments** - Student enrollment in classes (many-to-many relationship)

## Prerequisites

- **Node.js** (v14 or higher)
- **XAMPP** with MySQL (or standalone MySQL server)
- A web browser

## Installation & Setup

### 1. Start XAMPP MySQL

1. Open XAMPP Control Panel
2. Start **Apache** and **MySQL** services
3. Click **Admin** button next to MySQL to open phpMyAdmin

### 2. Create Database

Option A: Using phpMyAdmin
1. Open phpMyAdmin (http://localhost/phpmyadmin)
2. Click **Import** tab
3. Choose file: `database/schema.sql`
4. Click **Go** to create the database and tables
5. Import `database/sample_data.sql` the same way to add test data

Option B: Using MySQL Command Line
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/sample_data.sql
```

### 3. Configure Environment

The `.env` file is already configured with default XAMPP settings:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=student_management_db
DB_PORT=3306
PORT=3001
```

**Note**: If your MySQL has a password, update `DB_PASSWORD` in the `.env` file.

### 4. Install Dependencies

Open a terminal in the project directory and run:
```bash
npm install
```

This will install:
- express
- mysql2
- dotenv
- cors
- nodemon (dev dependency)

### 5. Start the Server

For development (with auto-restart):
```bash
npm run dev
```

For production:
```bash
npm start
```

The server will start on http://localhost:3001

### 6. Access the Application

Open your browser and navigate to:
```
http://localhost:3001
```

## Project Structure

```
student-management-system/
│
├── controllers/          # Request handlers
│   ├── studentController.js
│   ├── degreeController.js
│   ├── teacherController.js
│   ├── courseController.js
│   ├── sectionController.js
│   ├── classController.js
│   ├── enrollmentController.js
│   └── reportController.js
│
├── models/              # Database models
│   ├── Student.js
│   ├── Degree.js
│   ├── Teacher.js
│   ├── Course.js
│   ├── Section.js
│   ├── Class.js
│   ├── Enrollment.js
│   └── Report.js
│
├── routes/              # API routes
│   ├── studentRoutes.js
│   ├── degreeRoutes.js
│   ├── teacherRoutes.js
│   ├── courseRoutes.js
│   ├── sectionRoutes.js
│   ├── classRoutes.js
│   ├── enrollmentRoutes.js
│   └── reportRoutes.js
│
├── database/            # SQL files
│   ├── schema.sql       # Database structure
│   └── sample_data.sql  # Test data
│
├── public/              # Frontend files
│   ├── index.html       # Main HTML
│   ├── css/
│   │   └── style.css    # Styling
│   └── js/
│       └── app.js       # Frontend JavaScript
│
├── .env                 # Environment variables
├── db.js               # Database connection
├── server.js           # Express server
└── package.json        # Dependencies
```

## API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `GET /api/students/search?q=term` - Search students
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Degrees
- `GET /api/degrees` - Get all degrees
- `GET /api/degrees/:id` - Get degree by ID
- `POST /api/degrees` - Create new degree
- `PUT /api/degrees/:id` - Update degree
- `DELETE /api/degrees/:id` - Delete degree

### Teachers
- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/:id` - Get teacher by ID
- `POST /api/teachers` - Create new teacher
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Sections
- `GET /api/sections` - Get all sections
- `GET /api/sections/:id` - Get section by ID
- `POST /api/sections` - Create new section
- `PUT /api/sections/:id` - Update section
- `DELETE /api/sections/:id` - Delete section

### Classes
- `GET /api/classes` - Get all classes
- `GET /api/classes/:id` - Get class by ID
- `POST /api/classes` - Create new class
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class

### Enrollments
- `GET /api/enrollments` - Get all enrollments
- `GET /api/enrollments/:id` - Get enrollment by ID
- `GET /api/enrollments/student/:studentId` - Get enrollments by student
- `POST /api/enrollments` - Create new enrollment
- `PUT /api/enrollments/:id` - Update enrollment
- `DELETE /api/enrollments/:id` - Delete enrollment

### Reports
- `GET /api/reports/enrollment` - Get full enrollment report
- `GET /api/reports/class/:classId` - Get report by class
- `GET /api/reports/student/:studentId` - Get report by student

### Test
- `GET /api/test` - Test API connectivity

## Usage Guide

### Adding a Student
1. Click the **Students** tab
2. Fill in the student form (First Name, Last Name, Degree, Section)
3. Click **Save Student**

### Creating a Class
1. First, ensure you have created: Degrees, Teachers, Courses, and Sections
2. Click the **Classes** tab
3. Fill in the class form with all required information
4. Click **Save Class**

### Enrolling a Student
1. Click the **Enrollments** tab
2. Select a Student from the dropdown
3. Select a Class from the dropdown
4. Choose enrollment date
5. Click **Save Enrollment**

### Viewing Reports
1. Click the **Reports** tab
2. Click **Refresh Report** to load the enrollment report
3. Click **Export to CSV** to download the report

## Troubleshooting

### Database Connection Error
- Ensure XAMPP MySQL is running
- Check credentials in `.env` file
- Verify database exists in phpMyAdmin

### Port Already in Use
- Change `PORT=3001` in `.env` to another port (e.g., `PORT=3002`)
- Restart the server

### Cannot Find Module Error
- Run `npm install` to install all dependencies

## Sample Data

The system includes sample data:
- 5 Degrees
- 12 Sections (1A-4C)
- 8 Students
- 5 Teachers
- 8 Courses
- 8 Classes
- 14 Enrollments

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL (with mysql2 driver)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Environment**: dotenv for configuration
- **Dev Tools**: nodemon for development

## Author

Student Management System - Educational Project

## License

ISC
