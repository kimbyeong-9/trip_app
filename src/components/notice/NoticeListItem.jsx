import React from 'react';
import styled from 'styled-components';

const NoticeListItem = ({ notice, onClick, formatDate }) => {
  return (
    <NoticeItem onClick={() => onClick(notice)}>
      <NoticeHeader>
        <NoticeTitle>{notice.title}</NoticeTitle>
        <NoticeMeta>
          <NoticeType type={notice.type}>{notice.type}</NoticeType>
          <NoticeDate>{formatDate(notice.date)}</NoticeDate>
        </NoticeMeta>
      </NoticeHeader>
      <NoticePreview>{notice.preview}</NoticePreview>
    </NoticeItem>
  );
};

const NoticeItem = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #f8f9fa;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    margin: 0 -30px;
    padding: 20px 30px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NoticeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const NoticeTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  line-height: 1.4;
`;

const NoticeMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #6c757d;
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

const NoticePreview = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default NoticeListItem;
