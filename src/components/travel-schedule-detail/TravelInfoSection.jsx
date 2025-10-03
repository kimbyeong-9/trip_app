import React from 'react';
import styled from 'styled-components';

const TravelInfoSection = ({ schedule }) => {
  if (!schedule.transportation && !schedule.companions && !schedule.accommodation && !schedule.startDate) {
    return null;
  }

  return (
    <InfoSectionContainer>
      <InfoTitle>여행 정보</InfoTitle>
      <InfoGrid>
        {schedule.startDate && schedule.endDate && (
          <InfoItem>
            <InfoLabel>여행 기간</InfoLabel>
            <InfoValue>{schedule.startDate} ~ {schedule.endDate}</InfoValue>
          </InfoItem>
        )}

        {schedule.transportation && schedule.transportation.length > 0 && (
          <InfoItem>
            <InfoLabel>교통수단</InfoLabel>
            <TransportationTags>
              {schedule.transportation.map((transport, index) => (
                <TransportationTag key={index}>{transport}</TransportationTag>
              ))}
            </TransportationTags>
          </InfoItem>
        )}

        {schedule.companions && (
          <InfoItem>
            <InfoLabel>동행인</InfoLabel>
            <InfoValue>{schedule.companions}</InfoValue>
          </InfoItem>
        )}

        {schedule.accommodation && (
          <InfoItem>
            <InfoLabel>숙박</InfoLabel>
            <InfoValue>{schedule.accommodation}</InfoValue>
          </InfoItem>
        )}
      </InfoGrid>
    </InfoSectionContainer>
  );
};

const InfoSectionContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  margin: 20px 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
`;

const InfoTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 20px 0;
  padding-bottom: 15px;
  border-bottom: 2px solid #f8f9fa;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #6c757d;
`;

const InfoValue = styled.span`
  font-size: 16px;
  color: #2c3e50;
  font-weight: 500;
`;

const TransportationTags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const TransportationTag = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
`;

export default TravelInfoSection;
