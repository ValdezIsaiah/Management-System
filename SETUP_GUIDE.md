# Quick Setup Guide

## Step-by-Step Instructions to Run the Student Management System

### 1. Start XAMPP
1. Open **XAMPP Control Panel**
2. Click **Start** for **Apache**
3. Click **Start** for **MySQL**
4. Wait until both show green status

### 2. Create the Database
1. Click **Admin** button next to MySQL in XAMPP (opens phpMyAdmin)
2. Click **Import** tab at the top
3. Click **Choose File**
4. Navigate to: `C:\student-management-system\database\schema.sql`
5. Click **Go** button at the bottom
6. You should see success message
7. Click **Import** again
8. Choose file: `C:\student-management-system\database\sample_data.sql`
9. Click **Go**

### 3. Verify Database
1. In phpMyAdmin, click **student_management_db** in the left sidebar
2. You should see 7 tables:
   - classes
   - courses
   - degrees
   - enrollments
   - sections
   - students
   - teachers

### 4. Start the Application
1. Open **Command Prompt** or **PowerShell**
2. Navigate to project folder:
   ```
   cd C:\student-management-system
   ```
3. Start the server:
   ```
   npm run dev
   ```
4. You should see:
   ```
   ✓ Database connected successfully
   🚀 Server running on http://localhost:3000
   📚 Student Management System initialized
   ```

### 5. Open the Application
1. Open your web browser (Chrome, Edge, Firefox)
2. Go to: **http://localhost:3000**
3. You should see the Student Management System interface

### 6. Test the System
1. Click on different tabs: Students, Degrees, Teachers, etc.
2. Try adding a new student
3. View the Reports tab to see enrollment data
4. Try searching for students

## Common Issues & Solutions

### Issue: "Cannot connect to database"
**Solution**: 
- Make sure MySQL is running in XAMPP (green status)
- Check if database was created successfully in phpMyAdmin
- Verify `.env` file has correct credentials (DB_USER=root, DB_PASSWORD=)

### Issue: "Port 3000 already in use"
**Solution**: 
1. Open `.env` file
2. Change `PORT=3000` to `PORT=3001` (or any other available port)
3. Restart the server
4. Access at http://localhost:3001

### Issue: "Cannot find module"
**Solution**: 
1. Run `npm install` in the project directory
2. Wait for all dependencies to install
3. Try `npm run dev` again

### Issue: Apache won't start in XAMPP
**Solution**: 
- Another program might be using port 80
- You only need MySQL for this project
- You can skip starting Apache

## What to Try

1. **Add a New Student**
   - Go to Students tab
   - Fill in: John Smith, degree, email
   - Click Save Student
   - See it appear in the table

2. **Create an Enrollment**
   - Go to Enrollments tab
   - Select a student
   - Select a class
   - Click Save Enrollment

3. **View Report**
   - Go to Reports tab
   - Click Refresh Report
   - See all enrollment data in table format
   - Click Export to CSV to download

## Need Help?

- Check the main **README.md** file for detailed documentation
- Verify all files are in correct folders
- Make sure XAMPP MySQL is running
- Check browser console for JavaScript errors (F12 key)

## Stopping the Application

1. In the terminal/command prompt where server is running
2. Press **Ctrl + C**
3. Type **Y** to confirm
4. Stop MySQL in XAMPP if desired
