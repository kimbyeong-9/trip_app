import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MagazineDetailModal from './MagazineDetailModal';
import { supabase } from '../supabaseClient';



const MagazineSection = ({ selectedRegion, onCardClick }) => {
  const navigate = useNavigate();
  const [magazineCards, setMagazineCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMagazine, setSelectedMagazine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMagazineCards = async () => {
      try {
        const { data, error } = await supabase
          .from('MagazineSections')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          console.error('Error fetching magazine cards:', error);
        } else {
          setMagazineCards(data || []);
        }
      } catch (error) {
        console.error('Error fetching magazine cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMagazineCards();
  }, []);

  const handleViewAll = () => {
    navigate('/magazines');
  };

  // 로그인 상태 체크 함수
  const isLoggedIn = () => {
    const loginData = localStorage.getItem('loginData') || sessionStorage.getItem('loginData');
    return !!loginData;
  };

  const handleMagazineClick = (magazine) => {
    if (isLoggedIn()) {
      // 로그인된 상태에서는 상세 모달 표시
      setSelectedMagazine(magazine);
      setIsModalOpen(true);
    } else {
      // 로그인되지 않은 상태에서는 로그인 모달 표시
      onCardClick(`/magazine/${magazine.id}`);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMagazine(null);
  };

  // 카드 필터링 함수
  const filterCards = (cards, selectedRegion) => {
    let filtered = cards;
    const regionMapping = {
      'seoul': '서울',
      'busan': '부산',
      'jeju': '제주',
      'gyeonggi': '경기',
      'gangwon': '강원',
      'jeolla': '전라',
      'chungcheong': '충청',
      'gyeongsang': '경상',
      'incheon': '인천'
    };

    if (selectedRegion !== 'all') {
      filtered = filtered.filter(card => card.region === regionMapping[selectedRegion]);
    }

    return filtered;
  };

  // 필터링된 카드들
  const filteredMagazineCards = filterCards(magazineCards, selectedRegion);

  if (loading) {
    return (
      <MagazineSectionContainer>
        <SectionHeader>
          <h2>여행 매거진</h2>
        </SectionHeader>
        <LoadingSpinner>
          <Spinner />
          <LoadingText>매거진 로딩중...</LoadingText>
        </LoadingSpinner>
      </MagazineSectionContainer>
    );
  }

  return (
    <MagazineSectionContainer>
      <SectionHeader>
        <h2>여행 매거진</h2>
        <ViewAllButton onClick={handleViewAll}>전체보기</ViewAllButton>
      </SectionHeader>

      <MagazineCards>
        {filteredMagazineCards.length > 0 ? (
          filteredMagazineCards.map((card) => (
            <MagazineCard key={card.id} onClick={() => handleMagazineClick(card)}>
              <CardImage src={card.image} alt={card.title} />
              <LocationBadge>{card.region}</LocationBadge>
              <CardContent>
                <CardTitle>{card.title}</CardTitle>
                <CardMeta>
                  <Date>{card.date}</Date>
                </CardMeta>
              </CardContent>
            </MagazineCard>
          ))
        ) : (
          <NoResultsMessage>
            <NoResultsIcon>🔍</NoResultsIcon>
            <NoResultsTitle>검색된 내용이 없습니다</NoResultsTitle>
            <NoResultsText>다른 키워드로 검색해보세요</NoResultsText>
          </NoResultsMessage>
        )}
      </MagazineCards>

      {/* 매거진 상세 모달 */}
      {isModalOpen && selectedMagazine && (
        <MagazineDetailModal
          magazine={selectedMagazine}
          onClose={handleCloseModal}
        />
      )}
    </MagazineSectionContainer>
  );
};




const MagazineSectionContainer = styled.div`
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
    background: linear-gradient(135deg, #9c27b0 0%, #e91e63 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const ViewAllButton = styled.button`
  background: linear-gradient(135deg, #9c27b0 0%, #e91e63 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(156, 39, 176, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(156, 39, 176, 0.6);
  }
`;

const MagazineCards = styled.div`
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

const MagazineCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
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

const LocationBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(156, 39, 176, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(10px);
`;

const CardContent = styled.div`
  padding: 20px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 15px 0;
  line-height: 1.4;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #6c757d;
`;

const Date = styled.span`
  font-weight: 500;
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  grid-column: 1 / -1;
`;

const NoResultsIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const NoResultsTitle = styled.h3`
  font-size: 24px;
  color: #6c757d;
  margin: 0 0 10px 0;
`;

const NoResultsText = styled.p`
  font-size: 16px;
  color: #adb5bd;
  margin: 0;
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
  border-top: 4px solid #9c27b0;
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


export default MagazineSection;
