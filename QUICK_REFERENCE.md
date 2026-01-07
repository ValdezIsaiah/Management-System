# Student Management System - Quick Reference

## 🚀 Quick Start (3 Steps)

1. **Start MySQL in XAMPP**
   - Open XAMPP Control Panel
   - Click "Start" for MySQL

2. **Import Database**
   - Open phpMyAdmin (http://localhost/phpmyadmin)
   - Import `database/schema.sql`
   - Import `database/sample_data.sql`

3. **Run Application**
   ```bash
   npm run dev
   ```
   - Open http://localhost:3000

## 📁 Project Structure
```
student-management-system/
├── controllers/     → Business logic
├── models/         → Database queries
├── routes/         → API endpoints
├── public/         → Frontend (HTML/CSS/JS)
├── database/       → SQL files
├── server.js       → Express server
├── db.js          → Database connection
└── .env           → Configuration
```

## 🔌 Key Files

| File | Purpose |
|------|---------|
| `server.js` | Main application entry point |
| `db.js` | MySQL connection with async/await |
| `.env` | Database credentials |
| `database/schema.sql` | Database structure (3NF) |
| `database/sample_data.sql` | Test data |
| `public/index.html` | Frontend interface |
| `public/js/app.js` | Frontend JavaScript |

## 📊 Database Tables (3NF)

1. **degrees** - Academic programs
2. **students** - Student info (→ degrees)
3. **teachers** - Instructor info
4. **courses** - Course catalog
5. **sections** - Section designations
6. **classes** - Class instances (→ courses, sections, teachers)
7. **enrollments** - Student enrollments (→ students, classes)

## 🔗 Relationships

```
degrees (1) ──→ (N) students
courses (1) ──→ (N) classes
sections (1) ──→ (N) classes
teachers (1) ──→ (N) classes
students (N) ←─→ (N) classes [via enrollments]
```

## 🛠️ API Endpoints Pattern

All entities follow REST pattern:
```
GET    /api/{entity}           → Get all
GET    /api/{entity}/:id       → Get one
GET    /api/{entity}/search?q= → Search
POST   /api/{entity}           → Create
PUT    /api/{entity}/:id       → Update
DELETE /api/{entity}/:id       → Delete
```

**Entities**: students, degrees, teachers, courses, sections, classes, enrollments

**Special Reports**:
- `GET /api/reports/enrollment` - Full report
- `GET /api/reports/class/:id` - By class
- `GET /api/reports/student/:id` - By student

## 🎨 Frontend Tabs

1. **Students** - Manage student records
2. **Degrees** - Manage degree programs
3. **Teachers** - Manage instructors
4. **Courses** - Manage course catalog
5. **Sections** - Manage sections
6. **Classes** - Create class instances
7. **Enrollments** - Enroll students in classes
8. **Reports** - View enrollment report (CSV export)

## ⚙️ Configuration (.env)

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=           ← Usually empty in XAMPP
DB_NAME=student_management_db
DB_PORT=3306
PORT=3000
```

## 📝 CRUD Operations Flow

### Adding a Student
1. Go to Students tab
2. Fill form (name, degree, email, phone)
3. Click "Save Student"
4. Appears in table below

### Creating a Class
1. Ensure you have: degree, teacher, course, section
2. Go to Classes tab
3. Fill form (select course, section, teacher)
4. Click "Save Class"

### Enrolling a Student
1. Go to Enrollments tab
2. Select student from dropdown
3. Select class from dropdown
4. Set date and status
5. Click "Save Enrollment"

## 🔍 Testing

### Browser Test
```
http://localhost:3000/api/students
http://localhost:3000/api/test
```

### PowerShell Test
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/students"
```

### Console Test (F12 in browser)
```javascript
fetch('/api/students').then(r => r.json()).then(console.log)
```

## 🐛 Common Issues

| Problem | Solution |
|---------|----------|
| Can't connect to database | Start MySQL in XAMPP |
| Port already in use | Change PORT in .env |
| Module not found | Run `npm install` |
| 404 errors | Check server is running |

## 📦 Dependencies

```json
{
  "express": "Web framework",
  "mysql2": "MySQL driver",
  "dotenv": "Environment config",
  "cors": "Cross-origin requests",
  "nodemon": "Auto-restart (dev)"
}
```

## 🎯 Features Implemented

✅ Complete CRUD for all entities
✅ Search functionality
✅ Async/await database queries
✅ 3NF database design
✅ Foreign key constraints
✅ Enrollment report (matches required format)
✅ CSV export
✅ Responsive frontend
✅ Error handling
✅ RESTful API design

## 📚 Documentation Files

- `README.md` - Complete documentation
- `SETUP_GUIDE.md` - Step-by-step setup
- `API_TESTING.md` - API endpoint examples
- `DATABASE_ERD.md` - Database schema details
- `QUICK_REFERENCE.md` - This file

## 🔥 Commands Cheat Sheet

```bash
# Install dependencies
npm install

# Run development server (auto-restart)
npm run dev

# Run production server
npm start

# Stop server
Ctrl + C (then Y)

# View package info
npm list

# Check for updates
npm outdated
```

## ✨ Sample Data Included

- 5 Degrees
- 8 Students
- 5 Teachers
- 8 Courses
- 5 Sections
- 8 Classes
- 14 Enrollments

## 🎓 Academic Compliance

✅ **3NF Normalization** - No redundancy, proper decomposition
✅ **ERD Design** - Clear entity relationships
✅ **Async/Await** - Modern JavaScript patterns
✅ **RESTful API** - Industry standard design
✅ **MVC Pattern** - Models, Controllers, Routes separation
✅ **Error Handling** - Try/catch blocks throughout
✅ **SQL Injection Prevention** - Parameterized queries

## 💡 Tips

- Always start MySQL before running the app
- Use search feature to find records quickly
- Export reports to CSV for backup
- Check browser console (F12) for errors
- Use Postman or similar for API testing
- Keep .env file secure (in .gitignore)

## 🌐 Browser Compatibility

✅ Chrome / Edge (Chromium)
✅ Firefox
✅ Safari
✅ Opera

## 📞 Support Resources

1. Check `SETUP_GUIDE.md` for detailed setup
2. Review `API_TESTING.md` for endpoint examples
3. See `DATABASE_ERD.md` for schema details
4. Examine `README.md` for full documentation
5. Check console logs for errors (F12)
6. Verify XAMPP MySQL is running

---

**Version**: 1.0.0  
**Date**: January 2026  
**Tech Stack**: Node.js + Express + MySQL + Vanilla JS
