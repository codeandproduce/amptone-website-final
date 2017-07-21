const nodemailer = require('nodemailer');

var mailing = (name, email, subject, message) => {
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
    from: `"${name}" <${email}`,
    to: 'contactamptone@gmail.com',
    subject: subject,
    text: message
  };

  return new Promise((resolve, reject) => {
    console.log(HelperOptions);
      transporter.sendMail(HelperOptions, (error, info) => {
      if(error){
        return reject();
      }
      resolve();
      console.log("The message sent");
      console.log(info);
    });
  });
}

module.exports = {mailing};
