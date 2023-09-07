const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// 정적 파일(HTML, CSS, JS)을 제공하기 위한 미들웨어
app.use(express.static(path.join(__dirname, 'front')));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // 로그인 로직을 여기에 작성하세요.
  // 예: 데이터베이스에서 사용자를 검색하고 비밀번호를 확인합니다.

  res.send('로그인 성공');
});

app.post('/signup', (req, res) => {
  const { name, username, password, studentId } = req.body;
  const photos = req.files.photos; // 파일 업로드를 처리합니다.

  // 회원가입 로직을 여기에 작성하세요.
  // 예: 데이터베이스에 새 사용자를 생성하고, 사진을 적절한 폴더에 저장합니다.
  
  // 사진 파일을 서버에 저장하는 코드 (예시)
  if (photos && photos.length) {
    photos.forEach((photo, index) => {
      photo.mv(path.join(__dirname, 'uploads', `${username}_${index}.jpg`));
    });
  }

  res.send('회원가입 성공');
});

app.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행 중입니다.');
});
