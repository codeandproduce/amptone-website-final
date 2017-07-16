const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const bodyParser = require('body-parser');
const request = require("request");


const port = process.env.PORT || 8000;
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.use(express.static(__dirname + '/public'));


app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set('view engine', 'hbs');

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


app.get('/contact', (req, res) => {
  res.render('contact.hbs', {
    atcontact: true
  })
})


function addEmailToMailchimp(email) {

var options = { method: 'POST',
  url: 'https://us16.api.mailchimp.com/3.0/lists/8f262904d8/members',
  headers: {
    'postman-token': '5a965e75-c75d-cadd-ccd5-599618f7d83e',
    'cache-control': 'no-cache',
    authorization: 'Basic a2ltLmNoYW53b29AeWFob28uY29tOjU4YzA4Yzk4NWRjZDcwYzNjNWI0NDVkMmMzNTI3MDYzLXVzMTY=',
    'content-type': 'application/json'
  },
  body: {
    email_address: email,
    status: 'subscribed'
  },
  json: true
  };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

}

app.listen(port);
