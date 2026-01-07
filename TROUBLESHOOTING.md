# Troubleshooting Guide

## Database Connection Issues

### Error: "Cannot connect to database"

**Symptoms**: Server starts but shows "✗ Database connection failed"

**Solutions**:
1. **Check if MySQL is running**
   - Open XAMPP Control Panel
   - MySQL should show green "Running" status
   - If not, click "Start" button

2. **Verify database exists**
   - Open phpMyAdmin (http://localhost/phpmyadmin)
   - Look for `student_management_db` in left sidebar
   - If missing, import `database/schema.sql`

3. **Check credentials in .env file**
   ```
   DB_HOST=localhost      ← Should be localhost
   DB_USER=root          ← Default XAMPP user
   DB_PASSWORD=          ← Usually empty (no password)
   DB_NAME=student_management_db
   DB_PORT=3306          ← Default MySQL port
   ```

4. **Restart MySQL**
   - In XAMPP, click "Stop" then "Start" for MySQL
   - Wait 5 seconds between stop and start

5. **Check MySQL port**
   - In XAMPP, click "Config" → "my.ini"
   - Find line with `port=3306`
   - Update PORT in .env if different

---

## Server Start Issues

### Error: "Port 3000 already in use"

**Solution 1**: Change port in .env
```
PORT=3001
```
Then restart server and access at http://localhost:3001

**Solution 2**: Find and kill process using port
```powershell
# Find process on port 3000
netstat -ano | findstr :3000

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F
```

### Error: "Cannot find module"

**Solution**: Install dependencies
```bash
npm install
```

If that doesn't work:
```bash
# Delete node_modules and package-lock.json
rm -r node_modules
rm package-lock.json

# Reinstall
npm install
```

---

## Frontend Issues

### Page shows "Cannot GET /"

**Causes**: Server not running or wrong URL

**Solutions**:
1. Ensure server is running (check terminal)
2. Verify URL is `http://localhost:3000` (not localhost:80)
3. Check console for error messages

### Tabs not switching

**Solution**: Check browser console (F12)
- Look for JavaScript errors
- Ensure `app.js` is loaded
- Clear browser cache (Ctrl+Shift+Delete)

### Forms not submitting

**Solution**:
1. Open browser console (F12)
2. Look for error messages
3. Check if server is running
4. Verify API endpoints are accessible
5. Test: `http://localhost:3000/api/test`

### Dropdowns are empty

**Cause**: Related data not loaded

**Solution**:
1. Check if degrees/courses/teachers exist in database
2. Open browser console
3. Look for failed API requests
4. Verify tables have data in phpMyAdmin

---

## Database Issues

### Error: "Cannot delete degree/course/teacher"

**Cause**: Foreign key constraint (records are in use)

**Solution**: This is by design
- You cannot delete a degree if students are enrolled in it
- You cannot delete a course if classes use it
- You cannot delete a teacher if they have classes

**To delete anyway**:
1. First delete/reassign dependent records
2. Or modify the database schema (not recommended)

### Error: "Duplicate entry"

**Cause**: Trying to create duplicate record

**Common Cases**:
- Degree with same description already exists
- Course code already exists
- Student already enrolled in same class

**Solution**: 
- Check existing records first
- Use unique names/codes
- For enrollments, verify student isn't already enrolled

### Tables are empty

**Solution**: Import sample data
1. Open phpMyAdmin
2. Select `student_management_db`
3. Click "Import" tab
4. Choose `database/sample_data.sql`
5. Click "Go"

---

## XAMPP Issues

### MySQL won't start in XAMPP

**Cause 1**: Another MySQL service running
- Windows Search → "Services"
- Look for "MySQL" service
- Stop it, set to Manual
- Restart XAMPP MySQL

**Cause 2**: Port 3306 in use
- XAMPP → Config → my.ini
- Change port to 3307
- Update .env: `DB_PORT=3307`

**Cause 3**: Previous crash
- XAMPP → MySQL → Logs
- Check for errors
- May need to repair MySQL

### Apache conflicts with MySQL start

**Not a problem!**
- You only need MySQL for this project
- Apache is for other projects
- Safe to leave Apache stopped

---

## API Request Issues

### 404 Not Found

**Causes**:
1. Wrong URL
2. Server not running
3. Route doesn't exist

**Check**:
```bash
# Test route
http://localhost:3000/api/test

# Should return:
{"message": "Student Management System API is running!"}
```

### 500 Internal Server Error

**Causes**: Server-side error

**Solution**:
1. Check server terminal for error messages
2. Common causes:
   - Database connection lost
   - Missing required field
   - Invalid foreign key
   - SQL syntax error

**Debug steps**:
1. Look at terminal where server is running
2. Error will show there with stack trace
3. Check line number and file mentioned

### CORS Error

**Already handled** - CORS middleware is included

If still occurs:
- Clear browser cache
- Check server.js has `app.use(cors())`
- Restart server

---

## Data Integrity Issues

### Cannot create class

**Checklist**:
- ✓ Course exists
- ✓ Section exists
- ✓ Teacher exists
- ✓ All required fields filled

### Cannot create student

**Checklist**:
- ✓ Degree exists
- ✓ First name provided
- ✓ Last name provided
- ✓ Valid degree_id

### Cannot create enrollment

**Checklist**:
- ✓ Student exists
- ✓ Class exists
- ✓ Student not already enrolled in that class
- ✓ Valid enrollment date

---

## Performance Issues

### Slow loading

**Solutions**:
1. Check if many records (>1000)
2. Verify indexes exist (check schema.sql)
3. Restart MySQL
4. Check system resources

### Browser freezing

**Solutions**:
1. Close other tabs
2. Clear browser cache
3. Use different browser
4. Check console for infinite loops

---

## Development Issues

### Changes not reflecting

**Solutions**:
1. Hard refresh browser (Ctrl+Shift+R)
2. Clear browser cache
3. Check if nodemon restarted server
4. Verify file saved

### Nodemon not restarting

**Solutions**:
1. Stop server (Ctrl+C)
2. Start again: `npm run dev`
3. Check if nodemon is installed: `npm list nodemon`
4. Reinstall: `npm install --save-dev nodemon`

---

## Windows-Specific Issues

### PowerShell execution policy error

**Solution**:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Path not recognized

**Solution**: Use full path
```bash
cd C:\student-management-system
```

### Port issues on Windows

**Check what's using a port**:
```powershell
netstat -ano | findstr :3000
```

---

## Testing Checklist

When something isn't working, verify:

- [ ] XAMPP MySQL is running (green in control panel)
- [ ] Database exists in phpMyAdmin
- [ ] Tables have data (check sample_data.sql imported)
- [ ] Server is running (check terminal)
- [ ] No errors in terminal
- [ ] Browser at correct URL (http://localhost:3000)
- [ ] No errors in browser console (F12)
- [ ] .env file has correct settings
- [ ] node_modules folder exists
- [ ] All files are saved

---

## Quick Diagnostic Commands

### Check server connectivity
```bash
curl http://localhost:3000/api/test
```

### Check if MySQL is listening
```bash
netstat -an | findstr :3306
```

### Check Node.js version
```bash
node --version
```

### Check npm version
```bash
npm --version
```

### List installed packages
```bash
npm list --depth=0
```

---

## Getting Help

1. **Check server terminal** for error messages
2. **Check browser console** (F12) for frontend errors
3. **Review logs** in XAMPP MySQL logs
4. **Test API** using http://localhost:3000/api/test
5. **Verify database** in phpMyAdmin
6. **Check .env** file settings
7. **Restart everything**: MySQL, Server, Browser

---

## Error Message Reference

| Error | Meaning | Fix |
|-------|---------|-----|
| ECONNREFUSED | MySQL not running | Start MySQL in XAMPP |
| ER_BAD_DB_ERROR | Database doesn't exist | Import schema.sql |
| ER_NO_SUCH_TABLE | Table doesn't exist | Import schema.sql |
| ER_DUP_ENTRY | Duplicate record | Use unique values |
| ER_NO_REFERENCED_ROW | Invalid foreign key | Related record doesn't exist |
| EADDRINUSE | Port in use | Change PORT in .env |
| MODULE_NOT_FOUND | Missing package | Run npm install |

---

## Still Having Issues?

1. **Completely restart**:
   - Stop server (Ctrl+C)
   - Stop MySQL in XAMPP
   - Close all browsers
   - Start MySQL
   - Start server
   - Open fresh browser

2. **Fresh install**:
   ```bash
   rm -r node_modules
   rm package-lock.json
   npm install
   npm run dev
   ```

3. **Check basics**:
   - Node.js installed? `node --version`
   - npm installed? `npm --version`
   - XAMPP installed?
   - MySQL running?

4. **Review documentation**:
   - README.md
   - SETUP_GUIDE.md
   - DATABASE_ERD.md
   - API_TESTING.md
