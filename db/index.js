const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_employees');
const { STRING } = Sequelize;

const faker = require('faker');


const Department = db.define('department', {
  name: {
    type: STRING,
    allowNull: false,
  },
})

const Employee = db.define('employee', {
  name: {
    type: STRING,
    allowNull: false,
  },
})

Department.hasMany(Employee);
Employee.belongsTo(Department);


const syncAndSeed = async () => {
  await db.sync({ force: true });
  const departmentPromises = [];
  const employeePromises = [];

  while(departmentPromises.length < 5){
    departmentPromises.push(
      Department.create({
        name: faker.commerce.department()
      })
    )
  }

  while(employeePromises.length < 50){
    employeePromises.push(
      Employee.create({
        name: faker.name.firstName()
      })
    )
  }
  await Promise.all(departmentPromises);
  await Promise.all(employeePromises);
}

module.exports = {
  models: {
    Department,
    Employee
  },
  syncAndSeed
}
