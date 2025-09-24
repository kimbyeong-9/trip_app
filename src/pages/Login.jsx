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
  position: relative;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 500px;
  text-align: center;
  position: relative;
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

const SocialButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid ${props => props.borderColor || '#e9ecef'};
  border-radius: 12px;
  background: ${props => props.bgColor || 'white'};
  color: ${props => props.textColor || '#2c3e50'};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  position: relative;
  overflow: hidden;
  min-height: 56px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${props => props.shadowColor || 'rgba(0, 0, 0, 0.15)'};
    border-color: ${props => props.hoverBorderColor || props.borderColor || '#667eea'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SocialIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SocialIconText = styled.span`
  font-size: 18px;
  font-weight: bold;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color || '#333'};
  line-height: 1;
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

const BackArrowButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
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

    try {
      // 각 소셜 플랫폼별 로그인 URL (데모용)
      // 실제 운영 시에는 환경변수에서 CLIENT_ID를 가져와야 합니다
      const loginUrls = {
        '카카오톡': 'https://kauth.kakao.com/oauth/authorize?' + new URLSearchParams({
          client_id: process.env.REACT_APP_KAKAO_CLIENT_ID || 'demo_kakao_client_id',
          redirect_uri: `${window.location.origin}/auth/kakao/callback`,
          response_type: 'code',
          scope: 'profile_nickname,profile_image,account_email'
        }),
        '네이버': 'https://nid.naver.com/oauth2.0/authorize?' + new URLSearchParams({
          response_type: 'code',
          client_id: process.env.REACT_APP_NAVER_CLIENT_ID || 'demo_naver_client_id',
          redirect_uri: `${window.location.origin}/auth/naver/callback`,
          state: Math.random().toString(36).substring(7)
        }),
        '구글': 'https://accounts.google.com/oauth/authorize?' + new URLSearchParams({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || 'demo_google_client_id',
          redirect_uri: `${window.location.origin}/auth/google/callback`,
          response_type: 'code',
          scope: 'openid profile email',
          access_type: 'offline'
        })
      };

      const loginUrl = loginUrls[provider];

      if (loginUrl) {
        // 새 창으로 소셜 로그인 페이지 열기
        const popup = window.open(
          loginUrl,
          `${provider}_login`,
          'width=500,height=600,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no'
        );

        // 팝업 차단 확인
        if (!popup || popup.closed || typeof popup.closed === 'undefined') {
          alert('팝업이 차단되었습니다. 브라우저 설정에서 팝업을 허용해주세요.');
          setIsLoading(false);
          return;
        }

        let loginCompleted = false;

        // 팝업 창 모니터링
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);

            if (!loginCompleted) {
              // 사용자가 팝업을 닫았지만 로그인을 완료하지 않은 경우
              setIsLoading(false);
              return;
            }

            // 실제로는 콜백에서 처리하지만, 데모를 위한 시뮬레이션
            setTimeout(() => {
              const socialData = {
                isLoggedIn: true,
                user: {
                  email: `user@${provider.toLowerCase().replace('톡', '')}.com`,
                  name: `${provider} 사용자`,
                  provider: provider,
                  profileImage: `https://via.placeholder.com/100?text=${provider.charAt(0)}`
                },
                loginTime: new Date().toISOString()
              };

              localStorage.setItem('loginData', JSON.stringify(socialData));
              alert(`${provider}로 로그인되었습니다! 환영합니다!`);
              navigate('/');
            }, 500);
          }
        }, 1000);

        // 데모를 위한 자동 로그인 시뮬레이션 (3초 후)
        setTimeout(() => {
          if (!popup.closed) {
            loginCompleted = true;
            popup.close();
          }
        }, 3000);

        // 10초 후 자동으로 정리
        setTimeout(() => {
          if (!popup.closed) {
            popup.close();
            clearInterval(checkClosed);
            setIsLoading(false);
          }
        }, 10000);

      } else {
        throw new Error('지원하지 않는 소셜 플랫폼입니다.');
      }

    } catch (error) {
      console.error('소셜 로그인 오류:', error);
      alert('소셜 로그인 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <BackArrowButton onClick={() => navigate(-1)}>
          ←
        </BackArrowButton>
        <Logo onClick={() => navigate('/')}>여행대로</Logo>
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

        <SocialButtonsContainer>
          <SocialButton
            onClick={() => handleSocialLogin('카카오톡')}
            disabled={isLoading}
            bgColor="#FEE500"
            textColor="#191919"
            borderColor="#FEE500"
            hoverBorderColor="#E6CF00"
            shadowColor="rgba(254, 229, 0, 0.4)"
          >
            <SocialIcon
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDJDNSAyIDEgNS4zIDEgOS4zQzEgMTEuOCAyLjYgMTQgNS4yIDE1LjNMNC4yIDE4LjhDNC4xIDE5IDQuMyAxOS4yIDQuNSAxOS4xTDguOSAxNi41QzkuMyAxNi42IDkuNiAxNi42IDEwIDE2LjZDMTUgMTYuNiAxOSAxMy4zIDE5IDkuM0MxOSA1LjMgMTUgMiAxMCAyWiIgZmlsbD0iIzAwMCIvPgo8L3N2Zz4K"
              alt="카카오톡"
            />
            카카오톡으로 로그인
          </SocialButton>

          <SocialButton
            onClick={() => handleSocialLogin('네이버')}
            disabled={isLoading}
            bgColor="#03C75A"
            textColor="white"
            borderColor="#03C75A"
            hoverBorderColor="#02B74C"
            shadowColor="rgba(3, 199, 90, 0.4)"
          >
            <SocialIconText color="white">N</SocialIconText>
            네이버로 로그인
          </SocialButton>

          <SocialButton
            onClick={() => handleSocialLogin('구글')}
            disabled={isLoading}
            bgColor="white"
            textColor="#333"
            borderColor="#DADCE0"
            hoverBorderColor="#9AA0A6"
            shadowColor="rgba(66, 133, 244, 0.3)"
          >
            <SocialIcon
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNCA5LjVjMy4wNCAwIDUuMDEgMS4wNyA2Ljc1IDIuODJsNS4wMy01LjAzQzMzIDQuNDQgMjguNzQgMiAyNCAyQzE0LjY0IDIgNi45OSA3Ljk0IDQuMTcgMTYuMzNsNi4wMiA0LjY2QzEyLjE1IDEzLjE1IDE3LjYgOS41IDI0IDkuNXoiIGZpbGw9IiNFQTQzMzUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNCAzOC41Yy02LjQgMC0xMS44NS0zLjY1LTEzLjgxLTkuNDlsLTYuMDIgNC42N0M2Ljk5IDQyLjA2IDE0LjY0IDQ4IDI0IDQ4YzQuNzQgMCA5LTIuNDQgMTEuNzgtNS4yMmwtNS42MS00LjM2QzI4LjExIDM4LjAxIDI2LjE2IDM4LjUgMjQgMzguNXoiIGZpbGw9IiMzNEE4NTMiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00Ni4xIDI0YzAtMS42OS0uMTctMi45Ni0uNTctNC4yNEgyNHY5LjAyaDEyLjM5Yy0uNSAyLjk2LTIuMTkgNS4wMy00LjUgNi41MWw1LjYxIDQuMzZDNDAuNzQgMzYuMjIgNDYuMSAzMC42NSA0Ni4xIDI0eiIgZmlsbD0iIzQyODVGNCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjE5IDIwLjk5Yy0uMjctMS4xMS0uNDMtMi4yOS0uNDMtMy40OWMwLTEuMi4xNi0yLjM4LjQzLTMuNDlsLTYuMDItNC42NkMzLjQ3IDE0LjM5IDIgMTkgMiAyNGMwIDUgMS40NyA5LjYxIDQuMTcgMTQuNjZsNi4wMi00LjY3eiIgZmlsbD0iI0ZCQkMwNSIvPgo8L3N2Zz4K"
              alt="구글"
            />
            구글로 로그인
          </SocialButton>
        </SocialButtonsContainer>

        <SignupLink>
          아직 계정이 없으신가요? <a href="#" onClick={(e) => { e.preventDefault(); handleSignup(); }}>회원가입</a><br/>
          <a href="#" onClick={(e) => { e.preventDefault(); handleForgotPassword(); }} style={{color: '#667eea', textDecoration: 'none', fontSize: '14px', marginTop: '8px', display: 'inline-block'}}>비밀번호를 잊어버리셨습니까?</a>
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