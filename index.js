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

app.use(cors());
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

app.use(express.static(path.join('client/build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.post('/mail', async (req, res) => {
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
