import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import { fullCompanionPosts, fillMissingData } from '../data/mockData';

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

  // localStorage에서 사용자가 등록한 게시물 불러오기
  const getUserPosts = () => {
    try {
      return JSON.parse(localStorage.getItem('companionPosts')) || [];
    } catch {
      return [];
    }
  };

  // mockData에서 가져온 기본 데이터를 사용 (CompanionList와 동일)
  const completedDefaultPosts = fullCompanionPosts.map(fillMissingData);

  // 사용자 게시물과 완성된 기본 게시물 결합 (CompanionList와 동일)
  const userPosts = getUserPosts();
  const allCompanionPosts = [...userPosts, ...completedDefaultPosts];

  // ID를 기준으로 게시물 찾기
  const companion = allCompanionPosts.find(post => post.id.toString() === id);

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

            <AuthorSection onClick={() => navigate(`/profile/${companion.author?.name || companion.author}`)}>
              <AuthorAvatar
                src={companion.author?.profileImage || companion.authorImage}
                alt={companion.author?.name || companion.author}
              />
              <AuthorInfo>
                <AuthorName>{companion.author?.name || companion.author}</AuthorName>
                <AuthorRole>
                  {companion.author?.age && companion.author?.location
                    ? `${companion.author.age}세 · ${companion.author.location}`
                    : '모집자'
                  }
                </AuthorRole>
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
                <DetailValue>{companion.estimatedCost || companion.budget || '협의 후 결정'}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>모임 장소</DetailLabel>
                <DetailValue>{companion.meetingPoint || '추후 공지'}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>참여 인원</DetailLabel>
                <DetailValue>{companion.participants.current}/{companion.participants.max}명</DetailValue>
              </DetailItem>
            </DetailsGrid>

            {(companion.travelStyle && companion.travelStyle.length > 0) && (
              <InterestsSection>
                <h3>여행 스타일</h3>
                <InterestTags>
                  {companion.travelStyle.map((style, index) => (
                    <InterestTag key={index}>{style}</InterestTag>
                  ))}
                </InterestTags>
              </InterestsSection>
            )}

            {(companion.interests && companion.interests.length > 0) && (
              <InterestsSection>
                <h3>관심사</h3>
                <InterestTags>
                  {companion.interests.map((interest, index) => (
                    <InterestTag key={index}>{interest}</InterestTag>
                  ))}
                </InterestTags>
              </InterestsSection>
            )}

            {companion.notice && (
              <DescriptionSection>
                <h3>특별 안내사항</h3>
                <Description>{companion.notice}</Description>
              </DescriptionSection>
            )}

            <ActionButtons>
              <JoinButton disabled={companion.participants.current >= companion.participants.max}>
                {companion.participants.current >= companion.participants.max ? '모집마감' : '참여하기'}
              </JoinButton>
              <ContactButton>문의하기</ContactButton>
            </ActionButtons>
          </DetailInfo>
        </CompanionDetailContent>
      </CompanionDetailContainer>
    </CompanionDetailPage>
  );
};

export default CompanionDetail;