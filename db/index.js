const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_employees');
const { STRING } = Sequelize;


const Department = db.define('department', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true
  },
})

const Employee = db.define('employee', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true
  },
})

Department.hasMany(Employee);
Employee.belongsTo(Department);


const syncAndSeed = async () => {
  await db.sync({ force: true });
  const [IT, HR, MARKETING] = await Promise.all([
    Department.create({name: 'IT'}),
    Department.create({name: 'HR'}),
    Department.create({name: 'MARKETING'}),
  ])
}

module.exports = {
  models: {
    Department,
    Employee
  },
  syncAndSeed
}
