import './Academic.css';

const Academic = () => {
	return (
		<>
			<div className="transcriptTable">
		
				<table>
					<tr>
						<th colspan='9'><h2>Unofficial Transcript</h2></th>
					</tr>
					<tr>
						<td>NAME:</td>
						<td colspan='2'>"Nameplaceholder"</td>
						<td>STUDENT NO:</td>
						<td colspan='2'>"StudentNOplaceholder"</td>
						<td>DATE OF BIRTH:</td>
						<td>"DOBplaceholder"</td>
					</tr>
					<tr>
						<td>DEGREE:</td>
						<td colspan='2'>"Degreeplaceholder"</td>
						<td>STATUS:</td>
						<td colspan='2'>"Statusplaceholder"</td>
						<td>GPA:</td>
						<td>"GPAplaceholder"</td>
					</tr>
					<tr>
						<td colspan='4'>COURSE</td>
						<td colspan='2'>GRADE</td>
					</tr>
					<tr>
						<td colspan='1'>ACADEMIC YEAR</td>
						<td colspan='2'>"Yearplaceholder"</td>
						<td colspan='1'>SEMESTER</td>
						<td colspan='2'>"Semesterplaceholder</td>
					</tr>
					<tr>
						<td>"Coursecodeph"</td>
						<td colspan='3'>"ModuleNameph"</td>
						<td colspan='2'>"Grade"</td>
						<td colspan='2'>"PassFail"</td>
					</tr>
				</table>
			</div>
		</>
	);
};

export default Academic;
