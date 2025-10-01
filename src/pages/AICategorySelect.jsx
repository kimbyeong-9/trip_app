import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';



const AICategorySelect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [restaurantCount, setRestaurantCount] = useState(1);
  const [cafeCount, setCafeCount] = useState(1);
  const [selectedActivities, setSelectedActivities] = useState([]);
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
    // 이전 AI 지역 선택 모달로 돌아가기
    navigate(`/ai-schedule-create?startDate=${startDate}&endDate=${endDate}`);
  };

  const handleRestaurantIncrement = () => {
    setRestaurantCount(prev => prev + 1);
  };

  const handleRestaurantDecrement = () => {
    if (restaurantCount > 1) {
      setRestaurantCount(prev => prev - 1);
    }
  };

  const handleCafeIncrement = () => {
    setCafeCount(prev => prev + 1);
  };

  const handleCafeDecrement = () => {
    if (cafeCount > 1) {
      setCafeCount(prev => prev - 1);
    }
  };

  const handleActivityToggle = (activity) => {
    setSelectedActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleNext = () => {
    // 선택한 모든 데이터를 직접 일정 등록 페이지로 전달
    const params = new URLSearchParams({
      startDate: startDate,
      endDate: endDate,
      region: selectedRegion,
      restaurantCount: restaurantCount,
      cafeCount: cafeCount,
      activities: selectedActivities.join(','),
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

          <QuestionContainer>
            <QuestionText>하루에 방문하고 싶은 맛집의 횟수는?</QuestionText>
            <CounterContainer>
              <CounterButton
                onClick={handleRestaurantDecrement}
                disabled={restaurantCount <= 1}
              >
                −
              </CounterButton>
              <CounterValue>{restaurantCount}</CounterValue>
              <CounterButton onClick={handleRestaurantIncrement}>
                +
              </CounterButton>
            </CounterContainer>
          </QuestionContainer>

          <QuestionContainer>
            <QuestionText>하루에 방문하고 싶은 카페 횟수는?</QuestionText>
            <CounterContainer>
              <CounterButton
                onClick={handleCafeDecrement}
                disabled={cafeCount <= 1}
              >
                −
              </CounterButton>
              <CounterValue>{cafeCount}</CounterValue>
              <CounterButton onClick={handleCafeIncrement}>
                +
              </CounterButton>
            </CounterContainer>
          </QuestionContainer>

          <ActivitySection>
            <ActivityTitle>식사 전후 또는 하고싶은 활동은?</ActivityTitle>
            <ActivityGrid>
              {['체험', '레포츠', '자연', '역사', '건축/조형물', '축제/공연'].map((activity) => (
                <ActivityButton
                  key={activity}
                  selected={selectedActivities.includes(activity)}
                  onClick={() => handleActivityToggle(activity)}
                >
                  {activity}
                </ActivityButton>
              ))}
            </ActivityGrid>
          </ActivitySection>

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

const QuestionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
`;

const QuestionText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CounterButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const CounterValue = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  min-width: 30px;
  text-align: center;
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

  ${props => props.primary ? `
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

const ActivitySection = styled.div`
  margin-bottom: 30px;
`;

const ActivityTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 20px 0;
  text-align: center;
`;

const ActivityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const ActivityButton = styled.button`
  background: ${props => props.selected ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.selected ? 'white' : '#2c3e50'};
  border: 2px solid ${props => props.selected ? '#667eea' : '#e9ecef'};
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

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

export default AICategorySelect;