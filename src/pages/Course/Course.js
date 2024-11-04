import React, { useState, useEffect } from 'react';
import './Course.css';

const Course = () => {
	const [courses, setCourses] = useState([]);
	const [filteredCourses, setFilteredCourses] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [newCourse, setNewCourse] = useState({
		courseCode: '',
		courseName: '',
		description: '',
	});

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
	}, [searchQuery, courses]);

	// handle input changes for the new course form
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewCourse((prev) => ({ ...prev, [name]: value })); // spread the data
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
				body: JSON.stringify(newCourse),
			});

			// refetch courses after adding a new course
			const updatedCoursesResponse = await fetch(
				'http://localhost:3000/course'
			);
			const updatedCoursesData = await updatedCoursesResponse.json();

			// update state with refetched courses
			setCourses(updatedCoursesData);
			setFilteredCourses(updatedCoursesData); // update filtered list as well

			setNewCourse({ courseCode: '', courseName: '', description: '' }); // reset form
		} catch (error) {
			console.error('Error adding course:', error);
		}
	};

	return (
		<>
			<div className="courseContainer">
				<div className="updateCourseForm">
					<p className="updateCourseheading">Add Course</p>
					<form className="courseForm" onSubmit={handleAddCourse}>
						{/* <label className="updateCourseLabel">Course Code:</label> */}
						<input
							className="updateCourseInput"
							placeholder="Course Code"
							type="text"
							name="courseCode"
							value={newCourse.courseCode}
							onChange={handleInputChange}
							required
						/>

						{/* <label className="updateCourseLabel">Course Name:</label> */}
						<input
							className="updateCourseInput"
							placeholder="Course Name"
							type="text"
							name="courseName"
							value={newCourse.courseName}
							onChange={handleInputChange}
							required
						/>

						{/* <label className="updateCourseLabel">Description: </label> */}
						<textarea
							rows="5"
							className="updateCourseInput"
							placeholder="Description"
							name="description"
							value={newCourse.description}
							onChange={handleInputChange}
							required
						/>

						<button className="updateCourseBtn" type="submit">
							Add Course
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