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
        이전
      </PaginationButton>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <PaginationButton
          key={page}
          $active={currentPage === page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PaginationButton>
      ))}

      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </PaginationButton>
    </PaginationContainer>
  );
};

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

export default Pagination;
