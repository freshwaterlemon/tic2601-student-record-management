const express = require('express');
const router = express.Router();
const { CourseRecord, Student, Course } = require('../../server/models');

// route to fetch course records with filtering by courseCode, year, and semester
router.get('/', async (req, res) => {
	const { courseCode, year, semester } = req.query;

	// console.log('Received query parameters:', { courseCode, year, semester });

	const filters = {};
	if (courseCode) filters.courseCode = courseCode;
	if (year) filters.year = year;
	if (semester) filters.semester = semester;

	try {
		// fetch records based on courseCode, year, and semester
		const records = await CourseRecord.findAll({
			where: filters,
			include: [
				{
					model: Student,
					attributes: ['studentID', 'studentName'],
				},
				{
					model: Course,
					attributes: ['courseName'],
				},
			],
		});

		if (!records.length) {
			return res.status(404).json({ error: 'No course records found matching the criteria' });
		}

		// map the records to include only necessary data
		const formattedRecords = records.map((record) => ({
			studentNo: record.Student.studentID,
			studentName: record.Student.studentName,
			courseName: record.Course.courseName,
			grade: record.grade,
			passFail: record.passfail,
			year: record.year,
			semester: record.semester,
			enrollmentStatus: record.enrollmentStatus,
		}));

		res.json(formattedRecords);
	} catch (error) {
		console.error('Detailed error:', error);
		res.status(500).json({ error: 'Failed to fetch data' });
	}
});

// route to post a student's grade and pass/fail status for a specific course record identified by courseCode, year, and semester
router.post('/update', async (req, res) => {
	const { studentNo, courseCode, year, semester, grade, passFail } = req.body;

	// Validate the input
	if (!grade || (typeof grade !== 'string' && typeof grade !== 'number')) {
		return res.status(400).json({ error: 'Invalid grade format. It must be a string or number.' });
	}
	if (!['Pass', 'Fail'].includes(passFail)) {
		return res.status(400).json({ error: 'Invalid pass/fail status. It must be either "Pass" or "Fail".' });
	}

	try {
		// find the specific course record by studentID, courseCode, year, and semester
		const record = await CourseRecord.findOne({
			where: {
				studentID: studentNo,
				courseCode: courseCode,
				year: year,
				semester: semester,
			},
		});

		if (!record) {
			return res.status(404).json({ error: 'Course record not found' });
		}

		// update the grade and pass/fail status
		record.grade = grade;
		record.passfail = passFail;

		// save the changes to the database
		await record.save();

		// console.log('Updated record:', {
		// 	studentNo,
		// 	courseCode,
		// 	year,
		// 	semester,
		// 	grade,
		// 	passFail,
		// });

		res.json({ message: 'Grade updated successfully', record });
	} catch (error) {
		console.error('Failed to update grade:', error);
		res.status(500).json({ error: 'Failed to update grade' });
	}
});

module.exports = router;
