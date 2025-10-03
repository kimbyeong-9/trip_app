import React from 'react';
import styled from 'styled-components';

const PlaceCard = ({ place, onClick }) => {
  return (
    <Card onClick={() => onClick(place)}>
      <PlaceImage>
        <img src={place.image} alt={place.name} />
      </PlaceImage>
      <PlaceInfo>
        <PlaceName>{place.name}</PlaceName>
        <PlaceCategory>{place.category}</PlaceCategory>
        <PlaceDescription>{place.description}</PlaceDescription>
      </PlaceInfo>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border: 2px solid #f1f3f4;
  border-radius: 16px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  background: #fafbfc;

  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
    background: white;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const PlaceImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  margin-right: 20px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlaceInfo = styled.div`
  flex: 1;
`;

const PlaceName = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
`;

const PlaceCategory = styled.p`
  font-size: 14px;
  color: #667eea;
  margin: 0 0 8px 0;
  font-weight: 500;
`;

const PlaceDescription = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
  line-height: 1.4;
`;

export default PlaceCard;
