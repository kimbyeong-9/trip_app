import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../supabaseClient';


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
    gender: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationTimer, setVerificationTimer] = useState(0);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 이메일 중복 검사
    if (name === 'email') {
      setEmailError('');
      if (value) {
        checkEmailDuplicate(value);
      }
    }

    // 비밀번호 확인 실시간 검증
    if (name === 'confirmPassword') {
      if (value && formData.password && value !== formData.password) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      } else {
        setPasswordError('');
      }
    }

    // 비밀번호 변경시 확인란도 다시 검증
    if (name === 'password') {
      if (formData.confirmPassword && value !== formData.confirmPassword) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      } else {
        setPasswordError('');
      }
    }
  };

  // 성별 선택 핸들러
  const handleGenderSelect = (gender) => {
    setFormData(prev => ({
      ...prev,
      gender: prev.gender === gender ? '' : gender
    }));
  };

  // 이메일 중복 검사 (Supabase에서는 자동으로 처리되므로 제거 가능)
  const checkEmailDuplicate = async (email) => {
    // Supabase Auth가 자동으로 중복 검사를 하므로
    // 여기서는 간단한 형식 검증만 수행
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('올바른 이메일 형식을 입력해주세요.');
    } else {
      setEmailError('');
    }
  };

  // 타이머 효과
  React.useEffect(() => {
    let interval = null;
    if (verificationTimer > 0) {
      interval = setInterval(() => {
        setVerificationTimer(prev => prev - 1);
      }, 1000);
    } else if (verificationTimer === 0 && isVerificationSent) {
      setIsVerificationSent(false);
    }
    return () => clearInterval(interval);
  }, [verificationTimer, isVerificationSent]);

  // 인증번호 발송
  const handleSendVerification = async () => {
    if (!formData.phone) {
      setError('휴대폰 번호를 먼저 입력해주세요.');
      return;
    }

    if (!/^01[016789]-?\d{3,4}-?\d{4}$/.test(formData.phone.replace(/-/g, ''))) {
      setError('올바른 휴대폰 번호 형식을 입력해주세요.');
      return;
    }

    setIsVerificationSent(true);
    setVerificationTimer(180); // 3분
    setError('');

    // 실제로는 서버에 인증번호 발송 요청
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`${formData.phone}로 인증번호가 발송되었습니다.`);
  };

  // 인증번호 확인
  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setError('인증번호를 입력해주세요.');
      return;
    }

    if (verificationCode.length !== 6) {
      setError('인증번호는 6자리 숫자입니다.');
      return;
    }

    // 실제로는 서버에서 인증번호 검증
    // 여기서는 시뮬레이션으로 '123456'을 정답으로 설정
    if (verificationCode === '123456') {
      setIsVerified(true);
      setError('');
      alert('휴대폰 인증이 완료되었습니다!');
    } else {
      setError('인증번호가 올바르지 않습니다.');
    }
  };

  // 인증번호 재발송
  const handleResendVerification = () => {
    setVerificationCode('');
    setIsVerified(false);
    handleSendVerification();
  };

  // 전화번호 포맷팅
  const formatPhoneNumber = (value) => {
    const phone = value.replace(/[^\d]/g, '');
    if (phone.length <= 3) return phone;
    if (phone.length <= 7) return `${phone.slice(0, 3)}-${phone.slice(3)}`;
    return `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7, 11)}`;
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      phone: formattedPhone
    }));

    // 전화번호가 변경되면 인증 상태 초기화
    if (isVerified || isVerificationSent) {
      setIsVerified(false);
      setIsVerificationSent(false);
      setVerificationCode('');
      setVerificationTimer(0);
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('필수 항목을 모두 입력해주세요.');
      return false;
    }

    if (formData.name.length < 2) {
      setError('이름은 2글자 이상 입력해주세요.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('올바른 이메일 형식을 입력해주세요.');
      return false;
    }

    // 이메일 중복 검사
    if (emailError) {
      setError(emailError);
      return false;
    }

    if (formData.password.length < 6) {
      setError('비밀번호는 6자 이상 입력해주세요.');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return false;
    }

    // 비밀번호 에러가 있으면 제출 차단
    if (passwordError) {
      setError(passwordError);
      return false;
    }

    // 본인인증 비활성화 (테스트용)
    // if (formData.phone && !/^01[016789]-?\d{3,4}-?\d{4}$/.test(formData.phone.replace(/-/g, ''))) {
    //   setError('올바른 휴대폰 번호 형식을 입력해주세요.');
    //   return false;
    // }

    // if (formData.phone && !isVerified) {
    //   setError('휴대폰 번호 인증을 완료해주세요.');
    //   return false;
    // }

    if (!agreeTerms || !agreePrivacy) {
      setError('필수 약관에 동의해주세요.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // 1. Supabase Auth로 회원가입
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.name,
            phone: formData.phone,
            birth_date: formData.birthDate,
            gender: formData.gender
          },
          emailRedirectTo: window.location.origin
        }
      });

      if (authError) {
        throw authError;
      }

      // 2. 트리거가 자동으로 user_profiles를 생성하므로, 추가 정보만 업데이트
      if (authData.user) {
        // 약간의 지연 후 업데이트 (트리거가 먼저 실행되도록)
        await new Promise(resolve => setTimeout(resolve, 500));

        const { data: updateData, error: updateError } = await supabase
          .from('user_profiles')
          .update({
            phone: formData.phone || null,
            birth_date: formData.birthDate || null,
            gender: formData.gender || null,
            username: formData.name
          })
          .eq('id', authData.user.id)
          .select();

        if (updateError) {
          console.error('프로필 업데이트 오류:', updateError);
          console.error('에러 상세:', updateError.message, updateError.code);
        } else {
          console.log('프로필 업데이트 성공:', updateData);
        }
      }

      // 3. 회원가입 성공 시 자동 로그인 (localStorage 백업용)
      const userData = {
        isLoggedIn: true,
        user: {
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
          birthDate: formData.birthDate,
          gender: formData.gender
        },
        loginTime: new Date().toISOString()
      };

      localStorage.setItem('loginData', JSON.stringify(userData));

      alert(`${formData.name}님, 회원가입이 완료되었습니다! 환영합니다!`);
      navigate('/');
    } catch (err) {
      console.error('회원가입 오류:', err);

      if (err.message?.includes('already registered')) {
        setError('이미 등록된 이메일입니다.');
      } else if (err.message?.includes('Invalid email')) {
        setError('유효하지 않은 이메일 형식입니다.');
      } else if (err.message?.includes('Password should be')) {
        setError('비밀번호는 최소 6자 이상이어야 합니다.');
      } else {
        setError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <SignupContainer>
      <SignupCard>
        <BackArrowButton onClick={() => navigate(-1)}>
          ←
        </BackArrowButton>
        <Logo onClick={() => navigate('/')}>여행대로</Logo>
        <Title>회원가입</Title>
        <Subtitle>새로운 여행의 시작, 함께해요!</Subtitle>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGroup>
            <Label htmlFor="name">이름(닉네임) *</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="이름(닉네임)을 입력하세요"
              required
              disabled={isLoading}
              className={error && error.includes('이름') ? 'error' : ''}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">이메일 *</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="이메일을 입력하세요"
              required
              disabled={isLoading}
              className={emailError || (error && error.includes('이메일')) ? 'error' : ''}
            />
            {emailError && <PasswordErrorMessage>{emailError}</PasswordErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">비밀번호 *</Label>
            <PasswordInputContainer>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="비밀번호를 입력하세요 (6자 이상)"
                required
                disabled={isLoading}
                className={error && error.includes('비밀번호') ? 'error' : ''}
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
            </PasswordInputContainer>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">비밀번호 확인 *</Label>
            <PasswordInputContainer>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="비밀번호를 다시 입력하세요"
                required
                disabled={isLoading}
                className={passwordError || (error && error.includes('일치하지')) ? 'error' : ''}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? (
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
            </PasswordInputContainer>
            {passwordError && <PasswordErrorMessage>{passwordError}</PasswordErrorMessage>}
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label htmlFor="birthDate">생년월일</Label>
              <Input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </FormGroup>

            <FormGroup>
              <Label>성별</Label>
              <GenderButtonGroup>
                <GenderButton
                  type="button"
                  $selected={formData.gender === 'male'}
                  onClick={() => handleGenderSelect('male')}
                  disabled={isLoading}
                >
                  남성
                </GenderButton>
                <GenderButton
                  type="button"
                  $selected={formData.gender === 'female'}
                  onClick={() => handleGenderSelect('female')}
                  disabled={isLoading}
                >
                  여성
                </GenderButton>
              </GenderButtonGroup>
            </FormGroup>
          </FormRow>

          {/* 본인인증 섹션 */}
          <FormGroup>
            <VerificationSection $verified={isVerified}>
              {isVerified && <SuccessIcon>✓</SuccessIcon>}
              <VerificationTitle $verified={isVerified}>
                본인인증
              </VerificationTitle>

              <FormGroup>
                <Label htmlFor="phone">휴대폰 번호</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="010-1234-5678"
                  disabled={isLoading || isVerified}
                  className={error && error.includes('휴대폰') ? 'error' : ''}
                  maxLength={13}
                />
              </FormGroup>

              {formData.phone && !isVerified && (
                <>
                  <VerificationInputGroup>
                    <Input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="인증번호 6자리"
                      disabled={isLoading || !isVerificationSent}
                      maxLength={6}
                      style={{ flex: 1 }}
                    />
                    {!isVerificationSent ? (
                      <VerificationButton
                        type="button"
                        onClick={handleSendVerification}
                        disabled={isLoading || !formData.phone}
                      >
                        인증번호 발송
                      </VerificationButton>
                    ) : (
                      <VerificationButton
                        type="button"
                        onClick={handleVerifyCode}
                        disabled={isLoading || !verificationCode || verificationCode.length !== 6}
                      >
                        인증확인
                      </VerificationButton>
                    )}
                  </VerificationInputGroup>

                  <VerificationStatus $verified={isVerified}>
                    {isVerificationSent && verificationTimer > 0 && (
                      <>
                        <span>인증번호가 발송되었습니다.</span>
                        <span className="timer">
                          {Math.floor(verificationTimer / 60)}:{(verificationTimer % 60).toString().padStart(2, '0')}
                        </span>
                        <button
                          type="button"
                          onClick={handleResendVerification}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#667eea',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            fontSize: '12px',
                            marginLeft: '10px'
                          }}
                        >
                          재발송
                        </button>
                      </>
                    )}
                    {isVerified && (
                      <span style={{ color: '#28a745' }}>✅ 휴대폰 인증이 완료되었습니다.</span>
                    )}
                  </VerificationStatus>
                </>
              )}
            </VerificationSection>
          </FormGroup>

          <TermsSection>
            <TermsItem>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  disabled={isLoading}
                />
                <span>이용약관에 동의합니다 (필수)</span>
              </CheckboxLabel>
            </TermsItem>

            <TermsItem>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={agreePrivacy}
                  onChange={(e) => setAgreePrivacy(e.target.checked)}
                  disabled={isLoading}
                />
                <span>개인정보 처리방침에 동의합니다 (필수)</span>
              </CheckboxLabel>
            </TermsItem>
          </TermsSection>

          <SubmitButton
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingSpinner>
                <span className="spinner"></span>
                회원가입 중...
              </LoadingSpinner>
            ) : (
              '회원가입'
            )}
          </SubmitButton>
        </Form>

        <SignupFooter>
          <p>
            이미 계정이 있으신가요?
            <button
              onClick={handleLoginRedirect}
              disabled={isLoading}
            >
              로그인
            </button>
          </p>
        </SignupFooter>
      </SignupCard>
    </SignupContainer>
  );
};


const SignupContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
`;


const SignupCard = styled.div`
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  position: relative;
  text-align: left;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
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

  &:disabled {
    background-color: #f8f9fa;
    opacity: 0.6;
  }
`;


const PasswordInputContainer = styled.div`
  position: relative;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const TermsSection = styled.div`
  text-align: left;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  background-color: #f8f9fa;
`;

const TermsItem = styled.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #2c3e50;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    margin-right: 10px;
    accent-color: #667eea;
  }

  &:hover {
    color: #667eea;
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

const SignupFooter = styled.div`
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

const VerificationSection = styled.div`
  border: 2px solid ${props => props.$verified ? '#28a745' : '#e9ecef'};
  border-radius: 12px;
  padding: 20px;
  background-color: ${props => props.$verified ? '#f8fff9' : '#fafafa'};
  position: relative;
  transition: all 0.3s ease;
`;

const VerificationTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;

  .icon {
    color: ${props => props.$verified ? '#28a745' : '#6c757d'};
  }
`;

const VerificationInputGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  margin-top: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const VerificationButton = styled.button`
  background: ${props => props.$sent ? '#6c757d' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  white-space: nowrap;
  opacity: ${props => props.disabled ? 0.6 : 1};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  @media (max-width: 480px) {
    padding: 15px 20px;
  }
`;

const VerificationStatus = styled.div`
  font-size: 12px;
  color: ${props => props.$verified ? '#28a745' : '#6c757d'};
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;

  .timer {
    color: #ff6b6b;
    font-weight: 600;
  }
`;

const SuccessIcon = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 24px;
  height: 24px;
  background: #28a745;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

const GenderButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const GenderButton = styled.button`
  padding: 10px 20px;
  border: 2px solid ${props => props.$selected ? '#667eea' : '#e9ecef'};
  border-radius: 25px;
  background: ${props => props.$selected ? '#667eea' : 'white'};
  color: ${props => props.$selected ? 'white' : '#6c757d'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  white-space: nowrap;

  &:hover {
    border-color: #667eea;
    background: ${props => props.$selected ? '#667eea' : 'rgba(102, 126, 234, 0.1)'};
    color: ${props => props.$selected ? 'white' : '#667eea'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PasswordErrorMessage = styled.div`
  color: #dc3545;
  font-size: 12px;
  margin-top: 5px;
  padding-left: 5px;
`;


export default Signup;