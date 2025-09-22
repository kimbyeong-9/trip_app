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

const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showServiceModal, setShowServiceModal] = useState(false);

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
      />
      
      {/* 함께 동행해요 섹션 */}
      <CompanionSection 
        companionCards={companionCards}
        searchTerm={searchTerm}
        selectedRegion={selectedRegion}
      />

      {/* 여행 일정 섹션 */}
      <ItinerarySection 
        itineraryCards={itineraryCards}
        searchTerm={searchTerm}
        selectedRegion={selectedRegion}
      />

      {/* 여행 매거진 섹션 */}
      <MagazineSection 
        magazineCards={magazineCards}
        searchTerm={searchTerm}
        selectedRegion={selectedRegion}
      />

      {/* 관광공사 추천여행지 섹션 */}
      <TourismSection 
        tourismCards={tourismCards}
      />

      {/* 동행모집 채팅방 섹션 */}
      <ChatRoomsSection 
        chatRooms={chatRooms}
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
    </HomePage>
  );
};

export default Home;
