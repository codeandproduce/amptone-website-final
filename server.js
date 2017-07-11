const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8000;
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');

hbs.registerHelper('athome', () => {
  return new Date().getFullYear();
});

app.get('/', (req, res) => {
  res.render('index.hbs',{
    athome: true
  });
});
app.get('/events', (req, res) => {
  res.render('events.hbs',{
    atevent: true
  });
});
app.get('/artists', (req, res) => {
  res.render('artists.hbs', {
    atartist: true
  })
});
app.get('/releases', (req, res) => {
  res.render('releases.hbs', {
    atrelease: true
  });
});

app.listen(port);
