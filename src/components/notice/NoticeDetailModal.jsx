import React from 'react';
import styled from 'styled-components';

const NoticeDetailModal = ({ notice, isOpen, onClose, formatDate }) => {
  if (!isOpen || !notice) return null;

  return (
    <NoticeModal onClick={(e) => e.target === e.currentTarget && onClose()}>
      <NoticeModalContainer>
        <ModalHeader>
          <ModalTitle>{notice.title}</ModalTitle>
          <ModalClose onClick={onClose}>×</ModalClose>
        </ModalHeader>
        <ModalMeta>
          <div>
            <NoticeType type={notice.type}>{notice.type}</NoticeType>
          </div>
          <NoticeDate>{formatDate(notice.date)}</NoticeDate>
        </ModalMeta>
        <ModalContent>{notice.content}</ModalContent>
      </NoticeModalContainer>
    </NoticeModal>
  );
};

const NoticeModal = styled.div`
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

const NoticeModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;

  @media (max-width: 480px) {
    max-width: 90vw;
    padding: 30px 20px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f8f9fa;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  line-height: 1.3;
  flex: 1;
  margin-right: 20px;
`;

const ModalClose = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6c757d;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #495057;
  }
`;

const ModalContent = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #495057;
  white-space: pre-line;
`;

const ModalMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
  color: #6c757d;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const NoticeDate = styled.span`
  font-weight: 500;
`;

const NoticeType = styled.span`
  background: ${props => {
    switch (props.type) {
      case '중요': return 'linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)';
      case '업데이트': return 'linear-gradient(135deg, #007bff 0%, #6f42c1 100%)';
      case '이벤트': return 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
      default: return 'linear-gradient(135deg, #6c757d 0%, #adb5bd 100%)';
    }
  }};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

export default NoticeDetailModal;
