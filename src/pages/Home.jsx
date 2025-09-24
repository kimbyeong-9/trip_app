import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import RegionCategories from '../components/RegionCategories';
import CompanionSection from '../components/CompanionSection';
import ItinerarySection from '../components/ItinerarySection';
import MagazineSection from '../components/MagazineSection';
import TourismSection from '../components/TourismSection';
import ChatRoomsSection from '../components/ChatRoomsSection';
import HeroSlider from '../components/HeroSlider';
import { 
  companionCards, 
  itineraryCards, 
  magazineCards, 
  tourismCards, 
  chatRooms, 
  heroSlides 
} from '../data/mockData';

// Styled Components
const HomePage = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

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
`;

const ServiceModal = styled.div`
  background: white;
  border-radius: 16px;
  padding: 0;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 480px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalContent = styled.div`
  padding: 40px 30px 30px 30px;
  text-align: center;
`;

const ModalIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h3`
  font-size: 24px;
  color: #2c3e50;
  margin: 0 0 16px 0;
  font-weight: 700;
`;

const ModalMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 30px 0;
  line-height: 1.6;
`;

const ModalConfirmBtn = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 32px;
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

  &:active {
    transform: translateY(0);
  }
`;

const FloatingButtons = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1000;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const FloatingButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  color: white;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 15px 35px rgba(255, 107, 53, 0.6);
  }
`;

const ButtonTooltip = styled.div`
  position: absolute;
  right: 75px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;

  ${FloatingButton}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateY(-50%) translateX(-5px);
  }

  &::after {
    content: '';
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    border: 5px solid transparent;
    border-left-color: rgba(0, 0, 0, 0.8);
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 로그인 상태 체크 함수
  const isLoggedIn = () => {
    const loginData = localStorage.getItem('loginData') || sessionStorage.getItem('loginData');
    return !!loginData;
  };

  // 카드 클릭 핸들러
  const handleCardClick = (navigateTo) => {
    if (!isLoggedIn()) {
      setShowLoginModal(true);
      return;
    }
    navigate(navigateTo);
  };

  // URL 파라미터에서 지역 정보 읽기
  useEffect(() => {
    const regionParam = searchParams.get('region');
    if (regionParam) {
      // 지역명을 ID로 변환
      const regionMapping = {
        '서울': 'seoul',
        '부산': 'busan',
        '제주': 'jeju',
        '경기': 'gyeonggi',
        '강원': 'gangwon',
        '전라': 'jeolla',
        '충청': 'chungcheong',
        '경상': 'gyeongsang',
        '인천': 'incheon'
      };
      const regionId = regionMapping[regionParam];
      if (regionId) {
        setSelectedRegion(regionId);
      }
    }
  }, [searchParams]);

  // 모달 닫기 함수
  const closeServiceModal = () => {
    setShowServiceModal(false);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const goToLogin = () => {
    setShowLoginModal(false);
    navigate('/login');
  };

  return (
    <HomePage>
      <RegionCategories 
        selectedRegion={selectedRegion} 
        onRegionSelect={setSelectedRegion}
      />
      
      {/* 대형 이미지 슬라이더 섹션 */}
      <HeroSlider
        heroSlides={heroSlides}
        showServiceModal={showServiceModal}
        setShowServiceModal={setShowServiceModal}
        onCardClick={handleCardClick}
      />
      
      {/* 함께 동행해요 섹션 */}
      <CompanionSection
        companionCards={companionCards}
        searchTerm={searchTerm}
        selectedRegion={selectedRegion}
        onCardClick={handleCardClick}
      />

      {/* 동행모집 채팅방 섹션 */}
      <ChatRoomsSection
        chatRooms={chatRooms}
        onCardClick={handleCardClick}
      />

      {/* 여행 일정 섹션 */}
      <ItinerarySection
        itineraryCards={itineraryCards}
        searchTerm={searchTerm}
        selectedRegion={selectedRegion}
        onCardClick={handleCardClick}
      />

      {/* 여행 매거진 섹션 */}
      <MagazineSection
        magazineCards={magazineCards}
        searchTerm={searchTerm}
        selectedRegion={selectedRegion}
        onCardClick={handleCardClick}
      />

      {/* 관광공사 추천여행지 섹션 */}
      <TourismSection
        tourismCards={tourismCards}
        onCardClick={handleCardClick}
      />

      {/* 준비중인 서비스 모달 */}
      {showServiceModal && (
        <ModalOverlay>
          <ServiceModal>
            <ModalContent>
              <ModalIcon>🚧</ModalIcon>
              <ModalTitle>준비중인 서비스입니다</ModalTitle>
              <ModalMessage>
                해당 서비스는 현재 준비중입니다.<br />
                조금만 기다려주세요!
              </ModalMessage>
              <ModalConfirmBtn onClick={closeServiceModal}>
                확인
              </ModalConfirmBtn>
            </ModalContent>
          </ServiceModal>
        </ModalOverlay>
      )}

      {/* 로그인 필요 모달 */}
      {showLoginModal && (
        <ModalOverlay>
          <ServiceModal>
            <ModalContent>
              <ModalIcon>🔐</ModalIcon>
              <ModalTitle>로그인이 필요합니다</ModalTitle>
              <ModalMessage>
                로그인 후 이용가능 합니다
              </ModalMessage>
              <ModalConfirmBtn onClick={goToLogin}>
                확인
              </ModalConfirmBtn>
            </ModalContent>
          </ServiceModal>
        </ModalOverlay>
      )}

    </HomePage>
  );
};

export default Home;
