import React from 'react';
import styled from 'styled-components';

const ConfirmModal = ({ show, title, message, confirmText, cancelText, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <Modal onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <ModalMessage dangerouslySetInnerHTML={{ __html: message }} />
        <ModalButtons>
          <CancelButton onClick={onCancel}>
            {cancelText}
          </CancelButton>
          <ConfirmButton onClick={onConfirm}>
            {confirmText}
          </ConfirmButton>
        </ModalButtons>
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
  color: #dc3545;
  margin: 0 0 15px 0;
`;

const ModalMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  line-height: 1.5;
  margin: 0 0 30px 0;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const CancelButton = styled.button`
  background: #6c757d;
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
    box-shadow: 0 8px 25px rgba(108, 117, 125, 0.6);
    background: #5a6268;
  }
`;

const ConfirmButton = styled.button`
  background: #dc3545;
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
    box-shadow: 0 8px 25px rgba(220, 53, 69, 0.6);
    background: #c82333;
  }
`;

export default ConfirmModal;
