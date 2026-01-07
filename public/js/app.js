// API Base URL
const API_BASE = '/api';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    loadDegreeOptions(); // Load degree dropdown options first
    loadSectionOptions(); // Load section dropdown options
    loadStudents();
    loadDegrees();
    setDefaultDate();
    setupFormHandlers();
});

// Tab Navigation
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    console.log('Initializing tabs, found', tabButtons.length, 'buttons');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Tab clicked:', button.getAttribute('data-tab'));
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all tabs and buttons
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Load data for the tab
            loadTabData(targetTab);
        });
    });
}

function loadTabData(tab) {
    switch(tab) {
        case 'students':
            loadStudents();
            break;
        case 'degrees':
            loadDegrees();
            break;
        case 'teachers':
            loadTeachers();
            break;
        case 'courses':
            loadCourses();
            break;
        case 'sections':
            loadSections();
            break;
        case 'classes':
            loadClasses();
            break;
        case 'enrollments':
            loadEnrollments();
            break;
        case 'reports':
            loadEnrollmentReport();
            break;
    }
}

// Setup Form Handlers
function setupFormHandlers() {
    // Student Form
    document.getElementById('studentForm').addEventListener('submit', handleStudentSubmit);
    document.getElementById('cancelStudentBtn').addEventListener('click', resetStudentForm);
    
    // Degree Form
    document.getElementById('degreeForm').addEventListener('submit', handleDegreeSubmit);
    document.getElementById('cancelDegreeBtn').addEventListener('click', resetDegreeForm);
    
    // Teacher Form
    document.getElementById('teacherForm').addEventListener('submit', handleTeacherSubmit);
    document.getElementById('cancelTeacherBtn').addEventListener('click', resetTeacherForm);
    
    // Course Form
    document.getElementById('courseForm').addEventListener('submit', handleCourseSubmit);
    document.getElementById('cancelCourseBtn').addEventListener('click', resetCourseForm);
    
    // Section Form
    document.getElementById('sectionForm').addEventListener('submit', handleSectionSubmit);
    document.getElementById('cancelSectionBtn').addEventListener('click', resetSectionForm);
    
    // Class Form
    document.getElementById('classForm').addEventListener('submit', handleClassSubmit);
    document.getElementById('cancelClassBtn').addEventListener('click', resetClassForm);
    
    // Enrollment Form
    document.getElementById('enrollmentForm').addEventListener('submit', handleEnrollmentSubmit);
    document.getElementById('cancelEnrollmentBtn').addEventListener('click', resetEnrollmentForm);
}

// Message Display
function showMessage(message, type = 'success') {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    
    setTimeout(() => {
        messageDiv.className = 'message';
    }, 3000);
}

// Set default date for enrollment form
function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('enrollment_date').value = today;
}

// ============= STUDENTS =============

async function loadStudents() {
    try {
        const response = await fetch(`${API_BASE}/students`);
        const students = await response.json();
        displayStudents(students);
        loadDegreeOptions(); // Load degrees for dropdown
        loadSectionOptions(); // Load sections for dropdown
    } catch (error) {
        showMessage('Error loading students: ' + error.message, 'error');
    }
}

function displayStudents(students) {
    const tbody = document.querySelector('#studentsTable tbody');
    tbody.innerHTML = '';
    
    students.forEach(student => {
        const row = `
            <tr>
                <td>${student.student_id}</td>
                <td>${student.studentfname}</td>
                <td>${student.studentlname}</td>
                <td>${student.degree_desc || 'N/A'}</td>
                <td>${student.section_name || 'N/A'}</td>
                <td>
                    <button class="btn btn-warning" onclick="editStudent(${student.student_id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteStudent(${student.student_id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

async function loadDegreeOptions() {
    try {
        const response = await fetch(`${API_BASE}/degrees`);
        const degrees = await response.json();
        const select = document.getElementById('degree_id');
        select.innerHTML = '<option value="">Select Degree</option>';
        degrees.forEach(degree => {
            select.innerHTML += `<option value="${degree.degree_id}">${degree.degree_desc}</option>`;
        });
    } catch (error) {
        console.error('Error loading degree options:', error);
    }
}

async function loadSectionOptions() {
    try {
        console.log('=== loadSectionOptions called ===');
        const response = await fetch(`${API_BASE}/sections`);
        console.log('Section API response:', response.status);
        if (!response.ok) {
            console.warn('Sections not available yet');
            return;
        }
        const sections = await response.json();
        console.log('Sections loaded:', sections);
        
        // Populate student section dropdown
        const select = document.getElementById('section_id');
        console.log('Student section dropdown element:', select);
        if (select) {
            select.innerHTML = '<option value="">Select Section</option>';
            sections.forEach(section => {
                const option = document.createElement('option');
                option.value = section.section_id;
                option.textContent = section.section_name;
                select.appendChild(option);
            });
            console.log('Student section dropdown now has', select.options.length, 'options');
        } else {
            console.error('Section dropdown with id="section_id" not found!');
        }
        
        // Populate teacher section dropdown
        const teacherSelect = document.getElementById('teacher_section_id');
        console.log('Teacher section dropdown element:', teacherSelect);
        if (teacherSelect) {
            teacherSelect.innerHTML = '<option value="">Select Section</option>';
            sections.forEach(section => {
                const option = document.createElement('option');
                option.value = section.section_id;
                option.textContent = section.section_name;
                teacherSelect.appendChild(option);
            });
            console.log('Teacher section dropdown now has', teacherSelect.options.length, 'options');
        }
        
        // Populate class section dropdown
        const classSelect = document.getElementById('section_id_class');
        console.log('Class section dropdown element:', classSelect);
        if (classSelect) {
            classSelect.innerHTML = '<option value="">Select Section</option>';
            sections.forEach(section => {
                const option = document.createElement('option');
                option.value = section.section_id;
                option.textContent = section.section_name;
                classSelect.appendChild(option);
            });
            console.log('Class section dropdown now has', classSelect.options.length, 'options');
        }
    } catch (error) {
        console.error('Error loading section options:', error);
    }
}

async function handleStudentSubmit(e) {
    e.preventDefault();
    
    const studentId = document.getElementById('student_id').value;
    const studentData = {
        student_fname: document.getElementById('student_fname').value,
        student_lname: document.getElementById('student_lname').value,
        degree_id: document.getElementById('degree_id').value,
        section_id: document.getElementById('section_id').value || null
    };
    
    try {
        const url = studentId ? `${API_BASE}/students/${studentId}` : `${API_BASE}/students`;
        const method = studentId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData)
        });
        
        if (response.ok) {
            showMessage(studentId ? 'Student updated successfully!' : 'Student added successfully!');
            resetStudentForm();
            loadStudents();
        } else {
            const error = await response.json();
            showMessage('Error: ' + error.error, 'error');
        }
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
    }
}

async function editStudent(id) {
    try {
        const response = await fetch(`${API_BASE}/students/${id}`);
        const student = await response.json();
        
        document.getElementById('student_id').value = student.student_id;
        document.getElementById('student_fname').value = student.studentfname;
        document.getElementById('student_lname').value = student.studentlname;
        document.getElementById('degree_id').value = student.degree_id;
        document.getElementById('section_id').value = student.section_id || '';
        
        document.getElementById('student-form-title').textContent = 'Edit Student';
        document.querySelector('#studentForm .btn-primary').textContent = 'Update Student';
    } catch (error) {
        showMessage('Error loading student: ' + error.message, 'error');
    }
}

async function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this student?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/students/${id}`, { method: 'DELETE' });
        
        if (response.ok) {
            showMessage('Student deleted successfully!');
            loadStudents();
        } else {
            const error = await response.json();
            showMessage('Error: ' + error.error, 'error');
        }
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
    }
}

function resetStudentForm() {
    document.getElementById('studentForm').reset();
    document.getElementById('student_id').value = '';
    document.getElementById('student-form-title').textContent = 'Add New Student';
    document.querySelector('#studentForm .btn-primary').textContent = 'Save Student';
}

async function searchStudents() {
    const searchTerm = document.getElementById('studentSearch').value;
    try {
        const response = await fetch(`${API_BASE}/students/search?q=${searchTerm}`);
        const students = await response.json();
        displayStudents(students);
    } catch (error) {
        showMessage('Error searching students: ' + error.message, 'error');
    }
}

// ============= DEGREES =============

async function loadDegrees() {
    try {
        const response = await fetch(`${API_BASE}/degrees`);
        const degrees = await response.json();
        displayDegrees(degrees);
    } catch (error) {
        showMessage('Error loading degrees: ' + error.message, 'error');
    }
}

function displayDegrees(degrees) {
    const tbody = document.querySelector('#degreesTable tbody');
    tbody.innerHTML = '';
    
    degrees.forEach(degree => {
        const row = `
            <tr>
                <td>${degree.degree_id}</td>
                <td>${degree.degree_desc}</td>
                <td>
                    <button class="btn btn-warning" onclick="editDegree(${degree.degree_id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteDegree(${degree.degree_id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

async function handleDegreeSubmit(e) {
    e.preventDefault();
    
    const degreeId = document.getElementById('degree_id_form').value;
    const degreeData = {
        degree_desc: document.getElementById('degree_desc').value
    };
    
    try {
        const url = degreeId ? `${API_BASE}/degrees/${degreeId}` : `${API_BASE}/degrees`;
        const method = degreeId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(degreeData)
        });
        
        if (response.ok) {
            showMessage(degreeId ? 'Degree updated successfully!' : 'Degree added successfully!');
            resetDegreeForm();
            loadDegrees();
            loadDegreeOptions();
        } else {
            const error = await response.json();
            showMessage('Error: ' + error.error, 'error');
        }
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
    }
}

async function editDegree(id) {
    try {
        const response = await fetch(`${API_BASE}/degrees/${id}`);
        const degree = await response.json();
        
        document.getElementById('degree_id_form').value = degree.degree_id;
        document.getElementById('degree_desc').value = degree.degree_desc;
        document.getElementById('degree-form-title').textContent = 'Edit Degree';
    } catch (error) {
        showMessage('Error loading degree: ' + error.message, 'error');
    }
}

async function deleteDegree(id) {
    if (!confirm('Are you sure you want to delete this degree?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/degrees/${id}`, { method: 'DELETE' });
        
        if (response.ok) {
            showMessage('Degree deleted successfully!');
            loadDegrees();
            loadDegreeOptions();
        } else {
            const error = await response.json();
            showMessage('Error: ' + error.error, 'error');
        }
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
    }
}

function resetDegreeForm() {
    document.getElementById('degreeForm').reset();
    document.getElementById('degree_id_form').value = '';
    document.getElementById('degree-form-title').textContent = 'Add New Degree';
}

// ============= TEACHERS =============

async function loadTeachers() {
    try {
        const response = await fetch(`${API_BASE}/teachers`);
        const teachers = await response.json();
        displayTeachers(teachers);
        loadTeacherOptions();
        loadSectionOptions(); // Load section options for teacher form
    } catch (error) {
        showMessage('Error loading teachers: ' + error.message, 'error');
    }
}

function displayTeachers(teachers) {
    const tbody = document.querySelector('#teachersTable tbody');
    tbody.innerHTML = '';
    
    teachers.forEach(teacher => {
        const row = `
            <tr>
                <td>${teacher.teacher_id}</td>
                <td>${teacher.teacherfname}</td>
                <td>${teacher.teacherlname}</td>
                <td>${teacher.section_name || 'N/A'}</td>
                <td>
                    <button class="btn btn-warning" onclick="editTeacher(${teacher.teacher_id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteTeacher(${teacher.teacher_id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

async function loadTeacherOptions() {
    try {
        const response = await fetch(`${API_BASE}/teachers`);
        const teachers = await response.json();
        const select = document.getElementById('teacher_id_class');
        select.innerHTML = '<option value="">Select Teacher</option>';
        teachers.forEach(teacher => {
            select.innerHTML += `<option value="${teacher.teacher_id}">${teacher.teacher_fname} ${teacher.teacher_lname}</option>`;
        });
    } catch (error) {
        console.error('Error loading teacher options:', error);
    }
}

async function handleTeacherSubmit(e) {
    e.preventDefault();
    
    const teacherId = document.getElementById('teacher_id_form').value;
    const teacherData = {
        teacher_fname: document.getElementById('teacher_fname').value,
        teacher_lname: document.getElementById('teacher_lname').value,
        section_id: document.getElementById('teacher_section_id').value || null
    };
    
    try {
        const url = teacherId ? `${API_BASE}/teachers/${teacherId}` : `${API_BASE}/teachers`;
        const method = teacherId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(teacherData)
        });
        
        if (response.ok) {
            showMessage(teacherId ? 'Teacher updated successfully!' : 'Teacher added successfully!');
            resetTeacherForm();
            loadTeachers();
        } else {
            const error = await response.json();
            showMessage('Error: ' + error.error, 'error');
        }
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
    }
}

async function editTeacher(id) {
    try {
        const response = await fetch(`${API_BASE}/teachers/${id}`);
        const teacher = await response.json();
        
        document.getElementById('teacher_id_form').value = teacher.teacher_id;
        document.getElementById('teacher_fname').value = teacher.teacherfname;
        document.getElementById('teacher_lname').value = teacher.teacherlname;
        document.getElementById('teacher_section_id').value = teacher.section_id || '';
        document.getElementById('teacher-form-title').textContent = 'Edit Teacher';
    } catch (error) {
        showMessage('Error loading teacher: ' + error.message, 'error');
    }
}

async function deleteTeacher(id) {
    if (!confirm('Are you sure you want to delete this teacher?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/teachers/${id}`, { method: 'DELETE' });
        
        if (response.ok) {
            showMessage('Teacher deleted successfully!');
            loadTeachers();
        } else {
            const error = await response.json();
            showMessage('Error: ' + error.error, 'error');
        }
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
    }
}

function resetTeacherForm() {
    document.getElementById('teacherForm').reset();
    document.getElementById('teacher_id_form').value = '';
    document.getElementById('teacher-form-title').textContent = 'Add New Teacher';
}

// ============= COURSES =============

async function loadCourses() {
    try {
        const response = await fetch(`${API_BASE}/courses`);
        const courses = await response.json();
        displayCourses(courses);
        loadCourseOptions();
    } catch (error) {
        showMessage('Error loading courses: ' + error.message, 'error');
    }
}

function displayCourses(courses) {
    const tbody = document.querySelector('#coursesTable tbody');
    tbody.innerHTML = '';
    
    courses.forEach(course => {
        const row = `
            <tr>
                <td>${course.course_id}</td>
                <td>${course.course_desc}</td>
                <td>
                    <button class="btn btn-warning" onclick="editCourse(${course.course_id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteCourse(${course.course_id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

async function loadCourseOptions() {
    try {
        const response = await fetch(`${API_BASE}/courses`);
        const courses = await response.json();
        const select = document.getElementById('course_id_class');
        select.innerHTML = '<option value="">Select Course</option>';
        courses.forEach(course => {
            select.innerHTML += `<option value="${course.course_id}">${course.course_desc}</option>`;
        });
    } catch (error) {
        console.error('Error loading course options:', error);
    }
}

async function handleCourseSubmit(e) {
    e.preventDefault();
    
    const courseId = document.getElementById('course_id_form').value;
    const courseData = {
        course_desc: document.getElementById('course_desc_field').value
    };
    
    try {
        const url = courseId ? `${API_BASE}/courses/${courseId}` : `${API_BASE}/courses`;
        const method = courseId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(courseData)
        });
        
        if (response.ok) {
            showMessage(courseId ? 'Course updated successfully!' : 'Course added successfully!');
            resetCourseForm();
            loadCourses();
        } else {
            const error = await response.json();
            showMessage('Error: ' + error.error, 'error');
        }
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
    }
}

async function editCourse(id) {
    try {
        const response = await fetch(`${API_BASE}/courses/${id}`);
        const course = await response.json();
        
        document.getElementById('course_id_form').value = course.course_id;
        document.getElementById('course_desc_field').value = course.course_desc;
        document.getElementById('course-form-title').textContent = 'Edit Course';
    } catch (error) {
        showMessage('Error loading course: ' + error.message, 'error');
    }
}

async function deleteCourse(id) {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/courses/${id}`, { method: 'DELETE' });
        
        if (response.ok) {
            showMessage('Course deleted successfully!');
            loadCourses();
        } else {
            const error = await response.json();
            showMessage('Error: ' + error.error, 'error');
        }
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
    }
}

function resetCourseForm() {
    document.getElementById('courseForm').reset();
    document.getElementById('course_id_form').value = '';
    document.getElementById('course-form-title').textContent = 'Add New Course';
}

// ============= SECTIONS =============

async function loadSections() {
    try {
        const response = await fetch(`${API_BASE}/sections`);
        const sections = await response.json();
        displaySections(sections);
        loadSectionOptions();
    } catch (error) {
        showMessage('Error loading sections: ' + error.message, 'error');
    }
}

function displaySections(sections) {
    const tbody = document.querySelector('#sectionsTable tbody');
    tbody.innerHTML = '';
    
    sections.forEach(section => {
        const row = `
            <tr>
                <td>${section.section_id}</td>
                <td>${section.section_name}</td>
                <td>
                    <button class="btn btn-warning" onclick="editSection(${section.section_id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteSection(${section.section_id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

async function loadSectionOptions() {
    try {
        const response = await fetch(`${API_BASE}/sections`);
        const sections = await response.json();
        const select = document.getElementById('section_id_class');
        select.innerHTML = '<option value="">Select Section</option>';
        sections.forEach(section => {
            select.innerHTML += `<option value="${section.section_id}">${section.section_name}</option>`;
        });
    } catch (error) {
        console.error('Error loading section options:', error);
    }
}

async function handleSectionSubmit(e) {
    e.preventDefault();
    
    const sectionId = document.getElementById('section_id_form').value;
    const sectionData = {
        section_name: document.getElementById('section_name').value
    };
    
    try {
        const url = sectionId ? `${API_BASE}/sections/${sectionId}` : `${API_BASE}/sections`;
        const method = sectionId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sectionData)
        });
        
        if (response.ok) {
            showMessage(sectionId ? 'Section updated successfully!' : 'Section added successfully!');
            resetSectionForm();
            loadSections();
        } else {
            const error = await response.json();
            showMessage('Error: ' + error.error, 'error');
        }
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
    }
}

async function editSection(id) {
    try {
        const response = await fetch(`${API_BASE}/sections/${id}`);
        const section = await response.json();
        
        document.getElementById('section_id_form').value = section.section_id;
        document.getElementById('section_name').value = section.section_name;
        document.getElementById('section-form-title').textContent = 'Edit Section';
    } catch (error) {
        showMessage('Error loading section: ' + error.message, 'error');
    }
}

async function deleteSection(id) {
    if (!confirm('Are you sure you want to delete this section?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/sections/${id}`, { method: 'DELETE' });
        
        if (response.ok) {
            showMessage('Section deleted successfully!');
            loadSections();
        } else {
            const error = await response.json();
            showMessage('Error: ' + error.error, 'error');
        }
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
    }
}

function resetSectionForm() {
    document.getElementById('sectionForm').reset();
    document.getElementById('section_id_form').value = '';
    document.getElementById('section-form-title').textContent = 'Add New Section';
}

// ============= CLASSES =============

async function loadClasses() {
    try {
        const response = await fetch(`${API_BASE}/classes`);
        const classes = await response.json();
        displayClasses(classes);
        loadCourseOptions();
        loadSectionOptions();
        loadTeacherOptions();
    } catch (error) {
        showMessage('Error loading classes: ' + error.message, 'error');
    }
}

function displayClasses(classes) {
    const tbody = document.querySelector('#classesTable tbody');
    tbody.innerHTML = '';
    
    classes.forEach(classItem => {
        const row = `
            <tr>
                <td>${classItem.class_id}</td>
                <td>${classItem.class_description}</td>
                <td>${classItem.course_code || 'N/A'}</td>
                <td>${classItem.section_name || 'N/A'}</td>
                <td>${classItem.teacher_name || 'N/A'}</td>
                <td>${classItem.semester || 'N/A'}</td>
                <td>${classItem.year || 'N/A'}</td>
                <td>
                    <button class="btn btn-warning" onclick="editClass(${classItem.class_id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteClass(${classItem.class_id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

async function handleClassSubmit(e) {
    e.preventDefault();
    
    const classId = document.getElementById('class_id_form').value;
    const classData = {
        class_description: document.getElementById('class_description').value,
        course_id: document.getElementById('course_id_class').value,
        section_id: document.getElementById('section_id_class').value,
        teacher_id: document.getElementById('teacher_id_class').value,
        semester: document.getElementById('semester').value,
        year: document.getElementById('year').value,
        room_number: document.getElementById('room_number').value,
        schedule: document.getElementById('schedule').value
    };
    
    try {
        const url = classId ? `${API_BASE}/classes/${classId}` : `${API_BASE}/classes`;
        const method = classId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(classData)
        });
        
        if (response.ok) {
            showMessage(classId ? 'Class updated successfully!' : 'Class added successfully!');
            resetClassForm();
            loadClasses();
        } else {
            const error = await response.json();
            showMessage('Error: ' + error.error, 'error');
        }
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
    }
}

async function editClass(id) {
    try {
        const response = await fetch(`${API_BASE}/classes/${id}`);
        const classItem = await response.json();
        
        document.getElementById('class_id_form').value = classItem.class_id;
        document.getElementById('class_description').value = classItem.class_description;
        document.getElementById('course_id_class').value = classItem.course_id;
        document.getElementById('section_id_class').value = classItem.section_id;
        document.getElementById('teacher_id_class').value = classItem.teacher_id;
        document.getElementById('semester').value = classItem.semester || '';
        document.getElementById('year').value = classItem.year || '';
        document.getElementById('room_number').value = classItem.room_number || '';
        document.getElementById('schedule').value = classItem.schedule || '';
        document.getElementById('class-form-title').textContent = 'Edit Class';
    } catch (error) {
        showMessage('Error loading class: ' + error.message, 'error');
    }
}

async function deleteClass(id) {
    if (!confirm('Are you sure you want to delete this class?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/classes/${id}`, { method: 'DELETE' });
        
        if (response.ok) {
            showMessage('Class deleted successfully!');
            loadClasses();
        } else {
            const error = await response.json();
            showMessage('Error: ' + error.error, 'error');
        }
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
    }
}

function resetClassForm() {
    document.getElementById('classForm').reset();
    document.getElementById('class_id_form').value = '';
    document.getElementById('class-form-title').textContent = 'Add New Class';
}

// ============= ENROLLMENTS =============

async function loadEnrollments() {
    try {
        const response = await fetch(`${API_BASE}/enrollments`);
        const enrollments = await response.json();
        displayEnrollments(enrollments);
        loadStudentOptions();
        loadClassOptions();
    } catch (error) {
        showMessage('Error loading enrollments: ' + error.message, 'error');
    }
}

function displayEnrollments(enrollments) {
    const tbody = document.querySelector('#enrollmentsTable tbody');
    tbody.innerHTML = '';
    
    enrollments.forEach(enrollment => {
        const row = `
            <tr>
                <td>${enrollment.enrollment_id}</td>
                <td>${enrollment.student_name || 'N/A'}</td>
                <td>${enrollment.class_description || 'N/A'}</td>
                <td>${enrollment.course_code || 'N/A'}</td>
                <td>${new Date(enrollment.enrollment_date).toLocaleDateString()}</td>
                <td>${enrollment.grade || 'N/A'}</td>
                <td>${enrollment.status}</td>
                <td>
                    <button class="btn btn-warning" onclick="editEnrollment(${enrollment.enrollment_id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteEnrollment(${enrollment.enrollment_id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

async function loadStudentOptions() {
    try {
        const response = await fetch(`${API_BASE}/students`);
        const students = await response.json();
        const select = document.getElementById('student_id_enroll');
        select.innerHTML = '<option value="">Select Student</option>';
        students.forEach(student => {
            select.innerHTML += `<option value="${student.student_id}">${student.student_fname} ${student.student_lname}</option>`;
        });
    } catch (error) {
        console.error('Error loading student options:', error);
    }
}

async function loadClassOptions() {
    try {
        const response = await fetch(`${API_BASE}/classes`);
        const classes = await response.json();
        const select = document.getElementById('class_id_enroll');
        select.innerHTML = '<option value="">Select Class</option>';
        classes.forEach(classItem => {
            select.innerHTML += `<option value="${classItem.class_id}">${classItem.class_description} (${classItem.course_code})</option>`;
        });
    } catch (error) {
        console.error('Error loading class options:', error);
    }
}

async function handleEnrollmentSubmit(e) {
    e.preventDefault();
    
    const enrollmentId = document.getElementById('enrollment_id_form').value;
    const enrollmentData = {
        student_id: document.getElementById('student_id_enroll').value,
        class_id: document.getElementById('class_id_enroll').value,
        enrollment_date: document.getElementById('enrollment_date').value,
        grade: document.getElementById('grade').value,
        status: document.getElementById('status').value
    };
    
    try {
        const url = enrollmentId ? `${API_BASE}/enrollments/${enrollmentId}` : `${API_BASE}/enrollments`;
        const method = enrollmentId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(enrollmentData)
        });
        
        if (response.ok) {
            showMessage(enrollmentId ? 'Enrollment updated successfully!' : 'Enrollment added successfully!');
            resetEnrollmentForm();
            loadEnrollments();
        } else {
            const error = await response.json();
            showMessage('Error: ' + error.error, 'error');
        }
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
    }
}

async function editEnrollment(id) {
    try {
        const response = await fetch(`${API_BASE}/enrollments/${id}`);
        const enrollment = await response.json();
        
        document.getElementById('enrollment_id_form').value = enrollment.enrollment_id;
        document.getElementById('student_id_enroll').value = enrollment.student_id;
        document.getElementById('class_id_enroll').value = enrollment.class_id;
        document.getElementById('enrollment_date').value = enrollment.enrollment_date.split('T')[0];
        document.getElementById('grade').value = enrollment.grade || '';
        document.getElementById('status').value = enrollment.status;
        document.getElementById('enrollment-form-title').textContent = 'Edit Enrollment';
    } catch (error) {
        showMessage('Error loading enrollment: ' + error.message, 'error');
    }
}

async function deleteEnrollment(id) {
    if (!confirm('Are you sure you want to delete this enrollment?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/enrollments/${id}`, { method: 'DELETE' });
        
        if (response.ok) {
            showMessage('Enrollment deleted successfully!');
            loadEnrollments();
        } else {
            const error = await response.json();
            showMessage('Error: ' + error.error, 'error');
        }
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
    }
}

function resetEnrollmentForm() {
    document.getElementById('enrollmentForm').reset();
    document.getElementById('enrollment_id_form').value = '';
    document.getElementById('enrollment-form-title').textContent = 'Add New Enrollment';
    setDefaultDate();
}

// ============= REPORTS =============

async function loadEnrollmentReport() {
    try {
        const response = await fetch(`${API_BASE}/reports/enrollment`);
        const report = await response.json();
        displayReport(report);
    } catch (error) {
        showMessage('Error loading report: ' + error.message, 'error');
    }
}

function displayReport(report) {
    const tbody = document.querySelector('#reportTable tbody');
    tbody.innerHTML = '';
    
    report.forEach(row => {
        const tr = `
            <tr>
                <td>${row.ClassID}</td>
                <td>${row.ClassDescription}</td>
                <td>${row.StudentID}</td>
                <td>${row.StudentFName}</td>
                <td>${row.StudentLName}</td>
                <td>${row.DegreeID}</td>
                <td>${row.DegreeDesc}</td>
                <td>${row.ClassSection}</td>
                <td>${row.TeacherID}</td>
                <td>${row.TeacherFName}</td>
                <td>${row.TeacherLName}</td>
                <td>${row.CourseID}</td>
                <td>${row.CourseDesc}</td>
                <td>${row.Grade || 'N/A'}</td>
                <td>${row.Status}</td>
            </tr>
        `;
        tbody.innerHTML += tr;
    });
}

function exportReport() {
    const table = document.getElementById('reportTable');
    let csv = [];
    
    // Get headers
    const headers = [];
    table.querySelectorAll('thead th').forEach(th => headers.push(th.textContent));
    csv.push(headers.join(','));
    
    // Get data rows
    table.querySelectorAll('tbody tr').forEach(tr => {
        const row = [];
        tr.querySelectorAll('td').forEach(td => {
            row.push('"' + td.textContent + '"');
        });
        csv.push(row.join(','));
    });
    
    // Download CSV
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'enrollment_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    showMessage('Report exported successfully!', 'success');
}
