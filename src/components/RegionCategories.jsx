import React from 'react';
import styled from 'styled-components';
import { regions } from '../data/mockData';



const RegionCategories = ({ selectedRegion = 'all', onRegionSelect }) => {
  const handleRegionClick = (regionId) => {
    if (onRegionSelect) {
      onRegionSelect(regionId);
    }
  };

  return (
    <RegionCategoriesContainer>
      <RegionScrollWrapper>
        <RegionItemsContainer>
          {regions.map((region) => (
            <RegionItem
              key={region.id}
              onClick={() => handleRegionClick(region.id)}
            >
              <RegionImageWrapper selected={selectedRegion === region.id}>
                <RegionImage
                  src={region.image}
                  alt={region.name}
                />
              </RegionImageWrapper>
              <RegionName selected={selectedRegion === region.id}>
                {region.name}
              </RegionName>
            </RegionItem>
          ))}
        </RegionItemsContainer>
      </RegionScrollWrapper>
    </RegionCategoriesContainer>
  );
};


const RegionCategoriesContainer = styled.div`
  padding: 20px 0;
  background: white;
  border-bottom: 1px solid #e9ecef;
  max-width: 1200px;
  margin: 0 auto;
`;

const RegionScrollWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;

  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const RegionItemsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 10px 0;
  min-width: max-content;
  
  @media (max-width: 768px) {
    gap: 15px;
  }
  
  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const RegionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const RegionImageWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${props => props.selected ? '#667eea' : 'transparent'};
  box-shadow: ${props => props.selected 
    ? '0 4px 15px rgba(102, 126, 234, 0.3)' 
    : '0 2px 8px rgba(0, 0, 0, 0.1)'
  };
  transition: all 0.3s ease;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.selected 
      ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)' 
      : 'transparent'
    };
    border-radius: 50%;
    transition: all 0.3s ease;
  }
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
  
  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;

const RegionImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
  
  ${RegionItem}:hover & {
    transform: scale(1.1);
  }
`;

const RegionName = styled.span`
  margin-top: 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.selected ? '#667eea' : '#495057'};
  text-align: center;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export default RegionCategories;