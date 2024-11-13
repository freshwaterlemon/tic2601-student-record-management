const express = require('express');
const router = express.Router();
const { Course } = require('../../src/models');

// route to fetch all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.json(courses);
    } catch (error) {
        console.error("Failed to fetch courses:", error);
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
});

// route to post a new course
router.post('/add', async (req, res) => {
    const { courseCode, courseName, description } = req.body;

    // Check if required fields are present
    if (!courseCode || !courseName || !description) {
        return res.status(400).json({ error: 'All fields (courseCode, courseName, description) are required' });
    }

    try {
        const newCourse = await Course.create({
            courseCode,
            courseName,
            description,
        });
        res.status(201).json(newCourse);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            // Handle duplicate courseCode error
            return res.status(409).json({ error: 'Course with this courseCode already exists' });
        }
        console.error("Failed to add course:", error);
        res.status(500).json({ error: 'Failed to add course' });
    }
});

module.exports = router;
