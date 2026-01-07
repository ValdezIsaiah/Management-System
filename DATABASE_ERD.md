# Database Schema & ERD Documentation

## Entity Relationship Diagram (ERD)

### Normalized to Third Normal Form (3NF)

```
┌─────────────────┐
│    DEGREES      │
├─────────────────┤
│ PK degree_id    │
│    degree_desc  │
└────────┬────────┘
         │
         │ 1:N
         │
         ▼
┌─────────────────┐         ┌──────────────────┐
│    STUDENTS     │         │   ENROLLMENTS    │
├─────────────────┤         ├──────────────────┤
│ PK student_id   │────────▶│ PK enrollment_id │
│    student_fname│    N:M  │ FK student_id    │
│    student_lname│         │ FK class_id      │
│ FK degree_id    │         │    enrollment_dt │
│    email        │         │    grade         │
│    phone        │         │    status        │
└─────────────────┘         └────────┬─────────┘
                                     │
                                     │ N:1
                                     ▼
                            ┌──────────────────┐
                            │     CLASSES      │
                            ├──────────────────┤
                            │ PK class_id      │
                            │    class_desc    │
                            │ FK course_id     │
                            │ FK section_id    │
                            │ FK teacher_id    │
                            │    semester      │
                            │    year          │
                            │    room_number   │
                            │    schedule      │
                            └───┬───┬───┬──────┘
                                │   │   │
                    ┌───────────┘   │   └─────────────┐
                    │               │                 │
                    ▼ N:1           ▼ N:1             ▼ N:1
          ┌─────────────┐  ┌───────────────┐  ┌──────────────┐
          │   COURSES   │  │   SECTIONS    │  │   TEACHERS   │
          ├─────────────┤  ├───────────────┤  ├──────────────┤
          │ PK course_id│  │ PK section_id │  │PK teacher_id │
          │  course_code│  │  section_name │  │ teacher_fname│
          │  course_desc│  └───────────────┘  │ teacher_lname│
          │  credits    │                     │  email       │
          └─────────────┘                     │  phone       │
                                              └──────────────┘
```

## Tables & Relationships

### 1. DEGREES (Independent Entity)
**Purpose**: Store academic degree programs

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| degree_id | INT | PK, AUTO_INCREMENT | Unique degree identifier |
| degree_desc | VARCHAR(100) | NOT NULL, UNIQUE | Degree name/description |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Last update time |

**Relationships**:
- One-to-Many with STUDENTS (one degree can have many students)

---

### 2. STUDENTS (Depends on DEGREES)
**Purpose**: Store student information

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| student_id | INT | PK, AUTO_INCREMENT | Unique student identifier |
| student_fname | VARCHAR(50) | NOT NULL | Student first name |
| student_lname | VARCHAR(50) | NOT NULL | Student last name |
| degree_id | INT | FK → degrees(degree_id) | Reference to degree |
| email | VARCHAR(100) | | Student email |
| phone | VARCHAR(20) | | Student phone |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Last update time |

**Relationships**:
- Many-to-One with DEGREES (many students belong to one degree)
- Many-to-Many with CLASSES through ENROLLMENTS

**Indexes**:
- idx_student_degree ON degree_id
- idx_student_name ON (student_lname, student_fname)

---

### 3. TEACHERS (Independent Entity)
**Purpose**: Store teacher/instructor information

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| teacher_id | INT | PK, AUTO_INCREMENT | Unique teacher identifier |
| teacher_fname | VARCHAR(50) | NOT NULL | Teacher first name |
| teacher_lname | VARCHAR(50) | NOT NULL | Teacher last name |
| email | VARCHAR(100) | | Teacher email |
| phone | VARCHAR(20) | | Teacher phone |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Last update time |

**Relationships**:
- One-to-Many with CLASSES (one teacher can teach many classes)

**Indexes**:
- idx_teacher_name ON (teacher_lname, teacher_fname)

---

### 4. COURSES (Independent Entity)
**Purpose**: Store course catalog information

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| course_id | INT | PK, AUTO_INCREMENT | Unique course identifier |
| course_code | VARCHAR(20) | NOT NULL, UNIQUE | Course code (e.g., CS101) |
| course_desc | VARCHAR(100) | NOT NULL | Course description |
| credits | INT | DEFAULT 3 | Credit hours |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Last update time |

**Relationships**:
- One-to-Many with CLASSES (one course can have many class instances)

---

### 5. SECTIONS (Independent Entity)
**Purpose**: Store section designations

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| section_id | INT | PK, AUTO_INCREMENT | Unique section identifier |
| section_name | VARCHAR(50) | NOT NULL, UNIQUE | Section name (e.g., Section A) |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Last update time |

**Relationships**:
- One-to-Many with CLASSES (one section designation can be used by many classes)

---

### 6. CLASSES (Depends on COURSES, SECTIONS, TEACHERS)
**Purpose**: Store actual class instances/offerings

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| class_id | INT | PK, AUTO_INCREMENT | Unique class identifier |
| class_description | VARCHAR(200) | NOT NULL | Class description |
| course_id | INT | FK → courses(course_id) | Reference to course |
| section_id | INT | FK → sections(section_id) | Reference to section |
| teacher_id | INT | FK → teachers(teacher_id) | Reference to teacher |
| semester | VARCHAR(20) | | Semester (Fall/Spring) |
| year | INT | | Academic year |
| room_number | VARCHAR(20) | | Classroom location |
| schedule | VARCHAR(100) | | Class schedule |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Last update time |

**Relationships**:
- Many-to-One with COURSES
- Many-to-One with SECTIONS
- Many-to-One with TEACHERS
- Many-to-Many with STUDENTS through ENROLLMENTS

**Indexes**:
- idx_class_course ON course_id
- idx_class_section ON section_id
- idx_class_teacher ON teacher_id

---

### 7. ENROLLMENTS (Junction/Bridge Table)
**Purpose**: Manage many-to-many relationship between STUDENTS and CLASSES

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| enrollment_id | INT | PK, AUTO_INCREMENT | Unique enrollment identifier |
| student_id | INT | FK → students(student_id) | Reference to student |
| class_id | INT | FK → classes(class_id) | Reference to class |
| enrollment_date | DATE | DEFAULT CURRENT_DATE | Date of enrollment |
| grade | VARCHAR(5) | | Student grade |
| status | ENUM | 'active', 'completed', 'dropped', 'withdrawn' | Enrollment status |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Last update time |

**Unique Constraint**: (student_id, class_id) - prevents duplicate enrollments

**Relationships**:
- Many-to-One with STUDENTS
- Many-to-One with CLASSES

**Indexes**:
- idx_enrollment_student ON student_id
- idx_enrollment_class ON class_id
- unique_enrollment ON (student_id, class_id)

---

## Normalization Analysis

### First Normal Form (1NF)
✓ All attributes contain atomic values
✓ No repeating groups
✓ Each table has a primary key

### Second Normal Form (2NF)
✓ In 1NF
✓ All non-key attributes are fully functionally dependent on the primary key
✓ No partial dependencies

### Third Normal Form (3NF)
✓ In 2NF
✓ No transitive dependencies
✓ All non-key attributes depend only on the primary key

**Examples of 3NF compliance**:
- Student's degree information is in DEGREES table, not repeated in STUDENTS
- Course information is in COURSES table, not repeated in CLASSES
- Teacher information is in TEACHERS table, not repeated in CLASSES

---

## Referential Integrity

### Foreign Key Constraints

**ON DELETE behaviors**:
- DEGREES → STUDENTS: **RESTRICT** (cannot delete degree with students)
- COURSES → CLASSES: **RESTRICT** (cannot delete course with classes)
- SECTIONS → CLASSES: **RESTRICT** (cannot delete section with classes)
- TEACHERS → CLASSES: **RESTRICT** (cannot delete teacher with classes)
- STUDENTS → ENROLLMENTS: **CASCADE** (delete student removes enrollments)
- CLASSES → ENROLLMENTS: **CASCADE** (delete class removes enrollments)

**ON UPDATE behaviors**:
- All relationships: **CASCADE** (update propagates to related records)

---

## Sample Report Query

The comprehensive enrollment report matches the required format:

```sql
SELECT 
    c.class_id as ClassID,
    c.class_description as ClassDescription,
    s.student_id as StudentID,
    s.student_fname as StudentFName,
    s.student_lname as StudentLName,
    d.degree_id as DegreeID,
    d.degree_desc as DegreeDesc,
    sec.section_name as ClassSection,
    t.teacher_id as TeacherID,
    t.teacher_fname as TeacherFName,
    t.teacher_lname as TeacherLName,
    co.course_id as CourseID,
    co.course_desc as CourseDesc,
    e.grade as Grade,
    e.status as Status
FROM enrollments e
JOIN students s ON e.student_id = s.student_id
JOIN classes c ON e.class_id = c.class_id
JOIN degrees d ON s.degree_id = d.degree_id
JOIN sections sec ON c.section_id = sec.section_id
JOIN teachers t ON c.teacher_id = t.teacher_id
JOIN courses co ON c.course_id = co.course_id
ORDER BY c.class_id, s.student_lname, s.student_fname;
```

---

## Database Statistics (Sample Data)

- **Degrees**: 5 records
- **Students**: 8 records
- **Teachers**: 5 records
- **Courses**: 8 records
- **Sections**: 5 records
- **Classes**: 8 records
- **Enrollments**: 14 records

---

## Performance Considerations

### Indexes Created
1. Primary keys (automatic indexes)
2. Foreign keys (indexes on FK columns)
3. Composite index on student name for faster searching
4. Composite index on teacher name for faster searching

### Query Optimization
- JOIN operations use indexed foreign keys
- WHERE clauses use indexed columns
- ORDER BY uses indexed columns when possible

---

## Data Integrity Rules

1. **Entity Integrity**: All primary keys are NOT NULL and UNIQUE
2. **Referential Integrity**: All foreign keys reference valid primary keys
3. **Domain Integrity**: Data types and constraints enforce valid values
4. **Business Rules**:
   - Student must have a degree
   - Class must have course, section, and teacher
   - Enrollment must have both student and class
   - No duplicate enrollments (unique constraint)
   - Grade can be NULL until assigned
   - Status defaults to 'active'
