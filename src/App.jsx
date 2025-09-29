import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import WebsiteFooter from './components/WebsiteFooter';
import MobileNavigation from './components/MobileNavigation';
import Home from './pages/Home';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Booking from './pages/Booking';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import CompanionList from './pages/CompanionList';
import CompanionCreate from './pages/CompanionCreate';
import CompanionEdit from './pages/CompanionEdit';
import CompanionDetail from './pages/CompanionDetail';
import TravelScheduleList from './pages/TravelScheduleList';
import TravelScheduleDetail from './pages/TravelScheduleDetail';
import TravelScheduleEdit from './pages/TravelScheduleEdit';
import DirectScheduleCreate from './pages/DirectScheduleCreate';
import AIScheduleCreate from './pages/AIScheduleCreate';
import AICategorySelect from './pages/AICategorySelect';
import UserProfile from './pages/UserProfile';
import ProfileEdit from './pages/ProfileEdit';
import MagazineList from './pages/MagazineList';
import Community from './pages/Community';
import TourismList from './pages/TourismList';
import Settings from './pages/Settings';
import Notice from './pages/Notice';
import CustomerSupport from './pages/CustomerSupport';
import FAQ from './pages/FAQ';
import ChatRoomList from './pages/ChatRoomList';
import ChatRoomCreate from './pages/ChatRoomCreate';
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
      {!isLoginPage && !isForgotPasswordPage && !isSignupPage && !isCompanionCreatePage && !isCompanionEditPage && !isCompanionDetailPage && !isTravelSchedulePage && !isDirectScheduleCreatePage && !isAIScheduleCreatePage && !isAICategorySelectPage && !isUserProfilePage && !isProfileEditPage && !isChatRoomListPage && !isChatRoomCreatePage && <Navigation />}
      <main className={isLoginPage || isForgotPasswordPage || isSignupPage ? "login-main-content" : isCompanionListPage || isCompanionCreatePage || isCompanionEditPage || isCompanionDetailPage || isTravelSchedulePage || isDirectScheduleCreatePage || isAIScheduleCreatePage || isAICategorySelectPage || isUserProfilePage || isProfileEditPage || isChatRoomListPage || isChatRoomCreatePage ? "companion-main-content" : "main-content"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/companion-list" element={<CompanionList />} />
          <Route path="/companion/create" element={<CompanionCreate />} />
          <Route path="/companion/edit/:id" element={<CompanionEdit />} />
          <Route path="/companion/:id" element={<CompanionDetail />} />
          <Route path="/travel-schedules" element={<TravelScheduleList />} />
          <Route path="/travel-schedule/:id" element={<TravelScheduleDetail />} />
          <Route path="/travel-schedule/edit/:id" element={<TravelScheduleEdit />} />
          <Route path="/direct-schedule-create" element={<DirectScheduleCreate />} />
          <Route path="/ai-schedule-create" element={<AIScheduleCreate />} />
          <Route path="/ai-category-select" element={<AICategorySelect />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profile/:username" element={<UserProfile />} />
          <Route path="/profile-edit" element={<ProfileEdit />} />
          <Route path="/magazines" element={<MagazineList />} />
          <Route path="/community" element={<Community />} />
          <Route path="/tourism-list" element={<TourismList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/customer-support" element={<CustomerSupport />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/chat-room-list" element={<ChatRoomList />} />
          <Route path="/chat-room-create" element={<ChatRoomCreate />} />
        </Routes>
      </main>
      {!isLoginPage && !isForgotPasswordPage && !isSignupPage && !isProfileEditPage && <WebsiteFooter />}
      {!isLoginPage && !isForgotPasswordPage && !isSignupPage && <MobileNavigation />}
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