import React, { useState } from 'react';
import './Enrollment.css';

const Enrollment = () => {
    const [message, setMessage] = useState('');
    const [students, setStudents] = useState([]);
    const [enrollment, setEnrollment] = useState({
        studentID: '',
        courseCode: '',
        year: '',
        semester: '',
    });

    // check if form is valid
    const isFormValid = () => {
        const { studentID, courseCode, year, semester } = enrollment;
        return studentID && courseCode && year && semester;
    };

    // fetch enrollment records from the server
    const fetchEnrollments = async () => {
        const { studentID, courseCode, year, semester } = enrollment;

        const url = new URL('http://localhost:3001/enrollment/display');
        if (studentID) url.searchParams.append('studentID', studentID);
        if (courseCode) url.searchParams.append('courseCode', courseCode);
        if (year) url.searchParams.append('year', year);
        if (semester) url.searchParams.append('semester', semester);

        try {
            const response = await fetch(url);
            const data = await response.json();
            setStudents(data.students || []);
        } catch (error) {
            console.error('Error fetching enrollments:', error);
        }
    };

    // hndle input changes for the new enrollment form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEnrollment((prev) => ({ ...prev, [name]: value }));
    };

    // reset form function after successful enrollment/unenrollment
    const resetForm = () => {
        setEnrollment({
            studentID: '',
            courseCode: '',
            year: '',
            semester: '',
        });
    };

    // submit new enrollment to the server
    const handleEnrollStudent = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/enrollment/enroll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(enrollment),
            });

            const data = await response.json();

            if (response.status === 409) {
                // show the error message for duplicate records
                setMessage(data.error);
            } else if (response.ok) {
                setMessage('Enrolled successfully!');
                setTimeout(() => setMessage(''), 3000); // clear the message after a delay


                resetForm();

                // refetch enrollments to show updated status
                fetchEnrollments();
            }
        } catch (error) {
            console.error('Error enrolling student:', error);
            setMessage('Failed to enroll student');
        }
    };

    // submit unenrollment to the server
    const handleUnEnrollStudent = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/enrollment/unenroll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(enrollment),
            });

            const data = await response.json();

            if (response.status === 409) {
                // show the specific error message for already withdrawn records
                setMessage(data.error || 'Student is already withdrawn from this course for the specified term.');
                setTimeout(() => setMessage(''), 3000);
            } else if (response.ok) {
                setMessage('Unenrolled successfully!');
                setTimeout(() => setMessage(''), 3000);

                resetForm();


                fetchEnrollments();
            }
        } catch (error) {
            console.error('Error unenrolling student:', error);
            setMessage('Failed to unenroll student');
        }
    };

    return (
        <div className="enrolContainer">
            <div className="enrolForm">
                <p className="enrolHeading">Enroll Student</p>
                <form className="enrollmentForm" onSubmit={handleEnrollStudent}>
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
                        type="submit"
                        disabled={!isFormValid()}
                    >
                        Enroll Student
                    </button>
                    <button
                        className="enrolBtn"
                        type="button"
                        onClick={handleUnEnrollStudent}
                        disabled={!isFormValid()}
                    >
                        Unenroll Student
                    </button>
                </form>
            </div>

            <div className="viewCourseEnrollment">
                <p className="viewCourseEnrollmentHeading">View Enrollment Status</p>
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
                                <td colSpan="7">Submit new enrollment to courses</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="updatedMessage">
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default Enrollment;
