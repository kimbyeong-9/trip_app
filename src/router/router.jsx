import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Search from '../pages/Search';
import Booking from '../pages/Booking';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Signup from '../pages/Signup';
import SocialSignup from '../pages/SocialSignup';
import CompanionList from '../pages/CompanionList';
import CompanionCreate from '../pages/CompanionCreate';
import CompanionEdit from '../pages/CompanionEdit';
import CompanionDetail from '../pages/CompanionDetail';
import TravelScheduleList from '../pages/TravelScheduleList';
import TravelScheduleDetail from '../pages/TravelScheduleDetail';
import TravelScheduleEdit from '../pages/TravelScheduleEdit';
import DirectScheduleCreate from '../pages/DirectScheduleCreate';
import AIScheduleCreate from '../pages/AIScheduleCreate';
import AICategorySelect from '../pages/AICategorySelect';
import UserProfile from '../pages/UserProfile';
import ProfileEdit from '../pages/ProfileEdit';
import MagazineList from '../pages/MagazineList';
import Community from '../pages/Community';
import TourismList from '../pages/TourismList';
import Settings from '../pages/Settings';
import Notice from '../pages/Notice';
import CustomerSupport from '../pages/CustomerSupport';
import FAQ from '../pages/FAQ';
import ChatRoomList from '../pages/ChatRoomList';
import ChatRoomCreate from '../pages/ChatRoomCreate';
import PrivacyPolicy from '../pages/PrivacyPolicy';

// 라우트 설정 객체
const routes = [
  // 메인 페이지
  { path: '/', element: Home },

  // 검색 및 예약
  { path: '/search', element: Search },
  { path: '/booking/:id', element: Booking },

  // 인증 관련
  { path: '/login', element: Login },
  { path: '/forgot-password', element: ForgotPassword },
  { path: '/signup', element: Signup },
  { path: '/social-signup', element: SocialSignup },

  // 동행 모집
  { path: '/companion-list', element: CompanionList },
  { path: '/companion/create', element: CompanionCreate },
  { path: '/companion/edit/:id', element: CompanionEdit },
  { path: '/companion/:id', element: CompanionDetail },

  // 여행 일정
  { path: '/travel-schedules', element: TravelScheduleList },
  { path: '/travel-schedule/:id', element: TravelScheduleDetail },
  { path: '/travel-schedule/edit/:id', element: TravelScheduleEdit },
  { path: '/direct-schedule-create', element: DirectScheduleCreate },
  { path: '/ai-schedule-create', element: AIScheduleCreate },
  { path: '/ai-category-select', element: AICategorySelect },

  // 프로필
  { path: '/profile', element: UserProfile },
  { path: '/profile/:username', element: UserProfile },
  { path: '/profile-edit', element: ProfileEdit },

  // 커뮤니티
  { path: '/magazines', element: MagazineList },
  { path: '/community', element: Community },
  { path: '/tourism-list', element: TourismList },

  // 채팅
  { path: '/chat-room-list', element: ChatRoomList },
  { path: '/chat-room-create', element: ChatRoomCreate },

  // 설정 및 고객지원
  { path: '/settings', element: Settings },
  { path: '/notice', element: Notice },
  { path: '/customer-support', element: CustomerSupport },
  { path: '/faq', element: FAQ },
  { path: '/privacy-policy', element: PrivacyPolicy },
];

function AppRouter() {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<route.element />}
        />
      ))}
    </Routes>
  );
}

export default AppRouter;
