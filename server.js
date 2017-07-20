const express = require('express');
const path = require('path');
const hbs = require('hbs');
const http = require('http');
const bodyParser = require('body-parser');
const request = require("request");
const socketIO = require('socket.io');

const port = process.env.PORT || 8000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var emailSuccess = false;

hbs.registerPartials(__dirname+'/views/partials');
app.use(express.static(__dirname + '/public'));



app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set('view engine', 'hbs');


io.on('connection', (socket) => {
  socket.on('email-request', (useremail) => {
    var emailPromise = new Promise((resolve,reject)=>{
        socket.emit('processing');
        addEmailToMailchimp(useremail.email).then(()=>{
          console.log(emailSuccess);
          if(emailSuccess){
            socket.emit('email-success');
          }else{
            socket.emit('email-failure');
          }
      }).catch((error)=>{
        console.log(error);
      });
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
})




var addEmailToMailchimp = (email) => {

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

  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {

      if (error){
        emailSuccess = false;
        console.log("didnt work");
        reject('error');
      }
      if(body.status === 400){
        emailSuccess = false;
        console.log("didnt work");
        reject('error');
      }
      if(body.status === "subscribed"){
        emailSuccess = true;
        console.log("email worked");
        resolve();
      }



      console.log(body);

    });
  });
}

server.listen(port);
