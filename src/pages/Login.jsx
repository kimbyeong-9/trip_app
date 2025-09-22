import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  text-align: center;
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
`;

const Subtitle = styled.p`
  color: #6c757d;
  margin-bottom: 30px;
  font-size: 16px;
`;

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

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
  color: #6c757d;
  font-size: 14px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e9ecef;
  }

  &::before {
    margin-right: 15px;
  }

  &::after {
    margin-left: 15px;
  }
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 15px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  background: white;
  color: #2c3e50;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    border-color: #667eea;
    background: #f8f9ff;
  }
`;

const SignupLink = styled.div`
  margin-top: 30px;
  color: #6c757d;
  font-size: 14px;

  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
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

const TestAccounts = styled.div`
  margin-top: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  text-align: left;
`;

const TestTitle = styled.h4`
  color: #2c3e50;
  margin: 0 0 15px 0;
  font-size: 16px;
`;

const TestAccount = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  color: #6c757d;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TestButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  margin-left: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: #5a6fd8;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // 간단한 테스트 계정 (실제로는 서버 API 사용)
  const testAccounts = [
    { email: 'test@example.com', password: '123456', name: '테스트 사용자' },
    { email: 'admin@trip.com', password: 'admin123', name: '관리자' },
    { email: 'user@gmail.com', password: 'password', name: '김병구' }
  ];

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    setIsLoading(true);

    // 로그인 시뮬레이션 (실제로는 서버 API 호출)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기

      const user = testAccounts.find(u => u.email === email && u.password === password);
      
      if (user) {
        // 로그인 성공
        const loginData = {
          isLoggedIn: true,
          user: {
            email: user.email,
            name: user.name
          },
          loginTime: new Date().toISOString()
        };

        // 로그인 상태 저장
        if (rememberMe) {
          localStorage.setItem('loginData', JSON.stringify(loginData));
        } else {
          sessionStorage.setItem('loginData', JSON.stringify(loginData));
        }

        alert(`${user.name}님, 환영합니다!`);
        navigate('/');
      } else {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleAdminLogin = () => {
    // 관리자 계정으로 자동 로그인
    const adminData = {
      isLoggedIn: true,
      user: {
        email: 'admin@trip.com',
        name: '관리자'
      },
      loginTime: new Date().toISOString(),
      isAdmin: true
    };

    localStorage.setItem('loginData', JSON.stringify(adminData));
    alert('관리자로 로그인되었습니다!');
    navigate('/');
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    
    // 소셜 로그인 시뮬레이션
    setTimeout(() => {
      const socialData = {
        isLoggedIn: true,
        user: {
          email: `user@${provider}.com`,
          name: `${provider} 사용자`,
          provider: provider
        },
        loginTime: new Date().toISOString()
      };

      localStorage.setItem('loginData', JSON.stringify(socialData));
      alert(`${provider}로 로그인되었습니다!`);
      navigate('/');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>여행대로</Logo>
        <Subtitle>여행대로에 오신 것을 환영합니다!</Subtitle>

        <Form onSubmit={handleEmailLogin}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <InputGroup>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
              disabled={isLoading}
            />
          </InputGroup>

          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
              disabled={isLoading}
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? '🙈' : '👁️'}
            </PasswordToggle>
          </InputGroup>

          <CheckboxGroup>
            <Checkbox
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
            />
            <CheckboxLabel>로그인 상태 유지</CheckboxLabel>
          </CheckboxGroup>

          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </LoginButton>
        </Form>

        <Divider>또는</Divider>

        <SocialButton onClick={() => handleSocialLogin('카카오톡')} disabled={isLoading}>
          🟡 카카오톡으로 로그인
        </SocialButton>

        <SocialButton onClick={() => handleSocialLogin('네이버')} disabled={isLoading}>
          🟢 네이버로 로그인
        </SocialButton>

        <SocialButton onClick={() => handleSocialLogin('구글')} disabled={isLoading}>
          🔍 구글로 로그인
        </SocialButton>

        <SignupLink>
          아직 계정이 없으신가요? <a href="#" onClick={(e) => { e.preventDefault(); handleSignup(); }}>회원가입</a>
        </SignupLink>

        <TestAccounts>
          <TestTitle>테스트 계정 (클릭하여 자동 입력)</TestTitle>
          {testAccounts.map((account, index) => (
            <TestAccount key={index}>
              {account.name} - {account.email}
              <TestButton 
                onClick={() => {
                  setEmail(account.email);
                  setPassword(account.password);
                }}
                disabled={isLoading}
              >
                사용
              </TestButton>
            </TestAccount>
          ))}
          <TestAccount>
            관리자 계정
            <TestButton onClick={handleAdminLogin} disabled={isLoading}>
              관리자 로그인
            </TestButton>
          </TestAccount>
        </TestAccounts>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;