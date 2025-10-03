import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import repairManIcon from '../assets/icons/free-icon-repair-man-4429935.png';
import RegionCategories from '../components/RegionCategories';
import CompanionSection from '../components/CompanionSection';
import ItinerarySection from '../components/ItinerarySection';
import MagazineSection from '../components/MagazineSection';
import TourismSection from '../components/TourismSection';
import ChatRoomsSection from '../components/ChatRoomsSection';
import HeroSlider from '../components/HeroSlider';
import FloatingMenu from '../components/FloatingMenu';
import {
  heroSlides
} from '../data/mockData';


const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  // 로그인 상태 체크 함수
  const isLoggedIn = () => {
    const loginData = localStorage.getItem('loginData') || sessionStorage.getItem('loginData');
    return !!loginData;
  };

  // 카드 클릭 핸들러
  const handleCardClick = (navigateTo) => {
    // 다른 섹션 클릭 시 플로팅 메뉴 닫기
    setIsFloatingMenuOpen(false);

    if (!isLoggedIn()) {
      setShowLoginModal(true);
      return;
    }
    navigate(navigateTo);
  };

  // 플로팅 메뉴 토글
  const toggleFloatingMenu = () => {
    setIsFloatingMenuOpen(!isFloatingMenuOpen);
  };

  // 플로팅 서브메뉴 클릭 핸들러
  const handleFloatingSubMenuClick = (path) => {
    if (!isLoggedIn()) {
      setShowLoginModal(true);
      setIsFloatingMenuOpen(false);
      return;
    }

    if (path === '/gallery-shop') {
      setShowGalleryModal(true);
    } else {
      navigate(path);
    }
    setIsFloatingMenuOpen(false);
  };

  // 갤러리 모달 닫기
  const closeGalleryModal = () => {
    setShowGalleryModal(false);
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
    <HomePage onClick={() => setIsFloatingMenuOpen(false)}>
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
        selectedRegion={selectedRegion}
        onCardClick={handleCardClick}
      />

      {/* 동행모집 채팅방 섹션 */}
      <ChatRoomsSection
        onCardClick={handleCardClick}
      />

      {/* 여행 일정 섹션 */}
      <ItinerarySection
        selectedRegion={selectedRegion}
        onCardClick={handleCardClick}
      />

      {/* 여행 매거진 섹션 */}
      <MagazineSection
        selectedRegion={selectedRegion}
        onCardClick={handleCardClick}
      />

      {/* 관광공사 추천여행지 섹션 */}
      <TourismSection
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

      <FloatingMenu
        isFloatingMenuOpen={isFloatingMenuOpen}
        toggleFloatingMenu={toggleFloatingMenu}
        handleFloatingSubMenuClick={handleFloatingSubMenuClick}
        handleCompanionClick={() => handleCardClick('/companion-list')}
      />

      {/* 갤러리샵 준비중 모달 */}
      {showGalleryModal && (
        <GalleryModalOverlay onClick={(e) => e.target === e.currentTarget && closeGalleryModal()}>
          <GalleryModalContainer>
            <GalleryModalIcon>
              <img src={repairManIcon} alt="작업중" style={{ width: '64px', height: '64px' }} />
            </GalleryModalIcon>
            <GalleryModalTitle>갤러리샵 준비중</GalleryModalTitle>
            <GalleryModalMessage>
              갤러리샵 서비스는 현재 준비중입니다.<br />
              더욱 멋진 서비스로 찾아뵙겠습니다!
            </GalleryModalMessage>
            <GalleryModalButton onClick={closeGalleryModal}>
              확인
            </GalleryModalButton>
          </GalleryModalContainer>
        </GalleryModalOverlay>
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
              <ModalButtons>
                <ModalConfirmBtn onClick={goToLogin}>
                  로그인
                </ModalConfirmBtn>
                <ModalCancelBtn onClick={closeLoginModal}>
                  취소
                </ModalCancelBtn>
              </ModalButtons>
            </ModalContent>
          </ServiceModal>
        </ModalOverlay>
      )}

    </HomePage>
  );
};



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

const ModalCancelBtn = styled.button`
  background: white;
  color: #6c757d;
  border: 2px solid #e9ecef;
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #495057;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const GalleryModalOverlay = styled.div`
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

const GalleryModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px 30px 30px 30px;
  text-align: center;
  max-width: 400px;
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

const GalleryModalIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const GalleryModalTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const GalleryModalMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 30px 0;
  line-height: 1.6;
`;

const GalleryModalButton = styled.button`
  background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 152, 0, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 152, 0, 0.6);
  }
`;


export default Home;
