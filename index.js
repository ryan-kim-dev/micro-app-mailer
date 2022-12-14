const express = require('express');
const app = express();
// const morgan = require('morgan');
// const helmet = require('helmet');
const path = require('path');
const host = '0.0.0.0'; // 추가
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
const cors = require('cors');
const main = require('./mailer');

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

app.use(express.static(path.join(__dirname, './client/build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

app.post('/mail', async (req, res) => {
  const { name, email, subject, message } = req.body.data;

  main(name, email, subject, message)
    .then(response => {
      res.status(200).json({
        status: 'Success',
        code: 200,
        message: '메일이 성공적으로 발송되었습니다.',
      });
    })
    .catch(err => console.log(`${err}`));
});

app.listen(PORT, host, () => {
  console.log(`${PORT}번 포트로 서버 실행중, 호스트: ${host}번 포트`);
});
