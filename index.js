const express = require('express');
const app = express();
const facts = require('./data/facts.js')

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(require("./json/dat.json"))
});

app.get('/fact', (req, res) => {
  var item = facts[Math.floor(Math.random()*facts.length)];
  var cleanItem = `{"fact":"` + item + `"}`
  res.setHeader('Content-Type', 'text/plain');
  res.send(cleanItem)
});

app.get('/tldr', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});