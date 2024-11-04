const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  '', '', '',
  {
    dialect: 'sqlite',
    storage: './db/database.db',
    logging: false
  }
);


const testtable = sequelize.define('testingtable', {

  studentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  studentName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true
});



sequelize.sync();

module.exports = { sequelize, testtable };