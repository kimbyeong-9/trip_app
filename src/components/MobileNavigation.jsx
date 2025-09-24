import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const MobileNavContainer = styled.div`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e0e0e0;
  z-index: 1000;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    display: block;
  }
`;

const NavList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 0;
  max-width: 100%;
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #666;
  transition: color 0.3s ease;
  padding: 4px 8px;
  min-width: 0;
  flex: 1;

  &.active {
    color: #3498db;
  }

  &:hover {
    color: #3498db;
  }
`;

const NavIcon = styled.span`
  font-size: 20px;
  margin-bottom: 2px;
`;

const NavLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

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
`;

const ModalIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
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
  background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 152, 0, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 152, 0, 0.6);
  }
`;

const MobileNavigation = () => {
  const location = useLocation();
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  const navItems = [
    {
      path: '/',
      label: '홈',
      icon: '⌂'
    },
    {
      path: '/travel-schedules',
      label: '일정',
      icon: '📅'
    },
    {
      path: '/community',
      label: '커뮤니티',
      icon: '👥'
    },
    {
      path: '/chat-rooms',
      label: '채팅방',
      icon: '◯'
    },
    {
      path: '/gallery-shop',
      label: '갤러리샵',
      icon: '◊'
    }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (e, path) => {
    if (path === '/gallery-shop') {
      e.preventDefault();
      setShowGalleryModal(true);
    }
  };

  const closeGalleryModal = () => {
    setShowGalleryModal(false);
  };

  return (
    <MobileNavContainer>
      <NavList>
        {navItems.map(item => (
          <NavItem
            key={item.path}
            to={item.path}
            className={isActive(item.path) ? 'active' : ''}
            onClick={(e) => handleNavClick(e, item.path)}
          >
            <NavIcon>{item.icon}</NavIcon>
            <NavLabel>{item.label}</NavLabel>
          </NavItem>
        ))}
      </NavList>

      {/* 갤러리샵 준비중 모달 */}
      {showGalleryModal && (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && closeGalleryModal()}>
          <ModalContainer>
            <ModalIcon>🎨</ModalIcon>
            <ModalTitle>갤러리샵 준비중</ModalTitle>
            <ModalMessage>
              갤러리샵 서비스는 현재 준비중입니다.<br />
              더욱 멋진 서비스로 찾아뵙겠습니다!
            </ModalMessage>
            <ModalButton onClick={closeGalleryModal}>
              확인
            </ModalButton>
          </ModalContainer>
        </ModalOverlay>
      )}
    </MobileNavContainer>
  );
};

export default MobileNavigation;