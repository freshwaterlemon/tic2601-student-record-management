import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<header className="header">
			<nav className="navbar">
				<Link className='site-title 'to="/">Student Record Management</Link>
				<ul>
					<li>
						<Link to="/Student">Student Management</Link>
					</li>
					<li>
						<Link to="/Enrollment">Student Enrollment</Link>
					</li>
					<li>
						<Link to="/Course">Course Management</Link>
					</li>
					<li>
						<Link to="/Academic">Academic</Link>
					</li>
					<li>
						<Link to="/Grade">Grade Management</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
