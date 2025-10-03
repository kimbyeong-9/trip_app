import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import { supabase } from '../supabaseClient';



const CompanionDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [companion, setCompanion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUserPost, setIsUserPost] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  // Supabase에서 데이터 가져오기
  useEffect(() => {
    const fetchCompanion = async () => {
      try {
        setLoading(true);

        // 현재 로그인한 사용자 정보 가져오기
        const getLoginData = () => {
          const localData = localStorage.getItem('loginData');
          const sessionData = sessionStorage.getItem('loginData');
          return localData ? JSON.parse(localData) : (sessionData ? JSON.parse(sessionData) : null);
        };

        const loginData = getLoginData();
        const currentUserId = loginData?.user?.id; // 현재 로그인한 유저 ID

        // Supabase에서 찾기
        const { data, error } = await supabase
          .from('CompanionList')
          .select('*')
          .eq('id', parseInt(id))
          .single();

        if (error) {
          console.error('Error fetching companion:', error);
          setCompanion(null);
        } else {
          setCompanion(data);

          // 작성자 user_id와 현재 로그인한 user_id 비교
          const authorUserId = data.author?.user_id;
          const isMyPost = currentUserId && authorUserId && currentUserId === authorUserId;
          setIsUserPost(isMyPost);
        }
      } catch (err) {
        console.error('Error:', err);
        setCompanion(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanion();
  }, [id]);

  // 작성자 프로필 클릭 핸들러
  const handleAuthorClick = () => {
    if (isUserPost) {
      // 내가 작성한 게시물인 경우 마이페이지로 이동
      navigate('/profile/user');
    } else {
      // 다른 사용자 게시물인 경우 해당 사용자 프로필로 이동
      navigate(`/profile/${companion.author?.name || companion.author}`);
    }
  };

  // 동행모집 삭제 핸들러
  const handleDelete = async () => {
    if (window.confirm('정말로 이 동행모집을 삭제하시겠습니까?')) {
      try {
        // Supabase에서 삭제
        const { error } = await supabase
          .from('CompanionList')
          .delete()
          .eq('id', parseInt(id));

        if (error) {
          throw error;
        }

        alert('동행모집이 성공적으로 삭제되었습니다.');
        navigate('/companion-list'); // 동행모집 리스트 페이지로 이동
      } catch (error) {
        console.error('동행모집 삭제 실패:', error);
        alert('삭제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  if (loading) {
    return (
      <CompanionDetailPage>
        <Navigation />
        <LoadingMessage>
          <LoadingSpinner />
          <LoadingText>동행 정보를 불러오는 중...</LoadingText>
        </LoadingMessage>
      </CompanionDetailPage>
    );
  }

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
          <ImageSliderContainer>
            {(() => {
              const images = companion.images && companion.images.length > 0
                ? companion.images
                : [companion.image];

              return (
                <>
                  <DetailImage src={images[currentImageIndex]} alt={companion.title} />
                  <LocationBadge>{companion.region}</LocationBadge>

                  {images.length > 1 && (
                    <>
                      <SliderButton
                        $position="left"
                        onClick={() => setCurrentImageIndex((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1
                        )}
                      >
                        ‹
                      </SliderButton>
                      <SliderButton
                        $position="right"
                        onClick={() => setCurrentImageIndex((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1
                        )}
                      >
                        ›
                      </SliderButton>
                      <ImageIndicator>
                        {images.map((_, index) => (
                          <Dot
                            key={index}
                            $active={index === currentImageIndex}
                            onClick={() => setCurrentImageIndex(index)}
                          />
                        ))}
                      </ImageIndicator>
                      <ImageCounter>
                        {currentImageIndex + 1} / {images.length}
                      </ImageCounter>
                    </>
                  )}
                </>
              );
            })()}
          </ImageSliderContainer>

          <DetailInfo>
            <TitleSection>
              <Title>{companion.title}</Title>
              <MetaInfo>
                <AgeGroup>{companion.ageGroup || companion.agegroup}</AgeGroup>
                <Date>{companion.date}</Date>
              </MetaInfo>
            </TitleSection>

            <AuthorSection onClick={handleAuthorClick}>
              <AuthorAvatar
                src={companion.author?.profileImage || companion.authorImage}
                alt={companion.author?.name || companion.author}
              />
              <AuthorInfo>
                <AuthorName>{companion.author?.name || companion.author}</AuthorName>
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
                <DetailValue>{companion.estimatedcost || companion.estimatedCost || companion.budget || '협의 후 결정'}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>모임 장소</DetailLabel>
                <DetailValue>{companion.meetingpoint || companion.meetingPoint || '추후 공지'}</DetailValue>
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
              {isUserPost ? (
                // 내가 작성한 게시물인 경우 삭제 버튼만 표시
                <DeleteButton onClick={handleDelete}>
                  동행모집 삭제
                </DeleteButton>
              ) : (
                // 다른 사용자의 게시물인 경우 참여하기/문의하기 버튼 표시
                <>
                  <JoinButton disabled={companion.participants.current >= companion.participants.max}>
                    {companion.participants.current >= companion.participants.max ? '모집마감' : '참여하기'}
                  </JoinButton>
                  <ContactButton>문의하기</ContactButton>
                </>
              )}
            </ActionButtons>
          </DetailInfo>
        </CompanionDetailContent>
      </CompanionDetailContainer>
    </CompanionDetailPage>
  );
};



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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  margin-right: 15px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }
`;

const CompanionDetailContent = styled.div`
  display: grid;
  gap: 30px;
`;

const ImageSliderContainer = styled.div`
  position: relative;
  width: 760px;
  max-width: calc(100vw - 40px);
  height: 400px;
  margin: 0 auto 20px auto;
  overflow: hidden;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;

  @media (max-width: 1024px) {
    width: 700px;
    height: 380px;
  }

  @media (max-width: 767px) {
    width: 450px;
    height: 300px;
  }

  @media (max-width: 479px) {
    width: calc(100vw - 40px);
    height: 250px;
  }
`;

const DetailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: opacity 0.3s ease;
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.$position === 'left' ? 'left: 15px;' : 'right: 15px;'}
  background: rgba(255, 255, 255, 0.1);
  width: 45px;
  height: 45px;
  border-radius: 50%;
  font-size: 26px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 2;


  &:hover {
    transform: translateY(-50%) scale(1.15);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

const ImageIndicator = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid white;
  background: ${props => props.$active ? 'white' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    transform: scale(1.2);
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  z-index: 2;
`;

const LocationBadge = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  z-index: 2;
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

const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;

  &:hover {
    background: #c82333;
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

const LoadingMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  min-height: 400px;
  width: 100%;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 16px;
  color: #6c757d;
`;



export default CompanionDetail;