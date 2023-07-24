const express = require('express');
const rateLimit = require('express-rate-limit');
const schedule = require('node-schedule');
const app = express();

var requests = '0';
const facts = require('./data/facts.js');

const cors = require('cors');
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

function selHourlyFact() {
  return facts[Math.floor(Math.random() * facts.length)];
}

function selHourlyFactApp() {
  return facts[Math.floor(Math.random() * facts.length)];
}

selHourlyFactApp();
selHourlyFact();

const midnightRule = new schedule.RecurrenceRule();
midnightRule.hour = 0;
midnightRule.minute = 0;

schedule.scheduleJob(midnightRule, function() {
  selHourlyFact();
  selHourlyFactApp();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/docs/basics.html');
});

app.get('/fact/specify/:number', function(req, res) {
  res.send(facts[req.params.number]);
});

app.get('/fact/specify/count/:number', function(req, res) {
  var factSel = {};
  facts.slice(0, req.params.number).forEach((fact, index) => {
    factSel[index] = fact;
  });
  res.send(JSON.stringify(factSel));
});

app.get('/fact/specify/count/random/:number', function(req, res) {
  var factSel = {};
  for (let i = 0; i < req.params.number; i++) {
    factSel[i] = facts[Math.floor(Math.random() * facts.length)];
  }
  res.send(JSON.stringify(factSel));
});


function selFact() {
  return facts[Math.floor(Math.random() * facts.length)];
}

function selFactNJSON() {
  return facts[Math.floor(Math.random() * facts.length)];
}

app.get('/fact/reqs', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(requests);
});

app.get('/fact', (req, res) => {
  res.redirect('/fact/specify/count/random/1')
});

function getCurrentTime() {
  ts = Date.now();
  date_ob = new Date(ts);
  date = date_ob.getDate();
  month = date_ob.getMonth() + 1;
  year = date_ob.getFullYear();
  hour = date_ob.getHours();
  minutes = date_ob.getMinutes();
  time = hour + ':' + minutes;
  return year + '-' + month + '-' + date + ' ' + time;
}

app.get('/fact/app', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(selFactNJSON());
  console.log('A user has viewed a fact in the app at ' + getCurrentTime());
});

app.get('/fact/hourly', (req, res) => {
  //res.setHeader('Content-Type', 'text/plain');
  //res.send(selHourlyFact());
  res.send("This endpoint is temporarily disabled.")
});

app.get('/fact/hourly/app', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(selHourlyFactApp());
  console.log('A user has viewed a fact in the app at ' + getCurrentTime());
});

app.listen(3000, function() {
  console.log('Fact server listening on port 3000!');
});
