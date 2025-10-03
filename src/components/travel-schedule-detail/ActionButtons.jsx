import React from 'react';
import styled from 'styled-components';

const ActionButtons = ({
  isUserSchedule,
  onSave,
  onCoupon,
  onEdit,
  onDelete
}) => {
  return (
    <ButtonsContainer>
      {!isUserSchedule ? (
        <>
          <SaveButton onClick={onSave}>
            <SaveIcon>⭐</SaveIcon>
            관심 일정에 저장
          </SaveButton>
          <CouponButton onClick={onCoupon}>
            <CouponIcon>🎫</CouponIcon>
            쿠폰 받기
          </CouponButton>
        </>
      ) : (
        <>
          <EditButton onClick={onEdit}>
            ✏️ 일정 수정
          </EditButton>
          <DeleteButton onClick={onDelete}>
            🗑️ 일정 삭제
          </DeleteButton>
        </>
      )}
    </ButtonsContainer>
  );
};

const ButtonsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin: 30px 0;
  flex-wrap: wrap;
`;

const SaveButton = styled.button`
  flex: 1;
  min-width: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px 48px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SaveIcon = styled.span`
  font-size: 20px;
`;

const CouponButton = styled.button`
  flex: 1;
  min-width: 200px;
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 16px 48px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);

  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CouponIcon = styled.span`
  font-size: 20px;
`;

const EditButton = styled.button`
  flex: 1;
  min-width: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px 48px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
  }

  &:active {
    transform: translateY(0);
  }
`;

const DeleteButton = styled.button`
  flex: 1;
  min-width: 200px;
  background: #dc3545;
  color: white;
  border: none;
  padding: 16px 48px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(220, 53, 69, 0.6);
    background: #c82333;
  }

  &:active {
    transform: translateY(0);
  }
`;

export default ActionButtons;
