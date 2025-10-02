import React from 'react';
import styled from 'styled-components';

const ActivitySelector = ({
  title,
  options,
  selectedValues,
  onSelect,
  multiSelect = false
}) => {
  const handleSelect = (option) => {
    if (multiSelect) {
      // 다중 선택 모드
      onSelect(
        selectedValues.includes(option)
          ? selectedValues.filter(v => v !== option)
          : [...selectedValues, option]
      );
    } else {
      // 단일 선택 모드
      onSelect(option);
    }
  };

  const isSelected = (option) => {
    if (multiSelect) {
      return selectedValues.includes(option);
    }
    return selectedValues === option;
  };

  return (
    <Container>
      <Title>{title}</Title>
      <Grid>
        {options.map((option) => (
          <OptionButton
            key={option}
            selected={isSelected(option)}
            onClick={() => handleSelect(option)}
          >
            {option}
          </OptionButton>
        ))}
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 20px 0;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const OptionButton = styled.button`
  background: ${props => props.selected ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.selected ? 'white' : '#2c3e50'};
  border: 2px solid ${props => props.selected ? '#667eea' : '#e9ecef'};
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    background: ${props => props.selected ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f8f9fa'};
    border-color: #667eea;
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default ActivitySelector;
