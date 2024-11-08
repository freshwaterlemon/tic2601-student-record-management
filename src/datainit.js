const {
	sequelize,
	UserAccount,
	Student,
	NextOfKin,
	School,
	Course,
	Employee,
	Instructor,
	AdminStaff,
	Module,
	CourseRecord,
} = require('./routes/models');

async function seedData() {
	try {
		// Reset the database
		await sequelize.sync({ force: true });

		// Schools
		const schools = await School.bulkCreate([
			{ schoolCode: 'S001', schoolName: 'School of Science', schoolPhoneNum: '12345678', schoolDegree: 'Bachelor of Science', schoolCourses: 'Physics, Chemistry, Biology' },
			{ schoolCode: 'S002', schoolName: 'School of Engineering', schoolPhoneNum: '87654321', schoolDegree: 'Bachelor of Engineering', schoolCourses: 'Civil, Mechanical, Electrical' },
			{ schoolCode: 'S003', schoolName: 'School of Arts', schoolPhoneNum: '56789012', schoolDegree: 'Bachelor of Arts', schoolCourses: 'Music, Painting, Literature' },
		]);

		// Students
		const students = await Student.bulkCreate([
			{ studentNum: 'ST001', studentName: 'Alice', studentDOB: new Date('2000-01-01'), personalPhoneNum: '987654321', housePhoneNum: '123456789', sex: 'F', currentAddress: '123 Maple St', nationality: 'Singaporean', degree: 'Bachelor of Science', gpa: 3.8, status: 'Active', studentEmail: 'alice@student.edu', schoolCode: schools[0].schoolCode },
			{ studentNum: 'ST002', studentName: 'Bob', studentDOB: new Date('2001-02-02'), personalPhoneNum: '876543210', housePhoneNum: '234567890', sex: 'M', currentAddress: '456 Oak St', nationality: 'Singaporean', degree: 'Bachelor of Engineering', gpa: 3.5, status: 'Active', studentEmail: 'bob@student.edu', schoolCode: schools[1].schoolCode },
			{ studentNum: 'ST003', studentName: 'Charlie', studentDOB: new Date('1999-03-03'), personalPhoneNum: '765432109', housePhoneNum: '345678901', sex: 'M', currentAddress: '789 Pine St', nationality: 'Malaysian', degree: 'Bachelor of Arts', gpa: 3.2, status: 'Inactive', studentEmail: 'charlie@student.edu', schoolCode: schools[2].schoolCode },
		]);

		// NextOfKin
		const nextOfKins = await NextOfKin.bulkCreate([
			{ NOKID: 'NOK001', NOKName: 'Jane Doe', NOKPhoneNum: '555123456' },
			{ NOKID: 'NOK002', NOKName: 'John Doe', NOKPhoneNum: '555654321' },
			{ NOKID: 'NOK003', NOKName: 'Emily Doe', NOKPhoneNum: '555987654' },
		]);

		// Link Students and NextOfKin
		await students[0].addNextOfKin(nextOfKins[0]);
		await students[1].addNextOfKin(nextOfKins[1]);
		await students[2].addNextOfKin(nextOfKins[2]);

		// UserAccounts
		const userAccounts = await UserAccount.bulkCreate([
			{ userID: 'U001', userEMail: 'admin1@school.com', userRole: 'Admin', userPassword: 'password1' },
			{ userID: 'U002', userEMail: 'admin2@school.com', userRole: 'Admin', userPassword: 'password2' },
			{ userID: 'U003', userEMail: 'admin3@school.com', userRole: 'Admin', userPassword: 'password3' },
		]);

		// Employees
		const employees = await Employee.bulkCreate([
			{ employeeID: 'E001', employeeSchoolCode: schools[0].schoolCode, employeeName: 'Dr. Smith', employeeEmail: 'smith@school.com', employeePhoneNum: '123123123', employeeAddress: '1 Science Ave', employeeType: 'Instructor', UserAccountUserID: userAccounts[0].userID },
			{ employeeID: 'E002', employeeSchoolCode: schools[1].schoolCode, employeeName: 'Dr. Lee', employeeEmail: 'lee@school.com', employeePhoneNum: '456456456', employeeAddress: '2 Engineering Rd', employeeType: 'Admin', UserAccountUserID: userAccounts[1].userID },
			{ employeeID: 'E003', employeeSchoolCode: schools[2].schoolCode, employeeName: 'Ms. Tan', employeeEmail: 'tan@school.com', employeePhoneNum: '789789789', employeeAddress: '3 Arts Lane', employeeType: 'Instructor', UserAccountUserID: userAccounts[2].userID },
		]);

		// Instructors
		const instructors = await Instructor.bulkCreate([
			{ instructorID: 'I001', instructorName: 'Dr. Smith', instructorPhoneNum: '111222333', instructorEmail: 'smith@school.com', employeeID: employees[0].employeeID },
			{ instructorID: 'I002', instructorName: 'Dr. Lee', instructorPhoneNum: '444555666', instructorEmail: 'lee@school.com', employeeID: employees[1].employeeID },
			{ instructorID: 'I003', instructorName: 'Ms. Tan', instructorPhoneNum: '777888999', instructorEmail: 'tan@school.com', employeeID: employees[2].employeeID },
		]);

		// AdminStaff
		const adminStaff = await AdminStaff.bulkCreate([
			{ adminStaffID: 'A001', adminStaffName: 'Alice Admin', adminStaffPhoneNum: '333444555', adminStaffEmail: 'alice@school.com', employeeID: employees[1].employeeID },
			{ adminStaffID: 'A002', adminStaffName: 'Bob Admin', adminStaffPhoneNum: '666777888', adminStaffEmail: 'bob@school.com' },
			{ adminStaffID: 'A003', adminStaffName: 'Charlie Admin', adminStaffPhoneNum: '999000111', adminStaffEmail: 'charlie@school.com' },
		]);

		// Courses
		const courses = await Course.bulkCreate([
			{ courseCode: 'C001', courseName: 'Physics 101', description: 'Introduction to Physics', schoolCode: schools[0].schoolCode },
			{ courseCode: 'C002', courseName: 'Mechanics', description: 'Mechanical Engineering Basics', schoolCode: schools[1].schoolCode },
			{ courseCode: 'C003', courseName: 'Painting 101', description: 'Introduction to Painting', schoolCode: schools[2].schoolCode },
		]);

		// CourseRecords
		await CourseRecord.bulkCreate([
			{ studentID: students[0].studentNum, courseCode: courses[0].courseCode, grade: 85.0, passFail: 'Pass' },
			{ studentID: students[1].studentNum, courseCode: courses[1].courseCode, grade: 75.0, passFail: 'Pass' },
			{ studentID: students[2].studentNum, courseCode: courses[2].courseCode, grade: 65.0, passFail: 'Fail' },
		]);

		// Modules
		await Module.bulkCreate([
			{ studentID: students[0].studentNum, courseCode: courses[0].courseCode, moduleNum: 1, year: new Date('2023-01-01'), semester: 'Sem 1', instructorID: instructors[0].instructorID },
			{ studentID: students[1].studentNum, courseCode: courses[1].courseCode, moduleNum: 2, year: new Date('2023-01-01'), semester: 'Sem 1', instructorID: instructors[1].instructorID },
			{ studentID: students[2].studentNum, courseCode: courses[2].courseCode, moduleNum: 3, year: new Date('2023-01-01'), semester: 'Sem 2', instructorID: instructors[2].instructorID },
		]);

		console.log('Database seeded successfully!');
	} catch (error) {
		console.error('Error seeding data:', error);
	}
}

seedData();
