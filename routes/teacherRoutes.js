const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.get('/', teacherController.getAllTeachers);
router.get('/all/including-inactive', teacherController.getAllTeachersIncludingInactive);
router.get('/search', teacherController.searchTeachers);
router.get('/:id', teacherController.getTeacherById);
router.post('/', teacherController.createTeacher);
router.put('/:id', teacherController.updateTeacher);
router.put('/:id/reactivate', teacherController.reactivateTeacher);
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;
