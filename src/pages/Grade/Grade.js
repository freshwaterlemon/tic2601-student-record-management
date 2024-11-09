import React, { useState } from 'react';
import './Grade.css';

const Grade = () => {
    const [studentNo, setStudentNo] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [grade, setGrade] = useState('');
    const [passFail, setPassFail] = useState('');
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState('');

    const handleFilter = async (e) => {
        if (e) e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/grade?courseCode=${courseCode}&year=${year}&semester=${semester}`);
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setStudents([]);
        }
    };

    const handleSubmitGrade = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/grade/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentNo, courseCode, grade, passFail, year, semester })
            });
            if (!response.ok) throw new Error('Failed to submit grade');

            // set and clear the success message using timeout
            setMessage("Grade updated successfully!");
            setTimeout(() => setMessage(''), 3000); // clear after 3 sec

            // reset form fields
            setStudentNo('');
            setCourseCode('');
            setGrade('');
            setPassFail('');
            setYear('');
            setSemester('');

            // refresh student data after successful update
            handleFilter();
        } catch (error) {
            console.error('Error submitting grade:', error);
        }
    };

    return (
        <div className='gradeContainer'>
            <div className='updateGradeForm'>
                <form className="gradeForm" onSubmit={handleSubmitGrade}>
                    <p className="updateGradeHeading">Update Grade</p>
                    {/* <label className="updateGradeLabel">Enter Student No: </label> */}
                    <input
                        className="updateGradeInput"
                        placeholder="Student No"
                        type="text"
                        value={studentNo}
                        onChange={(e) => setStudentNo(e.target.value)}
                    />
                    {/* <label className="updateGradeLabel">Enter Course Code: </label> */}
                    <input
                        className="updateGradeInput"
                        placeholder="Course Code"
                        type="text"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                    />
                    {/* <label className="updateGradeLabel">Enter Year: </label> */}
                    <input
                        className="updateGradeInput"
                        placeholder="Year"
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                    {/* <label className="updateGradeLabel">Enter Semester: </label> */}
                    <input
                        className="updateGradeInput"
                        placeholder="Semester"
                        type="text"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                    />
                    {/* <label className="updateGradeLabel">Enter Grade: </label> */}
                    <input
                        className="updateGradeInput"
                        placeholder="Grade"
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                    />
                    {/* <label className="updateGradeLabel">Enter Pass/Fail: </label> */}
                    <input
                        className="updateGradeInput"
                        placeholder="Pass/Fail"
                        type="text"
                        maxLength="4"
                        value={passFail}
                        onChange={(e) => setPassFail(e.target.value)}
                    />
                    <button className="updateGradeBtn" type="submit">Submit</button>
                </form>
            </div>

            <div className='viewCourseStudent'>
                <form className="chooseCourseStudent" onSubmit={handleFilter}>
                    <p className="viewviewCourseStudentHeading">View Course</p>
                    <label className="viewCourseStudentLabel">Course Code: </label>
                    <input
                        className="viewCourseStudentInput"
                        placeholder="Course Code"
                        type="text"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                    />
                    <label className="viewCourseLabel">Year: </label>
                    <input
                        className="viewCourseStudentInput"
                        placeholder="Year"
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                    <label className="viewCourseStudentLabel">Semester: </label>
                    <input
                        className="viewCourseStudentInput"
                        placeholder="Semester"
                        type="text"
                        maxLength="8"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                    />
                    <button className="viewCourseStudentBtn" type="submit">Filter</button>
                </form>

                <table className='viewCourseStudentTable'>
                    <thead>
                        <tr>
                            <th colSpan='6'><h3>{courseCode || "No Course Selected"}</h3></th>
                        </tr>
                        <tr>
                            <th>STUDENT NO</th>
                            <th>STUDENT NAME</th>
                            <th>GRADE</th>
                            <th>PASS/FAIL</th>
                            <th>YEAR</th>
                            <th>SEMESTER</th>
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
                                    <td>{student.year}</td>
                                    <td>{student.semester}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No students found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="updatedMessage">{message && <p >{message}</p>}</div>
            </div>
        </div>
    );
};

export default Grade;
