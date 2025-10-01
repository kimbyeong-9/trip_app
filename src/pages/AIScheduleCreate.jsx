import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';



const AIScheduleCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRegion, setSelectedRegion] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showDateReset, setShowDateReset] = useState(false);
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');

  // URL에서 날짜 정보 추출
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const start = params.get('startDate');
    const end = params.get('endDate');

    if (start && end) {
      setStartDate(start);
      setEndDate(end);
    }
  }, [location]);

  // 현재 로그인한 사용자 정보 가져오기
  const getCurrentUser = () => {
    try {
      const loginData = localStorage.getItem('loginData') || sessionStorage.getItem('loginData');
      return loginData ? JSON.parse(loginData) : null;
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error);
      return null;
    }
  };

  const currentUser = getCurrentUser();
  const userName = currentUser?.user?.name || '여행자';

  // 지역 데이터
  const regions = [
    { id: 'seoul', name: '서울' },
    { id: 'busan', name: '부산' },
    { id: 'jeju', name: '제주' },
    { id: 'gangwon', name: '강원' },
    { id: 'gyeonggi', name: '경기' },
    { id: 'incheon', name: '인천' },
    { id: 'chungcheong', name: '충청' },
    { id: 'jeolla', name: '전라' },
    { id: 'gyeongsang', name: '경상' },
  ];

  const handleRegionSelect = (regionId) => {
    setSelectedRegion(regionId);
  };

  const handleNext = () => {
    if (!selectedRegion) {
      alert('여행 지역을 선택해주세요.');
      return;
    }

    // 다음 단계인 카테고리 선택으로 이동
    navigate(`/ai-category-select?region=${selectedRegion}&startDate=${startDate}&endDate=${endDate}`);
  };

  const handleBack = () => {
    setNewStartDate(startDate);
    setNewEndDate(endDate);
    setShowDateReset(true);
  };

  const handleClose = () => {
    navigate('/travel-schedules');
  };

  const handleDateResetConfirm = () => {
    if (newStartDate && newEndDate) {
      setStartDate(newStartDate);
      setEndDate(newEndDate);
      setShowDateReset(false);
      // URL도 업데이트
      navigate(`/ai-schedule-create?startDate=${newStartDate}&endDate=${newEndDate}`, { replace: true });
    } else {
      alert('출발일과 도착일을 모두 선택해주세요.');
    }
  };

  const handleDateResetCancel = () => {
    setShowDateReset(false);
    setNewStartDate('');
    setNewEndDate('');
    navigate('/travel-schedules');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <AIScheduleCreateModal onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <AICreateContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>
          ×
        </CloseButton>

        <WelcomeSection>
          <WelcomeTitle>안녕하세요 {userName}님!</WelcomeTitle>
          <WelcomeMessage>
            어디로 여행을 떠나시나요?<br />
            AI가 맞춤형 여행 일정을 만들어드릴게요!
          </WelcomeMessage>

          {startDate && endDate && (
            <DateInfo>
              <DateValue>
                {formatDate(startDate)} ~ {formatDate(endDate)}
              </DateValue>
            </DateInfo>
          )}
        </WelcomeSection>

        <RegionSelectionSection>
          <SectionTitle>여행 지역 선택</SectionTitle>

          <RegionGrid>
            {regions.map((region) => (
              <RegionButton
                key={region.id}
                selected={selectedRegion === region.id}
                onClick={() => handleRegionSelect(region.id)}
              >
                <RegionName>{region.name}</RegionName>
              </RegionButton>
            ))}
          </RegionGrid>

          <ButtonGroup>
            <ActionButton onClick={handleBack}>
              날짜 변경
            </ActionButton>
            <ActionButton
              primary
              onClick={handleNext}
              disabled={!selectedRegion}
            >
              다음
            </ActionButton>
          </ButtonGroup>
        </RegionSelectionSection>
      </AICreateContainer>

      {/* 날짜 재설정 모달 */}
      {showDateReset && (
        <DateResetModal onClick={(e) => e.target === e.currentTarget && handleDateResetCancel()}>
          <DateResetContainer onClick={(e) => e.stopPropagation()}>
            <DateResetTitle>여행 날짜 재설정</DateResetTitle>

            <DateInputContainer>
              <DateInputGroup>
                <DateInputLabel>시작일</DateInputLabel>
                <DateInput
                  type="date"
                  value={newStartDate}
                  onChange={(e) => setNewStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </DateInputGroup>

              <DateInputGroup>
                <DateInputLabel>종료일</DateInputLabel>
                <DateInput
                  type="date"
                  value={newEndDate}
                  onChange={(e) => setNewEndDate(e.target.value)}
                  min={newStartDate || new Date().toISOString().split('T')[0]}
                />
              </DateInputGroup>
            </DateInputContainer>

            <DateResetButtonGroup>
              <DateResetButton onClick={handleDateResetCancel}>
                취소
              </DateResetButton>
              <DateResetButton primary onClick={handleDateResetConfirm}>
                확인
              </DateResetButton>
            </DateResetButtonGroup>
          </DateResetContainer>
        </DateResetModal>
      )}
    </AIScheduleCreateModal>
  );
};


const AIScheduleCreateModal = styled.div`
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

const AICreateContainer = styled.div`
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

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const WelcomeTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const WelcomeMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 20px 0;
  line-height: 1.6;
`;

const RegionSelectionSection = styled.div`
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
  text-align: center;
`;

const SectionDescription = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0 0 25px 0;
  text-align: center;
  line-height: 1.5;
`;

const RegionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 30px;
`;

const RegionButton = styled.button`
  background: ${props => props.selected ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.selected ? 'white' : '#2c3e50'};
  border: 2px solid ${props => props.selected ? '#667eea' : '#e9ecef'};
  border-radius: 12px;
  padding: 15px 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-height: 80px;
  justify-content: center;

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

const RegionEmoji = styled.span`
  font-size: 20px;
  margin-bottom: 2px;
`;

const RegionName = styled.span`
  font-size: 13px;
  font-weight: 600;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 25px;
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

const DateInfo = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
`;

const DateLabel = styled.span`
  font-size: 13px;
  opacity: 0.9;
  display: block;
  margin-bottom: 4px;
`;

const DateValue = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

// 날짜 재설정 모달 스타일
const DateResetModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 20px;
`;

const DateResetContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const DateResetTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
  text-align: center;
`;

const DateInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 25px;
`;

const DateInputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateInputLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
`;

const DateInput = styled.input`
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const DateResetButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const DateResetButton = styled.button`
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 14px;
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
  ` : `
    background: #6c757d;
    color: white;

    &:hover {
      background: #5a6268;
    }
  `}
`;


export default AIScheduleCreate;