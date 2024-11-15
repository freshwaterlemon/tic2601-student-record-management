import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Student.css';

const Student = () => {
    // States
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
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

    // Fetch all students on component mount
    useEffect(() => {
        fetchStudents();
    }, []);

    // Fetch students data
    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:3000/student');
            setStudents(response.data);
            setFilteredStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    // Filter students based on the search query
    useEffect(() => {
        const results = students.filter((student) =>
            student.studentID.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredStudents(results);
    }, [searchQuery, students]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prevState) => ({ ...prevState, [name]: value }));
    };

    // Reset form fields
    const resetForm = () => {
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
    };

    // Toggle the visibility of the popover and fetch NOK data
    const togglePopover = async () => {
        setIsPopoverVisible((prevVisible) => {
            if (!prevVisible && newStudent.studentID) {
                fetchNokData(); // Fetch NOK data if popover is being shown
            }
            return !prevVisible;
        });
    };

    // Fetch NOK data for the student
    const fetchNokData = async () => {
        try {
            if (!newStudent.studentID) {
                console.warn('Student ID is not set.');
                return;
            }
            const response = await axios.get(`http://localhost:3000/student/nok/${newStudent.studentID}`);
            setNokData(response.data);
        } catch (error) {
            console.error('Error fetching NOK data:', error);
        }
    };

    // Close the popover
    const closePopover = () => setIsPopoverVisible(false);

    // Check if student ID exists in the list
    const studentIdExists = (studentID) => students.some((student) => student.studentID === studentID);

    // Add or Update student data
    const handleSubmit = async (e) => {
        e.preventDefault();

        const isUpdate = studentIdExists(newStudent.studentID);
        const url = isUpdate
            ? `http://localhost:3000/student/update/${newStudent.studentID}`
            : 'http://localhost:3000/student/add';
        const method = isUpdate ? 'put' : 'post';

        try {
            await axios({ method, url, data: newStudent });
            resetForm();
            fetchStudents(); // Refresh students list after add/update
        } catch (error) {
            console.error('Error: ' + error.message);
        }
    };

    // Remove student from the list
    const handleDelete = async () => {
        const url = `http://localhost:3000/student/delete/${newStudent.studentID}`;

        try {
            await axios.put(url);
            alert(`Student with ID ${newStudent.studentID} deleted successfully`);
            resetForm();
            fetchStudents(); // Refresh students list after deletion
        } catch (error) {
            console.error('Failed to delete student:', error);
            alert('Error: Unable to delete student.');
        }
    };

    return (
        <div className="studentContainer">
            {/* Form to add/update and remove students */}
            <div className="updateStudentForm">
                <p className="updateStudentHeading">Add/Update/Delete student record</p>
                <form onSubmit={handleSubmit} className="studentForm">
                    <input
                        type="text"
                        name="studentID"
                        placeholder="Student ID"
                        value={newStudent.studentID}
                        onChange={handleInputChange}
                        className="updateStudentInput"
                    />
                    <input
                        type="text"
                        name="studentName"
                        placeholder="Student Name"
                        value={newStudent.studentName}
                        onChange={handleInputChange}
                        className="updateStudentInput"
                    />
                    <input
                        type="email"
                        name="studentEmail"
                        placeholder="Email"
                        value={newStudent.studentEmail}
                        onChange={handleInputChange}
                        className="updateStudentInput"
                    />
                    <input
                        type="date"
                        name="studentDOB"
                        placeholder="Date of Birth"
                        value={newStudent.studentDOB}
                        onChange={handleInputChange}
                        className="updateStudentInputDate"
                    />
                    <input
                        type="text"
                        name="personalPhoneNum"
                        placeholder="Personal Phone Number"
                        value={newStudent.personalPhoneNum}
                        onChange={handleInputChange}
                        className="updateStudentInput"
                    />
                    <input
                        type="text"
                        name="housePhoneNum"
                        placeholder="House Phone Number"
                        value={newStudent.housePhoneNum}
                        onChange={handleInputChange}
                        className="updateStudentInput"
                    />
                    <input
                        type="text"
                        name="sex"
                        placeholder="Sex"
                        value={newStudent.sex}
                        onChange={handleInputChange}
                        className="updateStudentInput"
                    />
                    <input
                        type="text"
                        name="currentAddress"
                        placeholder="Current Address"
                        value={newStudent.currentAddress}
                        onChange={handleInputChange}
                        className="updateStudentInput"
                    />
                    <input
                        type="text"
                        name="nationality"
                        placeholder="Nationality"
                        value={newStudent.nationality}
                        onChange={handleInputChange}
                        className="updateStudentInput"
                    />
                    <input
                        type="text"
                        name="degree"
                        placeholder="Degree"
                        value={newStudent.degree}
                        onChange={handleInputChange}
                        className="updateStudentInput"
                    />
                    <input
                        type="number"
                        step="0.01"
                        name="gpa"
                        placeholder="GPA"
                        value={newStudent.gpa}
                        onChange={handleInputChange}
                        className="updateStudentInput"
                    />
                    <input
                        type="text"
                        name="studentStatus"
                        placeholder="Student Status"
                        value={newStudent.studentStatus}
                        onChange={handleInputChange}
                        className="updateStudentInput"
                    />
                    <div className="studentBtnContainer">
                        <button
                            type="submit"
                            className="updateStudentBtn"
                            disabled={studentIdExists(newStudent.studentID)}
                        >
                            Add Student
                        </button>
                        <button
                            type="submit"
                            className="updateStudentBtn"
                            disabled={!studentIdExists(newStudent.studentID)}
                        >
                            Update Student
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="updateStudentBtn"
                            disabled={!studentIdExists(newStudent.studentID)}
                        >
                            Remove Student
                        </button>
                    </div>
                </form>
            </div>

            {/* Display student information and Emergency Contact Info */}
            <div className="viewStudentInfo">
                <p className="viewStudentInfoHeading">Student Information</p>
                <div className="chooseStudentInfo">
                    <input
                        type="search"
                        placeholder="Filter By Student ID"
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
                    <tbody>
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.studentID}</td>
                                    <td>{student.studentName}</td>
                                    <td>{new Date(student.studentDOB).toLocaleDateString()}</td>
                                    <td>{student.personalPhoneNum}</td>
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
                                <td colSpan="12">No students found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Student;
