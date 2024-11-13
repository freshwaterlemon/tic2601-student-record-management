const express = require('express');
const router = express.Router();
const { Student } = require('../../src/models');

// add a new student
router.post('/add', async (req, res) => {
    const { studentNo, name, studentEmail, dob, personalPhoneNum, housePhoneNum, sex, currentAddress, nationality, degree, gpa, status } = req.body;
    
    console.log('Received data:', { studentNo, name, studentEmail, dob, personalPhoneNum, housePhoneNum, sex, currentAddress, nationality, degree, gpa, status });

    try {
        const newStudent = await Student.create({
            studentID: studentNo,
            studentName: name,
            studentEmail,
            studentDOB: dob,
            personalPhoneNum,
            housePhoneNum,
            sex,
            currentAddress,
            nationality,
            degree,
            gpa,
            status,
        });
        res.status(201).json(newStudent);
    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).json({ error: "Failed to add student" });
    }
});


// update an existing student
router.put('/update', async (req, res) => {
    const { studentNo, name, studentEmail, dob, personalPhoneNum, housePhoneNum, sex, currentAddress, nationality, degree, gpa, status } = req.body;

    console.log('Received data:', { studentNo, name, studentEmail, dob, personalPhoneNum, housePhoneNum, sex, currentAddress, nationality, degree, gpa, status });

    try {
        // find the student by their unique identifier
        const student = await Student.findOne({ where: { studentID: studentNo } });
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        // update only fields that have been provided (non-empty)
        student.studentName = name || student.studentName;
        student.studentEmail = studentEmail || student.studentEmail;
        student.studentDOB = dob || student.studentDOB;
        student.personalPhoneNum = personalPhoneNum || student.personalPhoneNum;
        student.housePhoneNum = housePhoneNum || student.housePhoneNum;
        student.sex = sex || student.sex;
        student.currentAddress = currentAddress || student.currentAddress;
        student.nationality = nationality || student.nationality;
        student.degree = degree || student.degree;
        student.gpa = gpa || student.gpa;
        student.status = status || student.status;

        // save the changes to the database
        await student.save();

        res.json(student);
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ error: "Failed to update student", details: error.message });
    }
});

// view all students
router.get('/all', async (req, res) => {
    try {
        const students = await Student.findAll({
            attributes: [
                'studentID', 'studentName', 'studentEmail', 'studentDOB',
                'personalPhoneNum', 'housePhoneNum', 'sex', 'currentAddress',
                'nationality', 'degree', 'gpa', 'status'
            ]
        });
        res.json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ error: "Failed to fetch students" });
    }
});

// route to fetch student data by student number
router.get('/search', async (req, res) => {
    const { studentNo } = req.query;
    console.log('Received query parameters:', { studentNo });

    if (!studentNo) {
        return res.status(400).json({ error: 'Student number is required' });
    }

    try {
        const student = await Student.findOne({
            where: { studentID: studentNo },
            attributes: [
                'studentName', 'studentID', 'studentEmail', 'studentDOB',
                'personalPhoneNum', 'housePhoneNum', 'sex', 'currentAddress',
                'nationality', 'degree', 'gpa', 'status'
            ]
        });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // format the data for the front end
        const transcriptData = {
            studentName: student.studentName,
            studentID: student.studentID,
            studentEmail: student.studentEmail,
            dob: student.studentDOB
                ? new Date(student.studentDOB).toLocaleDateString()
                : 'N/A',
            personalPhoneNum: student.personalPhoneNum,
            housePhoneNum: student.housePhoneNum,
            sex: student.sex,
            currentAddress: student.currentAddress,
            nationality: student.nationality,
            degree: student.degree,
            gpa: student.gpa,
            status: student.status,
        };

        res.json(transcriptData);
    } catch (error) {
        console.error('Error fetching transcript data:', error);
        res.status(500).json({ error: 'Failed to fetch transcript data' });
    }
});

// route to fetch student NOK data
router.get('/find', async (req, res) => {
    const { studentNo } = req.query;
    console.log('Received query parameters:', { studentNo });

    if (!studentNo) {
        return res.status(400).json({ error: 'Student number is required' });
    }

    try {
        const student = await Student.findOne({
            where: { studentID: studentNo },
            attributes: [
                'studentName', 'studentID', 'studentEmail'
            ]
        });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // format the data for the front end
        const transcriptData = {
            studentName: student.studentName,
            studentID: student.studentID,
            studentEmail: student.studentEmail,
        };

        res.json(transcriptData);
    } catch (error) {
        console.error('Error fetching transcript data:', error);
        res.status(500).json({ error: 'Failed to fetch transcript data' });
    }
});

module.exports = router;
