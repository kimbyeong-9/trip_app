import React from 'react';
import styled from 'styled-components';

const RegionSelector = ({ regions, selectedRegion, onSelect }) => {
  return (
    <Container>
      <Title>여행 지역 선택</Title>
      <RegionGrid>
        {regions.map((region) => (
          <RegionButton
            key={region.id}
            selected={selectedRegion === region.id}
            onClick={() => onSelect(region.id)}
          >
            <RegionName>{region.name}</RegionName>
          </RegionButton>
        ))}
      </RegionGrid>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
  text-align: center;
`;

const RegionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 30px;
`;

const RegionButton = styled.button`
  background: ${props => props.selected ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.selected ? 'white' : '#2c3e50'};
  border: 2px solid ${props => props.selected ? '#667eea' : '#e9ecef'};
  border-radius: 12px;
  padding: 15px 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-height: 80px;
  justify-content: center;

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

const RegionName = styled.span`
  font-size: 13px;
  font-weight: 600;
`;

export default RegionSelector;
