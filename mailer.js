const nodeMailer = require('nodemailer');

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });
  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject('Failed to create access token :(');
      }
      resolve(token);
    });
  });
};

module.exports = async (name, email, subject, message) => {
  const transporter = await nodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOption = {
    from: name,
    to: process.env.REACT_APP_GMAIL_ADDRESS,
    subject: subject,
    html: `포트폴리오 앱에서 발송된 메세지입니다. <br /> 
      Email : ${email} <br />
      Name: ${name} <br />
      Message: ${message}`,
  };

  try {
    await transporter.sendMail(mailOption);
    return 'success';
  } catch (error) {
    return error;
  }
};
