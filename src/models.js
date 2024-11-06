const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('', '', '', {
	dialect: 'sqlite',
	storage: './db/studentrecordmanagement.db',
	logging: false,
});

// create table

const UserAccount = sequelize.define(
	'UserAccount',
	{
		userID: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		userEMail: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		userRole: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		userPassword: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
	}
);

const Student = sequelize.define(
	'Student',
	{
		studentNum: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		studentName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		studentDOB: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		personalPhoneNum: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		housePhoneNum: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		sex: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		currentAddress: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		nationality: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		emergencyContact: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		degree: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		gpa: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		studentEmail: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		freezeTableName: true,
	}
);

const NextOfKin = sequelize.define(
	'NextOfKin',
	{
		NOKID: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		NOKName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		NOKPhoneNum: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
	}
);

const School = sequelize.define(
	'School',
	{
		schoolCode: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		schoolName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		schoolPhoneNum: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		schoolDegree: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		schoolCourses: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
	}
);

const Course = sequelize.define(
	'Course',
	{
		courseCode: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		courseName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
	}
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
		grade: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		passfail: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
	}
);

const Module = sequelize.define(
	'Module',
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
		moduleNum: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		year: {
			type: DataTypes.DATE,
			primaryKey: true,
			allowNull: false,
		},
		semester: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		instructor: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
	}
);

const Employee = sequelize.define(
	'Employee',
	{
		employeeID: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		employeeSchoolCode: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		employeeName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		employeeEmail: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		employeePhoneNum: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		employeeAddress: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		employeeType: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
	}
);

const Instructor = sequelize.define(
	'Instructor',
	{
		instructorID: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		instructorName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		instructorPhoneNum: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		instructorEmail: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		freezeTableName: true,
	}
);

const AdminStaff = sequelize.define(
	'AdminStaff',
	{
		adminStaffID: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		adminStaffName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		adminStaffPhoneNum: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		adminStaffEmail: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		freezeTableName: true,
	}
);

// association
// Student.hasMany(NextOfKin);
// NextOfKin.belongsTo(Student);

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

Employee.hasMany(Instructor);
Instructor.belongsTo(Employee);

Employee.hasMany(AdminStaff);
AdminStaff.belongsTo(Employee);

// CourseRecord.hasMany(Student);
CourseRecord.belongsTo(Student);
Student.hasMany(CourseRecord);

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

sequelize.sync();

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
