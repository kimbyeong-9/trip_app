import React from 'react';
import styled from 'styled-components';

const LoginModal = ({ show, onClose, onLogin }) => {
  if (!show) return null;

  return (
    <Modal onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalIcon>🔒</ModalIcon>
        <ModalTitle>로그인이 필요합니다</ModalTitle>
        <ModalMessage>로그인 후 이용가능 합니다</ModalMessage>
        <ModalButtons>
          <ModalButton $primary onClick={onLogin}>로그인</ModalButton>
          <ModalButton onClick={onClose}>취소</ModalButton>
        </ModalButtons>
      </ModalContainer>
    </Modal>
  );
};

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px 30px 30px 30px;
  text-align: center;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
`;

const ModalIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h3`
  font-size: 24px;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const ModalMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 25px 0;
  line-height: 1.5;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const ModalButton = styled.button`
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  ${props => props.$primary ? `
    background: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(76, 175, 80, 0.6);
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

export default LoginModal;
