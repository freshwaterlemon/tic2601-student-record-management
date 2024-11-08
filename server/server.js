// server/server.js
const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const port = 3000;
const courseRecords = require('./routes/courseRecords');
const courses = require('./routes/courses');

// Use CORS middleware
app.use(cors());

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the courseRecords router at /grade
app.use('/grade', courseRecords);
app.use('/courses', courses);


// Home route
app.get('/', (req, res) => {
  res.send("Hello world");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
