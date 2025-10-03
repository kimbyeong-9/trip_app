import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import NoticeListItem from '../components/notice/NoticeListItem';
import NoticeDetailModal from '../components/notice/NoticeDetailModal';
import NoticePagination from '../components/notice/NoticePagination';
import { notices } from '../data/noticesData';


const Notice = () => {
  const navigate = useNavigate();
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 페이지네이션 관련 계산
  const totalPages = Math.ceil(notices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = notices.slice(startIndex, endIndex);

  const handleNoticeClick = (notice) => {
    setSelectedNotice(notice);
    setShowModal(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNotice(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <NoticePage>
      <Navigation />

      <NoticeContainer>
        <PageHeader>
          <BackButton onClick={() => navigate(-1)}>
            ←
          </BackButton>
          <PageTitle>공지사항</PageTitle>
          <PageSubtitle>중요한 소식과 업데이트 내용을 확인하세요</PageSubtitle>
        </PageHeader>

        <NoticeList>
          {currentNotices.length > 0 ? (
            currentNotices.map(notice => (
              <NoticeListItem
                key={notice.id}
                notice={notice}
                onClick={handleNoticeClick}
                formatDate={formatDate}
              />
            ))
          ) : (
            <EmptyNotice>
              <EmptyIcon>📢</EmptyIcon>
              <EmptyTitle>등록된 공지사항이 없습니다</EmptyTitle>
              <EmptyMessage>새로운 공지사항이 등록되면 알려드리겠습니다.</EmptyMessage>
            </EmptyNotice>
          )}
        </NoticeList>

        <NoticePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </NoticeContainer>

      <NoticeDetailModal
        notice={selectedNotice}
        isOpen={showModal}
        onClose={handleCloseModal}
        formatDate={formatDate}
      />
    </NoticePage>
  );
};


const NoticePage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
  padding-bottom: 20px;

  @media (max-width: 1024px) {
    padding-bottom: 100px;
  }
`;

const NoticeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  top: -60px;
  background: #28a745;
  border: none;
  border-radius: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-size: 20px;

  &:hover {
    background: #218838;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PageTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PageSubtitle = styled.p`
  font-size: 18px;
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
`;

const NoticeList = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
`;

const EmptyNotice = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

const EmptyTitle = styled.h3`
  font-size: 24px;
  margin: 0 0 10px 0;
`;

const EmptyMessage = styled.p`
  font-size: 16px;
  margin: 0;
`;

export default Notice;