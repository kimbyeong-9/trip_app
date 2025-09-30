import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../supabaseClient';

// Styled Components
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
  position: relative;
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

const Logo = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  margin: 0 0 10px 0;
`;

const Subtitle = styled.p`
  color: #6c757d;
  text-align: center;
  margin-bottom: 30px;
  font-size: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
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

const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 10px;
  border: 1px solid #fcc;
`;

const TermsSection = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-top: 10px;
`;

const TermsTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 15px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
  padding: 12px;
  background: white;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9fa;
  }

  &.all-agree {
    background: #667eea;
    color: white;
    font-weight: 600;
    margin-bottom: 15px;

    &:hover {
      background: #5a6fd8;
    }
  }
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: #667eea;
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 2px;
`;

const CheckboxLabel = styled.label`
  color: ${props => props.$isAllAgree ? 'white' : '#2c3e50'};
  font-size: 14px;
  cursor: pointer;
  flex: 1;
  line-height: 1.5;
  user-select: none;

  span {
    color: ${props => props.$isAllAgree ? '#ffd700' : '#dc3545'};
    font-weight: 600;
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
  margin-top: 10px;

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

const SocialSignup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form fields
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');

  // Terms checkboxes
  const [allAgree, setAllAgree] = useState(false);
  const [serviceTerms, setServiceTerms] = useState(false);
  const [privacyTerms, setPrivacyTerms] = useState(false);
  const [thirdPartyTerms, setThirdPartyTerms] = useState(false);
  const [locationTerms, setLocationTerms] = useState(false);
  const [eventTerms, setEventTerms] = useState(false);

  // Handle all agree checkbox
  const handleAllAgree = (e) => {
    const checked = e.target.checked;
    setAllAgree(checked);
    setServiceTerms(checked);
    setPrivacyTerms(checked);
    setThirdPartyTerms(checked);
    setLocationTerms(checked);
    setEventTerms(checked);
  };

  // Update all agree when individual checkboxes change
  React.useEffect(() => {
    if (serviceTerms && privacyTerms && thirdPartyTerms && locationTerms && eventTerms) {
      setAllAgree(true);
    } else {
      setAllAgree(false);
    }
  }, [serviceTerms, privacyTerms, thirdPartyTerms, locationTerms, eventTerms]);

  // Format phone number
  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
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
    setPhone(formattedValue);
  };

  // Format birth date
  const formatBirthDate = (value) => {
    const date = value.replace(/[^\d]/g, '');
    if (date.length <= 4) {
      return date;
    } else if (date.length <= 6) {
      return `${date.slice(0, 4)}-${date.slice(4)}`;
    } else {
      return `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
    }
  };

  const handleBirthDateChange = (e) => {
    const formattedValue = formatBirthDate(e.target.value);
    setBirthDate(formattedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name || !birthDate || !phone) {
      setError('모든 필수 정보를 입력해주세요.');
      return;
    }

    if (!serviceTerms || !privacyTerms) {
      setError('필수 약관에 동의해주세요.');
      return;
    }

    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
      setError('올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)');
      return;
    }

    const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthDateRegex.test(birthDate)) {
      setError('올바른 생년월일 형식을 입력해주세요. (예: 1990-01-01)');
      return;
    }

    setIsLoading(true);

    try {
      // Get current user from Supabase session
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError('로그인 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
        setIsLoading(false);
        return;
      }

      // Update user profile in database
      const { error: updateError } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          username: name,
          phone: phone,
          birth_date: birthDate,
          email: user.email,
          updated_at: new Date().toISOString()
        });

      if (updateError) {
        throw updateError;
      }

      // Save login data
      const loginData = {
        isLoggedIn: true,
        user: {
          id: user.id,
          email: user.email,
          name: name,
          phone: phone,
          birthDate: birthDate
        },
        loginTime: new Date().toISOString()
      };

      localStorage.setItem('loginData', JSON.stringify(loginData));

      alert(`${name}님, 회원가입이 완료되었습니다!`);
      navigate('/');
    } catch (err) {
      console.error('회원가입 오류:', err);
      setError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignupContainer>
      <SignupCard>
        <BackArrowButton onClick={() => navigate('/login')}>
          ←
        </BackArrowButton>
        <Logo>여행대로</Logo>
        <Title>간편 회원가입</Title>
        <Subtitle>추가 정보를 입력해주세요</Subtitle>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <InputGroup>
            <Label htmlFor="name">이름 <span style={{ color: '#dc3545' }}>*</span></Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              disabled={isLoading}
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="birthDate">생년월일 <span style={{ color: '#dc3545' }}>*</span></Label>
            <Input
              type="text"
              id="birthDate"
              value={birthDate}
              onChange={handleBirthDateChange}
              placeholder="YYYY-MM-DD (예: 1990-01-01)"
              maxLength={10}
              disabled={isLoading}
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="phone">휴대폰 번호 <span style={{ color: '#dc3545' }}>*</span></Label>
            <Input
              type="tel"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="010-1234-5678"
              maxLength={13}
              disabled={isLoading}
            />
          </InputGroup>

          <TermsSection>
            <TermsTitle>약관 동의</TermsTitle>

            <CheckboxGroup className="all-agree">
              <Checkbox
                type="checkbox"
                id="allAgree"
                checked={allAgree}
                onChange={handleAllAgree}
                disabled={isLoading}
              />
              <CheckboxLabel htmlFor="allAgree" $isAllAgree={true}>
                전체 동의합니다
              </CheckboxLabel>
            </CheckboxGroup>

            <CheckboxGroup>
              <Checkbox
                type="checkbox"
                id="serviceTerms"
                checked={serviceTerms}
                onChange={(e) => setServiceTerms(e.target.checked)}
                disabled={isLoading}
              />
              <CheckboxLabel htmlFor="serviceTerms">
                서비스 이용약관 <span>(필수)</span>
              </CheckboxLabel>
            </CheckboxGroup>

            <CheckboxGroup>
              <Checkbox
                type="checkbox"
                id="privacyTerms"
                checked={privacyTerms}
                onChange={(e) => setPrivacyTerms(e.target.checked)}
                disabled={isLoading}
              />
              <CheckboxLabel htmlFor="privacyTerms">
                개인정보 수집 및 이용 동의 <span>(필수)</span>
              </CheckboxLabel>
            </CheckboxGroup>

            <CheckboxGroup>
              <Checkbox
                type="checkbox"
                id="thirdPartyTerms"
                checked={thirdPartyTerms}
                onChange={(e) => setThirdPartyTerms(e.target.checked)}
                disabled={isLoading}
              />
              <CheckboxLabel htmlFor="thirdPartyTerms">
                개인정보 제3자 제공 동의 (선택)
              </CheckboxLabel>
            </CheckboxGroup>

            <CheckboxGroup>
              <Checkbox
                type="checkbox"
                id="locationTerms"
                checked={locationTerms}
                onChange={(e) => setLocationTerms(e.target.checked)}
                disabled={isLoading}
              />
              <CheckboxLabel htmlFor="locationTerms">
                위치서비스 이용 동의 (선택)
              </CheckboxLabel>
            </CheckboxGroup>

            <CheckboxGroup>
              <Checkbox
                type="checkbox"
                id="eventTerms"
                checked={eventTerms}
                onChange={(e) => setEventTerms(e.target.checked)}
                disabled={isLoading}
              />
              <CheckboxLabel htmlFor="eventTerms">
                이벤트 및 할인 혜택 동의 (선택)
              </CheckboxLabel>
            </CheckboxGroup>
          </TermsSection>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? '회원가입 중...' : '회원가입 완료'}
          </SubmitButton>
        </Form>
      </SignupCard>
    </SignupContainer>
  );
};

export default SocialSignup;