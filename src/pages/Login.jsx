import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../supabaseClient';
import LoginForm from '../components/auth/LoginForm';
import SocialLoginButtons from '../components/auth/SocialLoginButtons';
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';
import FindIdModal from '../components/auth/FindIdModal';

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

        const defaultProfileImage = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face';

        const loginData = {
          isLoggedIn: true,
          user: {
            id: data.user.id,
            email: data.user.email,
            name: profileData?.username || data.user.email,
            phone: profileData?.phone,
            birthDate: profileData?.birth_date,
            gender: profileData?.gender,
            profileImage: profileData?.profile_image || defaultProfileImage
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

      // 실제로는 Supabase에서 조회해야 함
      setFindIdError('입력하신 정보와 일치하는 계정을 찾을 수 없습니다.');
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


  const handleSignup = () => {
    navigate('/signup');
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

      console.log('=== 소셜 로그인 시도 ===');
      console.log('Provider:', supabaseProvider);
      console.log('Redirect URL:', `${window.location.origin}/social-signup`);

      // Supabase OAuth 로그인
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: supabaseProvider,
        options: {
          redirectTo: `${window.location.origin}/social-signup`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });

      console.log('OAuth Response:', { data, error });

      if (error) {
        console.error('OAuth Error Details:', error);
        throw error;
      }

      // 로그인 성공 시 Supabase가 자동으로 리다이렉트합니다

    } catch (error) {
      console.error('소셜 로그인 오류:', error);
      console.error('Error message:', error.message);
      console.error('Error details:', error);
      alert(`소셜 로그인 오류: ${error.message || '알 수 없는 오류'}\n\n콘솔을 확인해주세요.`);
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

        <LoginForm
          email={email}
          password={password}
          rememberMe={rememberMe}
          showPassword={showPassword}
          isLoading={isLoading}
          error={error}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onRememberMeChange={setRememberMe}
          onShowPasswordToggle={() => setShowPassword(!showPassword)}
          onSubmit={handleEmailLogin}
        />

        <Divider>또는</Divider>

        <SocialLoginButtons
          isLoading={isLoading}
          onSocialLogin={handleSocialLogin}
        />

        <SignupLink>
          아직 계정이 없으신가요? <a href="#" onClick={(e) => { e.preventDefault(); handleSignup(); }}>회원가입</a><br/>
          <div style={{marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap'}}>
            <a href="#" onClick={(e) => { e.preventDefault(); handleFindId(); }} style={{color: '#667eea', textDecoration: 'none', fontSize: '14px'}}>아이디 찾기</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleForgotPassword(); }} style={{color: '#667eea', textDecoration: 'none', fontSize: '14px'}}>비밀번호 찾기</a>
          </div>
        </SignupLink>
      </LoginCard>

      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        email={forgotPasswordEmail}
        isLoading={forgotPasswordLoading}
        isSuccess={forgotPasswordSuccess}
        error={forgotPasswordError}
        onEmailChange={setForgotPasswordEmail}
        onSubmit={handleForgotPasswordSubmit}
        onClose={closeForgotPasswordModal}
      />

      <FindIdModal
        isOpen={showFindIdModal}
        name={findIdName}
        phone={findIdPhone}
        isLoading={findIdLoading}
        isSuccess={findIdSuccess}
        error={findIdError}
        foundEmail={foundEmail}
        onNameChange={setFindIdName}
        onPhoneChange={setFindIdPhone}
        onSubmit={handleFindIdSubmit}
        onClose={closeFindIdModal}
      />
    </LoginContainer>
  );
};


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

export default Login;