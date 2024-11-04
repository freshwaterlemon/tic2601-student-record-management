import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<header className="header">
			<nav className="navbar">
				<h1>Student Record Management</h1>
				<ul>
					<li>
						<Link to="/Student">Student</Link>
					</li>
					<li>
						<Link to="/Course">Course</Link>
					</li>
					<li>
						<Link to="/Academic">Academic</Link>
					</li>
					<li>
						<Link to="/Grade">Grade</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
