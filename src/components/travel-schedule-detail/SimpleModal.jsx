import React from 'react';
import styled from 'styled-components';

const SimpleModal = ({ show, title, message, buttonText, onClose, isDanger = false }) => {
  if (!show) return null;

  return (
    <Modal onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContent>
        <ModalTitle $isDanger={isDanger}>{title}</ModalTitle>
        <ModalMessage>{message}</ModalMessage>
        <ModalButton $isDanger={isDanger} onClick={onClose}>
          {buttonText}
        </ModalButton>
      </ModalContent>
    </Modal>
  );
};

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  position: relative;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.$isDanger ? '#dc3545' : '#2c3e50'};
  margin: 0 0 15px 0;
`;

const ModalMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  line-height: 1.5;
  margin: 0 0 30px 0;
`;

const ModalButton = styled.button`
  background: ${props => props.$isDanger ? '#dc3545' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${props => props.$isDanger ? 'rgba(220, 53, 69, 0.6)' : 'rgba(102, 126, 234, 0.6)'};
    background: ${props => props.$isDanger ? '#c82333' : 'linear-gradient(135deg, #5a6fd8 0%, #6a4c9a 100%)'};
  }
`;

export default SimpleModal;
