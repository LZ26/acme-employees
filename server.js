const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { Department, Employee } = require('./db');


app.use(require('body-parser').json());
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));


app.get('/api/employees', async (req, res, next) => {
  try {
    const employees = await Employee.findAll({
    });
    res.send(employees);
  } catch (err) {
    next(err);
  }
})

app.get('/api/departments', async (req, res, next) => {
  try {
    res.send(await Department.findAll({
      include: {
        model: Employee
      }
    }));
  } catch (err) {
    next(err);
  }
})

app.put('/api/employees/:id', async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    await employee.update(req.body);
    res.send(employee);
  } catch (err) {
    next(err);
  }
})

app.delete('/api/employees/:id', async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    await employee.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
})


const init = async () => {
  try{
    await db.syncAndSeed();

    const port = process.env.PORT || 3003;
    app.listen(port, () => {
      console.log(`Listening on port: ${port}!`);
    })
  } catch(err) {
    console.log(err);
  }
};

init();
