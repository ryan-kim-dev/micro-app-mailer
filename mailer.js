const nodemailer = require('nodemailer');

// const createTransporter = async () => {
//   const oauth2Client = new OAuth2(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     'https://developers.google.com/oauthplayground'
//   );

//   oauth2Client.setCredentials({
//     refresh_token: process.env.REFRESH_TOKEN,
//   });
//   const accessToken = await new Promise((resolve, reject) => {
//     oauth2Client.getAccessToken((err, token) => {
//       if (err) {
//         reject('Failed to create access token :(');
//       }
//       resolve(token);
//     });
//   });
// };
// const {
//   OAUTH_USER,
//   OAUTH_CLIENT_ID,
//   OAUTH_CLIENT_SECRET,
//   OAUTH_REFRESH_TOKEN,
// } = process.env;

// if (
//   !OAUTH_USER ||
//   !OAUTH_CLIENT_ID ||
//   !OAUTH_CLIENT_SECRET ||
//   !OAUTH_REFRESH_TOKEN
// ) {
//   throw Error('OAuth 인증에 필요한 환경변수가 없습니다.');
// }

module.exports = async (name, email, subject, message) => {
  const transporter = await nodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
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

  const mailOption = {
    from: OAUTH_USER,
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

// async function main(receiverEmail) {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.google.com',
//     port: 587,
//     secure: true,
//     auth: {
//       type: 'OAuth2',
//       user: OAUTH_USER,
//       clientId: OAUTH_CLIENT_ID,
//       clientSecret: OAUTH_CLIENT_SECRET,
//       refreshToken: OAUTH_REFRESH_TOKEN,
//     },
//   });

//   const message = {
//     from: OAUTH_USER,
//     to: receiverEmail,
//     subject: 'Nodemailer X Gmail OAuth 2.0 테스트',
//     html: `
//       <h1>
//         Nodemailer X Gmail OAuth 2.0 테스트 메일
//       </h1>
//       <hr />
//       <br />
//       <p>축하하네, 구도자여!<p/>
//       <p>자네는 모든 시련과 역경을 이겨냈네. 하산하시게나!</p>
//       <br />
//       <hr />
//       <p>이 메일은 Gmail API를 써보고 싶은 정신나간 개발자에 의해서 발송되었습니다.</p>
//       <p>이 메일을 요청한 적이 없으시다면 무시하시기 바랍니다.</p>
//     `,
//   };

//   try {
//     await transporter.sendMail(message);
//     console.log('메일을 성공적으로 발송했습니다.');
//   } catch (e) {
//     console.log(e);
//   }
// }

// main('ryankim.h.dev@gmail.com');
