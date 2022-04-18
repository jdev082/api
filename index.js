const express = require('express');
const app = express();
const facts = require('./data/facts.js')

const cors = require('cors');
app.use(cors());

function selHourlyFact() {
  itemHourly = facts[Math.floor(Math.random()*facts.length)];
  cleanHourlyItem = `{"fact":"` + itemHourly + `"}`
}

selHourlyFact();
setInterval(selHourlyFact, 1000 * 60 * 60);

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(require("./json/dat.json"))
});

function selFact() {
  item = facts[Math.floor(Math.random()*facts.length)];
  cleanItem = `{"fact":"` + item + `"}`
}

app.get('/fact', (req, res) => {
  selFact()
  res.setHeader('Content-Type', 'text/plain');
  res.send(cleanItem)
});

app.get('/fact/hourly', (req,res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(cleanHourlyItem)
});

app.get('/tldr', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});

app.get('*', function(req, res){
  res.setHeader('Content-Type', 'text/plain');
  console.log("404, requested content not found.")
  res.status(404).send('404, requested content not found.');
});