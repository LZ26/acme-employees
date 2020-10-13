const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/acme_db'
);
const { STRING } = Sequelize;

const faker = require('faker');

const Department = db.define('department', {
  name: {
    type: STRING,
    allowNull: false,
  },
});

const Employee = db.define('employee', {
  name: {
    type: STRING,
    allowNull: false,
  },
});

Employee.belongsTo(Department);
Department.hasMany(Employee);

const syncAndSeed = async () => {
  await db.sync({ force: true });
  let promises = [];

  while (promises.length < 5) {
    promises.push(
      Department.create({
        name: faker.commerce.department(),
      })
    );
  }

  const departments = await Promise.all(promises);
  promises = [];

  while (promises.length < 50) {
    promises.push(
      Employee.create({
        name: faker.name.firstName(),
        departmentId: faker.random.arrayElement(departments).id,
      })
    );
  }
  await Promise.all(promises);
};

module.exports = {
  db,
  Department,
  Employee,
  syncAndSeed,
};
