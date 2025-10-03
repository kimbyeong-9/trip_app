import React from 'react';
import styled from 'styled-components';

const ForgotPasswordForm = ({
  email,
  onEmailChange,
  onSubmit,
  isLoading,
  error,
  onBackToLogin
}) => {
  return (
    <>
      <Title>비밀번호 재설정</Title>
      <Subtitle>
        가입하신 이메일 주소를 입력하시면<br />
        비밀번호 재설정 링크를 보내드립니다.
      </Subtitle>

      <Form onSubmit={onSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <InputGroup>
          <Label htmlFor="email">이메일</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="이메일을 입력하세요"
            required
            disabled={isLoading}
            className={error && error.includes('이메일') ? 'error' : ''}
          />
        </InputGroup>

        <SubmitButton type="submit" disabled={isLoading}>
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
        <button onClick={onBackToLogin} disabled={isLoading}>
          로그인
        </button>
      </BackToLoginLink>
    </>
  );
};

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

export default ForgotPasswordForm;
