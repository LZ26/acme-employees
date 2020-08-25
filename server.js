const express = require('express');
const app = express();
const path = require('path');



app.use(require('body-parser').json());
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));






const init = () => {
  const port = process.env.PORT || 3003;
  app.listen(port, (req, res, next) => {
    console.log(`Listening on port: ${port}!`);
  })
}

init();
