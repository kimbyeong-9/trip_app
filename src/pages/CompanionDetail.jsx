import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';

// Styled Components - 기존 CSS와 동일한 스타일
const CompanionDetailPage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
`;

const CompanionDetailContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e9ecef;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6c757d;
  cursor: pointer;
  margin-right: 15px;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #333;
  }
`;

const CompanionDetailContent = styled.div`
  display: grid;
  gap: 30px;
`;

const DetailImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const LocationBadge = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const DetailInfo = styled.div`
  margin-bottom: 20px;
`;

const TitleSection = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 10px 0;
  line-height: 1.3;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
`;

const AgeGroup = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
`;

const Date = styled.span`
  background: #f3e5f5;
  color: #7b1fa2;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background: #e9ecef;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const AuthorAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e9ecef;
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 5px 0;
`;

const AuthorRole = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
`;

const ProfileArrow = styled.div`
  font-size: 20px;
  color: #6c757d;
  transition: all 0.3s ease;
`;

const DescriptionSection = styled.div`
  margin-bottom: 30px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #495057;
  margin: 0;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const DetailItem = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #667eea;
`;

const DetailLabel = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #6c757d;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DetailValue = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
`;

const InterestsSection = styled.div`
  margin-bottom: 30px;
`;

const InterestTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;

const InterestTag = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
`;

const JoinButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  flex: 1;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactButton = styled.button`
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;

  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
`;

const NotFoundTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 15px 0;
`;

const NotFoundMessage = styled.p`
  font-size: 16px;
  margin: 0 0 30px 0;
`;

const NotFoundButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
`;

const CompanionDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // 홈페이지의 동행 카드 데이터와 완전히 매칭
  const companionData = {
    1: {
      id: 1,
      title: "제주여행 갈사람~ ✈️",
      region: "제주",
      ageGroup: "20대",
      date: "2025-10-11~2025-10-14",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      description: "제주도의 아름다운 풍경을 함께 즐기고 싶어요! 한라산 등반, 성산일출봉, 카페 투어까지 다 같이 즐겨봐요. 편안하고 즐거운 여행을 원하시는 분들 환영합니다!",
      author: "제주러버",
      authorImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
      participants: { current: 2, max: 4 },
      budget: "150,000원",
      meetingPoint: "제주공항",
      interests: ["자연", "카페", "등산", "사진"]
    },
    2: {
      id: 2,
      title: "서해안 드라이브 🚗",
      region: "충남",
      ageGroup: "30대",
      date: "2025-10-15~2025-10-16",
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop",
      description: "서해안의 멋진 일몰과 신선한 해산물을 맛보며 드라이브하는 여행입니다. 차량이 있으신 분들이면 더욱 좋고, 없으셔도 같이 타고 갈 수 있어요!",
      author: "드라이브매니아",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      participants: { current: 1, max: 3 },
      budget: "80,000원",
      meetingPoint: "서울역",
      interests: ["드라이브", "해산물", "일몰", "휴식"]
    },
    3: {
      id: 3,
      title: "강원도 캠핑 ⛺",
      region: "강원",
      ageGroup: "20대",
      date: "2025-10-20~2025-10-22",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      description: "강원도의 맑은 공기와 자연 속에서 캠핑을 즐겨봐요! 바비큐, 숯불구이, 그리고 밤하늘의 별까지. 캠핑 초보자도 환영합니다.",
      author: "캠핑러버",
      authorImage: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=40&h=40&fit=crop&crop=face",
      participants: { current: 3, max: 6 },
      budget: "120,000원",
      meetingPoint: "춘천역",
      interests: ["캠핑", "바비큐", "자연", "별보기"]
    },
    4: {
      id: 4,
      title: "부산 바다여행 🌊",
      region: "부산",
      ageGroup: "30대",
      date: "2025-10-25~2025-10-27",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      description: "부산의 아름다운 해변과 신선한 회를 맛보며 힐링하는 여행입니다. 해운대, 광안리 해변 투어와 함께 부산의 맛집도 탐방해요!",
      author: "부산탐험가",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      participants: { current: 1, max: 4 },
      budget: "200,000원",
      meetingPoint: "부산역",
      interests: ["해변", "회", "힐링", "맛집"]
    },
    5: {
      id: 5,
      title: "서울 맛집 투어 🍜",
      region: "서울",
      ageGroup: "20대",
      date: "2025-11-01~2025-11-02",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
      description: "서울의 숨은 맛집들을 찾아 떠나는 맛집 투어입니다. 전통 음식부터 트렌디한 카페까지, 맛있는 여행을 함께해요!",
      author: "맛집헌터",
      authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      participants: { current: 4, max: 6 },
      budget: "80,000원",
      meetingPoint: "명동역",
      interests: ["맛집", "카페", "전통음식", "사진"]
    },
    6: {
      id: 6,
      title: "경주 역사 여행 🏛️",
      region: "경상",
      ageGroup: "30대",
      date: "2025-11-05~2025-11-07",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      description: "신라 천년의 역사가 살아있는 경주를 탐방하는 여행입니다. 불국사, 석굴암, 첨성대 등 역사 유적지를 함께 둘러봐요!",
      author: "역사탐방가",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      participants: { current: 2, max: 4 },
      budget: "120,000원",
      meetingPoint: "경주역",
      interests: ["역사", "문화유산", "불국사", "석굴암"]
    }
  };

  const companion = companionData[id];

  if (!companion) {
    return (
      <CompanionDetailPage>
        <Navigation />
        <NotFound>
          <NotFoundTitle>동행 모집글을 찾을 수 없습니다.</NotFoundTitle>
          <NotFoundMessage>요청하신 동행 모집글이 존재하지 않습니다.</NotFoundMessage>
          <NotFoundButton onClick={() => navigate('/')}>홈으로 돌아가기</NotFoundButton>
        </NotFound>
      </CompanionDetailPage>
    );
  }

  return (
    <CompanionDetailPage>
      <Navigation />
      
      <CompanionDetailContainer>
        <DetailHeader>
          <BackButton onClick={() => navigate(-1)}>
            ← 뒤로가기
          </BackButton>
        </DetailHeader>

        <CompanionDetailContent>
          <div>
            <DetailImage src={companion.image} alt={companion.title} />
            <LocationBadge>{companion.region}</LocationBadge>
          </div>

          <DetailInfo>
            <TitleSection>
              <Title>{companion.title}</Title>
              <MetaInfo>
                <AgeGroup>{companion.ageGroup}</AgeGroup>
                <Date>{companion.date}</Date>
              </MetaInfo>
            </TitleSection>

            <AuthorSection onClick={() => navigate(`/profile/${companion.author}`)}>
              <AuthorAvatar src={companion.authorImage} alt={companion.author} />
              <AuthorInfo>
                <AuthorName>{companion.author}</AuthorName>
                <AuthorRole>모집자</AuthorRole>
              </AuthorInfo>
              <ProfileArrow>→</ProfileArrow>
            </AuthorSection>

            <DescriptionSection>
              <h3>여행 소개</h3>
              <Description>{companion.description}</Description>
            </DescriptionSection>

            <DetailsGrid>
              <DetailItem>
                <DetailLabel>예산</DetailLabel>
                <DetailValue>{companion.budget}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>모임 장소</DetailLabel>
                <DetailValue>{companion.meetingPoint}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>참여 인원</DetailLabel>
                <DetailValue>{companion.participants.current}/{companion.participants.max}명</DetailValue>
              </DetailItem>
            </DetailsGrid>

            <InterestsSection>
              <h3>관심사</h3>
              <InterestTags>
                {companion.interests.map((interest, index) => (
                  <InterestTag key={index}>{interest}</InterestTag>
                ))}
              </InterestTags>
            </InterestsSection>

            <ActionButtons>
              <JoinButton>참여하기</JoinButton>
              <ContactButton>문의하기</ContactButton>
            </ActionButtons>
          </DetailInfo>
        </CompanionDetailContent>
      </CompanionDetailContainer>
    </CompanionDetailPage>
  );
};

export default CompanionDetail;