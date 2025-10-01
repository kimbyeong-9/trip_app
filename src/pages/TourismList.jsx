import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../supabaseClient';


const TourismList = () => {
  const navigate = useNavigate();
  const [tourismCards, setTourismCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const itemsPerPage = 9;

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

  // 로그인 상태 확인
  const getLoginData = () => {
    const localData = localStorage.getItem('loginData');
    const sessionData = sessionStorage.getItem('loginData');
    return localData ? JSON.parse(localData) : (sessionData ? JSON.parse(sessionData) : null);
  };

  const loginData = getLoginData();
  const isLoggedIn = loginData && loginData.isLoggedIn;

  const regions = ['전체', '서울', '부산', '제주', '강원', '경기', '전라', '경상', '충청'];

  const filteredCards = tourismCards.filter(card => {
    const regionMatch = selectedRegion === '전체' || card.region === selectedRegion;
    return regionMatch;
  });

  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCards = filteredCards.slice(startIndex, startIndex + itemsPerPage);

  const handleCardClick = () => {
    if (isLoggedIn) {
      setShowModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLoginClick = () => {
    setShowLoginModal(false);
    navigate('/login');
  };

  const handleFilterChange = (value) => {
    setSelectedRegion(value);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <TourismListPage>
        <TourismListContainer>
          <PageHeader>
            <PageTitle>관광공사 추천여행지</PageTitle>
          </PageHeader>
          <LoadingSpinner>
            <Spinner />
            <LoadingText>관광지 로딩중...</LoadingText>
          </LoadingSpinner>
        </TourismListContainer>
      </TourismListPage>
    );
  }

  return (
    <TourismListPage>
      <TourismListContainer>
        <PageHeader>
          <PageTitle>관광공사 추천여행지</PageTitle>
        </PageHeader>

        <FilterSection>
          <FilterTitle>지역별 맞춤 검색</FilterTitle>
          <FilterTags>
            {regions.map(region => (
              <FilterTag
                key={region}
                $active={selectedRegion === region}
                onClick={() => handleFilterChange(region)}
              >
                {region}
              </FilterTag>
            ))}
          </FilterTags>
        </FilterSection>

        <TourismGrid>
          {paginatedCards.map((card) => (
            <TourismCard key={card.id} onClick={handleCardClick}>
              <CardImage src={card.image} alt={card.title} />
              <CardContent>
                <PlaceName>{card.title}</PlaceName>
                <Description>{card.description}</Description>
                <CardMeta>
                  <Region>{card.region}</Region>
                  <span>관광공사 추천</span>
                </CardMeta>
              </CardContent>
            </TourismCard>
          ))}
        </TourismGrid>

        {totalPages > 1 && (
          <PaginationContainer>
            <PaginationButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              이전
            </PaginationButton>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <PaginationButton
                key={page}
                $active={currentPage === page}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PaginationButton>
            ))}

            <PaginationButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              다음
            </PaginationButton>
          </PaginationContainer>
        )}
      </TourismListContainer>

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

      {/* 로그인 모달 */}
      {showLoginModal && (
        <LoginModal onClick={() => setShowLoginModal(false)}>
          <LoginModalContainer onClick={(e) => e.stopPropagation()}>
            <LoginModalIcon>🔒</LoginModalIcon>
            <LoginModalTitle>로그인이 필요합니다</LoginModalTitle>
            <LoginModalMessage>로그인 후 이용가능 합니다</LoginModalMessage>
            <LoginModalButtons>
              <LoginModalButton $primary onClick={handleLoginClick}>로그인</LoginModalButton>
              <LoginModalButton onClick={() => setShowLoginModal(false)}>취소</LoginModalButton>
            </LoginModalButtons>
          </LoginModalContainer>
        </LoginModal>
      )}
    </TourismListPage>
  );
};


const TourismListPage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
  padding-bottom: 20px;

  @media (max-width: 1024px) {
    padding-bottom: 100px;
  }
`;

const TourismListContainer = styled.div`
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
  background: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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

const FilterTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const FilterTag = styled.button`
  background: ${props => props.$active ? 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)' : '#f8f9fa'};
  color: ${props => props.$active ? 'white' : '#6c757d'};
  border: 1px solid ${props => props.$active ? 'transparent' : '#e9ecef'};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$active ? 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)' : '#e9ecef'};
    color: ${props => props.$active ? 'white' : '#495057'};
  }
`;

const TourismGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
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
  margin: 0 0 15px 0;
  line-height: 1.5;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #8e9ba7;
`;

const Region = styled.span`
  background: #e8f5e8;
  color: #4caf50;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px 30px 30px 30px;
  text-align: center;
  max-width: 400px;
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const PaginationButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #e9ecef;
  background: ${props => props.$active ? 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)' : 'white'};
  color: ${props => props.$active ? 'white' : '#6c757d'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${props => props.$active ? '600' : '400'};

  &:hover {
    background: ${props => props.$active ? 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)' : '#f8f9fa'};
    color: ${props => props.$active ? 'white' : '#495057'};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
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
  z-index: 10000;
  padding: 20px;
`;

const LoginModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px 30px 30px 30px;
  text-align: center;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
`;

const LoginModalIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const LoginModalTitle = styled.h3`
  font-size: 24px;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const LoginModalMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 25px 0;
  line-height: 1.5;
`;

const LoginModalButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const LoginModalButton = styled.button`
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  ${props => props.$primary ? `
    background: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(76, 175, 80, 0.6);
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

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  gap: 20px;
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

export default TourismList;