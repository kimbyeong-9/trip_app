import React from 'react';
import styled from 'styled-components';
import PlaceCard from './PlaceCard';

const DayScheduleSection = ({ dayData, day, onPlaceClick, calculateDistance }) => {
  const isArrayFormat = Array.isArray(dayData.places);
  const places = isArrayFormat ? dayData.places : dayData.places || [];

  return (
    <DaySectionContainer>
      <DayHeader>
        <DayTitle>{isArrayFormat ? dayData.day : `${day.replace('day', '')}일차`}</DayTitle>
        {!isArrayFormat && dayData.date && <DayDate>{dayData.date}</DayDate>}
      </DayHeader>

      <PlacesContainer>
        {places.map((place, index) => (
          <div key={isArrayFormat ? index : place.id}>
            <PlaceCard place={place} onClick={onPlaceClick} />

            {index < places.length - 1 && place.distance !== '끝' && (
              <ArrowSection>
                <Arrow>↓</Arrow>
                <DistanceText>
                  {isArrayFormat
                    ? (place.distance || '도보 5분')
                    : place.distance
                  }
                </DistanceText>
              </ArrowSection>
            )}
          </div>
        ))}
      </PlacesContainer>
    </DaySectionContainer>
  );
};

const DaySectionContainer = styled.div`
  margin-bottom: 40px;
`;

const DayHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 30px;
  border-radius: 20px 20px 0 0;
  margin-bottom: 0;
`;

const DayTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 10px 0;
`;

const DayDate = styled.p`
  font-size: 16px;
  margin: 0;
  opacity: 0.9;
`;

const PlacesContainer = styled.div`
  background: white;
  border-radius: 0 0 20px 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  border-top: none;
`;

const ArrowSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
  gap: 15px;
`;

const Arrow = styled.div`
  color: #667eea;
  font-size: 24px;
`;

const DistanceText = styled.div`
  font-size: 14px;
  color: #6c757d;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export default DayScheduleSection;
