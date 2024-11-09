const express = require('express');
const router = express.Router();
const { CourseRecord, Student, Course } = require('../../src/models');

// route to fetch course records with filtering by courseCode, year, and semester
router.get('/', async (req, res) => {
    const { courseCode, year, semester } = req.query;

    console.log("Received query parameters:", { courseCode, year, semester });

    try {
        // fetch records based on courseCode, year, and semester
        const records = await CourseRecord.findAll({
            where: { courseCode, year, semester },
            include: [
                {
                    model: Student,
                    attributes: ['studentID', 'studentName'] 
                },
                {
                    model: Course,
                    attributes: ['courseName']
                }
            ]
        });

        // map the records to include only necessary data
        const formattedRecords = records.map(record => ({
            studentNo: record.Student.studentID,
            studentName: record.Student.studentName,
            grade: record.grade,
            passFail: record.passfail,
            year: record.year,
            semester: record.semester
        }));

        res.json(formattedRecords);
    } catch (error) {
        console.error("Detailed error:", error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// route to post a student's grade and pass/fail status for a specific course record identified by courseCode, year, and semester
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

        // update the grade and pass/fail status
        record.grade = grade;
        record.passfail = passFail;

        // save the changes to the database
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
