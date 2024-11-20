import React, { useState } from 'react';
import './Grade.css';
import MessageDisplay from '../../components/MessageDisplay';
import Pagination from '../../components/Pagination';

const Grade = () => {
	const [studentNo, setStudentNo] = useState('');
	const [courseCode, setCourseCode] = useState('');
	const [courseName, setCourseName] = useState('');
	const [grade, setGrade] = useState('');
	const [passFail, setPassFail] = useState('');
	const [year, setYear] = useState('');
	const [semester, setSemester] = useState('');
	const [students, setStudents] = useState([]);
	const [message, setMessage] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const studentsPerPage = 10;

	const [sortConfig, setSortConfig] = useState({
		key: null,
		direction: 'ascending',
	});

	const handleFilter = async (e) => {
		if (e) e.preventDefault();
		if (!courseCode || !year || !semester) {
			setMessage('Please fill in all required fields for filtering.');
			setTimeout(() => setMessage(''), 3000);
			return;
		}
		try {
			const response = await fetch(
				`http://localhost:3001/grade?courseCode=${courseCode}&year=${year}&semester=${semester}`
			);
			if (!response.ok) throw new Error('Failed to fetch data');
			const data = await response.json();

			if (data.length > 0) {
				setCourseName(data[0].courseName);
			}

			setStudents(data);
		} catch (error) {
			console.error('Error fetching data:', error);
			setStudents([]);
			setCourseName('');
		}
	};

	const handleSubmitGrade = async (e) => {
		e.preventDefault();
		if (
			!studentNo ||
			!courseCode ||
			!grade ||
			!passFail ||
			!year ||
			!semester
		) {
			setMessage(
				'Please fill in all required fields for grade submission.'
			);
			setTimeout(() => setMessage(''), 3000);
			return;
		}
		try {
			const response = await fetch('http://localhost:3001/grade/update', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					studentNo,
					courseCode,
					courseName,
					grade,
					passFail,
					year,
					semester,
				}),
			});
			if (!response.ok) throw new Error('Failed to submit grade');

			setMessage('Grade updated successfully!');
			setTimeout(() => setMessage(''), 3000);

			// Clear inputs
			setStudentNo('');
			setCourseCode('');
			setCourseName('');
			setGrade('');
			setPassFail('');
			setYear('');
			setSemester('');

			handleFilter(); // refresh data after submission
		} catch (error) {
			console.error('Error submitting grade:', error);
			setMessage('Error submitting grade. Please check input(case sensative) and try again.');
		}
	};

	const totalPages = Math.ceil(students.length / studentsPerPage);
	const displayedStudents = students
		.filter((student) =>
			student.studentNo
				.toLowerCase()
				.includes(searchQuery.toLowerCase())
		)
		.sort((a, b) => {
			if (sortConfig.key) {
				const directionMultiplier =
					sortConfig.direction === 'ascending' ? 1 : -1;
				if (a[sortConfig.key] < b[sortConfig.key])
					return -1 * directionMultiplier;
				if (a[sortConfig.key] > b[sortConfig.key])
					return 1 * directionMultiplier;
			}
			return 0;
		})
		.slice(
			(currentPage - 1) * studentsPerPage,
			currentPage * studentsPerPage
		);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<div className="gradeContainer">
			<div className="updateGradeForm">
				<p className="updateGradeHeading">Update Grade</p>
				<form className="gradeForm" onSubmit={handleSubmitGrade}>
					<input
						className="updateGradeInput"
						placeholder="Student No"
						type="text"
						value={studentNo}
						onChange={(e) => setStudentNo(e.target.value)}
					/>
					<input
						className="updateGradeInput"
						placeholder="Course Code"
						type="text"
						value={courseCode}
						onChange={(e) => setCourseCode(e.target.value)}
					/>
					<input
						className="updateGradeInput"
						placeholder="Year"
						type="text"
						value={year}
						onChange={(e) => setYear(e.target.value)}
					/>
					<input
						className="updateGradeInput"
						placeholder="Semester"
						type="text"
						value={semester}
						onChange={(e) => setSemester(e.target.value)}
					/>
					<input
						className="updateGradeInput"
						placeholder="Grade"
						type="number"
						value={grade}
						onChange={(e) => setGrade(e.target.value)}
					/>
					<input
						className="updateGradeInput"
						placeholder="Pass/Fail"
						type="text"
						maxLength="4"
						value={passFail}
						onChange={(e) => setPassFail(e.target.value)}
					/>
					<button className="updateGradeBtn" type="submit">
						Update Grade
					</button>
				</form>
			</div>

			<div className="viewCourseStudent">
				<p className="viewCourseStudentHeading">View Course</p>
				<form className="chooseCourseStudent" onSubmit={handleFilter}>
					<input
						className="viewCourseStudentInput"
						placeholder="Course Code"
						type="text"
						value={courseCode}
						onChange={(e) => setCourseCode(e.target.value)}
						required
					/>
					<input
						className="viewCourseStudentInput"
						placeholder="Year"
						type="text"
						value={year}
						onChange={(e) => setYear(e.target.value)}
						required
					/>
					<input
						className="viewCourseStudentInput"
						placeholder="Semester"
						type="text"
						value={semester}
						onChange={(e) => setSemester(e.target.value)}
						required
					/>
					<input
						className="searchInput"
						placeholder="Search by ID"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<button className="viewCourseStudentBtn" type="submit">
						Filter Course
					</button>
				</form>

				<table className="viewCourseStudentTable">
					<thead>
						<tr>
							<th
								onClick={() =>
									setSortConfig({
										key: 'studentNo',
										direction:
											sortConfig.key === 'studentNo' &&
												sortConfig.direction === 'ascending'
												? 'descending'
												: 'ascending',
									})
								}
							>
								STUDENT NO{' '}
								{sortConfig.key === 'studentNo' &&
									(sortConfig.direction === 'ascending'
										? '▲'
										: '▼')}
							</th>
							<th
								onClick={() =>
									setSortConfig({
										key: 'studentName',
										direction:
											sortConfig.key === 'studentName' &&
												sortConfig.direction === 'ascending'
												? 'descending'
												: 'ascending',
									})
								}
							>
								STUDENT NAME{' '}
								{sortConfig.key === 'studentName' &&
									(sortConfig.direction === 'ascending'
										? '▲'
										: '▼')}
							</th>
							<th
								onClick={() =>
									setSortConfig({
										key: 'grade',
										direction:
											sortConfig.key === 'grade' &&
												sortConfig.direction === 'ascending'
												? 'descending'
												: 'ascending',
									})
								}
							>
								GRADE{' '}
								{sortConfig.key === 'grade' &&
									(sortConfig.direction === 'ascending'
										? '▲'
										: '▼')}
							</th>
							<th>PASS/FAIL</th>
							<th>YEAR</th>
							<th>SEMESTER</th>
							<th>STATUS</th>
						</tr>
					</thead>

					<tbody>
						{displayedStudents.length > 0 ? (
							displayedStudents.map((student, index) => (
								<tr key={index}>
									<td>{student.studentNo}</td>
									<td>{student.studentName}</td>
									<td>{student.grade}</td>
									<td
										className={
											student.passFail === 'Pass'
												? 'passStatus'
												: 'failStatus'
										}
									>
										{student.passFail}
									</td>
									<td>{student.year}</td>
									<td>{student.semester}</td>
									<td>{student.enrollmentStatus}</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="7">No students found</td>
							</tr>
						)}
					</tbody>
				</table>
				<div className="paginationControls">
					<Pagination
						totalPages={totalPages}
						currentPage={currentPage}
						onPageChange={handlePageChange}
					/>
				</div>
				<div className="updatedMessage">
					<MessageDisplay message={message} />
				</div>
			</div>
		</div>
	);
};

export default Grade;
