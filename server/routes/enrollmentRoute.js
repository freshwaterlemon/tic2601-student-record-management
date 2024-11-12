// for amos back end code to be here
const express = require('express');
const router = express.Router();
const { Student, CourseRecord, Course } = require('../../src/models');

// Route to enroll a student in a course
router.post('/enroll', async (req, res) => {
    const { studentNo, courseCode, year, semester } = req.body;

    if (!studentNo || !courseCode || !year || !semester) {
        return res.status(400).json({ error: 'All fields (studentNo, courseCode, year, semester) are required' });
    }

    try {
        // Check if student exists
        const student = await Student.findOne({ where: { studentID: studentNo } });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Check if course exists
        const course = await Course.findOne({ where: { courseCode } });
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if student is already enrolled in the course for the specified year and semester
        const existingEnrollment = await CourseRecord.findOne({
            where: {
                studentID: studentNo,
                courseCode,
                year,
                semester
            }
        });
        if (existingEnrollment) {
            return res.status(409).json({ error: 'Student is already enrolled in this course for the specified year and semester' });
        }

        // Enroll student in the course
        const newEnrollment = await CourseRecord.create({
            studentID: studentNo,
            courseCode,
            year,
            semester,
            grade: null, // grade can be set later
            passfail: null // pass/fail status can be determined later
        });

        // Respond with success message and enrollment details
        res.status(201).json({
            message: 'Student successfully enrolled in course',
            enrollment: {
                studentID: newEnrollment.studentID,
                courseCode: newEnrollment.courseCode,
                year: newEnrollment.year,
                semester: newEnrollment.semester
            }
        });
    } catch (error) {
        console.error("Error enrolling student in course:", error);
        res.status(500).json({ error: 'Failed to enroll student in course' });
    }
});

module.exports = router;
