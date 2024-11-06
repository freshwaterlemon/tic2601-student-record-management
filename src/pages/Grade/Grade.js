import './Grade.css'

const Grade = () => {
    return (
        <>
        <div className='gradecontainer'>
            <div className='updategradeform'>
                <form className="gradeform">
                    <p className="heading">Update Grade</p>
                    <label className="label">Enter Student No: </label>
                    <input className="input" placeholder="Student No" type="text" />

                    <label className="label">Enter Course Code: </label>
                    <input className="input" placeholder="Course Code" type="text" />

                    <label className="label">Enter Grade: </label>
                    <input className="input" placeholder="Grade" type="number" min="1" max="5"/>

                    <label className="label">Enter Pass/Fail: </label>
                    <input className="input" placeholder="Pass/Fail" type="text" maxlength="4"/>

                    <button className="btn">Submit</button>
                </form>
            </div>

            <div className='viewcourse'>   
                <table className='viewcoursetable'>   
					<tr>
						<th colspan='4'><h2>Course: </h2></th>
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