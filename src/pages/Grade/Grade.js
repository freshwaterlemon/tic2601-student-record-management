import React, { useState } from 'react';
import './Grade.css';

const Grade = () => {
    // State for storing form input values
    const [courseCode, setCourseCode] = useState('');
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [students, setStudents] = useState([]); // This will hold the filtered student data

    // Function to handle the filter button click
    const handleFilter = async (e) => {
        e.preventDefault();

        try {
            // Call the API to get filtered student data
            const response = await fetch(`http://localhost:3000/grade?courseCode=${courseCode}&year=${year}&semester=${semester}`);
            
            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json(); // Parse the JSON data from the response
            setStudents(data); // Update the state with fetched students
        } catch (error) {
            console.error('Error fetching data:', error);
            setStudents([]); // Clear students data on error
        }
    };

    return (
        <>
            <div className='gradeContainer'>
                <div className='updateGradeForm'>
                    <form className="gradeForm">
                        <p className="updateGradeHeading">Update Grade</p>
                        <label className="updateGradeLabel">Enter Student No: </label>
                        <input className="updateGradeInput" placeholder="Student No" type="text" />

                        <label className="updateGradeLabel">Enter Course Code: </label>
                        <input className="updateGradeInput" placeholder="Course Code" type="text" />

                        <label className="updateGradeLabel">Enter Grade: </label>
                        <input className="updateGradeInput" placeholder="Grade" type="number" min="1" max="5" />

                        <label className="updateGradeLabel">Enter Pass/Fail: </label>
                        <input className="updateGradeInput" placeholder="Pass/Fail" type="text" maxLength="4" />

                        <button className="updateGradeBtn">Submit</button>
                    </form>
                </div>

                <div className='viewCourse'>
                    <form className="chooseCourse" onSubmit={handleFilter}>
                        <p className="viewCourseHeading">View Course</p>

                        <label className="viewCourseLabel">Course Code: </label>
                        <input 
                            className="viewCourseInput" 
                            placeholder="Course Code" 
                            type="text" 
                            value={courseCode} 
                            onChange={(e) => setCourseCode(e.target.value)} 
                        />

                        <label className="viewCourseLabel">Year: </label>
                        <input 
                            className="viewCourseInput" 
                            placeholder="Year" 
                            type="text" 
                            value={year} 
                            onChange={(e) => setYear(e.target.value)} 
                        />

                        <label className="viewCourseLabel">Semester: </label>
                        <input 
                            className="viewCourseInput" 
                            placeholder="Semester" 
                            type="text" 
                            maxLength="8" 
                            value={semester} 
                            onChange={(e) => setSemester(e.target.value)} 
                        />

                        <button className="viewCourseBtn" type="submit">Filter</button>
                    </form>

                    <table className='viewCourseTable'>
                        <thead>
                            <tr>
                                <th colSpan='4'><h2>Course: {courseCode || "courseplaceholder"}</h2></th>
                            </tr>
                            <tr>
                                <th>STUDENT NO</th>
                                <th>STUDENT NAME</th>
                                <th>GRADE</th>
                                <th>PASS/FAIL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? (
                                students.map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.studentNo}</td>
                                        <td>{student.studentName}</td>
                                        <td>{student.grade}</td>
                                        <td>{student.passFail}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No students found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Grade;
