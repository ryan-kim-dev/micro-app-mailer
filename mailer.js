const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const {
  OAUTH_USER,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN,
} = process.env;

if (
  !OAUTH_USER ||
  !OAUTH_CLIENT_ID ||
  !OAUTH_CLIENT_SECRET ||
  !OAUTH_REFRESH_TOKEN
) {
  throw Error('OAuth 인증에 필요한 환경변수가 없습니다.');
}

async function main(name, email, subject, message) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.google.com',
    port: 587,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: OAUTH_USER,
      clientId: OAUTH_CLIENT_ID,
      clientSecret: OAUTH_CLIENT_SECRET,
      refreshToken: OAUTH_REFRESH_TOKEN,
    },
  });

  const msgBody = {
    from: OAUTH_USER,
    to: receiverEmail,
    subject: 'Nodemailer X Gmail OAuth 2.0 테스트',
    html: `
    <p>${name}</p>
    <p>${email}</p>
    <p>${subject}</p>
    <p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(msgBody);
    console.log('메일을 성공적으로 발송했습니다.');
  } catch (e) {
    console.log(e);
  }
}
main('ryankim.h.dev@gmail.com');
export default main;
// module.exports = async (name, email, subject, message) => {
//   const transporter = await nodeMailer.createTransport('SMTP', {
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.REACT_APP_GMAIL_ADDRESS,
//       pass: process.env.REACT_APP_GMAIL_PASSWORD,
//     },
//   });

//   const mailOption = {
//     from: name,
//     to: process.env.REACT_APP_GMAIL_ADDRESS,
//     subject: subject,
//     html: `포트폴리오 앱에서 발송된 메세지입니다. <br />
//       Email : ${email} <br />
//       Name: ${name} <br />
//       Message: ${message}`,
//   };

//   try {
//     await transporter.sendMail(mailOption);
//     return 'success';
//   } catch (error) {
//     return error;
//   }
// };
// main('ryankim.h.dev@gmail.com');
