import React from 'react';
import styled from 'styled-components';

const TransportationSelector = ({ formData, onInputChange, onOptionToggle }) => {
  return (
    <Section>
      <SectionTitle>여행 정보</SectionTitle>

      <FormGroup>
        <Label>지역</Label>
        <ButtonGroup>
          {['서울', '부산', '제주', '경기', '강원', '전라', '충청', '경상', '인천'].map(region => (
            <OptionButton
              key={region}
              $active={formData.region === region}
              onClick={() => onInputChange('region', region)}
            >
              {region}
            </OptionButton>
          ))}
        </ButtonGroup>
      </FormGroup>

      <FormGroup>
        <Label>교통편 (복수 선택 가능)</Label>
        <ButtonGroup>
          {['자동차', '기차', '버스', '비행기', '배', '도보', '자전거'].map(option => (
            <OptionButton
              key={option}
              $active={formData.transportation.includes(option)}
              onClick={() => onOptionToggle('transportation', option)}
            >
              {option}
            </OptionButton>
          ))}
        </ButtonGroup>
      </FormGroup>

      <FormGroup>
        <Label>숙소 종류</Label>
        <ButtonGroup>
          {['호텔', '펜션', '리조트', '게스트하우스', '민박', '캠핑', '에어비앤비'].map(option => (
            <OptionButton
              key={option}
              $active={formData.accommodation === option}
              onClick={() => onInputChange('accommodation', option)}
            >
              {option}
            </OptionButton>
          ))}
        </ButtonGroup>
      </FormGroup>
    </Section>
  );
};

const Section = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 25px 0;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const OptionButton = styled.button`
  padding: 12px 20px;
  border: 2px solid ${props => props.$active ? '#667eea' : '#e9ecef'};
  background: ${props => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.$active ? 'white' : '#495057'};
  border-radius: 20px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${props => props.$active ? 'rgba(102, 126, 234, 0.4)' : 'rgba(0, 0, 0, 0.1)'};
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 14px;
  }
`;

export default TransportationSelector;
