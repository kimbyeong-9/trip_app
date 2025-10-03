import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MagazineDetailModal from '../components/MagazineDetailModal';
import Pagination from '../components/Pagination';
import { supabase } from '../supabaseClient';


const MagazineList = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMagazine, setSelectedMagazine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [magazineCards, setMagazineCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const magazinesPerPage = 6;

  const categories = ['전체', '국내여행', '맛집', '액티비티', '문화'];

  useEffect(() => {
    const fetchMagazineCards = async () => {
      try {
        const { data, error } = await supabase
          .from('MagazineSections')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          console.error('Error fetching magazine cards:', error);
        } else {
          setMagazineCards(data || []);
        }
      } catch (error) {
        console.error('Error fetching magazine cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMagazineCards();
  }, []);

  // 로그인 상태 확인
  const getLoginData = () => {
    const localData = localStorage.getItem('loginData');
    const sessionData = sessionStorage.getItem('loginData');
    return localData ? JSON.parse(localData) : (sessionData ? JSON.parse(sessionData) : null);
  };

  const loginData = getLoginData();
  const isLoggedIn = loginData && loginData.isLoggedIn;

  const filteredMagazines = selectedCategory === '전체'
    ? magazineCards
    : magazineCards.filter(magazine => magazine.category === selectedCategory);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredMagazines.length / magazinesPerPage);
  const startIndex = (currentPage - 1) * magazinesPerPage;
  const endIndex = startIndex + magazinesPerPage;
  const displayedMagazines = filteredMagazines.slice(startIndex, endIndex);

  const handleMagazineClick = (magazine) => {
    if (isLoggedIn) {
      setSelectedMagazine(magazine);
      setIsModalOpen(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMagazine(null);
  };

  const handleLoginClick = () => {
    setShowLoginModal(false);
    navigate('/login');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <MagazineListPage>
        <Container>
          <PageHeader>
            <PageTitle>여행 매거진</PageTitle>
          </PageHeader>
          <LoadingSpinner>
            <Spinner />
            <LoadingText>매거진 로딩중...</LoadingText>
          </LoadingSpinner>
        </Container>
      </MagazineListPage>
    );
  }

  return (
    <MagazineListPage>
      <Container>
        <PageHeader>
          <PageTitle>여행 매거진</PageTitle>
        </PageHeader>

        <FilterSection>
          {categories.map(category => (
            <FilterButton
              key={category}
              $active={selectedCategory === category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
            >
              {category}
            </FilterButton>
          ))}
        </FilterSection>

        {displayedMagazines.length > 0 ? (
          <>
            <MagazineGrid>
              {displayedMagazines.map(magazine => (
                <MagazineCard
                  key={magazine.id}
                  onClick={() => handleMagazineClick(magazine)}
                >
                  <MagazineImage src={magazine.image} alt={magazine.title} />
                  <MagazineContent>
                    <MagazineCategory>{magazine.views || Math.floor(Math.random() * 500) + 50} views</MagazineCategory>
                    <MagazineTitle>{magazine.title}</MagazineTitle>
                    <MagazineDescription>{magazine.description}</MagazineDescription>
                    <MagazineMeta>
                      <MagazineAuthor>by {magazine.author}</MagazineAuthor>
                      <MagazineDate>{formatDate(magazine.date)}</MagazineDate>
                    </MagazineMeta>
                  </MagazineContent>
                </MagazineCard>
              ))}
            </MagazineGrid>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <EmptyState>
            <EmptyIcon>📖</EmptyIcon>
            <EmptyTitle>매거진이 없습니다</EmptyTitle>
            <EmptyMessage>선택한 카테고리에 해당하는 매거진이 없습니다.</EmptyMessage>
          </EmptyState>
        )}
      </Container>

      {/* 매거진 상세 모달 */}
      {isModalOpen && selectedMagazine && (
        <MagazineDetailModal
          magazine={selectedMagazine}
          onClose={handleCloseModal}
        />
      )}

      {/* 로그인 모달 */}
      {showLoginModal && (
        <LoginModal onClick={() => setShowLoginModal(false)}>
          <LoginModalContent onClick={(e) => e.stopPropagation()}>
            <LoginModalIcon>🔒</LoginModalIcon>
            <LoginModalTitle>로그인이 필요합니다</LoginModalTitle>
            <LoginModalMessage>로그인 후 이용가능 합니다</LoginModalMessage>
            <LoginModalButtons>
              <LoginModalButton $primary onClick={handleLoginClick}>로그인</LoginModalButton>
              <LoginModalButton onClick={() => setShowLoginModal(false)}>취소</LoginModalButton>
            </LoginModalButtons>
          </LoginModalContent>
        </LoginModal>
      )}
    </MagazineListPage>
  );
};




const MagazineListPage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
  padding-bottom: 20px;

  @media (max-width: 1024px) {
    padding-bottom: 100px;
  }
`;

const Container = styled.div`
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

const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 12px 24px;
  border-radius: 25px;
  border: 2px solid #667eea;
  background: ${props => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.$active ? 'white' : '#667eea'};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    transform: translateY(-2px);
  }
`;

const MagazineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const MagazineCard = styled.div`
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

const MagazineImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${MagazineCard}:hover & {
    transform: scale(1.05);
  }
`;

const MagazineContent = styled.div`
  padding: 25px;
`;

const MagazineCategory = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const MagazineTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 12px 0;
  line-height: 1.4;
`;

const MagazineDescription = styled.p`
  font-size: 14px;
  color: #6c757d;
  line-height: 1.6;
  margin: 0 0 15px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MagazineMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #f1f3f4;
`;

const MagazineAuthor = styled.span`
  font-size: 13px;
  color: #6c757d;
  font-weight: 500;
`;

const MagazineDate = styled.span`
  font-size: 13px;
  color: #adb5bd;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

const EmptyTitle = styled.h3`
  font-size: 24px;
  color: #2c3e50;
  margin: 0 0 10px 0;
`;

const EmptyMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
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

const LoginModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px 30px 30px 30px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
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
  border-top: 4px solid #667eea;
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

export default MagazineList;