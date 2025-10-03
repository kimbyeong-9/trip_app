import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import SettingToggleItem from '../components/settings/SettingToggleItem';
import SettingSelectItem from '../components/settings/SettingSelectItem';


const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: true,
    emailMarketing: false,
    pushNotifications: true,
    locationServices: true,
    language: 'ko'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalSettings, setOriginalSettings] = useState({});

  // 설정 로드
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      setOriginalSettings(parsed);

      // 언어 설정은 한국어로 고정
    } else {
      const defaultSettings = {
        notifications: true,
        emailMarketing: false,
        pushNotifications: true,
        locationServices: true,
        language: 'ko'
      };
      setSettings(defaultSettings);
      setOriginalSettings(defaultSettings);
    }
  }, []);

  // 변경사항 감지
  useEffect(() => {
    const hasChanged = JSON.stringify(settings) !== JSON.stringify(originalSettings);
    setHasChanges(hasChanged);
  }, [settings, originalSettings]);

  const handleToggle = (key) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key]
    };

    setSettings(newSettings);

    // 푸시 알림 권한 요청
    if (key === 'pushNotifications' && !settings[key]) {
      requestNotificationPermission();
    }

    // 위치 서비스 권한 요청
    if (key === 'locationServices' && !settings[key]) {
      requestLocationPermission();
    }
  };

  // 푸시 알림 권한 요청
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          console.log('Notification permission denied');
          setSettings(prev => ({ ...prev, pushNotifications: false }));
        } else {
          // 테스트 알림 발송
          new Notification('여행대로', {
            body: '푸시 알림이 활성화되었습니다!',
            icon: '/favicon.ico'
          });
        }
      } catch (error) {
        console.error('알림 권한 요청 실패:', error);
        console.error('Notification feature unavailable');
        setSettings(prev => ({ ...prev, pushNotifications: false }));
      }
    } else {
      console.log('Push notifications not supported');
      setSettings(prev => ({ ...prev, pushNotifications: false }));
    }
  };

  // 위치 서비스 권한 요청
  const requestLocationPermission = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('위치 권한 허용:', position.coords);
          console.log('Location services activated');
        },
        (error) => {
          console.error('위치 권한 거부:', error);
          console.log('Location permission denied');
          setSettings(prev => ({ ...prev, locationServices: false }));
        }
      );
    } else {
      console.log('Geolocation not supported');
      setSettings(prev => ({ ...prev, locationServices: false }));
    }
  };

  const handleSelectChange = (key, value) => {
    const newSettings = {
      ...settings,
      [key]: value
    };

    setSettings(newSettings);

    // 언어는 한국어로 고정

  };

  const handleSave = () => {
    setIsLoading(true);

    // 저장 시뮬레이션
    setTimeout(() => {
      try {
        // 로컬 스토리지에 저장
        localStorage.setItem('userSettings', JSON.stringify(settings));

        // 언어 변경사항이 있으면 커스텀 이벤트 발생
        if (originalSettings.language !== settings.language) {
          window.dispatchEvent(new CustomEvent('languageChanged'));
        }

        // 어플리케이션 전체에 설정 적용
        if (settings.notifications) {
          console.log('이메일 알림 활성화됨');
        }

        if (settings.emailMarketing) {
          console.log('마케팅 이메일 구독 활성화됨');
        }

        // 원본 설정 업데이트
        setOriginalSettings(settings);

        console.log('Settings saved successfully');

      } catch (error) {
        console.error('설정 저장 실패:', error);
        console.error('Failed to save settings');
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleReset = () => {
    if (window.confirm('설정을 초기화하시겠습니까?')) {
      setIsLoading(true);

      setTimeout(() => {
        const defaultSettings = {
          notifications: true,
          emailMarketing: false,
          pushNotifications: true,
          locationServices: true,
          language: 'ko'
        };

        setSettings(defaultSettings);
        setOriginalSettings(defaultSettings);

        // 로컬 스토리지에서 제거
        localStorage.removeItem('userSettings');

        // 언어는 한국어로 고정
        document.documentElement.lang = 'ko';

        // 커스텀 이벤트 발생으로 다른 컴포넌트들에 변경 알림
        window.dispatchEvent(new CustomEvent('languageChanged'));

        alert('설정이 초기화되었습니다.');
        setIsLoading(false);
      }, 800);
    }
  };

  return (
    <SettingsPage>
      <Navigation />

      <SettingsContainer>
        <PageHeader>
          <BackButton onClick={() => navigate(-1)}>
            ←
          </BackButton>
          <PageTitle>설정</PageTitle>
          <PageSubtitle>서비스 설정을 관리하세요</PageSubtitle>
        </PageHeader>

        {/* 알림 설정 */}
        <SettingsSection data-settings-section>
          <SectionTitle>알림 설정</SectionTitle>

          <SettingToggleItem
            title="푸시 알림"
            description="앱에서 바로 알림을 받습니다"
            isActive={settings.pushNotifications}
            onToggle={() => handleToggle('pushNotifications')}
          />

          <SettingToggleItem
            title="이메일 알림"
            description="중요한 소식을 이메일로 받습니다"
            isActive={settings.notifications}
            onToggle={() => handleToggle('notifications')}
          />

          <SettingToggleItem
            title="마케팅 이메일"
            description="혜택 및 이벤트 정보를 받습니다"
            isActive={settings.emailMarketing}
            onToggle={() => handleToggle('emailMarketing')}
          />
        </SettingsSection>

        {/* 개인정보 설정 */}
        <SettingsSection data-settings-section>
          <SectionTitle>개인정보 설정</SectionTitle>

          <SettingToggleItem
            title="위치 서비스"
            description="위치 기반 서비스를 이용합니다"
            isActive={settings.locationServices}
            onToggle={() => handleToggle('locationServices')}
          />
        </SettingsSection>

        {/* 앱 설정 */}
        <SettingsSection data-settings-section>
          <SectionTitle>앱 설정</SectionTitle>

          <SettingSelectItem
            title="언어"
            description="앱 사용 언어를 선택하세요"
            value={settings.language}
            onChange={(e) => handleSelectChange('language', e.target.value)}
            options={[
              { value: 'ko', label: '한국어' },
              { value: 'en', label: 'English' },
              { value: 'ja', label: '日本語' },
              { value: 'zh', label: '中文' },
              { value: 'vi', label: 'Tiếng Việt' }
            ]}
          />
        </SettingsSection>

        {/* 저장 버튼 */}
        <SettingsSection data-settings-section>
          <ButtonGroup>
            <Button
              $variant="danger"
              onClick={handleReset}
              disabled={isLoading || !hasChanges}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  초기화 중...
                </>
              ) : (
                "초기화"
              )}
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading || !hasChanges}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  저장 중...
                </>
              ) : (
                "저장"
              )}
            </Button>
          </ButtonGroup>
        </SettingsSection>
      </SettingsContainer>
    </SettingsPage>
  );
};


const SettingsPage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
  padding-bottom: 20px;

  @media (max-width: 1024px) {
    padding-bottom: 100px;
  }
`;

const SettingsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  top: -60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-size: 20px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PageTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PageSubtitle = styled.p`
  font-size: 18px;
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
`;

const SettingsSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 20px 0;
  padding-bottom: 15px;
  border-bottom: 2px solid #f8f9fa;
`;

const Button = styled.button`
  background: ${props => props.$variant === 'danger' ? '#dc3545' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px ${props => props.$variant === 'danger' ? 'rgba(220, 53, 69, 0.4)' : 'rgba(102, 126, 234, 0.4)'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${props => props.$variant === 'danger' ? 'rgba(220, 53, 69, 0.6)' : 'rgba(102, 126, 234, 0.6)'};
  }

  &:disabled {
    transform: none;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid white;
  animation: spin 1s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;


const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  justify-content: flex-end;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export default Settings;