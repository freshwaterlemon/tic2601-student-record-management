const express = require('express');
const router = express.Router();
const { Course } = require('../../src/models');

// Route to fetch all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.json(courses);
    } catch (error) {
        console.error("Failed to fetch courses:", error);
        res.status(500).json({ error: 'Failed to fetch courses from the database' });
    }
});

// Route to add a new course
router.post('/add', async (req, res) => {
    const { courseCode, courseName, description } = req.body;

    if (!courseCode || !courseName || !description) {
        return res.status(400).json({ error: 'All fields (courseCode, courseName, description) are required' });
    }

    try {
        // Check if the course already exists
        const existingCourse = await Course.findOne({ where: { courseCode } });

        if (existingCourse) {
            return res.status(409).json({ error: 'Course with this courseCode already exists' });
        }

        // Create a new course if it doesn't exist
        const newCourse = await Course.create({ courseCode, courseName, description });
        res.status(201).json(newCourse);
    } catch (error) {
        console.error("Failed to add course:", error);
        res.status(500).json({ error: 'Failed to add course' });
    }
});


// Route to update an existing course (using courseCode in URL)
router.put('/update/:courseCode', async (req, res) => {
    const { courseCode } = req.params; // Get the courseCode from the URL
    const { courseName, description } = req.body; // Get the updated data from the request body

    if (!courseCode) {
        return res.status(400).json({ error: 'courseCode is required to update a course' });
    }

    try {
        // Find the course to update
        const course = await Course.findOne({ where: { courseCode } });
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Update the fields if provided
        if (courseName !== undefined) course.courseName = courseName;
        if (description !== undefined) course.description = description;

        // Save changes to the database
        await course.save();

        // Return the updated course
        res.status(200).json(course);
    } catch (error) {
        console.error('Failed to update course:', error);
        res.status(500).json({ error: 'Failed to update course' });
    }
});


module.exports = router;
