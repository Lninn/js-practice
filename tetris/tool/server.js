const express = require('express');
const cors = require('cors');
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
  res.json({ success: true, result: {} })
});

app.get('/data', function(req, res) {
  res.send('data')
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
});