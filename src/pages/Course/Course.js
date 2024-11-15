import React, { useState, useEffect } from 'react';
import './Course.css';

const Course = () => {
	const [courses, setCourses] = useState([]);
	const [filteredCourses, setFilteredCourses] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [courseData, setCourseData] = useState({
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

	return (
		<>
			<div className="courseContainer">
				<div className="updateCourseForm">
					<p className="updateCourseheading">Add/Update Course</p>
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
								onClick={handleAddCourse}
							>
								Add Course
							</button>
							<button
								className="updateCourseBtn"
								type="button"
								onClick={handleUpdateCourse}
							>
								Update Course
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
