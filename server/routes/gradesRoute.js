const express = require('express');
const router = express.Router();
const { CourseRecord, Student, Course } = require('../../src/models');

// Route to fetch course records with filtering by courseCode, year, and semester
router.get('/', async (req, res) => {
    const { courseCode, year, semester } = req.query;

    console.log("Received query parameters:", { courseCode, year, semester });

    try {
        // Fetch records based on courseCode, year, and semester
        const records = await CourseRecord.findAll({
            where: { courseCode, year, semester },
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
            passFail: record.passfail,
            year: record.year,
            semester: record.semester
        }));

        console.log("Fetched records:", formattedRecords); // Log fetched records for verification
        res.json(formattedRecords);
    } catch (error) {
        console.error("Detailed error:", error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Route to update a student's grade and pass/fail status for a specific course record identified by courseCode, year, and semester
router.post('/update', async (req, res) => {
    const { studentNo, courseCode, year, semester, grade, passFail } = req.body;

    try {
        // Find the specific course record by studentID, courseCode, year, and semester
        const record = await CourseRecord.findOne({
            where: {
                studentID: studentNo,
                courseCode: courseCode,
                year: year,
                semester: semester
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
            year,
            semester,
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
