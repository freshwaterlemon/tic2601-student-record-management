const express = require('express');
const router = express.Router();
const { Student, NextOfKin} = require('../../server/models');

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

// Update an existing student information
router.put("/update/:studentID", async (req, res) => {
  const { studentID } = req.params;
  const { studentName, studentEmail, studentDOB, personalPhoneNum, housePhoneNum, sex, currentAddress, nationality, degree, gpa, status } = req.body;

  try {
    // Find and check if student ID exists
    const student = await Student.findOne({ where: { studentID } });
    if (student) {
      // Create an object with only the fields that are provided (non-empty)
      const updatedFields = {};
      if (studentName) updatedFields.studentName = studentName;
      if (studentEmail) updatedFields.studentEmail = studentEmail;
      if (studentDOB) updatedFields.studentDOB = studentDOB;
      if (personalPhoneNum) updatedFields.personalPhoneNum = personalPhoneNum;
      if (housePhoneNum) updatedFields.housePhoneNum = housePhoneNum;
      if (sex) updatedFields.sex = sex;
      if (currentAddress) updatedFields.currentAddress = currentAddress;
      if (nationality) updatedFields.nationality = nationality;
      if (degree) updatedFields.degree = degree;
      if (gpa) updatedFields.gpa = gpa;
      if (status) updatedFields.status = status;

      // Update student record with the provided fields
      await student.update(updatedFields);

      res.status(200).json({ message: 'Student updated successfully', student });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update student' });
  }
});

// update student status to "drop out"
router.put("/delete/:studentID", async (req, res) => {
  const { studentID } = req.params;

  try {

    const student = await Student.findOne({ where: { studentID } });

    if (student) {
      await student.update({ studentStatus: 'Drop Out' });

      res.status(200).json({ message: 'Student status updated to drop out', student });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update student status' });
  }
});

// Example: Express route for fetching NOK by studentID
router.get('/nok/:studentID', async (req, res) => {
  const { studentID } = req.params;
  console.log(`Fetching NOK for studentID: ${studentID}`);
  try {
      const nokData = await NextOfKin.findOne({ where: { studentRelationID: studentID } });
      if (!nokData) {
          console.log(`No NOK found for studentID: ${studentID}`);
          return res.status(404).json({ message: 'No emergency contact found for this student.' });
      }
      res.json(nokData);
  } catch (error) {
      console.error('Error fetching NOK data:', error);
      res.status(500).json({ message: 'Error fetching emergency contact info.', error });
  }
});



// //detele student
// router.delete("/delete/:studentID", async (req, res) => {
//   const { studentID } = req.params;

//   try {
//     // Find the student by ID
//     const student = await Student.findOne({ where: { studentID } });
//     if (student) {
//       await student.destroy(); // Delete the student record
//       res.status(200).json({ message: 'Student deleted successfully' });
//     } else {
//       res.status(404).json({ error: 'Student not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to delete student' });
//   }
// })

module.exports = router
