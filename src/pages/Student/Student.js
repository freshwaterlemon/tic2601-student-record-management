import './Student.css';
import { useState, useEffect} from 'react';

const Student = () => {
	const [studentNo, setStudentNo] = useState('');
	const [name, setName] = useState('');
	const [studentEmail, setStudentEmail] = useState('');
	const [dob, setDob] = useState('');
	const [personalPhoneNum, setPersonalPhoneNum] = useState('');
	const [housePhoneNum, setHousePhoneNum] = useState('');
	const [sex, setSex] = useState('');
	const [currentAddress, setCurrentAddress] = useState('');
	const [nationality, setNationality] = useState('');
	const [degree, setDegree] = useState('');
	const [gpa, setGpa] = useState('');
	const [status, setStatus] = useState('');

	const [message, setMessage] = useState('');
	const [studentsData, setStudentsData] = useState([]);
	const [error, setError] = useState(null);

	const resetForm = () => {
		setStudentNo('');
		setName('');
		setStudentEmail('');
		setDob('');
		setPersonalPhoneNum('');
		setHousePhoneNum('');
		setSex('');
		setCurrentAddress('');
		setNationality('');
		setDegree('');
		setGpa('');
		setStatus('');
	};

	const handleAddStudent = async (e) => {
		e.preventDefault();
		setError(null);

		const studentInfo = {
			studentNo,
			name,
			studentEmail,
			dob,
			personalPhoneNum,
			housePhoneNum,
			sex,
			currentAddress,
			nationality,
			degree,
			gpa,
			status,
		};

		try {
			const response = await fetch(`http://localhost:3000/student/add`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(studentInfo),
			});
			if (!response.ok) throw new Error('Failed to add student.');

			const result = await response.json();
			setMessage('Student added successfully!');
			setStudentsData([...studentsData, result]);

			// reset form
			resetForm();
		} catch (error) {
			console.error('Failed to add student:', error);
			setError(error.message);
		}

		setTimeout(() => setMessage(''), 3000);
	};

	const handleUpdateStudent = async () => {
		setError(null);

		const studentInfo = {
			studentNo,
			name,
			studentEmail,
			dob,
			personalPhoneNum,
			housePhoneNum,
			sex,
			currentAddress,
			nationality,
			degree,
			gpa,
			status,
		};

		try {
			const response = await fetch(
				`http://localhost:3000/student/update`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(studentInfo),
				}
			);
			if (!response.ok)
				throw new Error(
					'Failed to update student. Make sure the student number is correct.'
				);

			const result = await response.json();
			setMessage('Student updated successfully!');

			// update studentsData with updated student info
			setStudentsData(
				studentsData.map((student) =>
					student.studentNo === studentNo ? result : student
				)
			);

			// reset form
			resetForm();
		} catch (error) {
			console.error('Failed to update student:', error);
			setError(error.message);
		}

		setTimeout(() => setMessage(''), 3000);
	};

	const handleViewAllStudents = async () => {
		setError(null);

		try {
			const response = await fetch(`http://localhost:3000/student/all`);
			if (!response.ok) throw new Error('Failed to fetch students.');

			const data = await response.json();
			setStudentsData(data);
		} catch (error) {
			console.error('Failed to fetch students:', error);
			setError(error.message);
		}
	};

	const handleFilter = async (e) => {
		e.preventDefault();
		setError(null);
		setStudentsData([]);

		try {
			const response = await fetch(
				`http://localhost:3000/student/search?studentNo=${studentNo}`
			);
			if (!response.ok)
				throw new Error(
					'Failed to fetch data. Please ensure the student number is correct.'
				);

			const data = await response.json();
			setStudentsData([data]);
		} catch (error) {
			console.error('Failed to fetch data:', error);
			setError(error.message);
		}
	};

    const handleFindNOK = async (e) => {
        e.preventDefault();
        setError(null);
		setStudentsData([]);

        try {
			const response = await fetch(
				`http://localhost:3000/student/find?studentNo=${studentNo}`
			);
			if (!response.ok)
				throw new Error(
					'Failed to fetch data. Please ensure the student number is correct.'
				);

			const data = await response.json();
			setStudentsData([data]);
		} catch (error) {
			console.error('Failed to fetch data:', error);
			setError(error.message);
		}
    };

	return (
		<div className="studentContainer">
			<div className="updateStudentForm">
				<p className="updateStudentHeading">Add or Update Student</p>
				<form className="studentForm" onSubmit={handleAddStudent}>
					<input
						className="updateStudentInput"
						placeholder="Student Number"
						type="text"
						value={studentNo}
						onChange={(e) => setStudentNo(e.target.value)}
					/>
					<input
						className="updateStudentInput"
						placeholder="Name"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						className="updateStudentInput"
						placeholder="Email"
						type="text"
						value={studentEmail}
						onChange={(e) => setStudentEmail(e.target.value)}
					/>
					<input
						className="updateStudentInput"
						placeholder="DOB"
						type="text"
						value={dob}
						onChange={(e) => setDob(e.target.value)}
					/>
					<input
						className="updateStudentInput"
						placeholder="Personal Phone Number"
						type="text"
						value={personalPhoneNum}
						onChange={(e) => setPersonalPhoneNum(e.target.value)}
					/>
					<input
						className="updateStudentInput"
						placeholder="Home Phone Number"
						type="text"
						value={housePhoneNum}
						onChange={(e) => setHousePhoneNum(e.target.value)}
					/>
					<input
						className="updateStudentInput"
						placeholder="Sex"
						type="text"
						value={sex}
						onChange={(e) => setSex(e.target.value)}
					/>
					<input
						className="updateStudentInput"
						placeholder="Current Address"
						type="text"
						value={currentAddress}
						onChange={(e) => setCurrentAddress(e.target.value)}
					/>
					<input
						className="updateStudentInput"
						placeholder="Nationality"
						type="text"
						value={nationality}
						onChange={(e) => setNationality(e.target.value)}
					/>
					<input
						className="updateStudentInput"
						placeholder="Degree"
						type="text"
						value={degree}
						onChange={(e) => setDegree(e.target.value)}
					/>
					<input
						className="updateStudentInput"
						placeholder="GPA"
						type="text"
						value={gpa}
						onChange={(e) => setGpa(e.target.value)}
					/>
					<input
						className="updateStudentInput"
						placeholder="Status"
						type="text"
						value={status}
						onChange={(e) => setStatus(e.target.value)}
					/>
					<div className="studentBtnContainer">
						<button className="updateStudentBtn" type="submit">
							Add Student
						</button>
						<button
							className="updateStudentBtn"
							type="button"
							onClick={handleUpdateStudent}
						>
							Update Student
						</button>
						<button
							className="updateStudentBtn"
							type="button"
							onClick={handleViewAllStudents}
						>
							View All Students
						</button>
					</div>
				</form>
			</div>

			<div className="viewStudentInfo">
				<p className="viewStudentInfoHeading">View Student</p>
				<form className="chooseStudentInfo" onSubmit={handleFilter}>
					<input
						className="viewStudentInfoInput"
						placeholder="Student Number"
						type="text"
						value={studentNo}
						onChange={(e) => setStudentNo(e.target.value)}
					/>
					<button className="viewStudentInfoBtn" type="submit">
						Search
					</button>
					<button className="viewStudentInfoBtn" type="button" onClick={handleFindNOK}>
						Emergency Contact Info
					</button>
				</form>

				<table className="viewStudentInfoTable">
					<thead>
						<tr>
							<th>STUDENT NO</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>DOB</th>
							<th>PERSONAL PHONE NO</th>
							<th>HOME PHONE NO</th>
							<th>SEX</th>
							<th>CURRENT ADDRESS</th>
							<th>NATIONALITY</th>
							<th>DEGREE</th>
							<th>GPA</th>
							<th>STATUS</th>
						</tr>
					</thead>
					<tbody>
						{studentsData.length > 0 ? (
							studentsData.map((student, index) => (
								<tr key={index}>
									<td>{student.studentID}</td>
									<td>{student.studentName}</td>
									<td>{student.studentEmail}</td>
									<td>{student.dob}</td>
									<td>{student.personalPhoneNum}</td>
									<td>{student.housePhoneNum || '-'}</td>
									<td>{student.sex}</td>
									<td>{student.currentAddress}</td>
									<td>{student.nationality}</td>
									<td>{student.degree}</td>
									<td>{student.gpa}</td>
									<td>{student.status}</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={12}>No student selected</td>
							</tr>
						)}
					</tbody>
				</table>
				<div>
					{message && <p className="updatedMessage">{message}</p>}
					{error && <p className="updatedError">{error}</p>}
				</div>
			</div>
		</div>
	);
};

export default Student;
