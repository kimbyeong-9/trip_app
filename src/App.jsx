import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import BottomNavigation from './components/BottomNavigation';
import WebsiteFooter from './components/WebsiteFooter';
import Home from './pages/Home';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Booking from './pages/Booking';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import CompanionList from './pages/CompanionList';
import CompanionCreate from './pages/CompanionCreate';
import CompanionDetail from './pages/CompanionDetail';
import TravelScheduleList from './pages/TravelScheduleList';
import TravelScheduleDetail from './pages/TravelScheduleDetail';
import TravelScheduleCreate from './pages/TravelScheduleCreate';
import UserProfile from './pages/UserProfile';
import ProfileEdit from './pages/ProfileEdit';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isForgotPasswordPage = location.pathname === '/forgot-password';
  const isSignupPage = location.pathname === '/signup';
  const isCompanionListPage = location.pathname === '/companion-list';
  const isCompanionCreatePage = location.pathname === '/companion/create';
  const isCompanionDetailPage = location.pathname.startsWith('/companion/');
  const isTravelSchedulePage = location.pathname.startsWith('/travel-schedule');
  const isTravelScheduleCreatePage = location.pathname === '/travel-schedule/create';
  const isUserProfilePage = location.pathname.startsWith('/profile/');
  const isProfileEditPage = location.pathname === '/profile-edit';

  return (
    <div className="App">
      {!isLoginPage && !isForgotPasswordPage && !isSignupPage && !isCompanionCreatePage && !isCompanionDetailPage && !isTravelSchedulePage && !isUserProfilePage && !isProfileEditPage && <Navigation />}
      <main className={isLoginPage || isForgotPasswordPage || isSignupPage ? "login-main-content" : isCompanionListPage || isCompanionCreatePage || isCompanionDetailPage || isTravelSchedulePage || isUserProfilePage || isProfileEditPage ? "companion-main-content" : "main-content"}>
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
          <Route path="/companion/:id" element={<CompanionDetail />} />
          <Route path="/travel-schedules" element={<TravelScheduleList />} />
          <Route path="/travel-schedule/:id" element={<TravelScheduleDetail />} />
          <Route path="/travel-schedule/create" element={<TravelScheduleCreate />} />
          <Route path="/profile/:username" element={<UserProfile />} />
          <Route path="/profile-edit" element={<ProfileEdit />} />
        </Routes>
      </main>
      {!isLoginPage && !isForgotPasswordPage && !isSignupPage && <WebsiteFooter />}
      {!isLoginPage && !isForgotPasswordPage && !isSignupPage && !isCompanionListPage && !isCompanionCreatePage && !isCompanionDetailPage && !isTravelSchedulePage && !isUserProfilePage && !isProfileEditPage && <BottomNavigation />}
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