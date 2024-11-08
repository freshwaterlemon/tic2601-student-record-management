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

module.exports = router;
