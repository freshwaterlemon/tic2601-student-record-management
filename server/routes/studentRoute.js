// for aaron back end code to be here
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

  // Enroll a new student (create), Use case 1
  .post((req, res) => {

    // get params from body
    const {StudentNum, StudentName, StudentDOB, PersonalPhoneNum, HousePhoneNum, Sex, CurrentAddress, Nationality, EmergencyContactName, EmergencyContactNum, Degree, GPA} = req.body;

    // Create row in models
    models.Student.create({ StudentNum, StudentName, StudentDOB, PersonalPhoneNum, HousePhoneNum, Sex, CurrentAddress, Nationality, EmergencyContactName, EmergencyContactNum, Degree, GPA })
      .then(() => {
        res.sendStatus(200); // Successfully added
      })
      .catch((error) => {
        // Handle unique constraint errors or other issues
        if (error.name === 'SequelizeUniqueConstraintError') {
          res.status(400).send('Bad Request: StudentNum already exists');
        } else {
          res.status(500).send('Unknown error');
        }
      });

  // Update an existing student information
  
});

module.exports = router
