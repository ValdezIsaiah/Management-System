# API Testing Guide

Test these endpoints using your browser, Postman, or curl.

## Base URL
```
http://localhost:3000/api
```

## Test Connectivity

### Check if server is running
```
GET http://localhost:3000/api/test
```
Expected: `{"message": "Student Management System API is running!", "timestamp": "..."}`

## Students API

### Get all students
```
GET http://localhost:3000/api/students
```

### Get single student
```
GET http://localhost:3000/api/students/1
```

### Search students
```
GET http://localhost:3000/api/students/search?q=John
```

### Create student (POST)
```
POST http://localhost:3000/api/students
Content-Type: application/json

{
  "student_fname": "Test",
  "student_lname": "Student",
  "degree_id": 1,
  "email": "test@email.com",
  "phone": "555-0100"
}
```

### Update student (PUT)
```
PUT http://localhost:3000/api/students/9
Content-Type: application/json

{
  "student_fname": "Updated",
  "student_lname": "Student",
  "degree_id": 1,
  "email": "updated@email.com",
  "phone": "555-0200"
}
```

### Delete student (DELETE)
```
DELETE http://localhost:3000/api/students/9
```

## Degrees API

### Get all degrees
```
GET http://localhost:3000/api/degrees
```

### Create degree
```
POST http://localhost:3000/api/degrees
Content-Type: application/json

{
  "degree_desc": "Bachelor of Science in Mathematics"
}
```

## Teachers API

### Get all teachers
```
GET http://localhost:3000/api/teachers
```

### Create teacher
```
POST http://localhost:3000/api/teachers
Content-Type: application/json

{
  "teacher_fname": "New",
  "teacher_lname": "Teacher",
  "email": "teacher@university.edu",
  "phone": "555-2000"
}
```

## Courses API

### Get all courses
```
GET http://localhost:3000/api/courses
```

### Create course
```
POST http://localhost:3000/api/courses
Content-Type: application/json

{
  "course_code": "CS501",
  "course_desc": "Advanced Algorithms",
  "credits": 4
}
```

## Sections API

### Get all sections
```
GET http://localhost:3000/api/sections
```

### Create section
```
POST http://localhost:3000/api/sections
Content-Type: application/json

{
  "section_name": "Section F"
}
```

## Classes API

### Get all classes
```
GET http://localhost:3000/api/classes
```

### Create class
```
POST http://localhost:3000/api/classes
Content-Type: application/json

{
  "class_description": "Advanced Programming - Evening",
  "course_id": 1,
  "section_id": 2,
  "teacher_id": 1,
  "semester": "Spring",
  "year": 2026,
  "room_number": "Room 500",
  "schedule": "MW 6:00-8:00"
}
```

## Enrollments API

### Get all enrollments
```
GET http://localhost:3000/api/enrollments
```

### Get enrollments by student
```
GET http://localhost:3000/api/enrollments/student/1
```

### Create enrollment
```
POST http://localhost:3000/api/enrollments
Content-Type: application/json

{
  "student_id": 1,
  "class_id": 1,
  "enrollment_date": "2026-01-07",
  "grade": null,
  "status": "active"
}
```

### Update enrollment (add grade)
```
PUT http://localhost:3000/api/enrollments/1
Content-Type: application/json

{
  "student_id": 1,
  "class_id": 1,
  "enrollment_date": "2025-08-15",
  "grade": "A+",
  "status": "completed"
}
```

## Reports API

### Get full enrollment report
```
GET http://localhost:3000/api/reports/enrollment
```

### Get report by class
```
GET http://localhost:3000/api/reports/class/1
```

### Get report by student
```
GET http://localhost:3000/api/reports/student/1
```

## Using PowerShell to Test

### Test GET request
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/students" -Method GET
```

### Test POST request
```powershell
$body = @{
    student_fname = "Test"
    student_lname = "User"
    degree_id = 1
    email = "test@email.com"
    phone = "555-0000"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/students" -Method POST -Body $body -ContentType "application/json"
```

## Using Browser Developer Console

Open browser console (F12) and paste:

```javascript
// Get all students
fetch('/api/students')
  .then(res => res.json())
  .then(data => console.log(data));

// Create student
fetch('/api/students', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    student_fname: 'Browser',
    student_lname: 'Test',
    degree_id: 1,
    email: 'browser@test.com',
    phone: '555-9999'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

## Expected Response Formats

### Success Response
```json
{
  "student_id": 1,
  "student_fname": "John",
  "student_lname": "Doe",
  "degree_id": 1,
  "degree_desc": "Bachelor of Science in Computer Science",
  "email": "john.doe@email.com",
  "phone": "555-0101"
}
```

### Error Response
```json
{
  "error": "Student not found"
}
```

### Delete Success
```json
{
  "message": "Student deleted successfully"
}
```

## Testing Workflow

1. **Start with GET requests** - View existing data
2. **Try POST requests** - Create new records
3. **Use PUT requests** - Update existing records
4. **Test DELETE requests** - Remove records
5. **Check Reports** - Verify relationships work correctly

## Notes

- All async operations use `async/await`
- All routes include proper error handling
- Foreign key constraints are enforced
- Unique constraints prevent duplicates
- Cascade delete is enabled for enrollments
