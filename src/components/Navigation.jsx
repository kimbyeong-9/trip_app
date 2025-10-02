import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';



const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [loginData, setLoginData] = useState(null);
  const [showNoResultsModal, setShowNoResultsModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [noResultsMessage, setNoResultsMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // 알림 데이터 (실제 앱에서는 API로 가져옴)
  const [notifications] = useState([
    {
      id: 1,
      title: '새로운 업데이트',
      message: '여행대로 앱이 v2.1.0으로 업데이트되었습니다. 새로운 기능을 확인해보세요!',
      time: '2시간 전',
      isRead: false,
      type: 'update'
    },
    {
      id: 2,
      title: '서비스 점검 안내',
      message: '2024년 1월 30일 오전 2:00~4:00 시스템 점검이 있을 예정입니다.',
      time: '1일 전',
      isRead: false,
      type: 'maintenance'
    },
    {
      id: 3,
      title: '새로운 여행지 추가',
      message: '제주도의 숨겨진 명소 10곳이 새롭게 추가되었습니다.',
      time: '3일 전',
      isRead: true,
      type: 'feature'
    },
    {
      id: 4,
      title: '커뮤니티 이벤트',
      message: '여행 후기 작성하고 선물을 받아가세요! 이벤트 기간: ~1/31',
      time: '1주일 전',
      isRead: true,
      type: 'event'
    }
  ]);

  // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = () => {
      const localData = localStorage.getItem('loginData');
      const sessionData = sessionStorage.getItem('loginData');
      
      if (localData) {
        setLoginData(JSON.parse(localData));
      } else if (sessionData) {
        setLoginData(JSON.parse(sessionData));
      } else {
        setLoginData(null);
      }
    };

    checkLoginStatus();
    
    // 페이지 이동 시마다 로그인 상태 확인
    const interval = setInterval(checkLoginStatus, 1000);
    return () => clearInterval(interval);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      
      // 스마트 검색 로직
      if (query === '일정' || query === '여행일정' || query === 'travel' || query === 'schedule') {
        // 일정 페이지로 이동
        navigate('/travel-schedules');
      } else if (query === '동행' || query === '동행모집' || query === 'companion') {
        // 동행모집 페이지로 이동
        navigate('/companion-list');
      } else if (['서울', '부산', '제주', '경기', '강원', '전라', '충청', '경상', '인천'].includes(query)) {
        // 지역 검색 - 홈페이지에서 해당 지역 필터링
        navigate(`/?region=${encodeURIComponent(query)}`);
      } else if (query === '로그인' || query === 'login') {
        // 로그인 페이지로 이동
        navigate('/login');
      } else if (query === '회원가입' || query === 'signup' || query === 'register') {
        // 회원가입 페이지로 이동
        navigate('/signup');
      } else {
        // 검색 결과가 없을 때 모달 표시
        setNoResultsMessage(`"${searchQuery}"에 관한 내용이 없습니다.`);
        setShowNoResultsModal(true);
      }
    }
  };

  const closeNoResultsModal = () => {
    setShowNoResultsModal(false);
    setNoResultsMessage('');
  };

  const handleMobileSearch = (e) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      const query = mobileSearchQuery.trim().toLowerCase();

      // 동일한 검색 로직 적용
      if (query === '일정' || query === '여행일정' || query === 'travel' || query === 'schedule') {
        navigate('/travel-schedules');
      } else if (query === '동행' || query === '동행모집' || query === 'companion') {
        navigate('/companion-list');
      } else if (['서울', '부산', '제주', '경기', '강원', '전라', '충청', '경상', '인천'].includes(query)) {
        navigate(`/?region=${encodeURIComponent(query)}`);
      } else if (query === '로그인' || query === 'login') {
        navigate('/login');
      } else if (query === '회원가입' || query === 'signup' || query === 'register') {
        navigate('/signup');
      } else {
        setNoResultsMessage(`"${mobileSearchQuery}"에 관한 내용이 없습니다.`);
        setShowNoResultsModal(true);
      }

      // 검색 후 모바일 검색창 닫기
      setIsMobileSearchOpen(false);
      setMobileSearchQuery('');
    }
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if (!isMobileSearchOpen) {
      // 검색창이 열릴 때 다른 메뉴들 닫기
      setIsMenuOpen(false);
    }
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (!isNotificationOpen) {
      // 알림창이 열릴 때 다른 메뉴들 닫기
      setIsMenuOpen(false);
      setIsMobileSearchOpen(false);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      localStorage.removeItem('loginData');
      sessionStorage.removeItem('loginData');
      setLoginData(null);
      navigate('/');
    }
  };

  const handleMenuClick = (path, e) => {
    e.preventDefault();
    if (!loginData) {
      setShowLoginModal(true);
    } else {
      navigate(path);
      setIsMenuOpen(false);
    }
  };

  const handleLoginClick = () => {
    setShowLoginModal(false);
    navigate('/login');
  };

  return (
    <NavigationContainer>
      <NavContainer>
        <NavLeft>
          <NavButton
            className="hamburger-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            title="메뉴"
          >
            ☰
          </NavButton>

          {location.pathname === '/' && (
            <Logo to="/">
              여행대로
            </Logo>
          )}
        </NavLeft>

        <NavCenter>
          {location.pathname === '/' ? (
            <>
              <SearchForm onSubmit={handleSearch}>
                <SearchInput
                  type="text"
                  placeholder="여행지, 일정, 동행 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchButton type="submit">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </SearchButton>
              </SearchForm>
              <NavLogoCenter to="/" style={{ display: 'none' }} className="mobile-logo">여행대로</NavLogoCenter>
            </>
          ) : (
            <NavLogoCenter to="/">여행대로</NavLogoCenter>
          )}
        </NavCenter>

        <NavRight>
          <MobileSearchIcon
            onClick={toggleMobileSearch}
            title="검색"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </MobileSearchIcon>

          {loginData && (
            <NotificationButton>
              <NavButton
                className="notification-button"
                onClick={handleNotificationClick}
                title="알림"
                style={{ position: 'relative' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {unreadCount > 0 && (
                  <NotificationBadge style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    fontSize: '10px',
                    minWidth: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {unreadCount}
                  </NotificationBadge>
                )}
              </NavButton>

              <NotificationDropdown $isOpen={isNotificationOpen}>
                <NotificationHeader>
                  <NotificationTitle>알림</NotificationTitle>
                  <NotificationCloseButton onClick={() => setIsNotificationOpen(false)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </NotificationCloseButton>
                </NotificationHeader>

                <NotificationList>
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <NotificationItem
                        key={notification.id}
                        className={!notification.isRead ? 'unread' : ''}
                        onClick={() => {
                          // 알림 클릭 시 처리 로직
                        }}
                      >
                        <NotificationItemContent $unread={!notification.isRead}>
                          <NotificationItemTitle>
                            {notification.title}
                          </NotificationItemTitle>
                          <NotificationItemMessage>
                            {notification.message}
                          </NotificationItemMessage>
                          <NotificationItemTime>
                            {notification.time}
                          </NotificationItemTime>
                        </NotificationItemContent>
                      </NotificationItem>
                    ))
                  ) : (
                    <NotificationEmpty>
                      새로운 알림이 없습니다.
                    </NotificationEmpty>
                  )}
                </NotificationList>
              </NotificationDropdown>
            </NotificationButton>
          )}

          {loginData ? (
            <NavButton
              onClick={() => navigate('/profile/user')}
              title="프로필"
            >
              <ProfileAvatar>
                {loginData.user.profileImage ? (
                  <img src={loginData.user.profileImage} alt={loginData.user.name} />
                ) : (
                  loginData.user.name ? loginData.user.name.charAt(0) : 'U'
                )}
              </ProfileAvatar>
            </NavButton>
          ) : (
            <AuthButtons>
              <AuthLoginButton to="/login">로그인</AuthLoginButton>
              <AuthSignupButton to="/signup">회원가입</AuthSignupButton>
            </AuthButtons>
          )}
        </NavRight>
      </NavContainer>

      {/* 모바일 검색창 */}
      <MobileSearchBar $isOpen={isMobileSearchOpen}>
        <MobileSearchForm onSubmit={handleMobileSearch}>
          <MobileSearchInput
            type="text"
            placeholder="여행지, 일정, 동행 검색..."
            value={mobileSearchQuery}
            onChange={(e) => setMobileSearchQuery(e.target.value)}
            autoFocus={isMobileSearchOpen}
          />
          <MobileSearchButton type="submit">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </MobileSearchButton>
        </MobileSearchForm>
      </MobileSearchBar>

      <SideMenu $isOpen={isMenuOpen}>
        <SideMenuHeader>
          <SideMenuTitle>메뉴</SideMenuTitle>
          <CloseButton onClick={() => setIsMenuOpen(false)}>
            ×
          </CloseButton>
        </SideMenuHeader>
        
        <SideMenuContent>
          {loginData ? (
            <>
              <SideProfileSection
                onClick={() => {
                  navigate('/profile/user');
                  setIsMenuOpen(false);
                }}
                style={{cursor: 'pointer'}}
              >
                <ProfileAvatar>
                  {loginData.user.profileImage ? (
                    <img src={loginData.user.profileImage} alt={loginData.user.name} />
                  ) : (
                    loginData.user.name ? loginData.user.name.charAt(0) : 'U'
                  )}
                </ProfileAvatar>
                <ProfileName>{loginData.user.name} 여행자님</ProfileName>
              </SideProfileSection>

              <MenuItem to="/" onClick={() => setIsMenuOpen(false)}>
                홈
              </MenuItem>
              <MenuItem to="/notice" onClick={() => setIsMenuOpen(false)}>
                공지사항
              </MenuItem>
              <MenuItem to="/faq" onClick={() => setIsMenuOpen(false)}>
                자주 묻는 질문
              </MenuItem>
              <MenuItem to="/settings" onClick={() => setIsMenuOpen(false)}>
                설정
              </MenuItem>
              <LogoutButton onClick={handleLogout}>
                로그아웃
              </LogoutButton>
            </>
          ) : (
            <>
              <MenuItem to="/" onClick={() => setIsMenuOpen(false)}>
                홈
              </MenuItem>
              <MenuItem as="button" onClick={(e) => handleMenuClick('/notice', e)}>
                공지사항
              </MenuItem>
              <MenuItem as="button" onClick={(e) => handleMenuClick('/faq', e)}>
                자주 묻는 질문
              </MenuItem>
              <MenuItem to="/login" onClick={() => setIsMenuOpen(false)}>
                로그인
              </MenuItem>
              <MenuItem to="/signup" onClick={() => setIsMenuOpen(false)}>
                회원가입
              </MenuItem>
            </>
          )}
        </SideMenuContent>
      </SideMenu>

      {/* 오버레이 */}
      <Overlay
        $isOpen={isMenuOpen || isNotificationOpen}
        onClick={() => {
          setIsMenuOpen(false);
          setIsNotificationOpen(false);
        }}
      />

      {/* 검색 결과 없음 모달 */}
      {showNoResultsModal && (
        <NoResultsModal onClick={closeNoResultsModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>검색 결과 없음</ModalTitle>
            <ModalMessage>{noResultsMessage}</ModalMessage>
            <ModalSuggestions>
              <p>다음 키워드로 검색해보세요:</p>
              <SuggestionTags>
                <SuggestionTag>일정</SuggestionTag>
                <SuggestionTag>동행</SuggestionTag>
                <SuggestionTag>서울</SuggestionTag>
                <SuggestionTag>부산</SuggestionTag>
                <SuggestionTag>제주</SuggestionTag>
              </SuggestionTags>
            </ModalSuggestions>
            <ModalConfirmBtn onClick={closeNoResultsModal}>
              확인
            </ModalConfirmBtn>
          </ModalContent>
        </NoResultsModal>
      )}

      {/* 로그인 모달 */}
      {showLoginModal && (
        <NoResultsModal onClick={() => setShowLoginModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalIcon>🔒</ModalIcon>
            <ModalTitle>로그인이 필요합니다</ModalTitle>
            <ModalMessage>로그인 후 이용가능 합니다</ModalMessage>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <ModalConfirmBtn onClick={handleLoginClick}>로그인</ModalConfirmBtn>
              <ModalConfirmBtn
                onClick={() => setShowLoginModal(false)}
                style={{
                  background: 'white',
                  color: '#6c757d',
                  border: '2px solid #e9ecef',
                  boxShadow: 'none'
                }}
              >
                취소
              </ModalConfirmBtn>
            </div>
          </ModalContent>
        </NoResultsModal>
      )}

    </NavigationContainer>
  );
};


const NavigationContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  box-sizing: border-box;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 15px;
    justify-content: space-between;
    position: relative;
  }
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 0 0 auto;

  @media (max-width: 768px) {
    flex: 0 0 auto;
    justify-content: flex-start;
  }
`;

const NavCenter = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  max-width: 500px;
  margin: 0 20px;

  @media (max-width: 768px) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    flex: none;
    margin: 0;
    justify-content: center;
    z-index: 1;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 0 0 auto;

  @media (max-width: 768px) {
    gap: 10px;
    flex: 0 0 auto;
    margin-left: auto;
  }
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  text-decoration: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;

  &:hover {
    text-decoration: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;


const NavLogoCenter = styled(Link)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    text-decoration: none;
  }

  &.mobile-logo {
    @media (max-width: 768px) {
      display: block !important;
    }
  }
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 25px;
  padding: 8px 20px;
  max-width: 1000px;
  width: 100%;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
  font-size: 14px;
  color: #333;
  padding: 8px 12px;

  &::placeholder {
    color: #6c757d;
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #667eea;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f8f9fa;
    color: #667eea;
  }

  @media (max-width: 768px) {
    display: none;

    &.hamburger-menu {
      display: flex;
    }

    &.notification-button {
      display: flex;
    }
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const AuthLoginButton = styled(Link)`
  padding: 8px 16px;
  border: 1px solid #3498db;
  border-radius: 20px;
  text-decoration: none;
  color: #3498db;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;
  background: transparent;

  &:hover {
    background: #3498db;
    color: white;
    text-decoration: none;
  }
`;

const AuthSignupButton = styled(Link)`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  text-decoration: none;
  color: white;
  font-weight: 500;
  font-size: 14px;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #2980b9 0%, #1f5f99 100%);
    transform: translateY(-1px);
    text-decoration: none;
  }
`;

const SideMenu = styled.div`
  position: fixed;
  top: 0;
  left: ${props => props.$isOpen ? '0' : '-300px'};
  width: 300px;
  height: 100vh;
  background: white;
  box-shadow: 5px 0 15px rgba(0,0,0,0.1);
  transition: left 0.3s ease;
  z-index: 1001;
  overflow-y: auto;

  @media (max-width: 480px) {
    width: 100%;
    left: ${props => props.$isOpen ? '0' : '-100%'};
  }
`;

const SideMenuHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SideMenuTitle = styled.h3`
  margin: 0;
  color: #2c3e50;
  font-size: 18px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6c757d;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }
`;

const SideMenuContent = styled.div`
  padding: 20px;
`;

const SideProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px 0;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 20px;
`;

const ProfileAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 18px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileName = styled.div`
  color: #2c3e50;
  font-weight: 600;
  font-size: 16px;
  margin: 0;
  line-height: 1.4;
`;

const MenuItem = styled(Link)`
  display: block;
  padding: 15px 0;
  color: #6c757d;
  text-decoration: none;
  border-bottom: 1px solid #f8f9fa;
  transition: color 0.3s ease;
  background: none;
  border-left: none;
  border-right: none;
  border-top: none;
  width: 100%;
  text-align: left;
  cursor: pointer;

  &:hover {
    color: #667eea;
    text-decoration: none;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const LogoutButton = styled.button`
  background: none !important;
  border: none !important;
  color: #dc3545 !important;
  cursor: pointer;
  padding: 15px 0;
  width: 100%;
  text-align: left;
  font-size: 16px;
  border-bottom: 1px solid #f8f9fa !important;
  transition: color 0.3s ease;
  outline: none !important;
  text-decoration: none !important;
  position: relative;
  box-shadow: none !important;

  &:hover {
    color: #c82333 !important;
    text-decoration: none !important;
    border-bottom: 1px solid #f8f9fa !important;
    background: none !important;
  }

  &:focus {
    outline: none !important;
    text-decoration: none !important;
    box-shadow: none !important;
    border-bottom: 1px solid #f8f9fa !important;
  }

  &:active {
    outline: none !important;
    text-decoration: none !important;
    border-bottom: 1px solid #f8f9fa !important;
  }

  &:before,
  &:after {
    content: none !important;
  }

  &:visited {
    color: #dc3545 !important;
    text-decoration: none !important;
  }

  &:link {
    text-decoration: none !important;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const NoResultsModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px 30px 30px 30px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h3`
  font-size: 24px;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const ModalMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 25px 0;
  line-height: 1.5;
`;

const ModalSuggestions = styled.div`
  margin-bottom: 25px;
`;

const SuggestionTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
`;

const SuggestionTag = styled.span`
  background: #f8f9fa;
  color: #6c757d;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  border: 1px solid #e9ecef;
`;

const ModalConfirmBtn = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }
`;

const MobileSearchIcon = styled.button`
  display: none;
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f8f9fa;
    color: #667eea;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileSearchBar = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: white;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
  transform: translateY(${props => props.$isOpen ? '0' : '-100%'});
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileSearchForm = styled.form`
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 25px;
  padding: 8px 20px;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const MobileSearchInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
  font-size: 14px;
  color: #333;
  padding: 8px 12px;

  &::placeholder {
    color: #6c757d;
  }
`;

const MobileSearchButton = styled.button`
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #667eea;
  }
`;

const NotificationDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  width: 320px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1001;
  transform: ${props => props.$isOpen ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)'};
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 480px) {
    position: fixed;
    top: 70px;
    right: 10px;
    left: 10px;
    width: auto;
    max-width: none;
  }

  @media (max-width: 768px) and (min-width: 481px) {
    width: 280px;
    right: -80px;
  }
`;

const NotificationHeader = styled.div`
  padding: 20px 20px 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NotificationCloseButton = styled.button`
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  &:hover {
    background: #f8f9fa;
    color: #495057;
  }
`;

const NotificationTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
`;

const NotificationBadge = styled.span`
  background: #ff6b6b;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  min-width: 20px;
  text-align: center;
`;

const NotificationList = styled.div`
  padding: 0;
`;

const NotificationItem = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #f8f9fa;
  cursor: pointer;
  transition: background-color 0.2s ease;
  position: relative;

  &:hover {
    background: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }

  &.unread {
    background: linear-gradient(90deg, rgba(102, 126, 234, 0.05) 0%, rgba(255, 255, 255, 0) 100%);

    &::before {
      content: '';
      position: absolute;
      left: 8px;
      top: 50%;
      transform: translateY(-50%);
      width: 6px;
      height: 6px;
      background: #667eea;
      border-radius: 50%;
    }
  }
`;

const NotificationItemContent = styled.div`
  margin-left: ${props => props.$unread ? '12px' : '0'};
`;

const NotificationItemTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 5px 0;
  line-height: 1.4;
`;

const NotificationItemMessage = styled.p`
  font-size: 13px;
  color: #6c757d;
  margin: 0 0 5px 0;
  line-height: 1.4;
`;

const NotificationItemTime = styled.span`
  font-size: 11px;
  color: #adb5bd;
`;

const NotificationButton = styled.div`
  position: relative;
  display: inline-block;
`;

const NotificationEmpty = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: #6c757d;
  font-size: 14px;
`;



export default Navigation;
