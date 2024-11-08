const express = require('express');
const router = express.Router();
const { Student, CourseRecord, Course, Module } = require('../../src/models'); // Adjust path if necessary

// Route to fetch transcript data by student number
router.get('/', async (req, res) => {
    const { studentNo } = req.query;

    if (!studentNo) {
        return res.status(400).json({ error: 'Student number is required' });
    }

    try {
        // Fetch student and related course data
        const student = await Student.findOne({
            where: { studentID: studentNo },
            attributes: ['studentName', 'studentID', 'studentDOB', 'degree', 'status', 'gpa'],
            include: [
                {
                    model: CourseRecord,
                    attributes: ['courseCode', 'grade', 'passfail'],
                    include: [
                        {
                            model: Course,
                            attributes: ['courseName']
                        },
                        {
                            model: Module, // Assuming Module is associated with CourseRecord
                            attributes: ['year', 'semester']
                        }
                    ]
                }
            ]
        });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Format the data for the front end
        const transcriptData = {
            name: student.studentName,
            studentNo: student.studentID,
            dob: student.studentDOB,
            degree: student.degree,
            status: student.status,
            gpa: student.gpa,
            courses: student.CourseRecords.map(record => ({
                courseCode: record.courseCode,
                moduleName: record.Course.courseName,
                year: record.Module ? record.Module.year : 'N/A',
                semester: record.Module ? record.Module.semester : 'N/A',
                grade: record.grade,
                passFail: record.passfail
            }))
        };

        res.json(transcriptData);
    } catch (error) {
        console.error("Error fetching transcript data:", error);
        res.status(500).json({ error: 'Failed to fetch transcript data' });
    }
});

module.exports = router;
