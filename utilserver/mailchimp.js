const request = require("request");

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
      if(body.title == 'Member Exists'){
        reject('member exists');
        console.log('member exists');
      }
      resolve();
      console.log(body);
    });
  });
}

module.exports = {addEmailToMailchimp};
