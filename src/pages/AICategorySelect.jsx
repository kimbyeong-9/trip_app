import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CounterInput from '../components/ai/CounterInput';
import ActivitySelector from '../components/ai/ActivitySelector';

const AICategorySelect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [restaurantCount, setRestaurantCount] = useState(1);
  const [cafeCount, setCafeCount] = useState(1);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedCompanion, setSelectedCompanion] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // URL에서 파라미터 추출
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const region = params.get('region');
    const start = params.get('startDate');
    const end = params.get('endDate');

    if (region) setSelectedRegion(region);
    if (start) setStartDate(start);
    if (end) setEndDate(end);
  }, [location]);

  const handleClose = () => {
    navigate('/travel-schedules');
  };

  const handleBack = () => {
    navigate(`/ai-schedule-create?startDate=${startDate}&endDate=${endDate}`);
  };

  const handleNext = () => {
    const params = new URLSearchParams({
      startDate: startDate,
      endDate: endDate,
      region: selectedRegion,
      restaurantCount: restaurantCount,
      cafeCount: cafeCount,
      activities: selectedActivities.join(','),
      companion: selectedCompanion,
      isAIGenerated: 'true'
    });

    navigate(`/direct-schedule-create?${params.toString()}`);
  };

  // 지역명을 한글로 변환하는 함수
  const getRegionName = (regionId) => {
    const regionMap = {
      'seoul': '서울',
      'busan': '부산',
      'jeju': '제주',
      'gangwon': '강원',
      'gyeonggi': '경기',
      'incheon': '인천',
      'chungcheong': '충청',
      'jeolla': '전라',
      'gyeongsang': '경상'
    };
    return regionMap[regionId] || regionId;
  };

  return (
    <AICategorySelectModal onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <AICategoryContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>
          ×
        </CloseButton>

        <CategorySection>
          <CategoryTitle>
            {selectedRegion && `${getRegionName(selectedRegion)} 여행 계획`}
          </CategoryTitle>

          <CounterInput
            label="하루에 방문하고 싶은 맛집의 횟수는?"
            value={restaurantCount}
            onIncrement={() => setRestaurantCount(prev => prev + 1)}
            onDecrement={() => setRestaurantCount(prev => prev - 1)}
          />

          <CounterInput
            label="하루에 방문하고 싶은 카페 횟수는?"
            value={cafeCount}
            onIncrement={() => setCafeCount(prev => prev + 1)}
            onDecrement={() => setCafeCount(prev => prev - 1)}
          />

          <ActivitySelector
            title="식사 전후 또는 하고싶은 활동은?"
            options={['체험', '레포츠', '자연', '역사', '건축/조형물', '축제/공연']}
            selectedValues={selectedActivities}
            onSelect={setSelectedActivities}
            multiSelect={true}
          />

          <ActivitySelector
            title="누구와 함께 여행하시나요?"
            options={['혼자', '가족', '친구', '연인', '동료']}
            selectedValues={selectedCompanion}
            onSelect={setSelectedCompanion}
            multiSelect={false}
          />

          <ButtonGroup>
            <ActionButton onClick={handleBack}>
              이전으로
            </ActionButton>
            <ActionButton $primary onClick={handleNext}>
              다음
            </ActionButton>
          </ButtonGroup>
        </CategorySection>
      </AICategoryContainer>
    </AICategorySelectModal>
  );
};

const AICategorySelectModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const AICategoryContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px 30px 30px 30px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
  position: relative;

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  left: 15px;
  background: none;
  border: none;
  font-size: 24px;
  color: #6c757d;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  line-height: 1;

  &:hover {
    color: #dc3545;
    transform: scale(1.1);
  }
`;

const CategorySection = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const CategoryTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 30px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
`;

const ActionButton = styled.button`
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  ${props => props.$primary ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
    }
  ` : `
    background: white;
    color: #6c757d;
    border: 2px solid #e9ecef;

    &:hover {
      background: #f8f9fa;
      color: #495057;
    }
  `}
`;

export default AICategorySelect;