import React from 'react';
import styled from 'styled-components';

const NoticePagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    // 이전 버튼
    buttons.push(
      <PaginationButton
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ◀
      </PaginationButton>
    );

    // 페이지 번호 버튼
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PaginationButton
          key={i}
          $active={currentPage === i}
          onClick={() => onPageChange(i)}
        >
          {i}
        </PaginationButton>
      );
    }

    // 다음 버튼
    buttons.push(
      <PaginationButton
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ▶
      </PaginationButton>
    );

    return buttons;
  };

  return (
    <PaginationContainer>
      {renderPaginationButtons()}
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 10px;
`;

const PaginationButton = styled.button`
  padding: 10px 15px;
  border: 1px solid #e9ecef;
  background: ${props => props.$active ? '#667eea' : 'white'};
  color: ${props => props.$active ? 'white' : '#6c757d'};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 40px;

  &:hover:not(:disabled) {
    background: ${props => props.$active ? '#667eea' : '#f8f9fa'};
    border-color: #667eea;
    color: ${props => props.$active ? 'white' : '#667eea'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default NoticePagination;
