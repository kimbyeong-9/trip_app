import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import { fullCompanionPosts, regions, ageGroups, fillMissingData } from '../data/mockData';

// Styled Components - 기존 CSS와 동일한 스타일
const CompanionListPage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
`;

const CompanionListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e9ecef;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CreateButton = styled.button`
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }
`;

const FilterSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
`;

const FilterTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 20px 0;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #495057;
`;

const FilterTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const FilterTag = styled.button`
  padding: 6px 12px;
  border: 2px solid ${props => props.active ? '#667eea' : '#e9ecef'};
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#495057'};
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    border-color: #667eea;
    background: ${props => props.active ? '#5a6fd8' : '#f8f9fa'};
  }
`;

const SearchInput = styled.input`
  padding: 10px 12px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  color: #495057;
  background: white;
  transition: all 0.3s ease;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #6c757d;
  }
`;

const PostsSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 120px 80px 80px 120px 90px 70px;
  gap: 15px;
  padding: 15px 20px;
  background: #f8f9fa;
  border-radius: 8px;
  font-weight: 600;
  color: #495057;
  font-size: 14px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 120px 80px 80px 120px 90px 70px;
  gap: 15px;
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #f8f9fa;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileCard = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #e9ecef;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    }
  }
`;

const MobileCardHeader = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
`;

const MobileCardImage = styled.img`
  width: 80px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`;

const MobileCardInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const MobileCardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  line-height: 1.3;
`;

const MobileCardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const MobileCardTag = styled.span`
  background: ${props => {
    switch(props.type) {
      case 'age': return '#e3f2fd';
      case 'region': return '#f3e5f5';
      case 'date': return '#e8f5e8';
      case 'participants': return '#fff3e0';
      case 'status': return props.isRecruiting ? '#e8f5e8' : '#ffebee';
      default: return '#f8f9fa';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'age': return '#1976d2';
      case 'region': return '#7b1fa2';
      case 'date': return '#2e7d32';
      case 'participants': return '#f57c00';
      case 'status': return props.isRecruiting ? '#2e7d32' : '#c62828';
      default: return '#495057';
    }
  }};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
`;

const ImageCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

const RepresentativeImage = styled.img`
  width: 100%;
  height: 38px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 20px;
  }

  @media (max-width: 480px) {
    height: 15px;
  }

  @media (max-width: 360px) {
    height: 16px;
  }
`;

const TitleCell = styled.div`
  font-weight: 600;
  color: #2c3e50;
  font-size: 16px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const MetaCell = styled.div`
  font-size: 14px;
  color: #6c757d;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const AgeGroupCell = styled.div`
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 3px 6px;
  }
`;

const DateCell = styled.div`
  background: #f3e5f5;
  color: #7b1fa2;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 3px 6px;
  }
`;

const ParticipantsCell = styled.div`
  background: #e8f5e8;
  color: #2e7d32;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 3px 6px;
  }
`;

const StatusCell = styled.div`
  background: ${props => props.isRecruiting ? '#e8f5e8' : '#ffebee'};
  color: ${props => props.isRecruiting ? '#2e7d32' : '#c62828'};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 3px 6px;
  }
`;

const AuthorCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AuthorImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e9ecef;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const AuthorName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.2;
`;

const AuthorMeta = styled.span`
  font-size: 11px;
  color: #6c757d;
  line-height: 1.2;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #e9ecef;
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#495057'};
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#5a6fd8' : '#f8f9fa'};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoginModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px 30px 30px 30px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h3`
  font-size: 24px;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const ModalMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 25px 0;
  line-height: 1.5;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const ModalButton = styled.button`
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  ${props => props.primary ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
    }
  ` : `
    background: white;
    color: #6c757d;
    border: 2px solid #e9ecef;

    &:hover {
      background: #f8f9fa;
      color: #495057;
    }
  `}
`;

const NoResults = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
`;

const NoResultsIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const NoResultsTitle = styled.h3`
  font-size: 24px;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const NoResultsText = styled.p`
  font-size: 16px;
  margin: 0;
`;

const CompanionList = () => {
  const navigate = useNavigate();
  const [selectedAge, setSelectedAge] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const postsPerPage = 10;

  // 로그인 상태 확인
  const getLoginData = () => {
    const localData = localStorage.getItem('loginData');
    const sessionData = sessionStorage.getItem('loginData');
    return localData ? JSON.parse(localData) : (sessionData ? JSON.parse(sessionData) : null);
  };
  
  const loginData = getLoginData();
  const isLoggedIn = loginData && loginData.isLoggedIn;
  
  const handleCreateCompanion = () => {
    if (isLoggedIn) {
      navigate('/companion/create');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginClick = () => {
    setShowLoginModal(false);
    navigate('/login');
  };

  // 소개글 50자 제한 유틸리티
  const truncateDescription = (text, max = 50) => {
    if (!text) return '';
    const trimmed = text.trim();
    return trimmed.length > max ? trimmed.slice(0, max) + '…' : trimmed;
  };

  // localStorage에서 사용자가 등록한 게시물 불러오기
  const getUserPosts = () => {
    try {
      return JSON.parse(localStorage.getItem('companionPosts')) || [];
    } catch {
      return [];
    }
  };

  // mockData에서 가져온 기본 데이터를 사용
  const completedDefaultPosts = fullCompanionPosts.map(fillMissingData);

  // 완성된 기본 게시물을 localStorage에 저장 (CompanionDetail에서 사용하기 위해)
  React.useEffect(() => {
    localStorage.setItem('companionDefaultPosts', JSON.stringify(completedDefaultPosts));
  }, []);

  // 사용자 게시물과 완성된 기본 게시물 결합
  const userPosts = getUserPosts();
  const companionPosts = [...userPosts, ...completedDefaultPosts];

  // 필터링된 포스트 계산
  const filteredPosts = companionPosts.filter(post => {
    const matchesAge = selectedAge === 'all' || post.ageGroup === selectedAge;
    const matchesRegion = selectedRegion === 'all' || post.region === selectedRegion;
    const matchesMonth = selectedMonth === 'all' || post.date.includes(selectedMonth);
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.region.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesAge && matchesRegion && matchesMonth && matchesSearch;
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <CompanionListPage>
      <Navigation />
      
      <CompanionListContainer>
        <PageHeader>
          <PageTitle>동행모집</PageTitle>
          <CreateButton onClick={handleCreateCompanion}>
            동행모집 등록
          </CreateButton>
        </PageHeader>

        <FilterSection>
          <FilterTitle>필터</FilterTitle>

          {/* 검색창을 최상단으로 */}
          <FilterGroup style={{ marginBottom: '20px' }}>
            <FilterLabel>검색</FilterLabel>
            <SearchInput
              type="text"
              placeholder="제목, 지역, 내용으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FilterGroup>

          {/* 키워드들을 가로로 나열 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <FilterGroup>
              <FilterLabel>나이대</FilterLabel>
              <FilterTags>
                {['all', ...ageGroups].map(age => (
                  <FilterTag
                    key={age}
                    active={selectedAge === age}
                    onClick={() => setSelectedAge(age)}
                  >
                    {age === 'all' ? '전체' : age}
                  </FilterTag>
                ))}
              </FilterTags>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>지역</FilterLabel>
              <FilterTags>
                {['all', ...regions].map(region => (
                  <FilterTag
                    key={region}
                    active={selectedRegion === region}
                    onClick={() => setSelectedRegion(region)}
                  >
                    {region === 'all' ? '전체' : region}
                  </FilterTag>
                ))}
              </FilterTags>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>여행일</FilterLabel>
              <FilterTags>
                {[
                  { value: 'all', label: '전체' },
                  { value: '2024-01', label: '1월' },
                  { value: '2024-02', label: '2월' },
                  { value: '2024-03', label: '3월' },
                  { value: '2024-04', label: '4월' },
                  { value: '2024-05', label: '5월' },
                  { value: '2024-06', label: '6월' },
                  { value: '2024-07', label: '7월' },
                  { value: '2024-08', label: '8월' },
                  { value: '2024-09', label: '9월' },
                  { value: '2024-10', label: '10월' },
                  { value: '2024-11', label: '11월' },
                  { value: '2024-12', label: '12월' }
                ].map(month => (
                  <FilterTag
                    key={month.value}
                    active={selectedMonth === month.value}
                    onClick={() => setSelectedMonth(month.value)}
                  >
                    {month.label}
                  </FilterTag>
                ))}
              </FilterTags>
            </FilterGroup>
          </div>
        </FilterSection>

        <PostsSection>
          <TableHeader>
            <div>사진</div>
            <div>제목</div>
            <div>작성자</div>
            <div>나이</div>
            <div>지역</div>
            <div>기간</div>
            <div>인원수</div>
            <div>모집여부</div>
          </TableHeader>

          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <Fragment key={post.id}>
                {/* 데스크톱 테이블 뷰 */}
                <TableRow onClick={() => navigate(`/companion/${post.id}`)}>
                  <ImageCell>
                    <RepresentativeImage src={post.image} alt={post.title} />
                  </ImageCell>
                  <TitleCell>
                    {post.title}
                  </TitleCell>
                  <AuthorCell>
                    {post.author && (
                      <>
                        <AuthorImage src={post.author.profileImage} alt={post.author.name} />
                        <AuthorInfo>
                          <AuthorName>{post.author.name}</AuthorName>
                          <AuthorMeta>{post.author.age}세 · {post.author.location}</AuthorMeta>
                        </AuthorInfo>
                      </>
                    )}
                  </AuthorCell>
                  <AgeGroupCell>
                    {post.ageGroup}
                  </AgeGroupCell>
                  <MetaCell>
                    {post.region}
                  </MetaCell>
                  <DateCell>
                    {post.date}
                  </DateCell>
                  <ParticipantsCell>
                    {post.participants.current}/{post.participants.max}명
                  </ParticipantsCell>
                  <StatusCell isRecruiting={post.participants.current < post.participants.max}>
                    {post.participants.current < post.participants.max ? '모집중' : '마감'}
                  </StatusCell>
                </TableRow>

                {/* 모바일 카드 뷰 */}
                <MobileCard onClick={() => navigate(`/companion/${post.id}`)}>
                  <MobileCardHeader>
                    <MobileCardImage src={post.image} alt={post.title} />
                    <MobileCardInfo>
                      <MobileCardTitle>{post.title}</MobileCardTitle>
                      {post.author && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                          <AuthorImage src={post.author.profileImage} alt={post.author.name} style={{ width: '30px', height: '30px' }} />
                          <div>
                            <AuthorName style={{ fontSize: '12px' }}>{post.author.name}</AuthorName>
                            <AuthorMeta style={{ fontSize: '10px' }}>{post.author.age}세 · {post.author.location}</AuthorMeta>
                          </div>
                        </div>
                      )}
                    </MobileCardInfo>
                  </MobileCardHeader>
                  <MobileCardMeta>
                    <MobileCardTag type="age">{post.ageGroup}</MobileCardTag>
                    <MobileCardTag type="region">{post.region}</MobileCardTag>
                    <MobileCardTag type="date">{post.date}</MobileCardTag>
                    <MobileCardTag type="participants">
                      {post.participants.current}/{post.participants.max}명
                    </MobileCardTag>
                    <MobileCardTag
                      type="status"
                      isRecruiting={post.participants.current < post.participants.max}
                    >
                      {post.participants.current < post.participants.max ? '모집중' : '마감'}
                    </MobileCardTag>
                  </MobileCardMeta>
                </MobileCard>
              </Fragment>
            ))
          ) : (
            <NoResults>
              <NoResultsIcon>🔍</NoResultsIcon>
              <NoResultsTitle>검색 결과가 없습니다</NoResultsTitle>
              <NoResultsText>다른 검색어나 필터를 시도해보세요</NoResultsText>
            </NoResults>
          )}
        </PostsSection>

        {/* 페이지네이션 */}
        {filteredPosts.length > 0 && (
          <Pagination>
            <PageButton 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              이전
            </PageButton>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <PageButton
                key={page}
                onClick={() => setCurrentPage(page)}
                active={currentPage === page}
              >
                {page}
              </PageButton>
            ))}
            
            <PageButton 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              다음
            </PageButton>
          </Pagination>
        )}
      </CompanionListContainer>

      {/* 로그인 모달 */}
      {showLoginModal && (
        <LoginModal onClick={() => setShowLoginModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalIcon>🔒</ModalIcon>
            <ModalTitle>로그인이 필요합니다</ModalTitle>
            <ModalMessage>동행모집 글을 작성하려면 로그인해주세요.</ModalMessage>
            <ModalButtons>
              <ModalButton primary onClick={handleLoginClick}>로그인</ModalButton>
              <ModalButton onClick={() => setShowLoginModal(false)}>취소</ModalButton>
            </ModalButtons>
          </ModalContent>
        </LoginModal>
      )}
    </CompanionListPage>
  );
};

export default CompanionList;