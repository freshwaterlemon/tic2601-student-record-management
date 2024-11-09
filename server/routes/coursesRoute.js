// server/routes/courses.js
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

    try {
        const newCourse = await Course.create({
            courseCode,
            courseName,
            description,
        });
        res.status(201).json(newCourse);
    } catch (error) {
        console.error("Failed to add course:", error);
        res.status(500).json({ error: 'Failed to add course' });
    }
});

module.exports = router;
