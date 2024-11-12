import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Student.css'

const Student = () => {

    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({
        studentID: "",
        studentName: "",
        studentDOB: "",
        personalPhoneNum: "",
        housePhoneNum: "", 
        sex: "", 
        currentAddress: "", 
        nationality: "", 
        degree: "", 
        gpa: "", 
        studentstatus: "", 
        studentEmail: "",
    });

    useEffect(() => {
        // Fetch all students
        axios.get('http://localhost:3000/student')
          .then(response => setStudents(response.data))
          .catch(error => console.error("Error fetching students:", error));
      }, []);

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

    // reference: https://axios-http.com/docs/api_intro
    // Add or Update student
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({newStudent});

        const url = newStudent.studentID ? `/student/${newStudent.studentID}` : '/student'; // Update if ID exists, else add new
        const method = newStudent.studentID ? 'put' : 'post';
        console.log({method},{url});
        try {
        await axios({
            method,
            url,
            data: newStudent,
        });
        
        if (!newStudent.studentID) setNewStudent({ 
            studentID: "",
            studentName: "",
            studentDOB: "",
            personalPhoneNum: "",
            housePhoneNum: "", 
            sex: "", 
            currentAddress: "", 
            nationality: "", 
            degree: "", 
            gpa: "", 
            studentstatus: "", 
            studentEmail: "",}); // Reset form after adding
        } catch (error) {
        console.log('Error: ' + error.message);
        }
    };
        
    return (
        <>
            {/* Form to add/update and remove students */}
            <div>Add/Update/Delete student record</div>
            <form onSubmit={handleSubmit} className="student-form">
                <div className="form-group">
                <label>Student ID:</label>
                <input type="text" name="studentID" value={newStudent.studentID} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Student Name:</label>
                <input type="text" name="studentName" value={newStudent.studentName} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Date of Birth:</label>
                <input type="date" name="studentDOB" value={newStudent.studentDOB} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Personal Phone Number:</label>
                <input type="text" name="personalPhoneNum" value={newStudent.personalPhoneNum} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>House Phone Number:</label>
                <input type="text" name="housePhoneNum" value={newStudent.housePhoneNum} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Sex:</label>
                <input type="text" name="sex" value={newStudent.sex} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Current Address:</label>
                <input type="text" name="currentAddress" value={newStudent.currentAddress} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Nationality:</label>
                <input type="text" name="nationality" value={newStudent.nationality} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Degree:</label>
                <input type="text" name="degree" value={newStudent.degree} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>GPA:</label>
                <input type="number" step="0.01" name="gpa" value={newStudent.gpa} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Student Status:</label>
                <input type="text" name="studentstatus" value={newStudent.studentstatus} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Student Email:</label>
                <input type="email" name="studentEmail" value={newStudent.studentEmail} onChange={handleChange} />
                </div>

                 {/* This part is wrong, need to troubleshoot
                need a function to query the database to check if studentID exists */}
                <button type="submit" onSubmit={handleSubmit}>{students.studentID ? 'Update' : 'Add'}</button>
            </form>

            {/* Displays student information 
            Emergency contact not added yet*/}
            <h1>Student information</h1>
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
                    <td>Degree Level</td>
                    <td>Email</td>
                    </tr>
                </thead>
            )}

            <tbody>
                {students.length > 0 ?(
                    students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.studentID}</td>
                            <td>{student.studentName}</td>
                            <td>{student.studentDOB}</td>
                            <td>{student.personalPhoneNum}</td>
                            <td>{student.housePhoneNum}</td>
                            <td>{student.sex}</td>
                            <td>{student.currentAddress}</td>
                            <td>{student.nationality}</td>
                            <td>{student.degree}</td>
                            <td>{student.gpa}</td>
                            <td>{student.studentstatus}</td>
                            <td>{student.studentEmail}</td>
                        </tr>
                      ))
                    ) : (
                        <tr>
                            <td>There are no students</td>
                        </tr>
                    )}
            </tbody>
        </>
    )
}

export default Student
