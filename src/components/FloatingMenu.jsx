import React from 'react';
import styled from 'styled-components';

const FloatingMenu = ({
  isFloatingMenuOpen,
  toggleFloatingMenu,
  handleFloatingSubMenuClick,
  handleCompanionClick
}) => {
  return (
    <FloatingButtons onClick={(e) => e.stopPropagation()}>
      <MenuButton
        className={isFloatingMenuOpen ? 'active' : ''}
        onClick={toggleFloatingMenu}
      >
        <CompanionIcon>
          {isFloatingMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </CompanionIcon>
        <CompanionText className="menu-text">메뉴</CompanionText>
      </MenuButton>

      <SubMenuContainer $isOpen={isFloatingMenuOpen}>
        <SubMenuButton
          color="#667eea"
          onClick={() => handleFloatingSubMenuClick('/community')}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 17v2H2v-2s0-4 7-4 7 4 7 4zm-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5zm3.44 11.5A5.5 5.5 0 0 1 22 13.5a5.5 5.5 0 0 1-5.06-7.5 3.5 3.5 0 1 0-1 7z"/>
          </svg>
          커뮤니티
        </SubMenuButton>

        <SubMenuButton
          color="#ff9800"
          onClick={() => handleFloatingSubMenuClick('/gallery-shop')}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
          갤러리샵
        </SubMenuButton>

        <SubMenuButton
          color="#4caf50"
          onClick={() => handleFloatingSubMenuClick('/notice')}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          공지사항
        </SubMenuButton>
      </SubMenuContainer>

      <CompanionButton onClick={handleCompanionClick}>
        <CompanionIcon>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4C18.2091 4 20 5.79086 20 8C20 10.2091 18.2091 12 16 12C13.7909 12 12 10.2091 12 8C12 5.79086 13.7909 4 16 4Z" fill="white"/>
            <path d="M8 6C9.65685 6 11 7.34315 11 9C11 10.6569 9.65685 12 8 12C6.34315 12 5 10.6569 5 9C5 7.34315 6.34315 6 8 6Z" fill="white"/>
            <path d="M8 14C11.866 14 15 17.134 15 21H1C1 17.134 4.134 14 8 14Z" fill="white"/>
            <path d="M16.5 14C19.538 14 22 16.462 22 19.5V21H16V19.5C16 17.567 15.433 15.783 14.461 14.301C15.099 14.108 15.787 14 16.5 14Z" fill="white"/>
          </svg>
        </CompanionIcon>
        <CompanionText>동행{"\n"}모집</CompanionText>
      </CompanionButton>
    </FloatingButtons>
  );
};

const FloatingButtons = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;

  @media (max-width: 1024px) {
    bottom: 110px;
  }
`;

const CompanionButton = styled.button`
  background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
  color: white;
  border: none;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(255, 152, 0, 0.4);
  font-size: 12px;
  font-weight: 600;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(255, 152, 0, 0.6);
  }
`;

const CompanionIcon = styled.div`
  margin-bottom: 4px;
`;

const CompanionText = styled.span`
  white-space: pre-line;
  text-align: center;
  line-height: 1.2;
`;

const MenuButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  font-size: 12px;
  font-weight: 600;
  position: relative;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
  }

  &.active {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
  }

  &.active .menu-text {
    display: none;
  }

  &.active ${CompanionIcon} {
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const SubMenuContainer = styled.div`
  position: absolute;
  bottom: 200px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transform: ${props => props.$isOpen ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.8)'};
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  align-items: center;
`;

const SubMenuButton = styled.button`
  background: white;
  border: 2px solid ${props => props.color || '#667eea'};
  color: ${props => props.color || '#667eea'};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-size: 8px;
  font-weight: 600;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;

  &:hover {
    background: ${props => props.color || '#667eea'};
    color: white;
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  svg {
    width: 18px;
    height: 18px;
    margin-bottom: 1px;
    flex-shrink: 0;
  }
`;

export default FloatingMenu;
