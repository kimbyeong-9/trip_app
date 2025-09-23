import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MagazineDetailModal from '../components/MagazineDetailModal';
import { magazineCards } from '../data/mockData';

// Styled Components
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
  background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.active ? 'white' : '#667eea'};
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 40px 0;
  flex-wrap: wrap;
`;

const PaginationButton = styled.button`
  min-width: 40px;
  height: 40px;
  border: 2px solid ${props => props.active ? '#667eea' : '#e9ecef'};
  background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.active ? 'white' : '#6c757d'};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f8f9fa'};
    border-color: #667eea;
    color: ${props => props.active ? 'white' : '#667eea'};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
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

const MagazineList = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMagazine, setSelectedMagazine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const magazinesPerPage = 6;

  const categories = ['전체', '국내여행', '맛집', '액티비티', '문화'];

  const filteredMagazines = selectedCategory === '전체'
    ? magazineCards
    : magazineCards.filter(magazine => magazine.category === selectedCategory);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredMagazines.length / magazinesPerPage);
  const startIndex = (currentPage - 1) * magazinesPerPage;
  const endIndex = startIndex + magazinesPerPage;
  const displayedMagazines = filteredMagazines.slice(startIndex, endIndex);

  const handleMagazineClick = (magazine) => {
    setSelectedMagazine(magazine);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMagazine(null);
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
              active={selectedCategory === category}
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

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <PaginationContainer>
                <PaginationButton
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ‹
                </PaginationButton>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                  // 현재 페이지 주변의 페이지만 보이도록 제한
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <PaginationButton
                        key={page}
                        active={currentPage === page}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </PaginationButton>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return <span key={page}>...</span>;
                  }
                  return null;
                })}

                <PaginationButton
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  ›
                </PaginationButton>
              </PaginationContainer>
            )}
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
    </MagazineListPage>
  );
};

export default MagazineList;