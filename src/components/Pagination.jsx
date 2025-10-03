import React from 'react';
import styled from 'styled-components';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <PaginationContainer>
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
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
              $active={currentPage === page}
              onClick={() => onPageChange(page)}
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
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </PaginationButton>
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 50px 0;
  flex-wrap: wrap;

  span {
    padding: 8px 12px;
    color: #6c757d;
  }
`;

const PaginationButton = styled.button`
  padding: 8px 16px;
  border: 2px solid ${props => props.$active ? '#667eea' : '#e9ecef'};
  background: ${props => props.$active ? '#667eea' : 'white'};
  color: ${props => props.$active ? 'white' : '#6c757d'};
  border-radius: 8px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 600;
  opacity: ${props => props.disabled ? 0.5 : 1};
  min-width: 40px;

  &:hover:not(:disabled) {
    border-color: #667eea;
    background: ${props => props.$active ? '#667eea' : '#f8f9fa'};
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export default Pagination;
