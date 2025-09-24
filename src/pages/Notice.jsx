import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';

// Styled Components
const NoticePage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
  padding-bottom: 20px;

  @media (max-width: 1024px) {
    padding-bottom: 100px;
  }
`;

const NoticeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  top: -60px;
  background: #28a745;
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

  &:hover {
    background: #218838;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PageTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PageSubtitle = styled.p`
  font-size: 18px;
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
`;

const NoticeList = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
`;

const NoticeItem = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #f8f9fa;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    margin: 0 -30px;
    padding: 20px 30px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NoticeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const NoticeTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  line-height: 1.4;
`;

const NoticeMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #6c757d;
`;

const NoticeDate = styled.span`
  font-weight: 500;
`;

const NoticeType = styled.span`
  background: ${props => {
    switch (props.type) {
      case '중요': return 'linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)';
      case '업데이트': return 'linear-gradient(135deg, #007bff 0%, #6f42c1 100%)';
      case '이벤트': return 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
      default: return 'linear-gradient(135deg, #6c757d 0%, #adb5bd 100%)';
    }
  }};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

const NoticePreview = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NoticeModal = styled.div`
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

const NoticeModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;

  @media (max-width: 480px) {
    max-width: 90vw;
    padding: 30px 20px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f8f9fa;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  line-height: 1.3;
  flex: 1;
  margin-right: 20px;
`;

const ModalClose = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6c757d;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #495057;
  }
`;

const ModalContent = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #495057;
  white-space: pre-line;
`;

const ModalMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
  color: #6c757d;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const EmptyNotice = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

const EmptyTitle = styled.h3`
  font-size: 24px;
  margin: 0 0 10px 0;
`;

const EmptyMessage = styled.p`
  font-size: 16px;
  margin: 0;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 10px;
`;

const PaginationButton = styled.button`
  padding: 10px 15px;
  border: 1px solid #e9ecef;
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#6c757d'};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 40px;

  &:hover:not(:disabled) {
    background: ${props => props.active ? '#667eea' : '#f8f9fa'};
    border-color: #667eea;
    color: ${props => props.active ? 'white' : '#667eea'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PaginationInfo = styled.div`
  color: #6c757d;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
`;

const Notice = () => {
  const navigate = useNavigate();
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const notices = [
    {
      id: 1,
      type: '중요',
      title: '서비스 정기 점검 안내',
      date: '2024-03-20',
      preview: '보다 안정적인 서비스 제공을 위해 정기 점검을 실시합니다. 점검 시간 동안 일시적으로 서비스 이용이 제한될 수 있습니다.',
      content: `보다 안정적인 서비스 제공을 위해 정기 점검을 실시합니다.\n\n📅 점검 일시: 2024년 3월 25일 (월) 오전 2시 ~ 오전 6시 (4시간)\n🔧 점검 내용:\n- 서버 시스템 업그레이드\n- 데이터베이스 최적화\n- 보안 패치 적용\n\n점검 시간 동안 일시적으로 서비스 이용이 제한될 수 있으니 양해 부탁드립니다.\n점검 완료 후 더욱 안정적이고 빠른 서비스를 제공해드리겠습니다.\n\n문의사항이 있으시면 고객센터로 연락해주세요.\n감사합니다.`
    },
    {
      id: 2,
      type: '업데이트',
      title: '새로운 기능 업데이트 안내',
      date: '2024-03-18',
      preview: '사용자 편의를 위한 새로운 기능들이 추가되었습니다. 팔로워/팔로잉 기능, 쿠폰함, 개선된 검색 기능을 만나보세요.',
      content: `새로운 기능들이 추가되었습니다!\n\n🎉 새로운 기능:\n- 팔로워/팔로잉 시스템 추가\n- 쿠폰함 기능 추가\n- 개선된 검색 기능\n- 반응형 디자인 개선\n- 알림 시스템 업그레이드\n\n🔧 개선사항:\n- 페이지 로딩 속도 향상\n- 모바일 UI/UX 개선\n- 버그 수정 및 안정성 향상\n\n새로운 기능들을 통해 더욱 편리한 여행 계획을 세워보세요!`
    },
    {
      id: 3,
      type: '이벤트',
      title: '봄맞이 특별 할인 이벤트',
      date: '2024-03-15',
      preview: '따뜻한 봄을 맞아 특별 할인 이벤트를 진행합니다. 숙박, 액티비티, 여행용품까지 최대 30% 할인!',
      content: `🌸 봄맞이 특별 할인 이벤트 🌸\n\n📅 이벤트 기간: 2024년 3월 15일 ~ 4월 15일\n\n💰 할인 혜택:\n- 숙박 예약 최대 30% 할인\n- 액티비티 체험 20% 할인\n- 여행용품 15% 할인\n\n🎁 추가 혜택:\n- 신규 회원 가입 시 1만원 쿠폰 지급\n- 첫 예약 시 추가 5% 할인\n- 리뷰 작성 시 포인트 적립\n\n이번 기회를 놓치지 마시고 봄 여행을 계획해보세요!\n자세한 내용은 이벤트 페이지에서 확인하실 수 있습니다.`
    },
    {
      id: 4,
      type: '일반',
      title: '개인정보 처리방침 개정 안내',
      date: '2024-03-10',
      preview: '개인정보 보호법 개정에 따라 개인정보 처리방침이 일부 변경됩니다. 주요 변경사항을 확인해주세요.',
      content: `개인정보 처리방침이 개정되었습니다.\n\n📋 주요 변경사항:\n- 개인정보 수집 목적 명시 강화\n- 개인정보 보관 기간 단축\n- 개인정보 제3자 제공 동의 절차 개선\n- 개인정보 삭제 요청 절차 간소화\n\n🗓️ 시행일: 2024년 3월 15일\n\n변경된 개인정보 처리방침은 웹사이트 하단에서 확인하실 수 있습니다.\n개인정보 보호에 더욱 신경 쓰겠습니다.\n\n문의사항이 있으시면 고객센터로 연락해주세요.`
    },
    {
      id: 5,
      type: '업데이트',
      title: 'iOS 앱 버전 2.1.0 업데이트',
      date: '2024-03-08',
      preview: 'iOS 앱이 2.1.0 버전으로 업데이트되었습니다. 새로운 기능과 개선사항을 확인해보세요.',
      content: `iOS 앱 2.1.0 버전 업데이트\n\n🆕 새로운 기능:\n- 다크 모드 지원\n- 오프라인 지도 기능\n- 음성 안내 서비스\n- 여행 경비 계산기\n\n🔧 개선사항:\n- 앱 시작 속도 30% 향상\n- 메모리 사용량 최적화\n- 카메라 성능 개선\n- 배터리 효율성 증대\n\n앱 스토어에서 업데이트해주세요!`
    },
    {
      id: 6,
      type: '이벤트',
      title: '신규 회원 가입 이벤트',
      date: '2024-03-05',
      preview: '새로 가입하는 회원들을 위한 특별한 혜택을 준비했습니다. 가입만 해도 즉시 쿠폰을 받을 수 있어요!',
      content: `신규 회원 환영 이벤트 🎉\n\n📅 이벤트 기간: 2024년 3월 1일 ~ 3월 31일\n\n🎁 혜택:\n- 가입 즉시 5,000원 쿠폰 지급\n- 첫 예약 시 10% 추가 할인\n- 친구 추천 시 양쪽 모두 3,000원 쿠폰\n- 프로필 완성 시 2,000원 쿠폰\n\n📝 참여 방법:\n1. 여행대로 회원가입\n2. 이메일 인증 완료\n3. 프로필 기본 정보 입력\n4. 쿠폰 자동 지급\n\n지금 가입하고 혜택을 받아보세요!`
    },
    {
      id: 7,
      type: '중요',
      title: '결제 시스템 보안 강화 안내',
      date: '2024-03-03',
      preview: '고객님의 안전한 결제를 위해 결제 시스템 보안이 강화되었습니다. 새로운 보안 절차를 확인해주세요.',
      content: `결제 시스템 보안 강화 안내\n\n🔒 보안 강화 내용:\n- 2단계 인증 시스템 도입\n- SSL 인증서 업그레이드\n- 결제 정보 암호화 강화\n- 이상 거래 탐지 시스템 추가\n\n🛡️ 새로운 인증 절차:\n1. 결제 정보 입력\n2. SMS 또는 이메일 인증\n3. 결제 완료\n\n📱 지원 결제 수단:\n- 모든 신용카드\n- 간편결제 (카카오페이, 네이버페이)\n- 계좌이체\n\n안전한 결제 환경을 위한 조치이니 양해 부탁드립니다.`
    },
    {
      id: 8,
      type: '일반',
      title: '고객센터 운영시간 변경 안내',
      date: '2024-03-01',
      preview: '더 나은 고객 서비스 제공을 위해 고객센터 운영시간이 연장됩니다. 변경된 운영시간을 확인해주세요.',
      content: `고객센터 운영시간 변경 안내\n\n🕘 변경 전: 평일 09:00 - 18:00\n🕙 변경 후: 평일 08:00 - 20:00\n\n📞 연락처:\n- 전화: 1588-0000\n- 이메일: support@travel-daero.com\n- 카카오톡: @여행대로\n\n🌟 추가 서비스:\n- 토요일 10:00 - 17:00 운영\n- 24시간 챗봇 서비스\n- FAQ 자동 검색 시스템\n\n더 편리한 고객 서비스를 제공하겠습니다!`
    },
    {
      id: 9,
      type: '업데이트',
      title: '검색 기능 대폭 개선',
      date: '2024-02-28',
      preview: 'AI 기반의 스마트 검색 기능이 추가되어 더욱 정확하고 빠른 검색이 가능해졌습니다.',
      content: `검색 기능 대폭 개선! 🔍\n\n🤖 AI 스마트 검색:\n- 자연어 검색 지원\n- 맞춤형 추천 결과\n- 오타 자동 수정\n- 동의어 인식 기능\n\n⚡ 성능 개선:\n- 검색 속도 50% 향상\n- 더 정확한 결과 제공\n- 필터링 옵션 확대\n- 최근 검색어 저장\n\n🎯 새로운 검색 카테고리:\n- 테마별 여행지\n- 예산별 추천\n- 계절별 명소\n- 인기 액티비티\n\n이제 원하는 여행지를 더 쉽게 찾아보세요!`
    },
    {
      id: 10,
      type: '이벤트',
      title: '리뷰 작성 이벤트 - 경품 증정',
      date: '2024-02-25',
      preview: '여행 후기를 작성하고 푸짐한 경품을 받아가세요! 매주 추첨을 통해 여행용품을 증정합니다.',
      content: `리뷰 작성 이벤트 📝\n\n📅 이벤트 기간: 2024년 2월 25일 ~ 4월 25일\n\n🎁 경품:\n- 1등: 해외여행 상품권 100만원 (1명)\n- 2등: 국내여행 상품권 50만원 (2명)\n- 3등: 여행용 캐리어 (5명)\n- 참가상: 스타벅스 기프티콘 (매주 20명)\n\n📝 참여방법:\n1. 여행대로에서 예약한 상품 이용\n2. 여행 완료 후 리뷰 작성\n3. 사진 3장 이상 첨부\n4. 100자 이상 후기 작성\n\n🏆 매주 금요일 추첨 발표\n\n여러분의 소중한 후기를 기다립니다!`
    },
    {
      id: 11,
      type: '일반',
      title: '쿠폰 유효기간 연장 정책 변경',
      date: '2024-02-22',
      preview: '고객 편의를 위해 쿠폰 유효기간이 연장됩니다. 기존 쿠폰들도 자동으로 기간이 연장됩니다.',
      content: `쿠폰 유효기간 연장 안내 🎫\n\n📅 변경사항:\n- 기존: 발급일로부터 30일\n- 변경: 발급일로부터 90일\n\n🔄 자동 적용:\n- 기존 보유 쿠폰 모두 90일로 연장\n- 추가 절차 없이 자동 적용\n- 이미 만료된 쿠폰은 제외\n\n📱 쿠폰함에서 확인:\n- 마이페이지 > 쿠폰함\n- 연장된 유효기간 확인 가능\n- 만료 임박 알림 서비스\n\n더 여유롭게 쿠폰을 사용하세요!`
    },
    {
      id: 12,
      type: '중요',
      title: '여름 성수기 예약 오픈 안내',
      date: '2024-02-20',
      preview: '여름 휴가철 상품 예약이 3월 1일부터 시작됩니다. 인기 상품은 조기 마감될 수 있으니 서둘러 예약하세요.',
      content: `여름 성수기 예약 오픈! ☀️\n\n📅 예약 오픈: 2024년 3월 1일 오전 10시\n🏖️ 대상 기간: 2024년 7월 ~ 8월\n\n🔥 인기 예상 상품:\n- 제주도 펜션/리조트\n- 부산 해변가 숙소\n- 강원도 휴양림\n- 해외 휴양지 패키지\n\n⚠️ 주의사항:\n- 조기 예약 할인 최대 40%\n- 인기 상품 조기 마감 예상\n- 예약금 10만원부터\n- 무료 취소 6월 30일까지\n\n📞 예약 문의: 1588-0000\n\n미리 계획하고 최고의 여름휴가를 만들어보세요!`
    },
    {
      id: 13,
      type: '업데이트',
      title: '지도 서비스 업그레이드',
      date: '2024-02-18',
      preview: '더 정확하고 상세한 지도 정보를 제공합니다. 실시간 교통정보와 3D 뷰 기능이 추가되었습니다.',
      content: `지도 서비스 업그레이드 🗺️\n\n🆕 새로운 기능:\n- 3D 뷰 지원\n- 실시간 교통정보\n- 대중교통 경로 안내\n- 주변 편의시설 정보\n\n📍 개선된 정보:\n- 더 정확한 위치 표시\n- 최신 도로 정보 반영\n- 건물 내부 지도\n- 접근성 정보 제공\n\n🚗 내비게이션 기능:\n- 음성 안내 지원\n- 경로 최적화\n- 우회 경로 제안\n- 도착 시간 예측\n\n여행이 더욱 편리해졌습니다!`
    },
    {
      id: 14,
      type: '일반',
      title: '회원등급 혜택 확대 안내',
      date: '2024-02-15',
      preview: '더 많은 혜택을 드리기 위해 회원등급 시스템이 개선되었습니다. 새로운 혜택들을 확인해보세요.',
      content: `회원등급 혜택 확대! 🌟\n\n💎 등급별 혜택:\n\n🥉 브론즈 (기본):\n- 기본 할인 5%\n- 월 2매 할인쿠폰\n\n🥈 실버 (연 50만원 이상):\n- 기본 할인 8%\n- 월 3매 할인쿠폰\n- 무료 배송 서비스\n\n🥇 골드 (연 100만원 이상):\n- 기본 할인 12%\n- 월 5매 할인쿠폰\n- 우선 예약 서비스\n- 전용 상담사 배정\n\n💍 플래티넘 (연 200만원 이상):\n- 기본 할인 15%\n- 월 8매 할인쿠폰\n- VIP 라운지 이용\n- 특별 이벤트 초대\n\n등급별 혜택을 누려보세요!`
    },
    {
      id: 15,
      type: '이벤트',
      title: '친구 추천 이벤트 - 함께 받는 혜택',
      date: '2024-02-12',
      preview: '친구를 추천하면 양쪽 모두 혜택을 받을 수 있습니다. 추천할 때마다 쿠폰이 쌓여요!',
      content: `친구 추천 이벤트 👫\n\n🎁 혜택:\n- 추천인: 5,000원 쿠폰\n- 신규회원: 10,000원 쿠폰\n- 둘 다: 첫 예약 시 5% 추가할인\n\n📝 참여방법:\n1. 추천 링크 생성\n2. 친구에게 링크 전송\n3. 친구가 링크로 가입\n4. 가입 완료 시 양쪽에 쿠폰 지급\n\n🔄 무제한 추천:\n- 추천 인원 제한 없음\n- 추천할 때마다 쿠폰 적립\n- 누적 혜택 제공\n\n💰 특별 보너스:\n- 10명 추천 시: 5만원 쿠폰\n- 20명 추천 시: 10만원 쿠폰\n\n친구들과 함께 여행을 떠나보세요!`
    },
    {
      id: 16,
      type: '업데이트',
      title: '모바일 앱 성능 최적화',
      date: '2024-02-10',
      preview: '모바일 앱의 성능이 대폭 개선되었습니다. 더 빠르고 안정적인 서비스를 경험하세요.',
      content: `모바일 앱 성능 최적화 📱\n\n⚡ 성능 개선:\n- 앱 실행 속도 40% 향상\n- 페이지 로딩 시간 단축\n- 메모리 사용량 30% 감소\n- 배터리 효율성 증대\n\n🔧 기술적 개선:\n- 이미지 최적화\n- 캐시 시스템 개선\n- 네트워크 요청 최적화\n- UI 렌더링 향상\n\n🐛 버그 수정:\n- 간헐적 앱 종료 문제\n- 로그인 오류 해결\n- 알림 수신 오류 수정\n- 결제 프로세스 안정화\n\n📲 업데이트 방법:\n- 앱스토어/플레이스토어에서 업데이트\n- 자동 업데이트 설정 권장\n\n더 나은 앱 경험을 제공합니다!`
    },
    {
      id: 17,
      type: '일반',
      title: '여행 보험 서비스 제휴 안내',
      date: '2024-02-08',
      preview: '안전한 여행을 위해 여행 보험 서비스와 제휴를 맺었습니다. 예약과 동시에 보험 가입이 가능합니다.',
      content: `여행 보험 서비스 제휴 🛡️\n\n🤝 제휴사: 삼성화재\n\n📋 보장 내용:\n- 해외여행: 최대 1억원\n- 국내여행: 최대 3천만원\n- 의료비 보장\n- 휴대품 분실/파손\n- 여행 취소/연기\n\n💰 보험료:\n- 해외 3일: 15,000원부터\n- 국내 2박3일: 8,000원부터\n- 가족 할인: 20% 추가할인\n\n📝 가입 방법:\n1. 여행 상품 예약 시 선택\n2. 간편 온라인 가입\n3. 즉시 보장 시작\n\n더 안심하고 여행을 떠나세요!`
    },
    {
      id: 18,
      type: '중요',
      title: '개인정보 보안 강화 조치',
      date: '2024-02-05',
      preview: '고객님의 개인정보 보호를 위해 보안 시스템이 대폭 강화되었습니다. 새로운 보안 정책을 확인해주세요.',
      content: `개인정보 보안 강화 조치 🔐\n\n🛡️ 보안 강화 내용:\n- 2단계 인증 의무화\n- 비밀번호 정책 강화\n- 개인정보 암호화 업그레이드\n- 접근 권한 세분화\n\n🔑 새로운 인증 시스템:\n- SMS/이메일 2단계 인증\n- 생체 인증 지원\n- 로그인 기록 모니터링\n- 이상 접근 차단\n\n📱 필수 조치사항:\n1. 비밀번호 재설정 (영문+숫자+특수문자)\n2. 2단계 인증 설정\n3. 개인정보 확인 및 업데이트\n\n🗓️ 적용 일정:\n- 2024년 2월 15일부터 단계적 적용\n- 기존 회원 3월 15일까지 설정 완료\n\n안전한 서비스 이용을 위한 조치입니다.`
    },
    {
      id: 19,
      type: '이벤트',
      title: '설 연휴 특별 할인 이벤트',
      date: '2024-02-01',
      preview: '설 연휴를 맞아 가족 여행 상품에 특별 할인을 제공합니다. 온 가족이 함께 즐거운 시간을 보내세요.',
      content: `설 연휴 특별 할인 이벤트 🧧\n\n📅 이벤트 기간: 2024년 2월 1일 ~ 2월 18일\n🎯 대상 상품: 가족 여행 패키지\n\n🎁 할인 혜택:\n- 4인 가족: 25% 할인\n- 6인 이상: 30% 할인\n- 조부모 동반: 추가 5% 할인\n\n🏠 추천 여행지:\n- 제주 가족 펜션\n- 경주 문화 체험\n- 강릉 한옥 마을\n- 부산 해운대 리조트\n\n🍽️ 추가 서비스:\n- 전통 음식 체험\n- 가족 사진 촬영\n- 키즈 프로그램\n- 무료 셔틀 서비스\n\n가족과 함께 따뜻한 설 연휴를 만들어보세요!`
    },
    {
      id: 20,
      type: '업데이트',
      title: '여행 일정 공유 기능 강화',
      date: '2024-01-28',
      preview: '여행 일정을 더 쉽게 공유하고 함께 편집할 수 있는 기능이 추가되었습니다. 협업 여행 계획이 더욱 편리해졌어요.',
      content: `여행 일정 공유 기능 강화 📅\n\n👥 협업 기능:\n- 실시간 공동 편집\n- 권한별 접근 관리\n- 변경사항 알림\n- 댓글 시스템\n\n📤 공유 방법:\n- 링크 공유\n- QR 코드 생성\n- SNS 직접 공유\n- 이메일 초대\n\n📱 모바일 최적화:\n- 터치 기반 편집\n- 드래그 앤 드롭\n- 사진 첨부 기능\n- 위치 자동 인식\n\n🔄 버전 관리:\n- 변경 이력 추적\n- 이전 버전 복원\n- 충돌 해결 시스템\n\n함께 만드는 완벽한 여행 계획!`
    },
    {
      id: 21,
      type: '일반',
      title: '고객 만족도 조사 결과 발표',
      date: '2024-01-25',
      preview: '2023년 고객 만족도 조사 결과를 발표합니다. 여러분의 소중한 의견을 바탕으로 더 나은 서비스를 준비하겠습니다.',
      content: `2023년 고객 만족도 조사 결과 📊\n\n📈 전체 만족도: 4.2/5.0 (전년 대비 0.3점 상승)\n\n🏆 우수 분야:\n- 예약 시스템 편의성: 4.5/5.0\n- 고객 서비스: 4.4/5.0\n- 상품 다양성: 4.3/5.0\n\n🔧 개선 필요 분야:\n- 모바일 앱 성능: 3.8/5.0\n- 취소/환불 정책: 3.9/5.0\n- 가격 경쟁력: 4.0/5.0\n\n💡 개선 계획:\n1. 앱 성능 최적화 (Q1 완료)\n2. 취소 정책 간소화 (Q2 예정)\n3. 가격 할인 이벤트 확대\n\n📝 조사 개요:\n- 기간: 2023년 11-12월\n- 응답자: 15,847명\n- 방법: 온라인/모바일 설문\n\n소중한 의견에 감사드립니다!`
    },
    {
      id: 22,
      type: '중요',
      title: '결제 시스템 점검 완료 안내',
      date: '2024-01-22',
      preview: '안정적인 결제 서비스 제공을 위해 실시했던 결제 시스템 점검이 완료되었습니다. 모든 기능이 정상 작동합니다.',
      content: `결제 시스템 점검 완료 ✅\n\n🔧 점검 완료: 2024년 1월 22일 오전 6시\n\n✨ 개선사항:\n- 결제 속도 20% 향상\n- 결제 오류율 90% 감소\n- 보안 시스템 업그레이드\n- 새로운 결제 수단 추가\n\n💳 추가된 결제 방법:\n- 삼성페이\n- LG페이\n- 페이코\n- 토스페이\n\n🛡️ 보안 강화:\n- 3D Secure 2.0 적용\n- 토큰 기반 결제\n- 실시간 사기 탐지\n- PCI DSS 인증 갱신\n\n💰 혜택:\n- 간편결제 시 추가 1% 적립\n- 첫 간편결제 5,000원 할인\n\n더욱 안전하고 편리한 결제 서비스!`
    },
    {
      id: 23,
      type: '이벤트',
      title: '겨울 여행 사진 공모전',
      date: '2024-01-20',
      preview: '겨울 여행의 아름다운 순간을 공유해주세요. 멋진 상품과 함께 여러분의 사진을 전시할 기회도 드립니다.',
      content: `겨울 여행 사진 공모전 📸❄️\n\n📅 공모 기간: 2024년 1월 20일 ~ 2월 29일\n🏆 시상 내역:\n\n🥇 대상 (1명):\n- 상금 100만원\n- 여행 상품권 50만원\n- 전문 사진집 제작\n\n🥈 금상 (3명):\n- 상금 50만원\n- 여행 상품권 30만원\n\n🥉 은상 (5명):\n- 상금 30만원\n- 여행 상품권 20만원\n\n📝 참가 방법:\n1. 겨울 여행 사진 촬영\n2. 여행대로 SNS에 해시태그와 함께 업로드\n3. 공모전 페이지에서 정식 접수\n\n📋 심사 기준:\n- 창의성 30%\n- 완성도 30%\n- 여행지 매력도 25%\n- 온라인 인기도 15%\n\n겨울의 감동을 나눠주세요!`
    }
  ];

  // 페이지네이션 관련 계산
  const totalPages = Math.ceil(notices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = notices.slice(startIndex, endIndex);

  const handleNoticeClick = (notice) => {
    setSelectedNotice(notice);
    setShowModal(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    // 이전 버튼
    buttons.push(
      <PaginationButton
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ◀
      </PaginationButton>
    );

    // 페이지 번호 버튼
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PaginationButton
          key={i}
          active={currentPage === i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PaginationButton>
      );
    }

    // 다음 버튼
    buttons.push(
      <PaginationButton
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ▶
      </PaginationButton>
    );

    return buttons;
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNotice(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <NoticePage>
      <Navigation />

      <NoticeContainer>
        <PageHeader>
          <BackButton onClick={() => navigate(-1)}>
            ←
          </BackButton>
          <PageTitle>공지사항</PageTitle>
          <PageSubtitle>중요한 소식과 업데이트 내용을 확인하세요</PageSubtitle>
        </PageHeader>

        <NoticeList>

          {currentNotices.length > 0 ? (
            currentNotices.map(notice => (
              <NoticeItem key={notice.id} onClick={() => handleNoticeClick(notice)}>
                <NoticeHeader>
                  <NoticeTitle>{notice.title}</NoticeTitle>
                  <NoticeMeta>
                    <NoticeType type={notice.type}>{notice.type}</NoticeType>
                    <NoticeDate>{formatDate(notice.date)}</NoticeDate>
                  </NoticeMeta>
                </NoticeHeader>
                <NoticePreview>{notice.preview}</NoticePreview>
              </NoticeItem>
            ))
          ) : (
            <EmptyNotice>
              <EmptyIcon>📢</EmptyIcon>
              <EmptyTitle>등록된 공지사항이 없습니다</EmptyTitle>
              <EmptyMessage>새로운 공지사항이 등록되면 알려드리겠습니다.</EmptyMessage>
            </EmptyNotice>
          )}
        </NoticeList>

        {totalPages > 1 && (
          <PaginationContainer>
            {renderPaginationButtons()}
          </PaginationContainer>
        )}
      </NoticeContainer>

      {/* 공지사항 상세 모달 */}
      {showModal && selectedNotice && (
        <NoticeModal onClick={(e) => e.target === e.currentTarget && handleCloseModal()}>
          <NoticeModalContainer>
            <ModalHeader>
              <ModalTitle>{selectedNotice.title}</ModalTitle>
              <ModalClose onClick={handleCloseModal}>×</ModalClose>
            </ModalHeader>
            <ModalMeta>
              <div>
                <NoticeType type={selectedNotice.type}>{selectedNotice.type}</NoticeType>
              </div>
              <NoticeDate>{formatDate(selectedNotice.date)}</NoticeDate>
            </ModalMeta>
            <ModalContent>{selectedNotice.content}</ModalContent>
          </NoticeModalContainer>
        </NoticeModal>
      )}
    </NoticePage>
  );
};

export default Notice;