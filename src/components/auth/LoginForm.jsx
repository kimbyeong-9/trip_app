import React from 'react';
import styled from 'styled-components';

const LoginForm = ({
  email,
  password,
  rememberMe,
  showPassword,
  isLoading,
  error,
  onEmailChange,
  onPasswordChange,
  onRememberMeChange,
  onShowPasswordToggle,
  onSubmit
}) => {
  return (
    <Form onSubmit={onSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <InputGroup>
        <Input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="이메일을 입력하세요"
          required
          disabled={isLoading}
        />
      </InputGroup>

      <InputGroup>
        <Input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          required
          disabled={isLoading}
        />
        <PasswordToggle
          type="button"
          onClick={onShowPasswordToggle}
          disabled={isLoading}
        >
          {showPassword ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94L17.94 17.94z"/>
              <path d="m1 1 22 22"/>
              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19l-6.84-6.84z"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          )}
        </PasswordToggle>
      </InputGroup>

      <CheckboxGroup>
        <Checkbox
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => onRememberMeChange(e.target.checked)}
          disabled={isLoading}
        />
        <CheckboxLabel>로그인 상태 유지</CheckboxLabel>
      </CheckboxGroup>

      <LoginButton type="submit" disabled={isLoading}>
        {isLoading ? '로그인 중...' : '로그인'}
      </LoginButton>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  position: relative;
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
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;

  &:hover {
    color: #667eea;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 0;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #667eea;
`;

const CheckboxLabel = styled.label`
  color: #6c757d;
  font-size: 14px;
  cursor: pointer;
`;

const LoginButton = styled.button`
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

export default LoginForm;
