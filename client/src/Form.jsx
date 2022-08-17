import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
const App = () => {
  const [data, setData] = useState({
    yourname: '',
    youremail: '',
    yoursubject: '',
    yourmessage: '',
  });

  const onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setData(prev => ({
      ...prev, // 기존 객체 복사 (spread)
      [name]: value,
      // input에 부여된 name 속성의 값을 key로, name 키를 가진 값을 value로 설정.
      // [] 로 감싸 key 값을 동적으로 받는다.
      // 참고 : https://kjhg478.tistory.com/27
    }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    axios
      .post('/mail', {
        data: {
          ...data,
        },
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(`${err}`));
  };

  return (
    <>
      <FormContainer className="text-dark">
        <Form
          action="/mail"
          method="post"
          onChange={onChange}
          onSubmit={onSubmit}
        >
          <Div>
            <Label htmlFor="name">Name</Label>
            <Input type="text" name="yourname" id="name" placeholder="성함" />
          </Div>
          <Div>
            <Label htmlFor="email">Address</Label>
            <Input
              type="email"
              name="youremail"
              id="email"
              placeholder="메일주소"
            />
          </Div>
          <Div>
            <Label htmlFor="subject">Title</Label>
            <Input
              type="text"
              name="yoursubject"
              id="subject"
              placeholder="제목"
            />
          </Div>
          <Div>
            <Label htmlFor="message">Message</Label>
            <textarea
              name="yourmessage"
              id="message"
              required
              placeholder="본문을 입력해주세요"
            />
          </Div>
          <Input type="submit" className="submit-btn" value="Send Email" />
        </Form>
      </FormContainer>
    </>
  );
};

export default App;

const FormContainer = styled.div`
  z-index: 1;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(40px);
  padding: 3em 3em 3em 0;

  width: 800px;
  display: flex;

  /* 모바일 가로, 테블릿 세로 (해상도 ~ 479px)*/
  @media all and (max-width: 479px) {
  }
`;

const Form = styled.form`
  background: rgba(255, 255, 255, 0.2);
  width: 70%;
  display: flex;
  row-gap: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  padding: 1rem;

  textarea {
    background: inherit;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1.5px solid #414141;
    width: 400px;
    height: 150px;
  }
`;

const Div = styled.div``;

const Label = styled.label`
  display: block;
  font-family: 'Oswald', sans-serif;
`;

const Input = styled.input`
  background: inherit;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1.5px solid #414141;
  width: 400px;

  &.submit-btn {
    width: max-content;
    cursor: pointer;
    font-family: 'Oswald', sans-serif;
    color: inherit;
    text-decoration: none;
    border: 2px solid #414141;
    padding: 2px 10px;
    background-color: transparent;

    :hover {
      color: #bebebe;
      border: 2px solid #bebebe;
    }
  }
`;
