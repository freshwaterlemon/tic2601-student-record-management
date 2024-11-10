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
    
    
    return (
        <>
            {/* Form to add/update and remove students */}
            <div>Add/Update/Delete student record</div>
            <form>
                <label>Student ID:</label>
                <input type="text" name="studentID" value={formData.studentID} onChange={(e) => set}
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
