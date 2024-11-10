import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Student.css'

const Student = () => {

    const [students, setStudents] = useState([]);

    useEffect(
        () => {
            axios.get('http://localhost:3000/student').then((response)=>{
                setStudents(response.data);
            })
        }, []
    )
    
    
    return (
        <>
            {/* Displays student information 
            Emergency contact not added yet*/}
            <h1>Student information</h1>
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
                <td>Status</td>
                <td>Email</td>
                </tr>
            </thead>
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
                            <td>{student.status}</td>
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
