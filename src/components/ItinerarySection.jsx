import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const ItinerarySection = ({ itineraryCards, selectedRegion, onCardClick }) => {
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
  const filteredItineraryCards = filterCards(itineraryCards, selectedRegion);

  return (
    <ItinerarySectionContainer>
      <SectionHeader>
        <h2>여행 일정</h2>
        <ViewAllButton onClick={() => navigate('/travel-schedules')}>전체보기</ViewAllButton>
      </SectionHeader>

      <ItineraryCards>
        {filteredItineraryCards.length > 0 ? (
          filteredItineraryCards.map((card) => (
            <ItineraryCard key={card.id} onClick={() => onCardClick(`/travel-schedule/${card.id}`)}>
              <CardImage src={card.image} alt={card.title} />
              <LocationBadge>{card.region}</LocationBadge>
              <CardContent>
                <CardTitle>{card.title}</CardTitle>
                <AuthorInfo>
                  <AuthorAvatar>
                    {card.author && typeof card.author === 'object' && card.author.profileImage ? (
                      <img src={card.author.profileImage} alt={typeof card.author === 'object' ? card.author.name : card.author} />
                    ) : (
                      typeof card.author === 'object'
                        ? (card.author.name ? card.author.name.charAt(0) : 'U')
                        : (card.author ? card.author.charAt(0) : 'U')
                    )}
                  </AuthorAvatar>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '2px' }}>작성자</div>
                    <AuthorName>
                      {card.author
                        ? (typeof card.author === 'object' ? card.author.name : card.author)
                        : '익명'
                      }
                    </AuthorName>
                  </div>
                </AuthorInfo>
                <ViewsLikes>
                  <ViewsLikesItem>
                    <EyeIcon />
                    <Count>{card.views || 0}</Count>
                  </ViewsLikesItem>
                  <ViewsLikesItem>
                    <HeartIconSmall />
                    <Count>{card.likes || 0}</Count>
                  </ViewsLikesItem>
                </ViewsLikes>
                <DateMeta>{card.date}</DateMeta>
              </CardContent>
            </ItineraryCard>
          ))
        ) : (
          <NoResultsMessage>
            <NoResultsIcon>🔍</NoResultsIcon>
            <NoResultsTitle>검색된 내용이 없습니다</NoResultsTitle>
            <NoResultsText>다른 키워드로 검색해보세요</NoResultsText>
          </NoResultsMessage>
        )}
      </ItineraryCards>
    </ItinerarySectionContainer>
  );
};




// Styled Components
const ItinerarySectionContainer = styled.div`
  padding: 10px 20px 30px 20px;
  background: #f8f9fa;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  h2 {
    font-size: 32px;
    font-weight: 700;
    color: #2c3e50;
    margin: 0;
    background: linear-gradient(135deg, #2196f3 0%, #21cbf3 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const ViewAllButton = styled.button`
  background: linear-gradient(135deg, #2196f3 0%, #21cbf3 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(33, 150, 243, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(33, 150, 243, 0.6);
  }
`;

const ItineraryCards = styled.div`
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

const ItineraryCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  min-width: 300px;
  max-width: 300px;
  width: 300px;
  height: 420px;
  display: flex;
  flex-direction: column;
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
  background: rgba(33, 150, 243, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(10px);
`;

const CardContent = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
  line-height: 1.4;
  height: 50px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const AuthorAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: none;
  }
`;

const AuthorName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  flex: 1;
`;

const Date = styled.span`
  font-weight: 500;
`;

const DateMeta = styled.div`
  font-size: 14px;
  color: #6c757d;
  font-weight: 500;
  margin-top: 4px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ViewsLikes = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 6px;
`;

const ViewsLikesItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const EyeIcon = styled.span`
  font-size: 14px;
  color: #6c757d;
  font-weight: 500;
  position: relative;
  display: inline-block;
  width: 16px;
  height: 10px;
  background: white;
  border: 1px solid #6c757d;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background: #6c757d;
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4px;
    height: 4px;
    background: white;
    border-radius: 50%;
  }
`;

const HeartIconSmall = styled.span`
  font-size: 14px;
  color: #e74c3c;
  transition: all 0.3s ease;

  &::before {
    content: '♥';
  }
`;

const Count = styled.span`
  font-size: 13px;
  color: #6c757d;
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


export default ItinerarySection;
