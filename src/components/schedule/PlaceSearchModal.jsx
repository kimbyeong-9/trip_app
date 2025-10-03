import React from 'react';
import styled from 'styled-components';

const PlaceSearchModal = ({
  isOpen,
  onClose,
  selectedCategory,
  setSelectedCategory,
  selectedRegion,
  setSelectedRegion,
  searchQuery,
  setSearchQuery,
  filteredPlaces,
  onPlaceSelect
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>장소 검색</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <SearchContent>
          <SearchBox>
            <SearchInput
              type="text"
              placeholder="장소명을 검색하세요 (예: 경복궁, N서울타워)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchBox>

          <RegionSection>
            <SectionTitle>지역</SectionTitle>
            <ButtonGroup>
              {['전체', '서울', '부산', '제주', '경기', '강원', '전라', '충청', '경상', '인천'].map(region => (
                <FilterButton
                  key={region}
                  $active={selectedRegion === region}
                  onClick={() => setSelectedRegion(region)}
                >
                  {region}
                </FilterButton>
              ))}
            </ButtonGroup>
          </RegionSection>

          <CategorySection>
            <SectionTitle>카테고리</SectionTitle>
            <ButtonGroup>
              {['전체', '음식점', '카페', '키즈', '휴양지', '자연', '체험', '전시', '레포츠', '축제공연', '역사', '숙박', '야경', '데이트'].map(category => (
                <FilterButton
                  key={category}
                  $active={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </FilterButton>
              ))}
            </ButtonGroup>
          </CategorySection>

          <SearchResults>
            {filteredPlaces.length > 0 ? (
              filteredPlaces.map(place => (
                <PlaceCard key={place.id} onClick={() => onPlaceSelect(place)}>
                  <PlaceImage src={place.image} alt={place.name} />
                  <PlaceInfo>
                    <PlaceName>{place.name}</PlaceName>
                    <PlaceRating>⭐ {place.rating}</PlaceRating>
                  </PlaceInfo>
                  <PlaceMeta>
                    <PlaceRegion>{place.region}</PlaceRegion>
                    <PlaceCategory>{place.category}</PlaceCategory>
                  </PlaceMeta>
                </PlaceCard>
              ))
            ) : (
              <EmptyResults>
                선택한 조건에 맞는 장소가 없습니다.<br />
                다른 지역이나 카테고리를 선택해보세요.
              </EmptyResults>
            )}
          </SearchResults>
        </SearchContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 25px 30px;
  border-bottom: 2px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 32px;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:hover {
    background: #f8f9fa;
    color: #495057;
  }
`;

const SearchContent = styled.div`
  padding: 25px 30px;
  overflow-y: auto;
  flex: 1;
`;

const SearchBox = styled.div`
  margin-bottom: 25px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const RegionSection = styled.div`
  margin-bottom: 25px;
`;

const CategorySection = styled.div`
  margin-bottom: 25px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const FilterButton = styled.button`
  padding: 10px 18px;
  border: 2px solid ${props => props.$active ? '#667eea' : '#e9ecef'};
  background: ${props => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.$active ? 'white' : '#495057'};
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${props => props.$active ? 'rgba(102, 126, 234, 0.4)' : 'rgba(0, 0, 0, 0.1)'};
  }
`;

const SearchResults = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PlaceCard = styled.div`
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: #667eea;
  }
`;

const PlaceImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const PlaceInfo = styled.div`
  padding: 15px;
`;

const PlaceName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
`;

const PlaceRating = styled.div`
  font-size: 14px;
  color: #ffc107;
  font-weight: 600;
`;

const PlaceMeta = styled.div`
  padding: 0 15px 15px 15px;
  display: flex;
  gap: 8px;
`;

const PlaceRegion = styled.span`
  padding: 5px 10px;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

const PlaceCategory = styled.span`
  padding: 5px 10px;
  background: #f3e5f5;
  color: #7b1fa2;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

const EmptyResults = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
  font-size: 16px;
  line-height: 1.6;
`;

export default PlaceSearchModal;
