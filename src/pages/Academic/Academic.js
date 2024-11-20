import React, { useState } from 'react';
import './Academic.css';
import MessageDisplay from '../../components/MessageDisplay/MessageDisplay';
import Pagination from '../../components/Pagination/Pagination';

const Academic = () => {
    const [studentNo, setStudentNo] = useState('');
    const [transcriptData, setTranscriptData] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);  // state to track current page
    const [coursesPerPage] = useState(5);  // number of courses to display per page

    const handleFilter = async (e) => {
        e.preventDefault();
        setError(null);
        setTranscriptData(null);
        setSuccessMessage('');
        setCurrentPage(1); // reset current page to 1 when fetching new data

        try {
            const response = await fetch(`http://localhost:3001/academic?studentNo=${studentNo}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data. Please ensure the student number is correct.");
            }
            const data = await response.json();
            setTranscriptData(data);  // Update transcriptData state with fetched transcript data
            setSuccessMessage('Transcript data fetched successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error("Failed to fetch transcript data:", error);
            setError(error.message);
            setTimeout(() => setError(''), 3000); // Hide the error message after 3 seconds
        }
    };

    // calculate the total number of pages
    const totalPages = transcriptData ? Math.ceil(transcriptData.courses.length / coursesPerPage) : 0;

    // get the courses to display for the current page
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = transcriptData ? transcriptData.courses.slice(indexOfFirstCourse, indexOfLastCourse) : [];

    // function to change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="academicContainer">
            <div className="filterStudentForm">
                <form onSubmit={handleFilter}>
                    <input
                        className="filterStudentInput"
                        placeholder="Student Number"
                        type="text"
                        value={studentNo}
                        onChange={(e) => setStudentNo(e.target.value)}
                    />
                    <button className="filterStudentBtn" type="submit">Filter</button>
                </form>
                {/* show success or error message */}
                <div>
                    <MessageDisplay message={successMessage} />
                    {error && <p className="error">{error}</p>}
                </div>
            </div>

            {transcriptData && (
                <div>
                    <table className="transcriptTable">
                        <thead>
                            <tr>
                                <th colSpan="9"><h2>Unofficial Transcript</h2></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>NAME:</td>
                                <td colSpan="2">{transcriptData.name}</td>
                                <td>STUDENT NO:</td>
                                <td colSpan="2">{transcriptData.studentNo}</td>
                                <td>DATE OF BIRTH:</td>
                                <td>{transcriptData.dob}</td>
                            </tr>
                            <tr>
                                <td>DEGREE:</td>
                                <td colSpan="2">{transcriptData.degree}</td>
                                <td>STATUS:</td>
                                <td colSpan="2">{transcriptData.status.toUpperCase()}</td>
                                <td>GPA:</td>
                                <td>{transcriptData.gpa}</td>
                            </tr>
                            <tr>
                                <td colSpan="6">COURSE</td>
                                <td colSpan="1">GRADE</td>
                                <td colSpan="1">PASS/FAIL</td>
                            </tr>
                            {currentCourses.map((course, index) => {
                                const isSameGroup =
                                    index > 0 &&
                                    course.year === currentCourses[index - 1].year &&
                                    course.semester === currentCourses[index - 1].semester;

                                return (
                                    <React.Fragment key={index}>
                                        {!isSameGroup && (
                                            <tr>
                                                <td colSpan="1">ACADEMIC YEAR </td>
                                                <td colSpan="1">{course.year}</td>
                                                <td colSpan="1">SEMESTER</td>
                                                <td colSpan="5">{course.semester}</td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td colSpan="1">{course.courseCode}</td>
                                            <td colSpan="5">{course.moduleName}</td>
                                            <td colSpan="1">{course.grade}</td>
                                            <td colSpan="1">{course.passFail}</td>
                                        </tr>
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* pagination Controls */}
                    {totalPages > 1 && (
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={paginate}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Academic;
