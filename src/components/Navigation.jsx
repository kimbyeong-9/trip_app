import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Settings from '../pages/Settings';
import ProfileInfo from '../pages/ProfileInfo';

// Styled Components - 기존 CSS와 동일한 스타일
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
  }
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 0 0 auto;
`;

const NavCenter = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  max-width: 500px;
  margin: 0 20px;

  @media (max-width: 768px) {
    max-width: 300px;
    margin: 0 10px;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 0 0 auto;

  @media (max-width: 768px) {
    gap: 15px;
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

  &:hover {
    text-decoration: none;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #667eea;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  &:hover {
    background: #f8f9fa;
    color: #5a6fd8;
    transform: scale(1.1);
  }
`;

const NavLogoCenter = styled.div`
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
    max-width: 300px;
    padding: 6px 15px;
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
`;

const LoginButton = styled(Link)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
    text-decoration: none;
    color: white;
  }
`;

const SideMenu = styled.div`
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-300px'};
  width: 300px;
  height: 100vh;
  background: white;
  box-shadow: -5px 0 15px rgba(0,0,0,0.1);
  transition: right 0.3s ease;
  z-index: 1001;
  overflow-y: auto;

  @media (max-width: 480px) {
    width: 100%;
    right: ${props => props.isOpen ? '0' : '-100%'};
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

  &:hover {
    color: #667eea;
    text-decoration: none;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 15px 0;
  width: 100%;
  text-align: left;
  font-size: 16px;
  border-bottom: 1px solid #f8f9fa;
  transition: color 0.3s ease;

  &:hover {
    color: #c82333;
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
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
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

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileInfoOpen, setIsProfileInfoOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loginData, setLoginData] = useState(null);
  const [showNoResultsModal, setShowNoResultsModal] = useState(false);
  const [noResultsMessage, setNoResultsMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleNotificationClick = () => {
    alert('알림 기능은 준비 중입니다!');
  };

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      localStorage.removeItem('loginData');
      sessionStorage.removeItem('loginData');
      setLoginData(null);
      alert('로그아웃되었습니다.');
      navigate('/');
    }
  };

  return (
    <NavigationContainer>
      <NavContainer>
        <NavLeft>
          {location.pathname === '/' ? (
            <Logo to="/">
              여행대로
            </Logo>
          ) : (
            <BackButton onClick={() => navigate(-1)} title="뒤로가기">
              ←
            </BackButton>
          )}
        </NavLeft>

        <NavCenter>
          {location.pathname === '/' ? (
            <SearchForm onSubmit={handleSearch}>
              <SearchInput
                type="text"
                placeholder="여행지, 일정, 동행을 검색해보세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchButton type="submit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SearchButton>
            </SearchForm>
          ) : (
            <NavLogoCenter>여행대로</NavLogoCenter>
          )}
        </NavCenter>

        <NavRight>
          <NavButton 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            title="메뉴"
          >
            ☰
          </NavButton>

          <NavButton 
            onClick={handleNotificationClick}
            title="알림"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </NavButton>

          {loginData ? (
            <NavButton 
              onClick={() => navigate(`/profile/${loginData.user.username || 'user'}`)}
              title="프로필"
            >
              <ProfileAvatar>
                {loginData.user.name ? loginData.user.name.charAt(0) : 'U'}
              </ProfileAvatar>
            </NavButton>
          ) : (
            <LoginButton to="/login">
              로그인
            </LoginButton>
          )}
        </NavRight>
      </NavContainer>

      <SideMenu isOpen={isMenuOpen}>
        <SideMenuHeader>
          <SideMenuTitle>메뉴</SideMenuTitle>
          <CloseButton onClick={() => setIsMenuOpen(false)}>
            ×
          </CloseButton>
        </SideMenuHeader>
        
        <SideMenuContent>
          {loginData ? (
            <>
              <SideProfileSection>
                <ProfileAvatar>
                  {loginData.user.name ? loginData.user.name.charAt(0) : 'U'}
                </ProfileAvatar>
                <ProfileName>{loginData.user.name} 여행자님</ProfileName>
              </SideProfileSection>
              
              <MenuItem to="/" onClick={() => setIsMenuOpen(false)}>
                홈
              </MenuItem>
              <MenuItem to="/travel-schedules" onClick={() => setIsMenuOpen(false)}>
                여행 일정
              </MenuItem>
              <MenuItem to="/companion-list" onClick={() => setIsMenuOpen(false)}>
                동행 모집
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
              <MenuItem to="/travel-schedules" onClick={() => setIsMenuOpen(false)}>
                여행 일정
              </MenuItem>
              <MenuItem to="/companion-list" onClick={() => setIsMenuOpen(false)}>
                동행 모집
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
        isOpen={isMenuOpen} 
        onClick={() => setIsMenuOpen(false)}
      />

      {/* 검색 결과 없음 모달 */}
      {showNoResultsModal && (
        <NoResultsModal onClick={closeNoResultsModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalIcon>🔍</ModalIcon>
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

      {/* 설정 모달 */}
      {isSettingsOpen && (
        <Settings onClose={() => setIsSettingsOpen(false)} />
      )}

      {/* 프로필 정보 모달 */}
      {isProfileInfoOpen && (
        <ProfileInfo onClose={() => setIsProfileInfoOpen(false)} />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
