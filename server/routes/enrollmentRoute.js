const express = require('express');
const router = express.Router();
const { Student, CourseRecord, Course } = require('../../src/models');

// route to post a new enrollment
router.post('/enroll', async (req, res) => {
	const { studentID, courseCode, year, semester } = req.body;

	try {
		// check if a withdrawn enrollment exists
		const existingEnrollment = await CourseRecord.findOne({
			where: {
				studentID,
				courseCode,
				year,
				semester,
			},
		});

		if (existingEnrollment) {
			if (existingEnrollment.enrollmentStatus === 'withdrawn') {
				// update status to "enrolled" if it's currently "withdrawn"
				existingEnrollment.enrollmentStatus = 'enrolled';
<<<<<<< Updated upstream
=======
                
>>>>>>> Stashed changes
				await existingEnrollment.save();

				return res
					.status(200)
					.json({ updatedEnrollment: existingEnrollment });
			} else {
				// ff the student is already enrolled, return a conflict response
				return res
					.status(409)
					.json({
						error: 'Student is already enrolled in this course for the specified term.',
					});
			}
		}

		const newEnrollment = await CourseRecord.create({
			studentID,
			courseCode,
			year,
			semester,
			enrollmentStatus: 'enrolled',
		});

		res.status(201).json({ newEnrollment });
	} catch (error) {
		console.error('Failed to enroll student:', error);
		res.status(500).json({ error: 'Failed to enroll student' });
	}
});

// route to unenroll a student
router.post('/unenroll', async (req, res) => {
	const { studentID, courseCode, year, semester } = req.body;

	try {
		const existingEnrollment = await CourseRecord.findOne({
			where: {
				studentID,
				courseCode,
				year,
				semester,
			},
		});

		if (!existingEnrollment) {
			return res.status(404).json({ error: 'Course record not found' });
		}

		// check if the current enrollment status is "enrolled"
		if (existingEnrollment.enrollmentStatus === 'enrolled') {
			// update the enrollmentStatus to "withdrawn"
			existingEnrollment.enrollmentStatus = 'withdrawn';

			// save to db
			await existingEnrollment.save();

			return res
				.status(200)
				.json({ updatedEnrollment: existingEnrollment });
		} else {
			return res
				.status(409)
				.json({
					error: 'Student is already withdrawn from this course for the specified term.',
				});
		}
	} catch (error) {
		console.error('Failed to unenroll student:', error);
		res.status(500).json({ error: 'Failed to unenroll student' });
	}
});

// route to fetch student records from course record after enrollment or unerollment
router.get('/display', async (req, res) => {
	const { studentID, courseCode, year, semester } = req.query;

	console.log('Received query parameters:', {
		studentID,
		courseCode,
		year,
		semester,
	});

	const filters = {};
	if (studentID) filters.studentID = studentID;
	if (courseCode) filters.courseCode = courseCode;
	if (year) filters.year = year;
	if (semester) filters.semester = semester;
	console.log('Received query parameters:', filters);
	try {
		const records = await CourseRecord.findAll({
			where: filters,
			include: [
				{ model: Student, attributes: ['studentID', 'studentName'] },
				{ model: Course, attributes: ['courseName'] },
			],
		});

		const formattedRecords = records.map((record) => ({
			studentID: record.studentID,
			studentName: record.Student.studentName,
			courseCode: record.courseCode,
			courseName: record.Course.courseName,
			year: record.year,
			semester: record.semester,
			enrollmentStatus: record.enrollmentStatus,
		}));

		res.json({ students: formattedRecords });
	} catch (error) {
		console.error('Detailed error:', error);
		res.status(500).json({ error: 'Failed to fetch data' });
	}
});

module.exports = router;
