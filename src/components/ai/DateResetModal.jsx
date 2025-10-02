import React from 'react';
import styled from 'styled-components';

const DateResetModal = ({ isOpen, startDate, endDate, onConfirm, onCancel, onStartDateChange, onEndDateChange }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalTitle>여행 날짜 재설정</ModalTitle>

        <DateInputContainer>
          <DateInputGroup>
            <DateInputLabel>시작일</DateInputLabel>
            <DateInput
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </DateInputGroup>

          <DateInputGroup>
            <DateInputLabel>종료일</DateInputLabel>
            <DateInput
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              min={startDate || new Date().toISOString().split('T')[0]}
            />
          </DateInputGroup>
        </DateInputContainer>

        <ButtonGroup>
          <Button onClick={onCancel}>
            취소
          </Button>
          <Button $primary onClick={onConfirm}>
            확인
          </Button>
        </ButtonGroup>
      </ModalContainer>
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
  z-index: 1001;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h3`
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const Button = styled.button`
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 14px;
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
  ` : `
    background: #6c757d;
    color: white;

    &:hover {
      background: #5a6268;
    }
  `}
`;

export default DateResetModal;
