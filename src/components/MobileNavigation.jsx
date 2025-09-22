import React from 'react';
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

const MobileNavigation = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      label: '홈',
      icon: '🏠'
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
      path: '/companion-list',
      label: '동행모집',
      icon: '🤝'
    },
    {
      path: '/gallery-shop',
      label: '갤러리샵',
      icon: '🖼️'
    }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <MobileNavContainer>
      <NavList>
        {navItems.map(item => (
          <NavItem
            key={item.path}
            to={item.path}
            className={isActive(item.path) ? 'active' : ''}
          >
            <NavIcon>{item.icon}</NavIcon>
            <NavLabel>{item.label}</NavLabel>
          </NavItem>
        ))}
      </NavList>
    </MobileNavContainer>
  );
};

export default MobileNavigation;