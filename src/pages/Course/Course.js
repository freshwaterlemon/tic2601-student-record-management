import React, { useState, useEffect } from 'react';
import './Course.css';
import MessageDisplay from '../../components/MessageDisplay';
import Pagination from '../../components/Pagination';

const Course = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [courseData, setCourseData] = useState({
        courseCode: '',
        courseName: '',
        description: '',
    });
    const [mode, setMode] = useState('add'); // 'add' or 'update'
    const [successMessage, setSuccessMessage] = useState('');

    // pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage] = useState(5); // number of courses to show per page

    // fetch all courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:3000/course');
                const data = await response.json();
                setCourses(data);
                setFilteredCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    // update filtered courses based on search query (by courseCode)
    useEffect(() => {
        const results = courses.filter((course) =>
            course.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCourses(results);

        // If the filtered courses are fewer than the current page, set to the last valid page
        if (currentPage > Math.ceil(results.length / coursesPerPage)) {
            setCurrentPage(1); // reset to page 1
        }
    }, [searchQuery, courses, coursesPerPage, currentPage]);

    // handle input changes for the course form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prev) => ({ ...prev, [name]: value }));
    };

    // submit new course to the server
    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:3000/course/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData),
            });
            await refetchCourses();
            setCourseData({ courseCode: '', courseName: '', description: '' });
            setSuccessMessage('Course added successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    // update existing course on the server
    const handleUpdateCourse = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:3000/course/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData),
            });
            await refetchCourses();
            setCourseData({ courseCode: '', courseName: '', description: '' });
            setSuccessMessage('Course updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
            setMode('add'); // reset mode to add
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    // refetch courses
    const refetchCourses = async () => {
        try {
            const response = await fetch('http://localhost:3000/course');
            const data = await response.json();
            setCourses(data);
            setFilteredCourses(data);
        } catch (error) {
            console.error('Error refetching courses:', error);
        }
    };

    // set form to edit a specific course
    const handleEditCourse = (course) => {
        setCourseData(course);
        setMode('update');
    };

    // pagination Logic
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    // get the courses for the current page
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    // function to change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="courseContainer">
                <div className="updateCourseForm">
                    <p className="updateCourseheading">{mode === 'add' ? 'Add Course' : 'Update Course'}</p>
                    <form className="courseForm">
                        <input
                            className="updateCourseInput"
                            placeholder="Course Code"
                            type="text"
                            name="courseCode"
                            value={courseData.courseCode}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            className="updateCourseInput"
                            placeholder="Course Name"
                            type="text"
                            name="courseName"
                            value={courseData.courseName}
                            onChange={handleInputChange}
                        />
                        <textarea
                            rows="5"
                            className="updateCourseInput"
                            placeholder="Description"
                            name="description"
                            value={courseData.description}
                            onChange={handleInputChange}
                        />
                        <button
                            className="updateCourseBtn"
                            type="button"
                            onClick={mode === 'add' ? handleAddCourse : handleUpdateCourse}
                        >
                            {mode === 'add' ? 'Add Course' : 'Update Course'}
                        </button>

                    </form>
                </div>

                <div className="viewCourse">
                    <div className="searchbarcontainer">
                        <p className="viewCourseHeading">View All Courses</p>
                        <input
                            type="search"
                            placeholder="Filter By Course Code"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="viewCourseInputSearch"
                        />
                    </div>
                    <table className="viewCourseTable">
                        <thead>
                            <tr>
                                <th>COURSE CODE</th>
                                <th>COURSE NAME</th>
                                <th>DESCRIPTION</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCourses.length > 0 ? (
                                currentCourses.map((course, index) => (
                                    <tr key={index}>
                                        <td>{course.courseCode}</td>
                                        <td>{course.courseName}</td>
                                        <td>{course.description}</td>
                                        <td>
                                            <button className="editbutton" onClick={() => handleEditCourse(course)}>Edit</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No courses found</td>
                                </tr>
                            )}
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
                    {/* display message */}
                    <MessageDisplay message={successMessage} />
                </div>
            </div>
        </>
    );
};

export default Course;
