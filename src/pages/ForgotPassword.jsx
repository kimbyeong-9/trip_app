import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import SuccessMessage from '../components/auth/SuccessMessage';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err) {
      setError('이메일 발송 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Card>
        <BackArrowButton onClick={() => navigate(-1)}>←</BackArrowButton>
        <Logo onClick={() => navigate('/')}>여행대로</Logo>

        {!success ? (
          <ForgotPasswordForm
            email={email}
            onEmailChange={setEmail}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
            onBackToLogin={handleBackToLogin}
          />
        ) : (
          <SuccessMessage email={email} onBackToLogin={handleBackToLogin} />
        )}
      </Card>
    </Container>
  );
};



const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 50px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 500px;
  min-height: 480px;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Logo = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const BackArrowButton = styled.button`
  position: absolute;
  top: 30px;
  left: 30px;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid #667eea;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #667eea;
  font-size: 18px;

  &:hover {
    background: rgba(102, 126, 234, 0.2);
    transform: translateX(-2px);
  }
`;

export default ForgotPassword;