import React, { useState, useEffect } from 'react';
import './Course.css';

const Course = () => {
    const [courses, setCourses] = useState([]); // Store all courses
    const [filteredCourses, setFilteredCourses] = useState([]); // Store filtered courses
    const [searchQuery, setSearchQuery] = useState(''); // Store the search input value
    const [newCourse, setNewCourse] = useState({
        courseCode: '',
        courseName: '',
        description: ''
    });

    // Fetch all courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:3000/courses');
                const data = await response.json();
                setCourses(data);
                setFilteredCourses(data); // Initialize with all courses
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    // Update filtered courses based on search query (by courseCode)
    useEffect(() => {
        const results = courses.filter(course =>
            course.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCourses(results);
    }, [searchQuery, courses]);

    // Handle input changes for the new course form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourse(prev => ({ ...prev, [name]: value }));
    };

    // Submit new course to the server
    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/courses/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCourse)
            });
            const addedCourse = await response.json();

            // Refetch courses after adding a new course
            const updatedCoursesResponse = await fetch('http://localhost:3000/courses');
            const updatedCoursesData = await updatedCoursesResponse.json();

            // Update state with refetched courses
            setCourses(updatedCoursesData);
            setFilteredCourses(updatedCoursesData); // Update filtered list as well

            setNewCourse({ courseCode: '', courseName: '', description: '' }); // Reset form
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    return (
        <>
            <div className='courseContainer'>
                <div className='updateCourseForm'>
                    <form className="courseForm" onSubmit={handleAddCourse}>
                        <p className="updateCourseheading">Add Course</p>
                        <label className="updateCourseLabel">Course Code </label>
                        <input
                            className="updateCourseInput"
                            placeholder="Course Code"
                            type="text"
                            name="courseCode"
                            value={newCourse.courseCode}
                            onChange={handleInputChange}
                        />

                        <label className="updateCourseLabel">Course Name:</label>
                        <input
                            className="updateCourseInput"
                            placeholder="Course Name"
                            type="text"
                            name="courseName"
                            value={newCourse.courseName}
                            onChange={handleInputChange}
                        />

                        <label className="updateCourseLabel">Description: </label>
                        <textarea
                            rows="3"
                            className="updateCourseInput"
                            placeholder="Description"
                            name="description"
                            value={newCourse.description}
                            onChange={handleInputChange}
                        />

                        <button className="updateCourseBtn" type="submit">Add Course</button>
                    </form>
                </div>

                <div className='viewCourse'>
                    <p className="viewCourseHeading">View All Courses</p>

                    <div className="searchbarcontainer">
                        <input
                            type="search"
                            placeholder="Filter By Course Code"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="viewCourseInput"
                        />
                    </div>

                    <table className='viewCourseTable'>
                        <thead>
                            <tr>
                                <th>COURSE CODE</th>
                                <th>COURSE NAME</th>
                                <th>DESCRIPTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCourses.length > 0 ? (
                                filteredCourses.map((course, index) => (
                                    <tr key={index}>
                                        <td>{course.courseCode}</td>
                                        <td>{course.courseName}</td>
                                        <td>{course.description}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No courses found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Course;
