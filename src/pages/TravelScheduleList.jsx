import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import { supabase } from '../supabaseClient';



const TravelScheduleList = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [sortBy, setSortBy] = useState('latest'); // 'latest', 'popular'
  const [isAICreate, setIsAICreate] = useState(false); // AI 작성 여부
  const [itineraryCards, setItineraryCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const schedulesPerPage = 9;

  // Supabase에서 Itinerary 데이터 가져오기
  useEffect(() => {
    const fetchItineraryCards = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('Itinerary')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          console.error('Error fetching itinerary cards:', error);
        } else {
          setItineraryCards(data || []);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItineraryCards();
  }, []);

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
      const userSchedules = JSON.parse(localStorage.getItem('userSchedules')) || [];
      // 특정 조건의 카드들을 필터링하여 제거 (화면에서만)
      return userSchedules.filter(schedule => {
        const title = schedule.title || '';

        // 제목이 "김병호"인 카드만 제거
        return title !== '김병호';
      });
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

    // 날짜 필터링 - 사용자 생성 일정과 기본 일정 모두 지원
    let matchesMonth = selectedMonth === 'all';
    if (!matchesMonth) {
      const scheduleDate = schedule.date || schedule.startDate || '';
      matchesMonth = scheduleDate.includes(selectedMonth);
    }

    const matchesSearch = searchTerm === '' ||
      schedule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (schedule.author &&
        (typeof schedule.author === 'string' ?
          schedule.author.toLowerCase().includes(searchTerm.toLowerCase()) :
          schedule.author.name && schedule.author.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

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
      setShowCreateModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleDirectCreate = () => {
    setIsAICreate(false);
    setShowCreateModal(false);
    setShowDatePicker(true);
  };

  const handleAICreate = () => {
    setIsAICreate(true);
    setShowCreateModal(false);
    setShowDatePicker(true);
  };

  const handleDateConfirm = () => {
    if (selectedStartDate && selectedEndDate) {
      setShowDatePicker(false);

      if (isAICreate) {
        // AI 일정 작성 페이지로 이동
        navigate(`/ai-schedule-create?startDate=${selectedStartDate}&endDate=${selectedEndDate}`);
      } else {
        // 직접 일정 작성 페이지로 이동
        navigate(`/direct-schedule-create?startDate=${selectedStartDate}&endDate=${selectedEndDate}`);
      }
    } else {
      alert('출발일과 도착일을 모두 선택해주세요.');
    }
  };

  const handleDateCancel = () => {
    setShowDatePicker(false);
    setSelectedStartDate('');
    setSelectedEndDate('');
    setIsAICreate(false);
  };

  const handleCardClick = (scheduleId) => {
    if (isLoggedIn) {
      navigate(`/travel-schedule/${scheduleId}`);
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
          <FilterTitle>맞춤 검색</FilterTitle>

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
                  $active={selectedRegion === region}
                  onClick={() => setSelectedRegion(region)}
                >
                  {region === 'all' ? '전체' : region}
                </FilterTag>
              ))}
            </FilterTags>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>정렬</FilterLabel>
            <FilterTags>
              <FilterTag
                $active={sortBy === 'latest'}
                onClick={() => setSortBy('latest')}
              >
                최신순
              </FilterTag>
              <FilterTag
                $active={sortBy === 'popular'}
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
                onClick={() => handleCardClick(schedule.id)}
              >
                <ScheduleImage src={schedule.image} alt={schedule.title} />
                <ScheduleContent>
                  <div>
                    <ScheduleTitle>{schedule.title}</ScheduleTitle>
                    <ScheduleMeta>
                      <ScheduleTag type="region">{schedule.region}</ScheduleTag>
                      <ScheduleTag type="date">{schedule.date}</ScheduleTag>
                    </ScheduleMeta>
                  </div>

                  <div>
                    {/* 작성자 정보 */}
                    {schedule.author && (
                      <AuthorInfo>
                        <AuthorAvatar>
                          <img
                            src={typeof schedule.author === 'string' ?
                              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" :
                              schedule.author.profileImage
                            }
                            alt={typeof schedule.author === 'string' ? schedule.author : schedule.author.name}
                          />
                        </AuthorAvatar>
                        <AuthorName>
                          {typeof schedule.author === 'string' ? schedule.author : schedule.author.name}
                        </AuthorName>
                      </AuthorInfo>
                    )}


                    <ScheduleStats>
                      <ScheduleStat>
                        <EyeIcon />
                        <span>{schedule.views || 0}</span>
                      </ScheduleStat>
                      <ScheduleStat>
                        <HeartIconSmall />
                        <span>{schedule.likes || 0}</span>
                      </ScheduleStat>
                    </ScheduleStats>
                  </div>
                </ScheduleContent>
              </ScheduleCard>
            ))}
          </SchedulesGrid>
        ) : (
          <NoResults>
            <NoResultsTitle>검색 결과가 없습니다</NoResultsTitle>
            <NoResultsText>다른 검색어나 맞춤 검색을 시도해보세요</NoResultsText>
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
                $active={currentPage === page}
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
            <ModalMessage>로그인 후 이용가능 합니다</ModalMessage>
            <ModalButtons>
              <ModalButton $primary onClick={handleLoginClick}>로그인</ModalButton>
              <ModalButton onClick={() => setShowLoginModal(false)}>취소</ModalButton>
            </ModalButtons>
          </ModalContent>
        </LoginModal>
      )}

      {/* 일정 생성 선택 모달 */}
      {showCreateModal && (
        <CreateModalOverlay onClick={() => setShowCreateModal(false)}>
          <CreateModalContainer onClick={(e) => e.stopPropagation()}>
            <CreateModalTitle>일정 작성 방법 선택</CreateModalTitle>
            <CreateModalMessage>
              어떤 방식으로 일정을 작성하시겠습니까?
            </CreateModalMessage>

            <CreateOptionsContainer>
              <CreateOptionButton onClick={handleDirectCreate}>
                <CreateOptionText>직접일정 작성</CreateOptionText>
              </CreateOptionButton>

              <CreateOptionButton $primary onClick={handleAICreate}>
                <CreateOptionText>AI 일정 작성</CreateOptionText>
              </CreateOptionButton>
            </CreateOptionsContainer>

            <CreateCancelButton onClick={() => setShowCreateModal(false)}>
              취소
            </CreateCancelButton>
          </CreateModalContainer>
        </CreateModalOverlay>
      )}

      {/* 날짜 선택 모달 */}
      {showDatePicker && (
        <DatePickerModalOverlay onClick={() => setShowDatePicker(false)}>
          <DatePickerModalContainer onClick={(e) => e.stopPropagation()}>
            <DatePickerTitle>여행 날짜 선택</DatePickerTitle>
            <DatePickerMessage>
              여행 시작일과 종료일을 선택해주세요
            </DatePickerMessage>

            <DateInputContainer>
              <DateInputGroup>
                <DateLabel>출발일</DateLabel>
                <DateInput
                  type="date"
                  value={selectedStartDate}
                  onChange={(e) => setSelectedStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </DateInputGroup>

              <DateInputGroup>
                <DateLabel>도착일</DateLabel>
                <DateInput
                  type="date"
                  value={selectedEndDate}
                  onChange={(e) => setSelectedEndDate(e.target.value)}
                  min={selectedStartDate || new Date().toISOString().split('T')[0]}
                />
              </DateInputGroup>
            </DateInputContainer>

            <DateButtonGroup>
              <DateConfirmButton onClick={handleDateConfirm}>
                확인
              </DateConfirmButton>
              <DateCancelButton onClick={handleDateCancel}>
                취소
              </DateCancelButton>
            </DateButtonGroup>
          </DatePickerModalContainer>
        </DatePickerModalOverlay>
      )}
    </TravelScheduleListPage>
  );
};

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
  border: 2px solid ${props => props.$active ? '#667eea' : '#e9ecef'};
  background: ${props => props.$active ? '#667eea' : 'white'};
  color: ${props => props.$active ? 'white' : '#495057'};
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    border-color: #667eea;
    background: ${props => props.$active ? '#5a6fd8' : '#f8f9fa'};
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
  display: flex;
  flex-direction: column;
  height: 100%;

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
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
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

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #e9ecef;
`;

const AuthorAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorName = styled.span`
  font-size: 12px;
  color: #6c757d;
  font-weight: 500;
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

  ${props => props.$primary ? `
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
  background: ${props => props.$active ? '#667eea' : 'white'};
  color: ${props => props.$active ? 'white' : '#495057'};
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$active ? '#5a6fd8' : '#f8f9fa'};
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

// 일정 작성 방법 선택 모달 스타일
const CreateModalOverlay = styled.div`
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
  padding: 20px;
`;

const CreateModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px 30px 30px 30px;
  text-align: center;
  max-width: 500px;
  width: 100%;
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


const CreateModalTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const CreateModalMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 30px 0;
  line-height: 1.6;
`;

const CreateOptionsContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const CreateOptionButton = styled.button`
  background: ${props => props.$primary ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.$primary ? 'white' : '#667eea'};
  border: 2px solid #667eea;
  padding: 15px 25px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${props => props.$primary ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#667eea'};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;


const CreateOptionText = styled.span`
  font-size: 14px;
`;

const CreateCancelButton = styled.button`
  background: white;
  color: #6c757d;
  border: 2px solid #e9ecef;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #495057;
  }
`;

const DatePickerModalOverlay = styled.div`
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
  padding: 20px;
`;

const DatePickerModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
`;

const DatePickerTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const DatePickerMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 30px 0;
  line-height: 1.6;
`;

const DateInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`;

const DateInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const DateLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
`;

const DateInput = styled.input`
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const DateButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const DateConfirmButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
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
`;

const DateCancelButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #5a6268;
  }
`;

export default TravelScheduleList;