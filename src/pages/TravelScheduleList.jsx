import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import { itineraryCards } from '../data/mockData';

// Styled Components
const TravelScheduleListPage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
`;

const TravelScheduleListContainer = styled.div`
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

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #495057;
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

const SchedulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ScheduleCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #e9ecef;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ScheduleImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ScheduleContent = styled.div`
  padding: 20px;
`;

const ScheduleTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 10px 0;
  line-height: 1.4;
`;

const ScheduleMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
`;

const ScheduleTag = styled.span`
  background: ${props => {
    switch(props.type) {
      case 'region': return '#e3f2fd';
      case 'date': return '#f3e5f5';
      case 'author': return '#e8f5e8';
      default: return '#f8f9fa';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'region': return '#1976d2';
      case 'date': return '#7b1fa2';
      case 'author': return '#2e7d32';
      default: return '#495057';
    }
  }};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
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

const ScheduleStats = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #e9ecef;
`;

const ScheduleStat = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6c757d;

  span:first-child {
    font-size: 14px;
  }
`;

const TravelScheduleList = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [sortBy, setSortBy] = useState('latest'); // 'latest', 'popular'
  const schedulesPerPage = 9;

  // 로그인 상태 확인
  const getLoginData = () => {
    const localData = localStorage.getItem('loginData');
    const sessionData = sessionStorage.getItem('loginData');
    return localData ? JSON.parse(localData) : (sessionData ? JSON.parse(sessionData) : null);
  };

  const loginData = getLoginData();
  const isLoggedIn = loginData && loginData.isLoggedIn;

  // 사용자가 등록한 여행 일정 불러오기
  const getUserSchedules = () => {
    try {
      return JSON.parse(localStorage.getItem('travelSchedules')) || [];
    } catch {
      return [];
    }
  };

  // 모든 여행 일정 결합 (사용자 + 기본)
  const userSchedules = getUserSchedules();
  const allSchedules = [...userSchedules, ...itineraryCards];

  // 필터링 및 정렬된 일정 계산
  const filteredSchedules = allSchedules.filter(schedule => {
    const matchesRegion = selectedRegion === 'all' || schedule.region === selectedRegion;
    const matchesMonth = selectedMonth === 'all' || schedule.date.includes(selectedMonth);
    const matchesSearch = searchTerm === '' ||
      schedule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (schedule.author && schedule.author.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesRegion && matchesMonth && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'latest') {
      // 최신순: createdAt이 있으면 사용, 없으면 date 사용
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(a.date.split('~')[0]);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(b.date.split('~')[0]);
      return dateB - dateA; // 내림차순 (최신순)
    } else if (sortBy === 'popular') {
      // 인기순: views가 있으면 사용, 없으면 랜덤 값 사용
      const viewsA = a.views || Math.floor(Math.random() * 1000) + 100;
      const viewsB = b.views || Math.floor(Math.random() * 1000) + 100;
      return viewsB - viewsA; // 내림차순 (조회수 높은 순)
    }
    return 0;
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredSchedules.length / schedulesPerPage);
  const startIndex = (currentPage - 1) * schedulesPerPage;
  const endIndex = startIndex + schedulesPerPage;
  const currentSchedules = filteredSchedules.slice(startIndex, endIndex);

  const handleCreateSchedule = () => {
    if (isLoggedIn) {
      navigate('/travel-schedule/create');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginClick = () => {
    setShowLoginModal(false);
    navigate('/login');
  };

  return (
    <TravelScheduleListPage>
      <Navigation />

      <TravelScheduleListContainer>
        <PageHeader>
          <PageTitle>여행 일정</PageTitle>
          <CreateButton onClick={handleCreateSchedule}>
            일정 등록
          </CreateButton>
        </PageHeader>

        <FilterSection>
          <FilterTitle>필터</FilterTitle>

          <FilterGroup style={{ marginBottom: '20px' }}>
            <FilterLabel>검색</FilterLabel>
            <SearchInput
              type="text"
              placeholder="제목, 지역, 작성자로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>지역</FilterLabel>
            <FilterTags>
              {['all', '서울', '경기', '인천', '강원', '충청', '전라', '경상', '제주', '부산'].map(region => (
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
          <FilterGroup>
            <FilterLabel>정렬</FilterLabel>
            <FilterTags>
              <FilterTag
                active={sortBy === 'latest'}
                onClick={() => setSortBy('latest')}
              >
                최신순
              </FilterTag>
              <FilterTag
                active={sortBy === 'popular'}
                onClick={() => setSortBy('popular')}
              >
                인기순
              </FilterTag>
            </FilterTags>
          </FilterGroup>
        </FilterSection>

        {currentSchedules.length > 0 ? (
          <SchedulesGrid>
            {currentSchedules.map((schedule) => (
              <ScheduleCard
                key={schedule.id}
                onClick={() => navigate(`/travel-schedule/${schedule.id}`)}
              >
                <ScheduleImage src={schedule.image} alt={schedule.title} />
                <ScheduleContent>
                  <ScheduleTitle>{schedule.title}</ScheduleTitle>
                  <ScheduleMeta>
                    <ScheduleTag type="region">{schedule.region}</ScheduleTag>
                    <ScheduleTag type="date">{schedule.date}</ScheduleTag>
                    {schedule.author && (
                      <ScheduleTag type="author">by {schedule.author}</ScheduleTag>
                    )}
                  </ScheduleMeta>
                  {schedule.views && (
                    <ScheduleStats>
                      <ScheduleStat>
                        <span>👁️</span>
                        <span>{schedule.views.toLocaleString()}</span>
                      </ScheduleStat>
                      {schedule.likes && (
                        <ScheduleStat>
                          <span>❤️</span>
                          <span>{schedule.likes}</span>
                        </ScheduleStat>
                      )}
                    </ScheduleStats>
                  )}
                </ScheduleContent>
              </ScheduleCard>
            ))}
          </SchedulesGrid>
        ) : (
          <NoResults>
            <NoResultsIcon>📅</NoResultsIcon>
            <NoResultsTitle>검색 결과가 없습니다</NoResultsTitle>
            <NoResultsText>다른 검색어나 필터를 시도해보세요</NoResultsText>
          </NoResults>
        )}

        {/* 페이지네이션 */}
        {filteredSchedules.length > 0 && totalPages > 1 && (
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
      </TravelScheduleListContainer>

      {/* 로그인 모달 */}
      {showLoginModal && (
        <LoginModal onClick={() => setShowLoginModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalIcon>🔒</ModalIcon>
            <ModalTitle>로그인이 필요합니다</ModalTitle>
            <ModalMessage>여행 일정을 등록하려면 로그인해주세요.</ModalMessage>
            <ModalButtons>
              <ModalButton primary onClick={handleLoginClick}>로그인</ModalButton>
              <ModalButton onClick={() => setShowLoginModal(false)}>취소</ModalButton>
            </ModalButtons>
          </ModalContent>
        </LoginModal>
      )}
    </TravelScheduleListPage>
  );
};

export default TravelScheduleList;