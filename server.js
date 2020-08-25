const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { Department, Employee } = db.models;



app.use(require('body-parser').json());
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));






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
