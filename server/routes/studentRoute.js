const express = require('express');
const router = express.Router();
const { Student } = require('../../src/models');

//https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
router.get("/", async (req, res) => {
    try {
      const students = await Student.findAll();
      res.json(students); // Ensures JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    } 
});

  //Enroll a new student (create), Use case 1

 router.post("/add", async (req, res) => {
    // get params from body
    const { studentID, studentName, studentDOB, personalPhoneNum, housePhoneNum, sex, currentAddress, nationality, degree, gpa, studentStatus, studentEmail } = req.body;

    // Create row in models
    try {
      const newStudent = await Student.create({ studentID, studentName, studentDOB, personalPhoneNum, housePhoneNum, sex, currentAddress, nationality, degree, gpa, studentStatus, studentEmail });
      res.status(201).json(newStudent);
      console.log("student added");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add student' });
    }

    

});

//Update an existing student information
router.put("/update/:studentID", async (req, res) => {
  const { studentID } = req.params;
  const updatedStudent = req.body;
  //find and check if student ID exists

  try {
    const student = await Student.findOne({ where: { studentID }});
    if (student){
      await student.update(updatedStudent);
      res.status(200).json({ message: 'Student updated successfully', student });
    }else{
      res.status(404).json({ error: 'Student not found' });
    }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update student' });
      }
});

module.exports = router
