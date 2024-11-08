const express = require('express');
const router = express.Router();
const { CourseRecord, Student, Course } = require('../../src/models'); // Import models

// Route to fetch course records with filtering
router.get('/', async (req, res) => {
    const { courseCode, year, semester } = req.query;

    console.log("Received query parameters:", { courseCode, year, semester });

    try {
        const records = await CourseRecord.findAll({
            where: { courseCode },
            include: [
                {
                    model: Student,
                    attributes: ['studentID', 'studentName'] // Select only studentID and studentName
                },
                {
                    model: Course,
                    attributes: ['courseName'] // Optionally include courseName if needed
                }
            ]
        });

        // Map the records to include only necessary data
        const formattedRecords = records.map(record => ({
            studentNo: record.Student.studentID,
            studentName: record.Student.studentName,
            grade: record.grade,
            passFail: record.passfail
        }));

        console.log("Fetched records:", formattedRecords); // Log fetched records for verification
        res.json(formattedRecords);
    } catch (error) {
        console.error("Detailed error:", error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Route to update a student's grade and pass/fail status
router.post('/update', async (req, res) => {
    const { studentNo, courseCode, grade, passFail } = req.body;

    try {
        // Find the course record for the specified student and course
        const record = await CourseRecord.findOne({
            where: {
                studentID: studentNo,
                courseCode: courseCode
            }
        });

        if (!record) {
            return res.status(404).json({ error: 'Course record not found' });
        }

        // Update the grade and pass/fail status
        record.grade = grade;
        record.passfail = passFail;

        // Save the changes to the database
        await record.save();

        console.log("Updated record:", {
            studentNo,
            courseCode,
            grade,
            passFail
        });

        res.json({ message: 'Grade updated successfully', record });
    } catch (error) {
        console.error("Failed to update grade:", error);
        res.status(500).json({ error: 'Failed to update grade' });
    }
});

module.exports = router;
