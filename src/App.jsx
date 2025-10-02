import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import WebsiteFooter from './components/WebsiteFooter';
import MobileNavigation from './components/MobileNavigation';
import AppRouter from './router/router';
import './App.css';

// 페이지 이동 시 스크롤을 맨 위로 이동하는 컴포넌트
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isForgotPasswordPage = location.pathname === '/forgot-password';
  const isSignupPage = location.pathname === '/signup';
  const isSocialSignupPage = location.pathname === '/social-signup';
  const isCompanionListPage = location.pathname === '/companion-list';
  const isCompanionCreatePage = location.pathname === '/companion/create';
  const isCompanionEditPage = location.pathname.startsWith('/companion/edit/');
  const isCompanionDetailPage = location.pathname.startsWith('/companion/');
  const isTravelSchedulePage = location.pathname.startsWith('/travel-schedule');
  const isDirectScheduleCreatePage = location.pathname === '/direct-schedule-create';
  const isAIScheduleCreatePage = location.pathname === '/ai-schedule-create';
  const isAICategorySelectPage = location.pathname === '/ai-category-select';
  const isUserProfilePage = location.pathname.startsWith('/profile/');
  const isProfileEditPage = location.pathname === '/profile-edit';
  const isChatRoomListPage = location.pathname === '/chat-room-list';
  const isChatRoomCreatePage = location.pathname === '/chat-room-create';

  return (
    <div className="App">
      <ScrollToTop />
      {!isLoginPage && !isForgotPasswordPage && !isSignupPage && !isSocialSignupPage && !isCompanionCreatePage && !isCompanionEditPage && !isCompanionDetailPage && !isTravelSchedulePage && !isDirectScheduleCreatePage && !isAIScheduleCreatePage && !isAICategorySelectPage && !isUserProfilePage && !isProfileEditPage && !isChatRoomListPage && !isChatRoomCreatePage && <Navigation />}
      <main className={isLoginPage || isForgotPasswordPage || isSignupPage || isSocialSignupPage ? "login-main-content" : isCompanionListPage || isCompanionCreatePage || isCompanionEditPage || isCompanionDetailPage || isTravelSchedulePage || isDirectScheduleCreatePage || isAIScheduleCreatePage || isAICategorySelectPage || isUserProfilePage || isProfileEditPage || isChatRoomListPage || isChatRoomCreatePage ? "companion-main-content" : "main-content"}>
        <AppRouter />
      </main>
      {!isLoginPage && !isForgotPasswordPage && !isSignupPage && !isSocialSignupPage && !isProfileEditPage && <WebsiteFooter />}
      {!isLoginPage && !isForgotPasswordPage && !isSignupPage && !isSocialSignupPage && <MobileNavigation />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
