// server/routes/courseRecords.js
const express = require('express');
const router = express.Router();
const { CourseRecord, Student, Course } = require('../../src/models'); // Import models

// Route to fetch course records with filtering
router.get('/', async (req, res) => {
    const { courseCode, year, semester } = req.query;

    console.log("Received query parameters:", { courseCode, year, semester });

    try {
        const records = await CourseRecord.findAll({
            where: { courseCode }
        });
        console.log("Fetched records:", records); // Log fetched records for verification
        res.json(records);
    } catch (error) {
        console.error("Detailed error:", error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
    
});

module.exports = router;
