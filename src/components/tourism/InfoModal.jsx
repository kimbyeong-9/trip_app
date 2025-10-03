import React from 'react';
import styled from 'styled-components';

const InfoModal = ({ show, onClose, icon, title, message, buttonText, onButtonClick }) => {
  if (!show) return null;

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContainer>
        <ModalIcon>{icon}</ModalIcon>
        <ModalTitle>{title}</ModalTitle>
        <ModalMessage dangerouslySetInnerHTML={{ __html: message }} />
        <ModalButton onClick={onButtonClick || onClose}>
          {buttonText || '확인'}
        </ModalButton>
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
  z-index: 9999;
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

const ModalIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const ModalTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const ModalMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 30px 0;
  line-height: 1.6;
`;

const ModalButton = styled.button`
  background: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(76, 175, 80, 0.6);
  }
`;

export default InfoModal;
