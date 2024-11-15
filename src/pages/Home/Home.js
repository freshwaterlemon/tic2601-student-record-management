import { Link } from 'react-router-dom';  // Import Link component
import './Home.css';

const Home = () => {
    return (
        <div className="homeContainer">
            <h2 className="welcomeHeading">Welcome to TIC2601 Student Record Management Dashboard</h2>
            
            <div className="featureList">
                <div className="featureItem">
                    <Link to="/Student">
                        <h3>Student Management</h3>
                        <p>Allows Admin Staff to add, update, and view students along with their emergency contact information.</p>
                    </Link>
                </div>
                <div className="featureItem">
                    <Link to="/Enrollment">
                        <h3>Student Enrollment</h3>
                        <p>Enables Admin Staff to enroll and unenroll students from courses.</p>
                    </Link>
                </div>
                <div className="featureItem">
                    <Link to="/Course">
                        <h3>Course Management</h3>
                        <p>Lets Admin Staff add and view all available courses.</p>
                    </Link>
                </div>
                <div className="featureItem">
                    <Link to="/Academic">
                        <h3>Academic</h3>
                        <p>Provides Admin Staff with the ability to view student unofficial transcripts.</p>
                    </Link>
                </div>
                <div className="featureItem">
                    <Link to="/Grade">
                        <h3>Grade Management</h3>
                        <p>Allows Admin Staff and Instructors to assign grades to students.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
