import React from 'react';
import styled from 'styled-components';

const CategorySelector = ({ categories, selectedCategory, onSelect }) => {
  return (
    <CategorySection>
      <FormLabel>카테고리 선택</FormLabel>
      <CategoryGrid>
        {categories.map((category) => (
          <CategoryButton
            key={category.key}
            selected={selectedCategory === category.key}
            onClick={() => onSelect(category.key)}
          >
            {category.label}
          </CategoryButton>
        ))}
      </CategoryGrid>
    </CategorySection>
  );
};

const CategorySection = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 8px;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin-top: 10px;
`;

const CategoryButton = styled.button`
  padding: 8px 12px;
  border: 2px solid ${props => props.selected ? '#667eea' : '#e9ecef'};
  background: ${props => props.selected ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.selected ? 'white' : '#495057'};
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    border-color: #667eea;
    background: ${props => props.selected ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f8f9fa'};
  }
`;

export default CategorySelector;
