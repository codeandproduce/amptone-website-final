const nodemailer = require('nodemailer');

var mailing = (email, name, subject, message) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port:25,
    auth:{
      user: 'contactamptone@gmail.com',
      pass: '76424you'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  let HelperOptions = {
    from: '"Amptone Records" <contactamptone@gmail.com',
    to: 'contactamptone@gmail.com',
    subject: 'Hello world!',
    text: 'this is working.'
  };

  return new Promise((resolve, reject) => {
      transporter.sendMail(HelperOptions, (error, info) => {
      if(error){
        return console.log(error);
        reject();
      }
      resolve();
      console.log("The message sent");
      console.log(info);
    });
  });
}

module.exports = {mailing};
