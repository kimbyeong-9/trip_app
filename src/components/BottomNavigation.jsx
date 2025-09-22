import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { 
      path: '/', 
      label: '홈', 
      icon: '🏠'
    },
    { 
      path: '/insurance', 
      label: '여행보험', 
      icon: '📋'
    },
    { 
      path: '/schedule', 
      label: '일정', 
      icon: '📅'
    },
    { 
      path: '/marketplace', 
      label: '이미지판매', 
      icon: '🖼️'
    },
    { 
      path: '/community', 
      label: '커뮤니티', 
      icon: '👥'
    }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="bottom-navigation">
      <div className="bottom-nav-container">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`bottom-nav-item ${isActive(item.path) ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
