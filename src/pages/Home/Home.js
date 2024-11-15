import './Home.css'

const Home = () => {
    return (
        <>
            <div className='homeContainer'>
                <h2>Welcome to TIC2601 Student Record Mangement DashBoard</h2>
                <ul>
                    <li>Student Mangement allows Admin Staff to add, update, and view student with their emergency contact</li>
                    <li>Student Enrollment allows Admin Staff to enroll and unenroll a student from courses</li>
                    <li>Course Mangement allows Admin Staff to add and view all available courses</li>
                    <li>Academic allows Admin Staff to view student unoffical transcipt</li>
                    <li>Grade Mangement allows Admin Staff and Instructor to assign grade to students</li>
                </ul>
            </div>
        </>
    )
}

export default Home