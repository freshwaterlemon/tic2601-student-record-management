import React, { useState } from 'react';
import './Enrollment.css';

const Enrollment = () => {
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [enrollment, setEnrollment] = useState({
        studentID: '',
        courseCode: '',
        year: '',
        semester: '',
    });

    const isFormValid = () => {
        const { studentID, courseCode, year, semester } = enrollment;
        return studentID && courseCode && year && semester;
    };

    const fetchEnrollments = async () => {
        const { studentID, courseCode, year, semester } = enrollment;

        const url = new URL('http://localhost:3000/enrollment/display');
        if (studentID) url.searchParams.append('studentID', studentID);
        if (courseCode) url.searchParams.append('courseCode', courseCode);
        if (year) url.searchParams.append('year', year);
        if (semester) url.searchParams.append('semester', semester);

        try {
            setLoading(true);
            const response = await fetch(url);
            const data = await response.json();
            setStudents(data.students || []);
        } catch (error) {
            console.error('Error fetching enrollments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEnrollment((prev) => ({ ...prev, [name]: value }));
    };

    const handleEnrollStudent = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/enrollment/enroll', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(enrollment),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Enrolled successfully!' });
                fetchEnrollments();
            } else {
                setMessage({ type: 'error', text: result.message || 'Enrollment failed!' });
            }
        } catch (error) {
            console.error('Error enrolling student:', error);
            setMessage({ type: 'error', text: 'Enrollment failed due to server error!' });
        } finally {
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    const handleUnEnrollStudent = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/enrollment/unenroll', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(enrollment),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Unenrolled successfully!' });
                fetchEnrollments();
            } else {
                setMessage({ type: 'error', text: result.message || 'Unenrollment failed!' });
            }
        } catch (error) {
            console.error('Error unenrolling student:', error);
            setMessage({ type: 'error', text: 'Unenrollment failed due to server error!' });
        } finally {
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    return (
        <div className="enrolContainer">
            <div className="enrolForm">
                <p className="enrolHeading">Enroll or Unenroll Student</p>
                <form className="enrollmentForm">
                    <input
                        className="enrolInput"
                        placeholder="Student ID"
                        type="text"
                        name="studentID"
                        value={enrollment.studentID}
                        onChange={handleInputChange}
                    />
                    <input
                        className="enrolInput"
                        placeholder="Course Code"
                        type="text"
                        name="courseCode"
                        value={enrollment.courseCode}
                        onChange={handleInputChange}
                    />
                    <input
                        className="enrolInput"
                        placeholder="Year"
                        type="number"
                        name="year"
                        value={enrollment.year}
                        onChange={handleInputChange}
                    />
                    <input
                        className="enrolInput"
                        placeholder="Semester"
                        type="number"
                        name="semester"
                        value={enrollment.semester}
                        onChange={handleInputChange}
                    />
                    <button
                        className="enrolBtn"
                        type="button"
                        onClick={handleEnrollStudent}
                        disabled={!isFormValid() || loading}
                    >
                        Enroll Student
                    </button>
                    <button
                        className="enrolBtn"
                        type="button"
                        onClick={handleUnEnrollStudent}
                        disabled={!isFormValid() || loading}
                    >
                        Unenroll Student
                    </button>
                </form>
                {message.text && (
                    <p className={`message ${message.type === 'error' ? 'error' : 'success'}`}>
                        {message.text}
                    </p>
                )}
            </div>
            <div className="viewCourseEnrollment">
                <p className="viewCourseEnrollmentHeading">View Enrollment Status</p>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="viewCourseEnrollmentTable">
                        <thead>
                            <tr>
                                <th>STUDENT NO</th>
                                <th>STUDENT NAME</th>
                                <th>COURSE CODE</th>
                                <th>COURSE NAME</th>
                                <th>YEAR</th>
                                <th>SEMESTER</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? (
                                students.map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.studentID}</td>
                                        <td>{student.studentName}</td>
                                        <td>{student.courseCode}</td>
                                        <td>{student.courseName}</td>
                                        <td>{student.year}</td>
                                        <td>{student.semester}</td>
                                        <td>{student.enrollmentStatus}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No enrollment records available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Enrollment;
