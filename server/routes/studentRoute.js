const express = require('express');
const router = express.Router();
const { Student } = require('../../src/models');


router.route('/')
  // returns all student
  .get(async (req, res) => {
    try {
        const students = await Student.findAll();
        res.json(students); // Ensures JSON response
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
  })

  //Enroll a new student (create), Use case 1
  .post(async (req, res) => {

    // get params from body
    const {studentID, studentName, studentDOB, personalPhoneNum, housePhoneNum, sex, currentAddress, nationality, degree, gpa, studentstatus, studentEmail} = req.body;

    // Create row in models
    try {
        const newStudent = await Student.create({studentID, studentName, studentDOB, personalPhoneNum, housePhoneNum, sex, currentAddress, nationality, degree, gpa, studentstatus, studentEmail});
        res.status(201).json(newStudent);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add student' });
      }

  //Update an existing student information
  
});

module.exports = router
