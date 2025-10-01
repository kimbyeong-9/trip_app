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
import {
  magazineCards,
  tourismCards,
  chatRooms,
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
        chatRooms={chatRooms}
        onCardClick={handleCardClick}
      />

      {/* 여행 일정 섹션 */}
      <ItinerarySection
        selectedRegion={selectedRegion}
        onCardClick={handleCardClick}
      />

      {/* 여행 매거진 섹션 */}
      <MagazineSection
        magazineCards={magazineCards}
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

      {/* 플로팅 메뉴 버튼들 */}
      <FloatingButtons onClick={(e) => e.stopPropagation()}>
        <MenuButton
          className={isFloatingMenuOpen ? 'active' : ''}
          onClick={toggleFloatingMenu}
        >
          <CompanionIcon>
            {isFloatingMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </CompanionIcon>
          <CompanionText className="menu-text">메뉴</CompanionText>
        </MenuButton>

        <SubMenuContainer $isOpen={isFloatingMenuOpen}>
          <SubMenuButton
            color="#667eea"
            onClick={() => handleFloatingSubMenuClick('/community')}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 17v2H2v-2s0-4 7-4 7 4 7 4zm-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5zm3.44 11.5A5.5 5.5 0 0 1 22 13.5a5.5 5.5 0 0 1-5.06-7.5 3.5 3.5 0 1 0-1 7z"/>
            </svg>
            커뮤니티
          </SubMenuButton>

          <SubMenuButton
            color="#ff9800"
            onClick={() => handleFloatingSubMenuClick('/gallery-shop')}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            갤러리샵
          </SubMenuButton>

          <SubMenuButton
            color="#4caf50"
            onClick={() => handleFloatingSubMenuClick('/notice')}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            공지사항
          </SubMenuButton>
        </SubMenuContainer>

        <CompanionButton onClick={() => handleCardClick('/companion-list')}>
          <CompanionIcon>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4C18.2091 4 20 5.79086 20 8C20 10.2091 18.2091 12 16 12C13.7909 12 12 10.2091 12 8C12 5.79086 13.7909 4 16 4Z" fill="white"/>
              <path d="M8 6C9.65685 6 11 7.34315 11 9C11 10.6569 9.65685 12 8 12C6.34315 12 5 10.6569 5 9C5 7.34315 6.34315 6 8 6Z" fill="white"/>
              <path d="M8 14C11.866 14 15 17.134 15 21H1C1 17.134 4.134 14 8 14Z" fill="white"/>
              <path d="M16.5 14C19.538 14 22 16.462 22 19.5V21H16V19.5C16 17.567 15.433 15.783 14.461 14.301C15.099 14.108 15.787 14 16.5 14Z" fill="white"/>
            </svg>
          </CompanionIcon>
          <CompanionText>동행{"\n"}모집</CompanionText>
        </CompanionButton>
      </FloatingButtons>

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

const FloatingButtons = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;

  @media (max-width: 1024px) {
    bottom: 110px;
  }
`;

const CompanionButton = styled.button`
  background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
  color: white;
  border: none;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(255, 152, 0, 0.4);
  font-size: 12px;
  font-weight: 600;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(255, 152, 0, 0.6);
  }
`;

const CompanionIcon = styled.div`
  margin-bottom: 4px;
`;

const CompanionText = styled.span`
  white-space: pre-line;
  text-align: center;
  line-height: 1.2;
`;

const MenuButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  font-size: 12px;
  font-weight: 600;
  position: relative;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
  }

  &.active {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
  }

  &.active .menu-text {
    display: none;
  }

  &.active ${CompanionIcon} {
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const SubMenuContainer = styled.div`
  position: absolute;
  bottom: 200px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transform: ${props => props.$isOpen ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.8)'};
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  align-items: center;
`;

const SubMenuButton = styled.button`
  background: white;
  border: 2px solid ${props => props.color || '#667eea'};
  color: ${props => props.color || '#667eea'};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-size: 8px;
  font-weight: 600;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;

  &:hover {
    background: ${props => props.color || '#667eea'};
    color: white;
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  svg {
    width: 18px;
    height: 18px;
    margin-bottom: 1px;
    flex-shrink: 0;
  }
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
