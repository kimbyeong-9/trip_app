import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../supabaseClient';
import TourismCard from '../components/tourism/TourismCard';
import Pagination from '../components/tourism/Pagination';
import InfoModal from '../components/tourism/InfoModal';
import LoginModal from '../components/tourism/LoginModal';


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
            <TourismCard key={card.id} card={card} onClick={handleCardClick} />
          ))}
        </TourismGrid>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </TourismListContainer>

      <InfoModal
        show={showModal}
        onClose={handleCloseModal}
        icon="🚧"
        title="준비중입니다"
        message="관광공사 추천여행지 상세 정보는<br />현재 준비중입니다.<br />조금만 기다려주세요!"
      />

      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginClick}
      />
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