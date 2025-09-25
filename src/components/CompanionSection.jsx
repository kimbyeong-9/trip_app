import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const CompanionSectionContainer = styled.div`
  padding: 10px 20px;
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
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const ViewAllButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }
`;

const CompanionCards = styled.div`
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

const CompanionCard = styled.div`
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
  background: rgba(102, 126, 234, 0.9);
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

const AgeGroup = styled.span`
  background: #f8f9fa;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
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

const CompanionSection = ({ companionCards, selectedRegion, onCardClick }) => {
  const navigate = useNavigate();

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
  const filteredCompanionCards = filterCards(companionCards, selectedRegion);

  return (
    <CompanionSectionContainer>
      <SectionHeader>
        <h2>함께 동행해요</h2>
        <ViewAllButton onClick={() => navigate('/companion-list')}>전체보기</ViewAllButton>
      </SectionHeader>

      <CompanionCards>
        {filteredCompanionCards.length > 0 ? (
          filteredCompanionCards.map((card) => (
            <CompanionCard key={card.id} onClick={() => onCardClick(`/companion/${card.id}`)}>
              <CardImage src={card.image} alt={card.title} />
              <LocationBadge>{card.region}</LocationBadge>
              <CardContent>
                <CardTitle>{card.title}</CardTitle>
                <CardMeta>
                  <AgeGroup>{card.ageGroup}</AgeGroup>
                  <Date>{card.date}</Date>
                </CardMeta>
              </CardContent>
            </CompanionCard>
          ))
        ) : (
          <NoResultsMessage>
            <NoResultsIcon>🔍</NoResultsIcon>
            <NoResultsTitle>검색된 내용이 없습니다</NoResultsTitle>
            <NoResultsText>다른 키워드로 검색해보세요</NoResultsText>
          </NoResultsMessage>
        )}
      </CompanionCards>
    </CompanionSectionContainer>
  );
};

export default CompanionSection;
