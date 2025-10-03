import React from 'react';
import styled from 'styled-components';

const SuccessMessage = ({ email, onBackToLogin }) => {
  return (
    <Container>
      <Icon>✅</Icon>
      <Title>이메일을 확인해주세요</Title>
      <Message>
        <strong>{email}</strong>로<br />
        비밀번호 재설정 링크를 보냈습니다.
      </Message>
      <Note>
        이메일이 오지 않았다면 스팸함을 확인해주세요.
      </Note>
      <BackButton onClick={onBackToLogin}>
        로그인 페이지로 돌아가기
      </BackButton>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
`;

const Icon = styled.div`
  margin-bottom: 20px;
  font-size: 48px;
  color: #4CAF50;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const Message = styled.p`
  color: #6c757d;
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 1.6;

  strong {
    color: #2c3e50;
    font-weight: 600;
  }
`;

const Note = styled.p`
  color: #6c757d;
  font-size: 14px;
  margin-bottom: 30px;
`;

const BackButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }
`;

export default SuccessMessage;
