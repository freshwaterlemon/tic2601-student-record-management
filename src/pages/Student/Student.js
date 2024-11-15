import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Student.css';

const Student = () => {
	// const [isUpdated, setIsUpdated] = useState([]);
	const [isPopoverVisible, setIsPopoverVisible] = useState(false); // Popover state
	const [filteredStudent, setfilteredStudent] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [students, setStudents] = useState([]);
	const [nokData, setNokData] = useState(null);
	const [newStudent, setNewStudent] = useState({
		studentID: '',
		studentName: '',
		studentDOB: '',
		personalPhoneNum: '',
		housePhoneNum: '',
		sex: '',
		currentAddress: '',
		nationality: '',
		degree: '',
		gpa: '',
		studentStatus: '',
		studentEmail: '',
	});

	// function to reset form
	const resetForm = () =>
		setNewStudent({
			studentID: '',
			studentName: '',
			studentDOB: '',
			personalPhoneNum: '',
			housePhoneNum: '',
			sex: '',
			currentAddress: '',
			nationality: '',
			degree: '',
			gpa: '',
			studentStatus: '',
			studentEmail: '',
		});

	// toggle popover visibility
	const togglePopover = async () => {
		// Toggle the popover immediately
		setIsPopoverVisible((prevVisible) => {
			// If it was not visible, start fetching data
			if (!prevVisible && newStudent.studentID) {
				fetchNokData(); // Fetch NOK data asynchronously
			}
			return !prevVisible; // Update the visibility state
		});
	};

	// Function to fetch NOK data
	const fetchNokData = async () => {
		try {
			if (!newStudent.studentID) {
				console.warn("Student ID is not set.");
				return;
			}
			console.log("Fetching NOK Data for Student ID:", newStudent.studentID);
			const response = await axios.get(`http://localhost:3000/student/nok/${newStudent.studentID}`);
			setNokData(response.data);
		} catch (error) {
			console.error("Error fetching NOK data:", error);
		}
	};


	// close the popover explicitly
	const closePopover = () => setIsPopoverVisible(false);

	useEffect(() => {
		// Fetch all students

		axios
			.get('http://localhost:3000/student')
			.then((response) => setStudents(response.data))
			.catch((error) => console.error('Error fetching students:', error));
	}, []);

	// update filtered courses based on search query (by student ID)
	useEffect(() => {
		const results = students.filter((students) =>
			students.studentID.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setfilteredStudent(results);
	}, [searchQuery, students]);

	// Handle form input changes
	// takes data from input fields and put them into student as an object
	const handleChange = (e) => {
		const { name, value } = e.target;
		// to check what is prev state
		setNewStudent((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	// check if student ID exists
	function studentIdExists(studentID, students) {
		return students.some((student) => student.studentID === studentID);
	}

	// reference: https://axios-http.com/docs/api_intro
	// Add or Update student
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log({ newStudent });

		const isUpdate = studentIdExists(newStudent.studentID, students);
		const url = isUpdate
			? `http://localhost:3000/student/update/${newStudent.studentID}`
			: 'http://localhost:3000/student/add';
		const method = isUpdate ? 'put' : 'post';

		try {
			await axios({
				method,
				url,
				data: newStudent,
			});
			console.log('added or updated');

			resetForm();

			// refresh the students list
			const response = await axios.get('http://localhost:3000/student');
			setStudents(response.data);
		} catch (error) {
			console.log('Error: ' + error.message);
		}
	};


	// remove student
	const handleDelete = async (e) => {

		const url = `http://localhost:3000/student/delete/${newStudent.studentID}`;


		try {
			await axios.put(url);

			alert(
				`Student with ID ${newStudent.studentID} deleted successfully`
			);

			resetForm();

			// refresh the students list
			const response = await axios.get('http://localhost:3000/student');
			setStudents(response.data);

		} catch (error) {
			console.error('Failed to delete student:', error);
			alert('Error: Unable to delete student.');
		}

	};


	// //Delete student
	// const handleDelete = async (e) => {
	// 	if (studentIdExists(newStudent.studentID, students)) {
	// 		try {
	// 			await axios.delete(
	// 				`http://localhost:3000/student/delete/${newStudent.studentID}`
	// 			);
	// 			alert(
	// 				`Student with ID ${newStudent.studentID} deleted successfully`
	// 			);

	// 			resetForm();

	// 		} catch (error) {
	// 			console.error('Failed to delete student:', error);
	// 			alert('Error: Unable to delete student.');
	// 		}
	// 	}
	// };

	return (
		<>
			<div className="studentContainer">
				{/* Form to add/update and remove students */}
				<div className="updateStudentForm">
					<p className="updateStudentHeading">
						Add/Update/Delete student record
					</p>
					<form onSubmit={handleSubmit} className="studentForm">
						{/* <label>Student ID:</label> */}
						<input
							type="text"
							name="studentID"
							placeholder="studentID"
							value={newStudent.studentID}
							onChange={handleChange}
							className="updateStudentInput"
						/>

						{/* <label>Student Name:</label> */}
						<input
							type="text"
							name="studentName"
							placeholder="studentName"
							value={newStudent.studentName}
							onChange={handleChange}
							className="updateStudentInput"
						/>
						{/* <label>Student Email:</label> */}
						<input
							type="email"
							name="studentEmail"
							placeholder="email"
							value={newStudent.studentEmail}
							onChange={handleChange}
							className="updateStudentInput"
						/>
						{/* <label>Date of Birth:</label> */}
						<input
							type="date"
							name="studentDOB"
							placeholder="date of birth"
							value={newStudent.studentDOB}
							onChange={handleChange}
							className="updateStudentInputDate"
						/>

						{/* <label>Personal Phone Number:</label> */}
						<input
							type="text"
							name="personalPhoneNum"
							placeholder="personal phone number"
							value={newStudent.personalPhoneNum}
							onChange={handleChange}
							className="updateStudentInput"
						/>

						{/* <label>House Phone Number:</label> */}
						<input
							type="text"
							name="housePhoneNum"
							placeholder="house phone number"
							value={newStudent.housePhoneNum}
							onChange={handleChange}
							className="updateStudentInput"
						/>

						{/* <label>Sex:</label> */}
						<input
							type="text"
							name="sex"
							placeholder="sex"
							value={newStudent.sex}
							onChange={handleChange}
							className="updateStudentInput"
						/>

						{/* <label>Current Address:</label> */}
						<input
							type="text"
							name="currentAddress"
							placeholder="current address"
							value={newStudent.currentAddress}
							onChange={handleChange}
							className="updateStudentInput"
						/>

						{/* <label>Nationality:</label> */}
						<input
							type="text"
							name="nationality"
							placeholder="nationality"
							value={newStudent.nationality}
							onChange={handleChange}
							className="updateStudentInput"
						/>

						{/* <label>Degree:</label> */}
						<input
							type="text"
							name="degree"
							placeholder="degree"
							value={newStudent.degree}
							onChange={handleChange}
							className="updateStudentInput"
						/>

						{/* <label>GPA:</label> */}
						<input
							type="number"
							step="0.01"
							name="gpa"
							value={newStudent.gpa}
							placeholder="gpa"
							onChange={handleChange}
							className="updateStudentInput"
						/>

						{/* <label>Student Status:</label> */}
						<input
							type="text"
							name="studentStatus"
							placeholder="student status"
							value={newStudent.studentStatus}
							onChange={handleChange}
							className="updateStudentInput"
						/>

						<div className="studentBtnContainer">
							<button
								type="submit"
								onSubmit={handleSubmit}
								className="updateStudentBtn"
								disabled={studentIdExists(
									newStudent.studentID,
									students
								)}
							>
								Add Student
							</button>
							<button
								type="submit"
								onSubmit={handleSubmit}
								className="updateStudentBtn"
								disabled={
									!studentIdExists(
										newStudent.studentID,
										students
									)
								}
							>
								Update Student
							</button>
							<button
								type="submit"
								onClick={handleDelete}
								className="updateStudentBtn"
								disabled={
									!studentIdExists(
										newStudent.studentID,
										students
									)
								}
							>
								Remove Student
							</button>
						</div>
					</form>
				</div>

				{/* Displays student information Emergency contact not added yet*/}
				<div className="viewStudentInfo">
					<p className="viewStudentInfoHeading">
						Student information
					</p>
					<div className="chooseStudentInfo">
						<input
							type="search"
							placeholder="Filter By student ID"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="viewStudentInputSearch"
						/>
						<button className="viewStudentInfoBtn" onClick={togglePopover}>
							Emergency Contact Info
						</button>
					</div>

					{/* Popover for Emergency Contact Info */}
					{isPopoverVisible && (
						<div id="NOK-popover" className="popover">
							<h3>Emergency Contact Information</h3>
							<p>Student ID: {newStudent.studentID || "N/A"}</p>
							<p>NOK Name: {nokData?.NOKName || "Loading..."}</p>
							<p>NOK Number: {nokData?.NOKPhoneNum || "Loading..."}</p>
							<button onClick={closePopover} className="closeButton">
								Close
							</button>
						</div>
					)}

					<table className="viewStudentInfoTable">
						{students.length > 0 && (
							<thead>
								<tr>
									<td>Student ID</td>
									<td>Name</td>
									<td>Date of Birth</td>
									<td>Personal Phone Number</td>
									<td>House Phone Number</td>
									<td>Sex</td>
									<td>Address</td>
									<td>Nationality</td>
									<td>Degree</td>
									<td>GPA</td>
									<td>Student Status</td>
									<td>Email</td>
								</tr>
							</thead>
						)}

						<tbody>
							{filteredStudent.length > 0 ? (
								filteredStudent.map((student, index) => (
									<tr key={index}>
										<td>{student.studentID}</td>
										<td>{student.studentName}</td>
										{/* format date */}
										<td>
											{new Date(
												student.studentDOB
											).toLocaleDateString()}
										</td>
										<td>{student.personalPhoneNum}</td>
										{/* display '-' if house number is null as tuple is null allowable */}
										<td>{student.housePhoneNum || '-'}</td>
										<td>{student.sex}</td>
										<td>{student.currentAddress}</td>
										<td>{student.nationality}</td>
										<td>{student.degree}</td>
										<td>{student.gpa}</td>
										<td>{student.studentStatus}</td>
										<td>{student.studentEmail}</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="12">There are no students</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default Student;
