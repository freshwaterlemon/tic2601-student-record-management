import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<header className="header">
			<nav className="navbar">
				<h1 className='site-title '>Student Record Management</h1>
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
