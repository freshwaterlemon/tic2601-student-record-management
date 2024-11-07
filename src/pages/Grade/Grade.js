import './Grade.css'

const Grade = () => {
    return (
        <>
            <div className='gradecontainer'>
                <div className='updategradeform'>
                    <form className="gradeform">
                        <p className="updategradeheading">Update Grade</p>
                        <label className="updategradelabel">Enter Student No: </label>
                        <input className="updategradeinput" placeholder="Student No" type="text" />

                        <label className="updategradelabel">Enter Course Code: </label>
                        <input className="updategradeinput" placeholder="Course Code" type="text" />

                        <label className="updategradelabel">Enter Grade: </label>
                        <input className="updategradeinput" placeholder="Grade" type="number" min="1" max="5" />

                        <label className="updategradelabel">Enter Pass/Fail: </label>
                        <input className="updategradeinput" placeholder="Pass/Fail" type="text" maxlength="4" />

                        <button className="updategradebtn">Submit</button>
                    </form>
                </div>

                <div className='viewcourse'>
                    <form className="choosecourse">
                        <p className="viewcourseheading">View Course</p>

                        <label className="viewcourselabel">Course Code: </label>
                        <input className="viewcourseinput" placeholder="Course Code" type="text" />

                        <label className="viewcourselabel">Year: </label>
                        <input className="viewcourseinput" placeholder="Year" type="text" />

                        <label className="viewcourselabel">Semester: </label>
                        <input className="viewcourseinput" placeholder="Semester" type="text" maxlength="8" />

                        <button className="viewcoursebtn">Filter</button>
                    </form>


                    <table className='viewcoursetable'>
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