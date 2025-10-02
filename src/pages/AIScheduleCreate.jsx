import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import DateResetModal from '../components/ai/DateResetModal';
import RegionSelector from '../components/ai/RegionSelector';

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

        <RegionSelector
          regions={regions}
          selectedRegion={selectedRegion}
          onSelect={handleRegionSelect}
        />

        <ButtonGroup>
          <ActionButton onClick={handleBack}>
            날짜 변경
          </ActionButton>
          <ActionButton
            $primary
            onClick={handleNext}
            disabled={!selectedRegion}
          >
            다음
          </ActionButton>
        </ButtonGroup>
      </AICreateContainer>

      <DateResetModal
        isOpen={showDateReset}
        startDate={newStartDate}
        endDate={newEndDate}
        onStartDateChange={setNewStartDate}
        onEndDateChange={setNewEndDate}
        onConfirm={handleDateResetConfirm}
        onCancel={handleDateResetCancel}
      />
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

const DateInfo = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
`;

const DateValue = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

export default AIScheduleCreate;