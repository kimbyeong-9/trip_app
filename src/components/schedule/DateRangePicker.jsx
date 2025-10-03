import React from 'react';
import styled from 'styled-components';

const DateRangePicker = ({
  isOpen,
  onClose,
  tempStartDate,
  tempEndDate,
  onStartDateChange,
  onEndDateChange,
  onConfirm
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!tempStartDate || !tempEndDate) {
      alert('여행 시작일과 종료일을 모두 선택해주세요.');
      return;
    }

    const start = new Date(tempStartDate);
    const end = new Date(tempEndDate);

    if (start > end) {
      alert('종료일은 시작일보다 이후여야 합니다.');
      return;
    }

    onConfirm();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>📅 여행 날짜 변경</ModalTitle>
        <DateInputGroup>
          <DateLabel>시작일</DateLabel>
          <DateInput
            type="date"
            value={tempStartDate}
            onChange={(e) => onStartDateChange(e.target.value)}
          />
        </DateInputGroup>
        <DateInputGroup>
          <DateLabel>종료일</DateLabel>
          <DateInput
            type="date"
            value={tempEndDate}
            onChange={(e) => onEndDateChange(e.target.value)}
          />
        </DateInputGroup>
        <ButtonGroup>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
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
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 20px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 25px;
  text-align: center;
`;

const DateInputGroup = styled.div`
  margin-bottom: 20px;
`;

const DateLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 8px;
`;

const DateInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 12px;
  background: #e9ecef;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #495057;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #dee2e6;
  }
`;

const ConfirmButton = styled.button`
  flex: 1;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`;

export default DateRangePicker;
