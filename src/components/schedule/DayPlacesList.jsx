import React from 'react';
import styled from 'styled-components';

const DayPlacesList = ({
  activeDays,
  dailyPlaces,
  onAddLocation,
  onRemoveDay,
  onPlaceClick,
  calculateDistance,
  startDate,
  endDate
}) => {
  return (
    <>
      {Array.from({ length: activeDays }, (_, index) => {
        const day = index + 1;
        const dayPlaceList = dailyPlaces[day] || [];

        return (
          <DaySection key={day}>
            <DayHeader>
              <DayTitle>{day}일차</DayTitle>
              {/* 날짜 선택 시에는 삭제 버튼 숨김 */}
              {(!startDate || !endDate) && activeDays > 1 && (
                <RemoveDayButton
                  onClick={() => onRemoveDay(day)}
                  disabled={day === 1}
                >
                  삭제
                </RemoveDayButton>
              )}
            </DayHeader>

            {dayPlaceList.length > 0 && (
              <PlacesContainer>
                {dayPlaceList.map((place, idx) => (
                  <div key={`${place.id}-${place.addedAt}`}>
                    <PlaceCard onClick={() => onPlaceClick(day, idx)}>
                      <PlaceImage src={place.image} alt={place.name} />
                      <PlaceInfo>
                        <PlaceName>{place.name}</PlaceName>
                        <PlaceMeta>
                          <SmallBadge type="region">{place.region}</SmallBadge>
                          <SmallBadge type="category">{place.category}</SmallBadge>
                        </PlaceMeta>
                      </PlaceInfo>
                    </PlaceCard>

                    {/* 거리 표시 (마지막 장소가 아닌 경우만) */}
                    {idx < dayPlaceList.length - 1 && (
                      <DistanceIndicator>
                        <Arrow>↓</Arrow>
                        <DistanceText>
                          {(() => {
                            const { distance } = calculateDistance(place, dayPlaceList[idx + 1]);
                            return `${distance}km`;
                          })()}
                        </DistanceText>
                      </DistanceIndicator>
                    )}
                  </div>
                ))}
              </PlacesContainer>
            )}

            <AddButton onClick={() => onAddLocation(day)}>
              장소 추가 +
            </AddButton>
          </DaySection>
        );
      })}
    </>
  );
};

const DaySection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
`;

const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DayTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
`;

const RemoveDayButton = styled.button`
  padding: 8px 16px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: #c82333;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PlacesContainer = styled.div`
  margin-bottom: 15px;
`;

const PlaceCard = styled.div`
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  gap: 15px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    border-color: #667eea;
  }
`;

const PlaceImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
`;

const PlaceInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PlaceName = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 10px 0;
`;

const PlaceMeta = styled.div`
  display: flex;
  gap: 8px;
`;

const SmallBadge = styled.span`
  padding: 5px 10px;
  background: ${props => props.type === 'region' ? '#e3f2fd' : '#f3e5f5'};
  color: ${props => props.type === 'region' ? '#1976d2' : '#7b1fa2'};
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

const DistanceIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
  color: #6c757d;
`;

const Arrow = styled.div`
  font-size: 24px;
  line-height: 1;
  margin-bottom: 5px;
`;

const DistanceText = styled.div`
  font-size: 14px;
  font-weight: 600;
  background: #e8f4f8;
  padding: 5px 15px;
  border-radius: 12px;
  color: #0c5460;
`;

const AddButton = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
`;

export default DayPlacesList;
