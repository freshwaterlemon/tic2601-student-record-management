import './App.css';
import Layout from './Layout';
import Academic from './pages/Academic/Academic';
import Course from './pages/Course/Course';
import Grade from './pages/Grade/Grade';
import Student from './pages/Student/Student';
import Enrollment from './pages/Enrollment/Enrollment';
import Home from './pages/Home/Home';
import Error from './pages/Error';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="Academic" element={<Academic />} />
						<Route path="Course" element={<Course />} />
						<Route path="Enrollment" element={<Enrollment />} />
						<Route path="Grade" element={<Grade />} />
						<Route path="Student" element={<Student />} />
						<Route path="*" element={<Error />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
