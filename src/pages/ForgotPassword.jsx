import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components (로그인 페이지와 동일한 디자인)
const ForgotPasswordContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
`;

const ForgotPasswordCard = styled.div`
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

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 10px 0;
`;

const Subtitle = styled.p`
  color: #6c757d;
  margin-bottom: 30px;
  font-size: 16px;
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  position: relative;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 600;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #adb5bd;
  }

  &.error {
    border-color: #dc3545;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 20px;
  border: 1px solid #fcc;
`;

const BackToLoginLink = styled.div`
  margin-top: 30px;
  color: #6c757d;
  font-size: 14px;

  button {
    color: #667eea;
    background: none;
    border: none;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    font-size: 14px;
    margin-left: 5px;

    &:hover {
      text-decoration: underline;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;

const SuccessContainer = styled.div`
  text-align: center;
`;

const SuccessIcon = styled.div`
  margin-bottom: 20px;
  font-size: 48px;
  color: #4CAF50;
`;

const SuccessTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const SuccessMessage = styled.p`
  color: #6c757d;
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 1.6;

  strong {
    color: #2c3e50;
    font-weight: 600;
  }
`;

const SuccessNote = styled.p`
  color: #6c757d;
  font-size: 14px;
  margin-bottom: 30px;
`;

const BackToLoginButton = styled.button`
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

const LoadingSpinner = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
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

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      // 비밀번호 재설정 이메일 발송 시뮬레이션
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
    <ForgotPasswordContainer>
      <ForgotPasswordCard>
        <BackArrowButton onClick={() => navigate(-1)}>
          ←
        </BackArrowButton>
        <Logo onClick={() => navigate('/')}>여행대로</Logo>

        {!success ? (
          <>
            <Title>비밀번호 재설정</Title>
            <Subtitle>
              가입하신 이메일 주소를 입력하시면<br />
              비밀번호 재설정 링크를 보내드립니다.
            </Subtitle>

            <Form onSubmit={handleSubmit}>
              {error && <ErrorMessage>{error}</ErrorMessage>}

              <InputGroup>
                <Label htmlFor="email">이메일</Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일을 입력하세요"
                  required
                  disabled={isLoading}
                  className={error && error.includes('이메일') ? 'error' : ''}
                />
              </InputGroup>

              <SubmitButton
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoadingSpinner>
                    <span className="spinner"></span>
                    전송 중...
                  </LoadingSpinner>
                ) : (
                  '비밀번호 재설정 이메일 보내기'
                )}
              </SubmitButton>
            </Form>

            <BackToLoginLink>
              로그인 페이지로 돌아가기
              <button
                onClick={handleBackToLogin}
                disabled={isLoading}
              >
                로그인
              </button>
            </BackToLoginLink>
          </>
        ) : (
          <SuccessContainer>
            <SuccessIcon>✅</SuccessIcon>
            <SuccessTitle>이메일을 확인해주세요</SuccessTitle>
            <SuccessMessage>
              <strong>{email}</strong>로<br />
              비밀번호 재설정 링크를 보냈습니다.
            </SuccessMessage>
            <SuccessNote>
              이메일이 오지 않았다면 스팸함을 확인해주세요.
            </SuccessNote>
            <BackToLoginButton onClick={handleBackToLogin}>
              로그인 페이지로 돌아가기
            </BackToLoginButton>
          </SuccessContainer>
        )}
      </ForgotPasswordCard>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;