// models.js
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './db/studentrecordmanagement.db',
	logging: false, // Set to true if you need query logs for debugging
});

// Define Models
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
		studentID: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		studentName: { type: DataTypes.STRING, allowNull: false },
		studentDOB: { type: DataTypes.DATE, allowNull: false },
		personalPhoneNum: { type: DataTypes.STRING, allowNull: false },
		housePhoneNum: { type: DataTypes.STRING, allowNull: true },
		sex: { type: DataTypes.ENUM('F', 'M'), allowNull: false },
		currentAddress: { type: DataTypes.STRING, allowNull: false },
		nationality: { type: DataTypes.STRING, allowNull: false },
		degree: { type: DataTypes.STRING, allowNull: false },
		gpa: { type: DataTypes.FLOAT, allowNull: false, validate: {
			min: 0.0,
			max: 5.0,
		} },
		studentStatus: { type: DataTypes.ENUM('Active', 'Graduated'), allowNull: false },
		studentEmail: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
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
        studentID: { type: DataTypes.STRING, allowNull: false },
        courseCode: { type: DataTypes.STRING, allowNull: false },
        grade: { type: DataTypes.FLOAT, allowNull: true },
        passfail: { type: DataTypes.STRING, allowNull: false },
        year: { type: DataTypes.INTEGER, allowNull: false },      // New field
        semester: { type: DataTypes.STRING, allowNull: false },    // New field
    },
    {
        indexes: [{ unique: true, fields: ['studentID', 'courseCode', 'year', 'semester'] }],
        freezeTableName: true,
    }
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
		moduleID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		}, // Surrogate primary key
		courseCode: { type: DataTypes.STRING, allowNull: false },
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
				fields: ['courseCode', 'year', 'semester'], // Unique constraint as super key
			},
		],
	}
);

// Define Associations

School.hasMany(Student, { foreignKey: 'SchoolSchoolCode' });
Student.belongsTo(School, { foreignKey: 'SchoolSchoolCode' });

School.hasMany(Employee, { foreignKey: 'employeeSchoolCode' });
Employee.belongsTo(School, { foreignKey: 'employeeSchoolCode' });

School.hasMany(Course, { foreignKey: 'SchoolSchoolCode' });
Course.belongsTo(School, { foreignKey: 'SchoolSchoolCode' });

UserAccount.hasMany(Student, { foreignKey: 'UserAccountUserID' });
Student.belongsTo(UserAccount, { foreignKey: 'UserAccountUserID' });

UserAccount.hasMany(Employee, { foreignKey: 'UserAccountUserID' });
Employee.belongsTo(UserAccount, { foreignKey: 'UserAccountUserID' });

Employee.hasOne(Instructor, { foreignKey: 'EmployeeEmployeeID' });
Instructor.belongsTo(Employee, { foreignKey: 'EmployeeEmployeeID' });

Employee.hasOne(AdminStaff, { foreignKey: 'EmployeeEmployeeID' });
AdminStaff.belongsTo(Employee, { foreignKey: 'EmployeeEmployeeID' });

Student.hasMany(CourseRecord, { foreignKey: 'studentID' });
CourseRecord.belongsTo(Student, { foreignKey: 'studentID' });

Course.hasMany(CourseRecord, { foreignKey: 'courseCode' });
CourseRecord.belongsTo(Course, { foreignKey: 'courseCode' });

Course.hasMany(Module, { foreignKey: 'courseCode' });
Module.belongsTo(Course, { foreignKey: 'courseCode' });

Student.belongsToMany(NextOfKin, { through: 'StudentNextOfKin', onDelete: "CASCADE" });
NextOfKin.belongsToMany(Student, { through: 'StudentNextOfKin', onDelete: "CASCADE" });

Student.belongsToMany(Module, { through: 'StudentModule' });
Module.belongsToMany(Student, { through: 'StudentModule' });

AdminStaff.belongsToMany(Course, { through: 'AdminStaffCourse' });
Course.belongsToMany(AdminStaff, { through: 'AdminStaffCourse' });

Instructor.belongsToMany(Module, { through: 'InstructorModule' });
Module.belongsToMany(Instructor, { through: 'InstructorModule' });

// Association for academic
CourseRecord.belongsTo(Course, { foreignKey: 'courseCode' });
CourseRecord.belongsTo(Module, {
	foreignKey: 'courseCode',
	targetKey: 'courseCode',
	constraints: false,
});
CourseRecord.belongsTo(Module, {
	foreignKey: 'year',
	targetKey: 'year',
	constraints: false,
});
CourseRecord.belongsTo(Module, {
	foreignKey: 'semester',
	targetKey: 'semester',
	constraints: false,
});

// Sync and Populate Database
// Sync and Populate Database
(async () => {
    await sequelize.sync({ force: true });
    console.log('Database synced!');

    // Add Schools
    await School.bulkCreate([
        { schoolCode: 'SCI01', schoolName: 'Science School', schoolPhoneNum: '1234567890', schoolDegree: 'BSc', schoolCourses: 'Physics, Chemistry, Biology' },
        { schoolCode: 'ART01', schoolName: 'Arts School', schoolPhoneNum: '0987654321', schoolDegree: 'BA', schoolCourses: 'History, Sociology, Psychology' },
        { schoolCode: 'ENG01', schoolName: 'Engineering School', schoolPhoneNum: '1122334455', schoolDegree: 'BEng', schoolCourses: 'Mechanical, Electrical, Civil' },
    ]);

    // Add User Accounts
    await UserAccount.bulkCreate([
        { userID: 'U001', userEMail: 'admin@school.com', userRole: 'Admin', userPassword: 'password123' },
        { userID: 'U002', userEMail: 'alice@student.com', userRole: 'Student', userPassword: 'securepass' },
        { userID: 'U003', userEMail: 'bob@student.com', userRole: 'Student', userPassword: 'securepass2' },
        { userID: 'U004', userEMail: 'charlie@student.com', userRole: 'Student', userPassword: 'securepass3' },
        { userID: 'U005', userEMail: 'david@student.com', userRole: 'Student', userPassword: 'securepass4' },
        { userID: 'U006', userEMail: 'eve@student.com', userRole: 'Student', userPassword: 'securepass5' },
    ]);

    // Add Students
    await Student.bulkCreate([
        { studentID: 'S001', studentName: 'Alice', studentDOB: '2000-01-01', personalPhoneNum: '9876543210', sex: 'F', currentAddress: '123 Main St', nationality: 'Singaporean', degree: 'BSc', gpa: 3.8, studentStatus: 'Active', studentEmail: 'alice@student.com' },
        { studentID: 'S002', studentName: 'Bob', studentDOB: '1999-03-15', personalPhoneNum: '9123456789', sex: 'M', currentAddress: '456 Elm St', nationality: 'Singaporean', degree: 'BSc', gpa: 3.5, studentStatus: 'Active', studentEmail: 'bob@student.com' },
        { studentID: 'S003', studentName: 'Charlie', studentDOB: '2001-06-21', personalPhoneNum: '9988776655', sex: 'M', currentAddress: '789 Maple Ave', nationality: 'Malaysian', degree: 'BA', gpa: 3.6, studentStatus: 'Active', studentEmail: 'charlie@student.com' },
        { studentID: 'S004', studentName: 'David', studentDOB: '2002-02-20', personalPhoneNum: '8765432109', sex: 'M', currentAddress: '101 Oak St', nationality: 'Indonesian', degree: 'BSc', gpa: 3.2, studentStatus: 'Active', studentEmail: 'david@student.com' },
        { studentID: 'S005', studentName: 'Eve', studentDOB: '2000-05-18', personalPhoneNum: '9123067890', sex: 'F', currentAddress: '202 Pine St', nationality: 'Indian', degree: 'BA', gpa: 3.4, studentStatus: 'Active', studentEmail: 'eve@student.com' },
        { studentID: 'S006', studentName: 'Frank', studentDOB: '2001-12-12', personalPhoneNum: '8112233445', sex: 'M', currentAddress: '303 Cedar Ave', nationality: 'Filipino', degree: 'BEng', gpa: 3.9, studentStatus: 'Active', studentEmail: 'frank@student.com' },
    ]);

    // Add Courses
    await Course.bulkCreate([
        { courseCode: 'C001', courseName: 'Physics', description: 'Introduction to Mechanics and Thermodynamics' },
        { courseCode: 'C002', courseName: 'Chemistry', description: 'Basics of Organic and Inorganic Chemistry' },
        { courseCode: 'C003', courseName: 'History', description: 'World History Overview' },
        { courseCode: 'C004', courseName: 'Mathematics', description: 'Calculus and Linear Algebra' },
        { courseCode: 'C005', courseName: 'Computer Science', description: 'Introduction to Programming' },
        { courseCode: 'C006', courseName: 'Engineering Fundamentals', description: 'Basics of Engineering Concepts' },
    ]);

    // Add Modules
    await Module.bulkCreate([
        { courseCode: 'C001', year: 2022, semester: '1', instructorID: 'E001' },
        { courseCode: 'C001', year: 2023, semester: '1', instructorID: 'E001' },
        { courseCode: 'C001', year: 2024, semester: '1', instructorID: 'E001' },
        { courseCode: 'C002', year: 2023, semester: '2', instructorID: 'E002' },
        { courseCode: 'C002', year: 2024, semester: '2', instructorID: 'E002' },
        { courseCode: 'C003', year: 2024, semester: '1', instructorID: 'E003' },
        { courseCode: 'C004', year: 2024, semester: '2', instructorID: 'E004' },
        { courseCode: 'C005', year: 2023, semester: '1', instructorID: 'E005' },
        { courseCode: 'C006', year: 2023, semester: '2', instructorID: 'E006' },
    ]);

    // Add Course Records
	// Add Course Records
await CourseRecord.bulkCreate([
    // Records for student S001
    { studentID: 'S001', courseCode: 'C001', grade: 4.0, passfail: 'Pass', year: 2022, semester: '1' },
    { studentID: 'S001', courseCode: 'C002', grade: 3.8, passfail: 'Pass', year: 2022, semester: '2' },
    { studentID: 'S001', courseCode: 'C003', grade: 3.7, passfail: 'Pass', year: 2023, semester: '1' },
    { studentID: 'S001', courseCode: 'C004', grade: 3.9, passfail: 'Pass', year: 2023, semester: '2' },
    { studentID: 'S001', courseCode: 'C005', grade: 4.0, passfail: 'Pass', year: 2024, semester: '1' },
    { studentID: 'S001', courseCode: 'C006', grade: 3.6, passfail: 'Pass', year: 2024, semester: '2' },

    // Records for student S002
    { studentID: 'S002', courseCode: 'C001', grade: 3.5, passfail: 'Pass', year: 2022, semester: '1' },
    { studentID: 'S002', courseCode: 'C002', grade: 3.2, passfail: 'Pass', year: 2022, semester: '2' },
    { studentID: 'S002', courseCode: 'C003', grade: 3.4, passfail: 'Pass', year: 2023, semester: '1' },
    { studentID: 'S002', courseCode: 'C004', grade: 3.7, passfail: 'Pass', year: 2023, semester: '2' },
    { studentID: 'S002', courseCode: 'C005', grade: 3.9, passfail: 'Pass', year: 2024, semester: '1' },
    { studentID: 'S002', courseCode: 'C006', grade: 3.6, passfail: 'Pass', year: 2024, semester: '2' },

    // Records for student S003
    { studentID: 'S003', courseCode: 'C001', grade: 4.0, passfail: 'Pass', year: 2023, semester: '1' },
    { studentID: 'S003', courseCode: 'C002', grade: 3.8, passfail: 'Pass', year: 2023, semester: '2' },
    { studentID: 'S003', courseCode: 'C003', grade: 3.5, passfail: 'Pass', year: 2024, semester: '1' },
    { studentID: 'S003', courseCode: 'C004', grade: 3.7, passfail: 'Pass', year: 2024, semester: '2' },

    // Records for student S004
    { studentID: 'S004', courseCode: 'C005', grade: 3.8, passfail: 'Pass', year: 2023, semester: '1' },
    { studentID: 'S004', courseCode: 'C006', grade: 3.9, passfail: 'Pass', year: 2023, semester: '2' },
    { studentID: 'S004', courseCode: 'C001', grade: 3.7, passfail: 'Pass', year: 2024, semester: '1' },
    { studentID: 'S004', courseCode: 'C002', grade: 3.5, passfail: 'Pass', year: 2024, semester: '2' },

    // Records for student S005
    { studentID: 'S005', courseCode: 'C003', grade: 3.9, passfail: 'Pass', year: 2022, semester: '1' },
    { studentID: 'S005', courseCode: 'C004', grade: 3.8, passfail: 'Pass', year: 2023, semester: '2' },
    { studentID: 'S005', courseCode: 'C005', grade: 4.0, passfail: 'Pass', year: 2024, semester: '1' },
    { studentID: 'S005', courseCode: 'C006', grade: 3.6, passfail: 'Pass', year: 2024, semester: '2' },

    // Records for student S006
    { studentID: 'S006', courseCode: 'C001', grade: 3.9, passfail: 'Pass', year: 2022, semester: '1' },
    { studentID: 'S006', courseCode: 'C002', grade: 3.5, passfail: 'Pass', year: 2022, semester: '2' },
    { studentID: 'S006', courseCode: 'C003', grade: 3.6, passfail: 'Pass', year: 2023, semester: '1' },
    { studentID: 'S006', courseCode: 'C004', grade: 3.7, passfail: 'Pass', year: 2023, semester: '2' },
    { studentID: 'S006', courseCode: 'C005', grade: 3.8, passfail: 'Pass', year: 2024, semester: '1' },
    { studentID: 'S006', courseCode: 'C006', grade: 4.0, passfail: 'Pass', year: 2024, semester: '2' },
]);

	

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

