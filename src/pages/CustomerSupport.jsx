import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';



const CustomerSupport = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: ''
  });
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.category || !formData.subject || !formData.message) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    // 문의 전송 로직 (실제로는 API 호출)
    console.log('문의 전송:', formData);
    setShowModal(true);

    // 폼 초기화
    setFormData({
      name: '',
      email: '',
      category: '',
      subject: '',
      message: ''
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCardClick = (type) => {
    switch (type) {
      case 'faq':
        alert('FAQ 페이지는 준비 중입니다.');
        break;
      case 'chat':
        alert('실시간 채팅 상담은 준비 중입니다.');
        break;
      case 'phone':
        alert('전화 상담 연결 기능은 준비 중입니다.');
        break;
      case 'email':
        document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  return (
    <CustomerSupportPage>
      <Navigation />

      <SupportContainer>
        <PageHeader>
          <PageTitle>고객지원</PageTitle>
        </PageHeader>

        {/* 지원 옵션 카드 */}
        <SupportGrid>
          <SupportCard onClick={() => handleCardClick('faq')}>
            <CardIcon>❓</CardIcon>
            <CardTitle>자주 묻는 질문</CardTitle>
            <CardDescription>
              가장 자주 묻는 질문들과 답변을 확인하세요.
              빠른 해결책을 찾을 수 있습니다.
            </CardDescription>
            <CardButton>FAQ 보기</CardButton>
          </SupportCard>

          <SupportCard onClick={() => handleCardClick('chat')}>
            <CardIcon>💬</CardIcon>
            <CardTitle>실시간 채팅</CardTitle>
            <CardDescription>
              실시간으로 상담원과 채팅하며
              즉시 도움을 받으세요.
            </CardDescription>
            <CardButton>채팅 시작</CardButton>
          </SupportCard>

          <SupportCard onClick={() => handleCardClick('phone')}>
            <CardIcon>📞</CardIcon>
            <CardTitle>전화 상담</CardTitle>
            <CardDescription>
              전화로 직접 상담받으시고
              자세한 안내를 받으세요.
            </CardDescription>
            <CardButton>전화 걸기</CardButton>
          </SupportCard>

          <SupportCard onClick={() => handleCardClick('email')}>
            <CardIcon>✉️</CardIcon>
            <CardTitle>이메일 문의</CardTitle>
            <CardDescription>
              자세한 문의사항을 이메일로 보내주시면
              빠르게 답변드리겠습니다.
            </CardDescription>
            <CardButton>문의하기</CardButton>
          </SupportCard>
        </SupportGrid>

        {/* 문의 폼 */}
        <ContactSection id="contact-form">
          <SectionTitle>문의하기</SectionTitle>
          <ContactForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>이름 *</FormLabel>
              <FormInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="이름을 입력해주세요"
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>이메일 *</FormLabel>
              <FormInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="이메일을 입력해주세요"
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>문의 유형 *</FormLabel>
              <FormSelect
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">문의 유형을 선택해주세요</option>
                <option value="booking">예약 관련</option>
                <option value="payment">결제 관련</option>
                <option value="account">계정 관련</option>
                <option value="technical">기술적 문제</option>
                <option value="refund">환불 관련</option>
                <option value="other">기타</option>
              </FormSelect>
            </FormGroup>

            <FormGroup>
              <FormLabel>제목 *</FormLabel>
              <FormInput
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="문의 제목을 입력해주세요"
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>내용 *</FormLabel>
              <FormTextarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="문의 내용을 자세히 입력해주세요"
                required
              />
            </FormGroup>

            <SubmitButton type="submit">
              문의 전송
            </SubmitButton>
          </ContactForm>

          {/* 연락처 정보 */}
          <ContactInfo>
            <ContactInfoGrid>
              <ContactInfoItem>
                <ContactInfoIcon>📞</ContactInfoIcon>
                <ContactInfoTitle>고객센터</ContactInfoTitle>
                <ContactInfoDetail>
                  1588-1234<br />
                  평일 09:00 - 18:00<br />
                  주말/공휴일 휴무
                </ContactInfoDetail>
              </ContactInfoItem>

              <ContactInfoItem>
                <ContactInfoIcon>✉️</ContactInfoIcon>
                <ContactInfoTitle>이메일</ContactInfoTitle>
                <ContactInfoDetail>
                  support@tripapp.com<br />
                  24시간 접수 가능<br />
                  평균 응답시간 2-4시간
                </ContactInfoDetail>
              </ContactInfoItem>

              <ContactInfoItem>
                <ContactInfoIcon>🏢</ContactInfoIcon>
                <ContactInfoTitle>오피스</ContactInfoTitle>
                <ContactInfoDetail>
                  서울시 강남구 테헤란로<br />
                  123 여행빌딩 5층<br />
                  평일 09:00 - 18:00
                </ContactInfoDetail>
              </ContactInfoItem>
            </ContactInfoGrid>
          </ContactInfo>
        </ContactSection>
      </SupportContainer>

      {/* 전송 완료 모달 */}
      {showModal && (
        <Modal onClick={(e) => e.target === e.currentTarget && handleCloseModal()}>
          <ModalContainer>
            <ModalIcon>✅</ModalIcon>
            <ModalTitle>문의가 전송되었습니다</ModalTitle>
            <ModalMessage>
              소중한 문의를 보내주셔서 감사합니다.<br />
              빠른 시일 내에 답변드리겠습니다.
            </ModalMessage>
            <ModalButton onClick={handleCloseModal}>
              확인
            </ModalButton>
          </ModalContainer>
        </Modal>
      )}
    </CustomerSupportPage>
  );
};


const CustomerSupportPage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
  padding-bottom: 20px;

  @media (max-width: 1024px) {
    padding-bottom: 100px;
  }
`;

const SupportContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e9ecef;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  background: linear-gradient(135deg, #007bff 0%, #6f42c1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SupportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

const SupportCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CardIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
  text-align: center;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
  text-align: center;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #6c757d;
  line-height: 1.6;
  text-align: center;
  margin: 0 0 20px 0;
`;

const CardButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #007bff 0%, #6f42c1 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 123, 255, 0.4);
  }
`;

const ContactSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 30px 0;
  text-align: center;
`;

const ContactForm = styled.form`
  display: grid;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const FormSelect = styled.select`
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 14px;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #007bff 0%, #6f42c1 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  justify-self: center;
  min-width: 200px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 123, 255, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactInfo = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 15px;
  padding: 30px;
  margin-top: 30px;
`;

const ContactInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const ContactInfoItem = styled.div`
  text-align: center;
`;

const ContactInfoIcon = styled.div`
  font-size: 32px;
  margin-bottom: 15px;
`;

const ContactInfoTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 10px 0;
`;

const ContactInfoDetail = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
  line-height: 1.5;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px 30px 30px 30px;
  text-align: center;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const ModalMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 30px 0;
  line-height: 1.6;
`;

const ModalButton = styled.button`
  background: linear-gradient(135deg, #007bff 0%, #6f42c1 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 123, 255, 0.4);
  }
`;

export default CustomerSupport;