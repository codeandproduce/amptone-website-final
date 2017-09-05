const express = require('express');
const path = require('path');
const hbs = require('hbs');
const http = require('http');
const bodyParser = require('body-parser');
const request = require("request");
const socketIO = require('socket.io');


//own modules
const {addEmailToMailchimp} = require('./utilserver/mailchimp');
const {mailing} = require('./utilserver/mail');
//

const port = process.env.PORT || 8000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


hbs.registerPartials(__dirname+'/views/partials');
app.use(express.static(__dirname + '/public'));



app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set('view engine', 'hbs');


io.on('connection', (socket) => {
  socket.on('email-request', (useremail) => {
        socket.emit('processing');
        addEmailToMailchimp(useremail.email).then(()=>{
        socket.emit('email-success');
      }).catch((error)=>{
        console.log(error);
        socket.emit('email-failure',{
          type: error
        });
      });
  });
  //contact form
  socket.on('contact-form-submit', (contactMessage)=>{
    socket.emit('contact-form-processing');
    mailing(
      contactMessage.name,
      contactMessage.email,
      contactMessage.subject,
      contactMessage.message
    ).then(()=>{
      socket.emit('contact-form-success');
    }).catch((error) => {
      socket.emit('contact-form-failure');
    });
  });
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

app.get('/contact', (req, res) => {
  res.render('contact.hbs', {
    atcontact: true
  })
});

server.listen(port);
