import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PolicyHeader from '../components/privacy/PolicyHeader';
import PolicySection from '../components/privacy/PolicySection';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <PolicyHeader onBack={() => navigate(-1)} />

        <PolicySection title="1. 수집하는 개인정보">
          <p>여행대로는 다음과 같은 개인정보를 수집합니다:</p>
          <ul>
            <li>이메일 주소</li>
            <li>이름</li>
            <li>전화번호</li>
            <li>생년월일</li>
          </ul>
        </PolicySection>

        <PolicySection title="2. 개인정보의 이용 목적">
          <p>수집한 개인정보는 다음의 목적을 위해 활용됩니다:</p>
          <ul>
            <li>회원 관리 및 서비스 제공</li>
            <li>여행 관련 정보 제공</li>
            <li>고객 지원</li>
          </ul>
        </PolicySection>

        <PolicySection title="3. 개인정보의 보유 및 이용기간">
          <p>회원 탈퇴 시까지 보유하며, 탈퇴 후 즉시 파기됩니다.</p>
        </PolicySection>

        <PolicySection title="4. 개인정보의 제3자 제공">
          <p>여행대로는 사용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.</p>
        </PolicySection>

        <PolicySection title="5. 개인정보 보호책임자">
          <p>개인정보 보호와 관련한 문의사항은 아래로 연락 주시기 바랍니다.</p>
          <p>이메일: privacy@example.com</p>
        </PolicySection>

        <PolicySection title="6. 권리 행사 방법">
          <p>사용자는 언제든지 개인정보 열람, 정정, 삭제, 처리정지를 요구할 수 있습니다.</p>
        </PolicySection>

        <Footer>
          <p>최종 수정일: {new Date().toLocaleDateString('ko-KR')}</p>
        </Footer>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20px;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Footer = styled.div`
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
  text-align: center;
  color: #6c757d;
  font-size: 14px;
`;

export default PrivacyPolicy;
