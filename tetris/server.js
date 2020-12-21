const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

// https://expressjs.com/

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.post('/data', function(req, res) {
  const { body } = req;
  const { data } = body;

  const ret = {
    success: true,
  };
  fs.writeFile(
    'data.json',
    JSON.stringify(data, ' ', 2),
    'utf8',
    function(err) {
      if (err) {
        ret.success = false;
      }

      res.json(ret);
    },
  );
});

app.get('/data', function(req, res) {
  const ret = {
    success: false,
    result: {},
  };

  fs.readFile('data.json', 'utf8', function(err, data) {
    if (!err) {
      ret.success = true;
      ret.result = JSON.parse(data);
    }

    res.json(ret);
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
});