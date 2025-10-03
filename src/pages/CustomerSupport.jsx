import React, { useState } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import SupportCard from '../components/support/SupportCard';
import ContactForm from '../components/support/ContactForm';
import ContactInfoCard from '../components/support/ContactInfoCard';
import ConfirmModal from '../components/common/ConfirmModal';

const CustomerSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: ''
  });
  const [showModal, setShowModal] = useState(false);

  const supportOptions = [
    {
      icon: '❓',
      title: '자주 묻는 질문',
      description: '가장 자주 묻는 질문들과 답변을 확인하세요.\n빠른 해결책을 찾을 수 있습니다.',
      buttonText: 'FAQ 보기',
      type: 'faq'
    },
    {
      icon: '💬',
      title: '실시간 채팅',
      description: '실시간으로 상담원과 채팅하며\n즉시 도움을 받으세요.',
      buttonText: '채팅 시작',
      type: 'chat'
    },
    {
      icon: '📞',
      title: '전화 상담',
      description: '전화로 직접 상담받으시고\n자세한 안내를 받으세요.',
      buttonText: '전화 걸기',
      type: 'phone'
    },
    {
      icon: '✉️',
      title: '이메일 문의',
      description: '자세한 문의사항을 이메일로 보내주시면\n빠르게 답변드리겠습니다.',
      buttonText: '문의하기',
      type: 'email'
    }
  ];

  const contactInfo = [
    {
      icon: '📞',
      title: '고객센터',
      details: '1588-1234\n평일 09:00 - 18:00\n주말/공휴일 휴무'
    },
    {
      icon: '✉️',
      title: '이메일',
      details: 'support@tripapp.com\n24시간 접수 가능\n평균 응답시간 2-4시간'
    },
    {
      icon: '🏢',
      title: '오피스',
      details: '서울시 강남구 테헤란로\n123 여행빌딩 5층\n평일 09:00 - 18:00'
    }
  ];

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
          {supportOptions.map((option, index) => (
            <SupportCard
              key={index}
              icon={option.icon}
              title={option.title}
              description={option.description}
              buttonText={option.buttonText}
              onClick={() => handleCardClick(option.type)}
            />
          ))}
        </SupportGrid>

        {/* 문의 폼 */}
        <ContactSection id="contact-form">
          <SectionTitle>문의하기</SectionTitle>

          <ContactForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />

          {/* 연락처 정보 */}
          <ContactInfo>
            <ContactInfoGrid>
              {contactInfo.map((info, index) => (
                <ContactInfoCard
                  key={index}
                  icon={info.icon}
                  title={info.title}
                  details={info.details}
                />
              ))}
            </ContactInfoGrid>
          </ContactInfo>
        </ContactSection>
      </SupportContainer>

      {/* 전송 완료 모달 */}
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => setShowModal(false)}
        title="문의가 전송되었습니다"
        message="소중한 문의를 보내주셔서 감사합니다.\n빠른 시일 내에 답변드리겠습니다."
        icon="✅"
        confirmText="확인"
        showCancel={false}
      />
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

export default CustomerSupport;
