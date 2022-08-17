const express = require('express');
const app = express();
// const morgan = require('morgan');
// const helmet = require('helmet');
const path = require('path');
const port = process.env.PORT || 5000;
require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const mailer = require('./mailer');

app.use(
  cors({
    origin: [
      'http://localhost:5000',
      'http://localhost:3000',
      'https://micro-mailer-app.herokuapp.com/',
      'https://ryan-kim-portfolio.herokuapp.com',
      'https://ryan-kim-portfolio.herokuapp.com/mail',
      'https://testimonial-636ab.firebaseapp.com/__/auth/iframe?apiKey=AIzaSyBpo9wlD4WBxqgSj-rHAHUTOHrNUizwu2w&appName=%5BDEFAULT%5D&v=9.9.1&eid=p&usegapi=1&jsh=m%3B%2F_%2Fscs%2Fabc-static%2F_%2Fjs%2Fk%3Dgapi.lb.ko.YiCKVpvM9gk.O%2Fd%3D1%2Frs%3DAHpOoo-mYyqnyWT014jZNkQOlQ8LXOujcA%2Fm%3D__features__',
    ],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Methods',
    'OPTIONS, HEAD, GET, PUT, POST, DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );
// app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

app.use(express.static('./client/build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.post('/mail', cors(), async (req, res) => {
  const { yourname, youremail, yoursubject, yourmessage } = req.body.data;

  mailer(yourname, youremail, yoursubject, yourmessage).then(response => {
    if (response === 'success') {
      res.status(200).json({
        status: 'Success',
        code: 200,
        message: '메일이 성공적으로 발송되었습니다.',
      });
    } else {
      res.json({
        status: 'Fail',
        code: response.code,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`${port}번 포트로 서버 실행중`);
});
