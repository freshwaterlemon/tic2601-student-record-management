const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;
const grades = require('./routes/gradesRoute');
const courses = require('./routes/coursesRoute');
const academic = require('./routes/academicRoute');
const enrollment = require('./routes/enrollmentRoute');
const student = require('./routes/studentRoute');

// use CORS middleware
// app.use(cors({
//   origin: 'http://localhost:3000', // frontend URL (change it if needed depending on your port)
//   credentials: true,
// }));

// middleware for parsing JSON and URL-encoded data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())

// mount routers
app.use('/grade', grades);
app.use('/course', courses);
app.use('/academic', academic);
app.use('/enrollment', enrollment);
app.use('/student', student);

// health check route, see if server is running
app.get('/health', (req, res) => {
  res.json({ status: 'Server is healthy' });
});

// home route
app.get('/', (req, res) => {
  res.send("Home");
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
