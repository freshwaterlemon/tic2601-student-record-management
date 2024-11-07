import './Course.css';

const Course = () => {
	return (
		<>
			<div className='courseContainer'>
				<div className='updateCourseForm'>
					<form className="courseForm">
						<p className="updateCourseheading">Add Course</p>
						<label className="updateCourseLabel">Course Code </label>
						<input className="updateCourseInput" placeholder="Course Code" type="text" />

						<label className="updateCourseLabel">Course Name:</label>
						<input className="updateCourseInput" placeholder="Course Name" type="text" />

						<label className="updateCourseLabel">Description: </label>
						<textarea rows="50" className="updateCourseInput" placeholder="Description"/>

						<button className="updateCourseBtn">Add Course</button>
					</form>
				</div>

				<div className='viewCourse'>
					<p className="viewCourseHeading">View All Course</p>

					<div className="searchbarcontainer">
						<input
							type="search"
							placeholder="Filter By Course"
							// value={searchQuery}
							// onChange={(e) => setSearchQuery(e.target.value)}
							className="viewCourseInput"
						/>
					</div>


					<table className='viewCourseTable'>
						
						<tr>
							<th>COURSE CODE</th>
							<th>COURSE NAME</th>
							<th>DESCRIPTION</th>
						</tr>
						<tr>
							<td>"cc placeholder"</td>
							<td>"name placeholder"</td>
							<td>"description ph"</td>
						</tr>
					</table>
				</div>
			</div>
		</>
	);
};

export default Course;
