import './Grade.css'

const Grade = () => {
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
                        <input className="updateGradeInput" placeholder="Pass/Fail" type="text" maxlength="4" />

                        <button className="updateGradeBtn">Submit</button>
                    </form>
                </div>

                <div className='viewCourse'>
                    <form className="chooseCourse">
                        <p className="viewCourseHeading">View Course</p>

                        <label className="viewCourseLabel">Course Code: </label>
                        <input className="viewCourseInput" placeholder="Course Code" type="text" />

                        <label className="viewCourseLabel">Year: </label>
                        <input className="viewCourseInput" placeholder="Year" type="text" />

                        <label className="viewCourseLabel">Semester: </label>
                        <input className="viewCourseInput" placeholder="Semester" type="text" maxlength="8" />

                        <button className="viewCourseBtn">Filter</button>
                    </form>


                    <table className='viewCourseTable'>
                        <tr>
                            <th colspan='4'><h2>Course: courseplaceholder</h2></th>
                        </tr>
                        <tr>
                            <th>STUDENT NO</th>
                            <th>STUDENT NAME</th>
                            <th>GRADE</th>
                            <th>PASS/FAIL</th>
                        </tr>
                        <tr>
                            <td>"sn placeholder"</td>
                            <td>"name placeholder"</td>
                            <td>"grade placeholder"</td>
                            <td>"Pass/Fail placeholder"</td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Grade