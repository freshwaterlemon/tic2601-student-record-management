// server/server.js
const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const port = 3000;
const grades = require('./routes/gradesRoute');
const courses = require('./routes/coursesRoute');
const academic = require('./routes/academicRoute');
const enrollment = require('./routes/enrollmentRoute');
const student = require('./routes/studentRoute');

// Use CORS middleware
app.use(cors());

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount router
app.use('/grade', grades);
app.use('/course', courses);
app.use('/academic', academic);
app.use('/enrollment', enrollment); // for amos backend
app.use('/student', student); // for aaron backend

// Home route
app.get('/', (req, res) => {
  res.send("Home");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
