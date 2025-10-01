import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../supabaseClient';


const TourismSection = ({ onCardClick }) => {
  const navigate = useNavigate();
  const [tourismCards, setTourismCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTourismCards = async () => {
      try {
        const { data, error } = await supabase
          .from('TourismSections')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          console.error('Error fetching tourism cards:', error);
        } else {
          setTourismCards(data || []);
        }
      } catch (error) {
        console.error('Error fetching tourism cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTourismCards();
  }, []);

  // 로그인 상태 체크 함수
  const isLoggedIn = () => {
    const loginData = localStorage.getItem('loginData') || sessionStorage.getItem('loginData');
    return !!loginData;
  };

  const handleCardClick = (card) => {
    if (isLoggedIn()) {
      // 로그인된 상태에서는 준비중 모달 표시
      setShowModal(true);
    } else {
      // 로그인되지 않은 상태에서는 로그인 모달 표시
      onCardClick(`/tourism/${card.id}`);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleViewAll = () => {
    navigate('/tourism-list');
  };

  if (loading) {
    return (
      <TourismSectionContainer>
        <SectionHeader>
          <h2>관광공사 추천여행지</h2>
        </SectionHeader>
        <LoadingSpinner>
          <Spinner />
          <LoadingText>관광지 로딩중...</LoadingText>
        </LoadingSpinner>
      </TourismSectionContainer>
    );
  }

  return (
    <TourismSectionContainer>
      <SectionHeader>
        <h2>관광공사 추천여행지</h2>
        <ViewAllButton onClick={handleViewAll}>
          전체보기
        </ViewAllButton>
      </SectionHeader>
      <TourismCards>
        {tourismCards.map((card) => (
          <TourismCard key={card.id} onClick={() => handleCardClick(card)}>
            <CardImage src={card.image} alt={card.title} />
            <CardContent>
              <PlaceName>{card.title}</PlaceName>
              <Description>{card.description}</Description>
            </CardContent>
          </TourismCard>
        ))}
      </TourismCards>

      {/* 준비중 모달 */}
      {showModal && (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && handleCloseModal()}>
          <ModalContainer>
            <ModalIcon>🚧</ModalIcon>
            <ModalTitle>준비중입니다</ModalTitle>
            <ModalMessage>
              관광공사 추천여행지 상세 정보는<br />
              현재 준비중입니다.<br />
              조금만 기다려주세요!
            </ModalMessage>
            <ModalButton onClick={handleCloseModal}>
              확인
            </ModalButton>
          </ModalContainer>
        </ModalOverlay>
      )}
    </TourismSectionContainer>
  );
};


const TourismSectionContainer = styled.div`
  padding: 60px 20px;
  background: #f8f9fa;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  h2 {
    font-size: 32px;
    font-weight: 700;
    color: #2c3e50;
    margin: 0;
    background: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const ViewAllButton = styled.button`
  background: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(76, 175, 80, 0.6);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 12px;
  }
`;

const TourismCards = styled.div`
  display: flex;
  gap: 30px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto;
  
  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const TourismCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  min-width: 300px;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    min-width: 250px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const PlaceName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 10px 0;
  line-height: 1.4;
`;

const Description = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
  line-height: 1.5;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled.div`
  background: white;
  max-width: 400px;
  width: 100%;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
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

const ModalIcon = styled.div`
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
  background: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(76, 175, 80, 0.6);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4caf50;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0;
`;


export default TourismSection;
