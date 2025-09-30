import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../supabaseClient';

// Styled Components
const LoginContainer = styled.div`
   min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;

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
  padding: 0 105px;
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
  border: 2px solid ${props => props.$borderColor || '#e9ecef'};
  border-radius: 12px;
  background: ${props => props.$bgColor || 'white'};
  color: ${props => props.$textColor || '#2c3e50'};
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
    box-shadow: 0 8px 25px ${props => props.$shadowColor || 'rgba(0, 0, 0, 0.15)'};
    border-color: ${props => props.$hoverBorderColor || props.$borderColor || '#667eea'};
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

// 모달 스타일 컴포넌트
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 10px 0;
`;

const ModalSubtitle = styled.p`
  color: #6c757d;
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModalInputGroup = styled.div`
  text-align: left;
`;

const ModalLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 600;
  font-size: 14px;
`;

const ModalInput = styled.input`
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

const ModalErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  border: 1px solid #fcc;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  ${props => props.primary ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
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
  ` : `
    background: white;
    color: #6c757d;
    border: 2px solid #e9ecef;

    &:hover {
      background: #f8f9fa;
      color: #495057;
    }
  `}
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

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const [showFindIdModal, setShowFindIdModal] = useState(false);
  const [findIdName, setFindIdName] = useState('');
  const [findIdPhone, setFindIdPhone] = useState('');
  const [findIdLoading, setFindIdLoading] = useState(false);
  const [findIdSuccess, setFindIdSuccess] = useState(false);
  const [findIdError, setFindIdError] = useState('');
  const [foundEmail, setFoundEmail] = useState('');

  // 간단한 테스트 계정 (실제로는 서버 API 사용)
  const testAccounts = [
    { email: 'test@example.com', password: '123456', name: '테스트 사용자', phone: '010-1234-5678' },
    { email: 'admin@trip.com', password: 'admin123', name: '관리자', phone: '010-9999-9999' },
    { email: 'user@gmail.com', password: 'password', name: '김병구', phone: '010-5555-5555' }
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

    try {
      // Supabase Auth로 로그인
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (signInError) {
        // 로그인 실패
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        setIsLoading(false);
        return;
      }

      // 로그인 성공 - user_profiles에서 추가 정보 가져오기
      if (data.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        const loginData = {
          isLoggedIn: true,
          user: {
            id: data.user.id,
            email: data.user.email,
            name: profileData?.username || data.user.email,
            phone: profileData?.phone,
            birthDate: profileData?.birth_date,
            gender: profileData?.gender
          },
          loginTime: new Date().toISOString()
        };

        // 로그인 상태 저장
        if (rememberMe) {
          localStorage.setItem('loginData', JSON.stringify(loginData));
        } else {
          sessionStorage.setItem('loginData', JSON.stringify(loginData));
        }

        alert(`${loginData.user.name}님, 환영합니다!`);
        navigate('/');
      }
    } catch (err) {
      console.error('로그인 오류:', err);
      setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPasswordModal(true);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setForgotPasswordError('');

    if (!forgotPasswordEmail) {
      setForgotPasswordError('이메일을 입력해주세요.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotPasswordEmail)) {
      setForgotPasswordError('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    setForgotPasswordLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setForgotPasswordSuccess(true);
    } catch (err) {
      setForgotPasswordError('이메일 발송 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
    setForgotPasswordEmail('');
    setForgotPasswordError('');
    setForgotPasswordSuccess(false);
    setForgotPasswordLoading(false);
  };

  const handleFindId = () => {
    setShowFindIdModal(true);
  };

  const handleFindIdSubmit = async (e) => {
    e.preventDefault();
    setFindIdError('');

    if (!findIdName) {
      setFindIdError('이름을 입력해주세요.');
      return;
    }

    if (!findIdPhone) {
      setFindIdError('전화번호를 입력해주세요.');
      return;
    }

    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(findIdPhone)) {
      setFindIdError('전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)');
      return;
    }

    setFindIdLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 테스트 계정에서 이름과 전화번호로 이메일 찾기
      const foundAccount = testAccounts.find(account =>
        account.name === findIdName && account.phone === findIdPhone
      );

      if (foundAccount) {
        setFoundEmail(foundAccount.email);
        setFindIdSuccess(true);
      } else {
        setFindIdError('입력하신 정보와 일치하는 계정을 찾을 수 없습니다.');
      }
    } catch (err) {
      setFindIdError('아이디 찾기 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setFindIdLoading(false);
    }
  };

  const closeFindIdModal = () => {
    setShowFindIdModal(false);
    setFindIdName('');
    setFindIdPhone('');
    setFindIdError('');
    setFindIdSuccess(false);
    setFindIdLoading(false);
    setFoundEmail('');
  };

  const formatPhoneNumber = (value) => {
    // 숫자만 추출
    const phoneNumber = value.replace(/[^\d]/g, '');

    // 길이에 따른 포맷팅
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    } else {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setFindIdPhone(formattedValue);
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

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);

    try {
      let supabaseProvider;

      if (provider === '구글') {
        supabaseProvider = 'google';
      } else if (provider === '애플') {
        supabaseProvider = 'apple';
      } else if (provider === '페이스북') {
        supabaseProvider = 'facebook';
      } else {
        alert(`${provider} 로그인은 현재 준비 중입니다.`);
        setIsLoading(false);
        return;
      }

      // Supabase OAuth 로그인
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: supabaseProvider,
        options: {
          redirectTo: `${window.location.origin}/social-signup`
        }
      });

      if (error) {
        throw error;
      }

      // 로그인 성공 시 Supabase가 자동으로 리다이렉트합니다

    } catch (error) {
      console.error('소셜 로그인 오류:', error);
      alert('소셜 로그인 중 오류가 발생했습니다. Supabase 대시보드에서 Provider 설정을 확인해주세요.');
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
            onClick={() => handleSocialLogin('구글')}
            disabled={isLoading}
            $bgColor="white"
            $textColor="#333"
            $borderColor="#DADCE0"
            $hoverBorderColor="#9AA0A6"
            $shadowColor="rgba(66, 133, 244, 0.3)"
          >
            <SocialIcon
              src="https://www.google.com/favicon.ico"
              alt="구글"
            />
            Google 로그인
          </SocialButton>

          <SocialButton
            onClick={() => handleSocialLogin('페이스북')}
            disabled={isLoading}
            $bgColor="#1877F2"
            $textColor="white"
            $borderColor="#1877F2"
            $hoverBorderColor="#166FE5"
            $shadowColor="rgba(24, 119, 242, 0.4)"
          >
            <SocialIcon
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMjAgMTBDMjAgNC40NzcgMTUuNTIzIDAgMTAgMEM0LjQ3NyAwIDAgNC40NzcgMCAxMEMwIDE0Ljk5MSAzLjY1NyAxOS4xMjggOC40MzggMTkuODc4VjEyLjg5SDUuODk4VjEwSDguNDM4VjcuNzk3QzguNDM4IDUuMjkgOS45MyAzLjkwNyAxMi4yMTUgMy45MDdDMTMuMzA5IDMuOTA3IDE0LjQ1MyA0LjEwMiAxNC40NTMgNC4xMDJWNi41NjJIMTMuMTkzQzExLjk1IDYuNTYyIDExLjU2MyA3LjMzMyAxMS41NjMgOC4xMjRWMTBIMTQuMzM2TDEzLjg5MyAxMi44OUgxMS41NjNWMTkuODc4QzE2LjM0MyAxOS4xMjggMjAgMTQuOTkxIDIwIDEwWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg=="
              alt="페이스북"
            />
            Facebook으로 로그인
          </SocialButton>

          <SocialButton
            onClick={() => handleSocialLogin('애플')}
            disabled={isLoading}
            $bgColor="#000000"
            $textColor="white"
            $borderColor="#000000"
            $hoverBorderColor="#333333"
            $shadowColor="rgba(0, 0, 0, 0.3)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Apple로 로그인
          </SocialButton>
          
        </SocialButtonsContainer>

        <SignupLink>
          아직 계정이 없으신가요? <a href="#" onClick={(e) => { e.preventDefault(); handleSignup(); }}>회원가입</a><br/>
          <div style={{marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap'}}>
            <a href="#" onClick={(e) => { e.preventDefault(); handleFindId(); }} style={{color: '#667eea', textDecoration: 'none', fontSize: '14px'}}>아이디 찾기</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleForgotPassword(); }} style={{color: '#667eea', textDecoration: 'none', fontSize: '14px'}}>비밀번호 찾기</a>
          </div>
        </SignupLink>
      </LoginCard>

      {/* 비밀번호 찾기 모달 */}
      {showForgotPasswordModal && (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && closeForgotPasswordModal()}>
          <ModalContainer>
            {!forgotPasswordSuccess ? (
              <>
                <ModalHeader>
                  <ModalTitle>비밀번호 재설정</ModalTitle>
                  <ModalSubtitle>
                    가입하신 이메일 주소를 입력하시면<br />
                    비밀번호 재설정 링크를 보내드립니다.
                  </ModalSubtitle>
                </ModalHeader>

                <ModalForm onSubmit={handleForgotPasswordSubmit}>
                  {forgotPasswordError && <ModalErrorMessage>{forgotPasswordError}</ModalErrorMessage>}

                  <ModalInputGroup>
                    <ModalLabel htmlFor="forgotEmail">이메일</ModalLabel>
                    <ModalInput
                      type="email"
                      id="forgotEmail"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      placeholder="이메일을 입력하세요"
                      required
                      disabled={forgotPasswordLoading}
                      className={forgotPasswordError && forgotPasswordError.includes('이메일') ? 'error' : ''}
                    />
                  </ModalInputGroup>

                  <ModalButtons>
                    <ModalButton type="button" onClick={closeForgotPasswordModal} disabled={forgotPasswordLoading}>
                      취소
                    </ModalButton>
                    <ModalButton type="submit" primary disabled={forgotPasswordLoading}>
                      {forgotPasswordLoading ? (
                        <LoadingSpinner>
                          <span className="spinner"></span>
                          전송 중...
                        </LoadingSpinner>
                      ) : (
                        '이메일 보내기'
                      )}
                    </ModalButton>
                  </ModalButtons>
                </ModalForm>
              </>
            ) : (
              <SuccessContainer>
                <SuccessIcon>✅</SuccessIcon>
                <SuccessTitle>이메일을 확인해주세요</SuccessTitle>
                <SuccessMessage>
                  <strong>{forgotPasswordEmail}</strong>로<br />
                  비밀번호 재설정 링크를 보냈습니다.
                </SuccessMessage>
                <SuccessNote>
                  이메일이 오지 않았다면 스팸함을 확인해주세요.
                </SuccessNote>
                <ModalButtons>
                  <ModalButton primary onClick={closeForgotPasswordModal}>
                    확인
                  </ModalButton>
                </ModalButtons>
              </SuccessContainer>
            )}
          </ModalContainer>
        </ModalOverlay>
      )}

      {/* 아이디 찾기 모달 */}
      {showFindIdModal && (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && closeFindIdModal()}>
          <ModalContainer>
            {!findIdSuccess ? (
              <>
                <ModalHeader>
                  <ModalTitle>아이디 찾기</ModalTitle>
                  <ModalSubtitle>
                    가입 시 입력하신 이름과 전화번호를 입력하시면<br />
                    아이디(이메일)를 찾아드립니다.
                  </ModalSubtitle>
                </ModalHeader>

                <ModalForm onSubmit={handleFindIdSubmit}>
                  {findIdError && <ModalErrorMessage>{findIdError}</ModalErrorMessage>}

                  <ModalInputGroup>
                    <ModalLabel htmlFor="findIdName">이름</ModalLabel>
                    <ModalInput
                      type="text"
                      id="findIdName"
                      value={findIdName}
                      onChange={(e) => setFindIdName(e.target.value)}
                      placeholder="이름을 입력하세요"
                      required
                      disabled={findIdLoading}
                      className={findIdError && findIdError.includes('이름') ? 'error' : ''}
                    />
                  </ModalInputGroup>

                  <ModalInputGroup>
                    <ModalLabel htmlFor="findIdPhone">전화번호</ModalLabel>
                    <ModalInput
                      type="tel"
                      id="findIdPhone"
                      value={findIdPhone}
                      onChange={handlePhoneChange}
                      placeholder="010-1234-5678"
                      required
                      disabled={findIdLoading}
                      className={findIdError && findIdError.includes('전화번호') ? 'error' : ''}
                      maxLength={13}
                    />
                  </ModalInputGroup>

                  <ModalButtons>
                    <ModalButton type="button" onClick={closeFindIdModal} disabled={findIdLoading}>
                      취소
                    </ModalButton>
                    <ModalButton type="submit" primary disabled={findIdLoading}>
                      {findIdLoading ? (
                        <LoadingSpinner>
                          <span className="spinner"></span>
                          검색 중...
                        </LoadingSpinner>
                      ) : (
                        '아이디 찾기'
                      )}
                    </ModalButton>
                  </ModalButtons>
                </ModalForm>
              </>
            ) : (
              <SuccessContainer>
                <SuccessIcon>✅</SuccessIcon>
                <SuccessTitle>아이디를 찾았습니다</SuccessTitle>
                <SuccessMessage>
                  회원님의 아이디(이메일)는<br />
                  <strong>{foundEmail}</strong> 입니다.
                </SuccessMessage>
                <SuccessNote>
                  로그인 페이지에서 해당 이메일로 로그인하세요.
                </SuccessNote>
                <ModalButtons>
                  <ModalButton primary onClick={closeFindIdModal}>
                    확인
                  </ModalButton>
                </ModalButtons>
              </SuccessContainer>
            )}
          </ModalContainer>
        </ModalOverlay>
      )}
    </LoginContainer>
  );
};

export default Login;