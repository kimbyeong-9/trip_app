import React from 'react';
import styled from 'styled-components';

const SaveSuccessModal = ({ show, onClose }) => {
  return (
    <Modal $show={show} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContent $show={show}>
        <ModalTitle>저장 완료!</ModalTitle>
        <ModalMessage>
          일정이 관심 일정에 저장되었습니다.<br />
          마이페이지에서 확인하실 수 있습니다.
        </ModalMessage>
        <ModalButton onClick={onClose}>
          확인
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: ${props => props.$show ? 1 : 0};
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  transform: ${props => props.$show ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)'};
  transition: all 0.3s ease;
`;

const ModalTitle = styled.h3`
  font-size: 24px;
  color: #2c3e50;
  margin: 0 0 16px 0;
  font-weight: 700;
`;

const ModalMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 30px 0;
  line-height: 1.6;
`;

const ModalButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }
`;

export default SaveSuccessModal;
