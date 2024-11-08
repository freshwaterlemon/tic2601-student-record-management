const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('', '', '', {
	dialect: 'sqlite',
	storage: './db/studentrecordmanagement.db',
	logging: console.log, // Enable logging for debugging
});

// Define tables

const UserAccount = sequelize.define(
	'UserAccount',
	{
		userID: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
		userEMail: { type: DataTypes.STRING, allowNull: false, unique: true },
		userRole: { type: DataTypes.STRING, allowNull: false },
		userPassword: { type: DataTypes.STRING, allowNull: false },
	},
	{ freezeTableName: true }
);

const Student = sequelize.define(
	'Student',
	{
		studentNum: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		studentName: { type: DataTypes.STRING, allowNull: false },
		studentDOB: { type: DataTypes.DATE, allowNull: false },
		personalPhoneNum: { type: DataTypes.STRING, allowNull: false }, // Use STRING for phone numbers
		housePhoneNum: { type: DataTypes.STRING, allowNull: true },
		sex: { type: DataTypes.STRING, allowNull: false },
		currentAddress: { type: DataTypes.STRING, allowNull: false },
		nationality: { type: DataTypes.STRING, allowNull: false },
		degree: { type: DataTypes.STRING, allowNull: false },
		gpa: { type: DataTypes.FLOAT, allowNull: false },
		status: { type: DataTypes.STRING, allowNull: false },
		studentEmail: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{ freezeTableName: true }
);

const NextOfKin = sequelize.define(
	'NextOfKin',
	{
		NOKID: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
		NOKName: { type: DataTypes.STRING, allowNull: false },
		NOKPhoneNum: { type: DataTypes.STRING, allowNull: false },
	},
	{ freezeTableName: true }
);

const School = sequelize.define(
	'School',
	{
		schoolCode: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		schoolName: { type: DataTypes.STRING, allowNull: false },
		schoolPhoneNum: { type: DataTypes.STRING, allowNull: false },
		schoolDegree: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		schoolCourses: { type: DataTypes.STRING, allowNull: false },
	},
	{ freezeTableName: true }
);

const Course = sequelize.define(
	'Course',
	{
		courseCode: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		courseName: { type: DataTypes.STRING, allowNull: false },
		description: { type: DataTypes.STRING, allowNull: false },
	},
	{ freezeTableName: true }
);

const CourseRecord = sequelize.define(
	'CourseRecord',
	{
		studentID: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		courseCode: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		grade: { type: DataTypes.FLOAT, allowNull: true },
		passfail: { type: DataTypes.STRING, allowNull: false },
	},
	{ freezeTableName: true }
);

const Employee = sequelize.define(
	'Employee',
	{
		employeeID: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		employeeSchoolCode: { type: DataTypes.STRING, allowNull: false },
		employeeName: { type: DataTypes.STRING, allowNull: false },
		employeeEmail: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		employeePhoneNum: { type: DataTypes.STRING, allowNull: false },
		employeeAddress: { type: DataTypes.STRING, allowNull: false },
		employeeType: {
			type: DataTypes.ENUM('Instructor', 'AdminStaff'),
			allowNull: false,
		},
	},
	{ freezeTableName: true }
);

const Instructor = sequelize.define(
	'Instructor',
	{},
	{ freezeTableName: true }
);

const AdminStaff = sequelize.define(
	'AdminStaff',
	{},
	{ freezeTableName: true }
);

const Module = sequelize.define(
	'Module',
	{
		studentID: { type: DataTypes.STRING, allowNull: false },
		courseCode: { type: DataTypes.STRING, allowNull: false },
		moduleNum: { type: DataTypes.INTEGER, allowNull: false },
		year: { type: DataTypes.INTEGER, allowNull: false },
		semester: { type: DataTypes.STRING, allowNull: false },
		instructorID: { type: DataTypes.STRING, allowNull: false },
	},
	{
		freezeTableName: true,
		timestamps: false,
		indexes: [
			{
				unique: true,
				fields: ['studentID', 'courseCode', 'year', 'instructorID'],
			},
		],
	}
);

// Associations

School.hasMany(Student);
Student.belongsTo(School);

School.hasMany(Employee);
Employee.belongsTo(School);

School.hasMany(Course);
Course.belongsTo(School);

UserAccount.hasMany(Student);
Student.belongsTo(UserAccount);

UserAccount.hasMany(Employee);
Employee.belongsTo(UserAccount);

Employee.hasOne(Instructor);
Instructor.belongsTo(Employee);

Employee.hasOne(AdminStaff);
AdminStaff.belongsTo(Employee);

Student.hasMany(CourseRecord);
CourseRecord.belongsTo(Student);

Course.hasMany(CourseRecord);
CourseRecord.belongsTo(Course);

Course.hasMany(Module);
Module.belongsTo(Course);

Student.belongsToMany(NextOfKin, { through: 'StudentNextOfKin' });
NextOfKin.belongsToMany(Student, { through: 'StudentNextOfKin' });

Student.belongsToMany(Module, { through: 'StudentModule' });
Module.belongsToMany(Student, { through: 'StudentModule' });

AdminStaff.belongsToMany(Course, { through: 'AdminStaffCourse' });
Course.belongsToMany(AdminStaff, { through: 'AdminStaffCourse' });

Instructor.belongsToMany(Module, { through: 'InstructorModule' });
Module.belongsToMany(Instructor, { through: 'InstructorModule' });

// Sync database and populate data for testing

(async () => {
    await sequelize.sync({ force: true }); // Reset the database for development

    // Create a School
    const school = await School.create({
        schoolCode: 'SCI01',
        schoolName: 'Science School',
        schoolPhoneNum: '1234567890',
        schoolDegree: 'BSc',
        schoolCourses: 'Physics, Chemistry, Biology',
    });

    // Create Users
    const adminUser = await UserAccount.create({
        userID: 'U001',
        userEMail: 'admin@school.com',
        userRole: 'Admin',
        userPassword: 'password123',
    });

    const studentUser = await UserAccount.create({
        userID: 'U002',
        userEMail: 'alice@student.com',
        userRole: 'Student',
        userPassword: 'securepass',
    });

    // Create Students
    const student1 = await Student.create({
        studentNum: 'S001',
        studentName: 'Alice',
        studentDOB: '2000-01-01',
        personalPhoneNum: '9876543210',
        housePhoneNum: '12345678',
        sex: 'F',
        currentAddress: '123 Main St',
        nationality: 'Singaporean',
        degree: 'BSc',
        gpa: 3.8,
        status: 'Active',
        studentEmail: 'alice@student.com',
        SchoolSchoolCode: school.schoolCode,
        UserAccountUserID: studentUser.userID,
    });

    const student2 = await Student.create({
        studentNum: 'S002',
        studentName: 'Bob',
        studentDOB: '1999-03-15',
        personalPhoneNum: '9123456789',
        housePhoneNum: '87654321',
        sex: 'M',
        currentAddress: '456 Elm St',
        nationality: 'Singaporean',
        degree: 'BSc',
        gpa: 3.5,
        status: 'Active',
        studentEmail: 'bob@student.com',
        SchoolSchoolCode: school.schoolCode,
    });

    // Create Next of Kin
    const nok1 = await NextOfKin.create({
        NOKID: 'N001',
        NOKName: 'Mary Smith',
        NOKPhoneNum: '9999999999',
    });

    const nok2 = await NextOfKin.create({
        NOKID: 'N002',
        NOKName: 'John Doe',
        NOKPhoneNum: '8888888888',
    });

    // Link Next of Kin to Students
    await student1.addNextOfKin(nok1);
    await student2.addNextOfKin(nok2);

    // Create Courses
    const course1 = await Course.create({
        courseCode: 'C001',
        courseName: 'Physics',
        description: 'Introduction to Mechanics and Thermodynamics',
        SchoolSchoolCode: school.schoolCode,
    });

    const course2 = await Course.create({
        courseCode: 'C002',
        courseName: 'Chemistry',
        description: 'Basics of Organic and Inorganic Chemistry',
        SchoolSchoolCode: school.schoolCode,
    });

    // Create Course Records
    await CourseRecord.create({
        studentID: student1.studentNum,
        courseCode: course1.courseCode,
        grade: 4.0,
        passfail: 'Pass',
    });

    await CourseRecord.create({
        studentID: student2.studentNum,
        courseCode: course2.courseCode,
        grade: 3.2,
        passfail: 'Pass',
    });

    // Create Employees
    const employee1 = await Employee.create({
        employeeID: 'E001',
        employeeSchoolCode: school.schoolCode,
        employeeName: 'Dr. Emily Clark',
        employeeEmail: 'emily@school.com',
        employeePhoneNum: '9876543211',
        employeeAddress: '789 Maple Ave',
        employeeType: 'Instructor',
        UserAccountUserID: adminUser.userID,
    });

    const employee2 = await Employee.create({
        employeeID: 'E002',
        employeeSchoolCode: school.schoolCode,
        employeeName: 'Mr. David Brown',
        employeeEmail: 'david@school.com',
        employeePhoneNum: '9876543212',
        employeeAddress: '123 Oak St',
        employeeType: 'AdminStaff',
        UserAccountUserID: adminUser.userID,
    });

    // Assign Instructor and AdminStaff roles
    const instructor1 = await Instructor.create({ EmployeeEmployeeID: employee1.employeeID });
    const adminStaff1 = await AdminStaff.create({ EmployeeEmployeeID: employee2.employeeID });

    // Create Modules
    const module1 = await Module.create({
        studentID: student1.studentNum,
        courseCode: course1.courseCode,
        moduleNum: 101,
        year: 2024,
        semester: 'Sem 1',
        instructorID: instructor1.EmployeeEmployeeID,
    });

    const module2 = await Module.create({
        studentID: student2.studentNum,
        courseCode: course2.courseCode,
        moduleNum: 201,
        year: 2024,
        semester: 'Sem 2',
        instructorID: instructor1.EmployeeEmployeeID,
    });

    console.log('Database fully seeded with sample data!');
})();


module.exports = {
	sequelize,
	UserAccount,
	Student,
	NextOfKin,
	School,
	Course,
	CourseRecord,
	Module,
	Employee,
	Instructor,
	AdminStaff,
};
