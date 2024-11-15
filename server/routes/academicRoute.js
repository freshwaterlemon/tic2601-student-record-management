const express = require('express');
const router = express.Router();
const { Student, CourseRecord, Course } = require('../../src/models');

// route to fetch transcript data by student number
router.get('/', async (req, res) => {
	const { studentNo } = req.query;

	if (!studentNo) {
		return res.status(400).json({ error: 'Student number is required' });
	}

	try {
		// fetch the student and related course records, including course details
		const student = await Student.findOne({
			where: { studentID: studentNo },
			attributes: [
				'studentName',
				'studentID',
				'studentDOB',
				'degree',
				'studentStatus',
			],
			include: [
				{
					model: CourseRecord,
					attributes: [
						'courseCode',
						'grade',
						'passfail',
						'year',
						'semester',
						'enrollmentStatus',
					],
					include: [
						{
							model: Course,
							attributes: ['courseName'],
						},
					],
				},
			],
		});

		if (!student) {
			return res.status(404).json({ error: 'Student not found' });
		}

		// calculate the cumulative GPA, filtering out invalid grades
		const grades = [];
		const courses = student.CourseRecords.map((record) => {
			// filter out withdrawn courses and those without grades
			if (record.enrollmentStatus !== 'withdrawn' && record.grade !== null) {
				// push the numeric grade to the grades array
				grades.push(record.grade);
			}

			return {
				courseCode: record.courseCode,
				moduleName: record.Course.courseName,
				year: record.year,
				semester: record.semester,
				grade: record.grade ?? 'complete course for grade',
				passFail: record.passfail ?? 'complete course for grade',
			};
		});

		// calculate GPA
		const totalGrade = grades.reduce((sum, grade) => sum + grade, 0);
		const averageGPA = grades.length ? totalGrade / grades.length : 0;
		const gpa = Math.min(averageGPA, 5).toFixed(2);

		// sort courses by year and semester
		courses.sort((a, b) => {
			if (a.year === b.year) {
				return a.semester.localeCompare(b.semester);
			}
			return a.year - b.year;
		});

		// format student data
		const transcriptData = {
			name: student.studentName,
			studentNo: student.studentID,
			dob: student.studentDOB
				? new Date(student.studentDOB).toLocaleDateString()
				: 'N/A',
			degree: student.degree,
			status: student.studentStatus,
			gpa: gpa,
			courses: courses,
		};

		res.json(transcriptData);
	} catch (error) {
		console.error('Error fetching transcript data:', error);
		res.status(500).json({ error: 'Failed to fetch transcript data' });
	}
});

module.exports = router;
