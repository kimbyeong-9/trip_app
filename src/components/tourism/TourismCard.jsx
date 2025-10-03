import React from 'react';
import styled from 'styled-components';

const TourismCard = ({ card, onClick }) => {
  return (
    <Card onClick={onClick}>
      <CardImage src={card.image} alt={card.title} />
      <CardContent>
        <PlaceName>{card.title}</PlaceName>
        <Description>{card.description}</Description>
        <CardMeta>
          <Region>{card.region}</Region>
          <span>관광공사 추천</span>
        </CardMeta>
      </CardContent>
    </Card>
  );
};

const Card = styled.div`
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

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const PlaceName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 10px 0;
  line-height: 1.4;
`;

const Description = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0 0 15px 0;
  line-height: 1.5;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #8e9ba7;
`;

const Region = styled.span`
  background: #e8f5e8;
  color: #4caf50;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
`;

export default TourismCard;
