import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FAQItem from '../components/faq/FAQItem';



const FAQ = () => {
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState({});

  const faqData = [
    {
      id: 1,
      category: 'account',
      question: '회원가입은 어떻게 하나요?',
      answer: `
        <p><strong>여행대로 회원가입 방법:</strong></p>
        <p>1. 홈페이지 상단의 '회원가입' 버튼을 클릭하세요.</p>
        <p>2. 필수 정보(이메일, 비밀번호, 이름)를 입력해주세요.</p>
        <p>3. 이용약관 및 개인정보처리방침에 동의해주세요.</p>
        <p>4. '회원가입' 버튼을 클릭하면 가입이 완료됩니다.</p>
        <p><strong>소셜 로그인도 지원합니다:</strong> 카카오톡, 네이버, 구글 계정으로도 간편하게 가입할 수 있습니다.</p>
      `
    },
    {
      id: 2,
      category: 'account',
      question: '비밀번호를 잊어버렸어요.',
      answer: `
        <p><strong>비밀번호 재설정 방법:</strong></p>
        <p>1. 로그인 페이지에서 '비밀번호를 잊어버리셨습니까?' 링크를 클릭하세요.</p>
        <p>2. 가입 시 사용한 이메일 주소를 입력하세요.</p>
        <p>3. 입력한 이메일로 비밀번호 재설정 링크가 발송됩니다.</p>
        <p>4. 이메일의 링크를 클릭하여 새로운 비밀번호를 설정하세요.</p>
        <p><strong>주의사항:</strong> 비밀번호는 6자 이상으로 설정해주세요.</p>
      `
    },
    {
      id: 5,
      category: 'travel',
      question: '여행 일정은 어떻게 만들고 공유하나요?',
      answer: `
        <p><strong>여행 일정 만들기:</strong></p>
        <p>1. '일정' 메뉴에서 '새 일정 만들기'를 클릭하세요.</p>
        <p>2. 여행지, 날짜, 인원수를 입력하세요.</p>
        <p>3. 관심 있는 명소나 활동을 추가하세요.</p>
        <p>4. 일정을 저장하고 친구들과 공유하세요.</p>
        <p><strong>일정 공유하기:</strong></p>
        <ul>
          <li>링크 공유: 일정 링크를 복사하여 공유</li>
          <li>SNS 공유: 카카오톡, 페이스북 등으로 직접 공유</li>
          <li>협업 기능: 친구들이 일정을 함께 편집할 수 있도록 권한 부여</li>
        </ul>
      `
    },
    {
      id: 6,
      category: 'travel',
      question: '추천 여행지는 어떻게 찾나요?',
      answer: `
        <p><strong>맞춤 여행지 추천:</strong></p>
        <p>1. 홈페이지에서 선호하는 여행 스타일을 선택하세요.</p>
        <p>2. 예산, 기간, 인원수를 입력하세요.</p>
        <p>3. AI가 분석한 맞춤 여행지가 추천됩니다.</p>
        <p><strong>인기 여행지 보기:</strong></p>
        <ul>
          <li>실시간 인기 여행지</li>
          <li>계절별 추천 여행지</li>
          <li>테마별 여행지 (힐링, 액티비티, 문화체험 등)</li>
        </ul>
      `
    },
    {
      id: 7,
      category: 'companion',
      question: '동행 모집은 어떻게 하나요?',
      answer: `
        <p><strong>동행 모집 글 작성:</strong></p>
        <p>1. '동행' 메뉴에서 '동행 모집하기'를 클릭하세요.</p>
        <p>2. 여행 정보(목적지, 날짜, 예산)를 입력하세요.</p>
        <p>3. 모집 인원과 희망하는 동행자 조건을 작성하세요.</p>
        <p>4. 연락 방법과 상세 일정을 공유하세요.</p>
        <p><strong>안전한 만남을 위한 팁:</strong></p>
        <ul>
          <li>첫 만남은 공공장소에서 하세요</li>
          <li>여행 전 충분한 소통을 통해 서로를 알아가세요</li>
          <li>비상연락처를 가족이나 친구에게 알려두세요</li>
        </ul>
      `
    },
    {
      id: 8,
      category: 'companion',
      question: '동행자를 어떻게 선택해야 하나요?',
      answer: `
        <p><strong>좋은 동행자 선택 기준:</strong></p>
        <ul>
          <li>비슷한 여행 스타일과 관심사</li>
          <li>예산과 일정에 대한 합의</li>
          <li>소통이 원활하고 배려심이 있는 사람</li>
          <li>여행 경험과 준비성</li>
        </ul>
        <p><strong>동행자 평가 시스템:</strong></p>
        <p>여행 후 상호 평가를 통해 신뢰할 수 있는 동행자를 찾을 수 있습니다.</p>
        <p><strong>매너 가이드라인:</strong> 시간 약속 준수, 공동 비용 분담, 상대방 의견 존중 등</p>
      `
    },
    {
      id: 9,
      category: 'service',
      question: '여행대로 앱은 어디서 다운로드 받나요?',
      answer: `
        <p><strong>모바일 앱 다운로드:</strong></p>
        <p>현재 여행대로는 웹 서비스로만 제공되고 있습니다.</p>
        <p><strong>모바일 최적화:</strong></p>
        <ul>
          <li>모든 기능이 모바일 브라우저에서 완벽하게 작동합니다</li>
          <li>반응형 디자인으로 스마트폰에 최적화되었습니다</li>
          <li>홈화면에 바로가기를 추가하여 앱처럼 사용할 수 있습니다</li>
        </ul>
        <p><strong>네이티브 앱 출시 예정:</strong> 2024년 하반기 iOS/Android 앱 출시를 준비 중입니다.</p>
      `
    },
    {
      id: 11,
      category: 'service',
      question: '개인정보는 어떻게 보호되나요?',
      answer: `
        <p><strong>개인정보 보호 정책:</strong></p>
        <ul>
          <li>SSL 암호화를 통한 안전한 데이터 전송</li>
          <li>개인정보는 서비스 제공 목적으로만 사용</li>
          <li>제3자에게 개인정보 제공하지 않음</li>
          <li>정기적인 보안 점검 및 업데이트</li>
        </ul>
        <p><strong>이용자 권리:</strong></p>
        <ul>
          <li>개인정보 열람, 수정, 삭제 요청 권리</li>
          <li>마케팅 수신 거부 권리</li>
          <li>개인정보 처리 정지 요청 권리</li>
        </ul>
        <p>자세한 내용은 개인정보처리방침을 참고해주세요.</p>
      `
    },
  ];


  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <FAQContainer>
      <FAQHeader>
        <BackButton onClick={() => navigate(-1)}>
          ←
        </BackButton>
        <FAQTitle>자주 묻는 질문</FAQTitle>
        <FAQSubtitle>궁금한 점을 빠르게 해결하세요</FAQSubtitle>
      </FAQHeader>



      <FAQList>
        {faqData.map(item => (
          <FAQItem
            key={item.id}
            item={item}
            isExpanded={expandedItems[item.id]}
            onToggle={() => toggleExpanded(item.id)}
          />
        ))}
      </FAQList>

      {faqData.length === 0 && (
        <EmptyState>
          <EmptyIcon>🔍</EmptyIcon>
          <h3>검색 결과가 없습니다</h3>
          <p>다른 키워드로 검색해보시거나 카테고리를 변경해보세요.</p>
        </EmptyState>
      )}
    </FAQContainer>
  );
};


const FAQContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
`;

const FAQHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  top: -20px;
  background: #667eea;
  border: none;
  border-radius: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-size: 20px;
  z-index: 10;

  &:hover {
    background: #5a6fd8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    top: -10px;
  }
`;

const FAQTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const FAQSubtitle = styled.p`
  font-size: 18px;
  color: #6c757d;
  line-height: 1.6;
`;


const FAQList = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

export default FAQ;