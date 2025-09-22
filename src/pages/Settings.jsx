import React, { useState } from 'react';

const Settings = ({ onClose }) => {
  const [pushNotification, setPushNotification] = useState(true);
  const [regularNotification, setRegularNotification] = useState(false);
  const [nightNotification, setNightNotification] = useState(false);

  return (
    <div className="settings-page">
      <div className="settings-header">
        <button className="back-button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="settings-title">설정</h1>
      </div>

      <div className="settings-content">
        {/* 프로필 및 계정 */}
        <div className="settings-section">
          <button className="settings-item">
            <span className="settings-label">프로필 및 계정</span>
            <span className="settings-arrow">{'>'}</span>
          </button>
        </div>

        {/* 알림 설정 */}
        <div className="settings-section">
          <h3 className="settings-section-title">알림 설정</h3>
          
          <div className="settings-item toggle-item">
            <span className="settings-label">푸시 알림 수신</span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={pushNotification}
                onChange={(e) => setPushNotification(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="settings-item toggle-item">
            <span className="settings-label">정보성 알림(푸시) 수신</span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={regularNotification}
                onChange={(e) => setRegularNotification(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="settings-item toggle-item">
            <span className="settings-label">야간에 알림(푸시) 수신(9 PM ~ 8 AM)</span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={nightNotification}
                onChange={(e) => setNightNotification(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        {/* 고객 지원 */}
        <div className="settings-section">
          <h3 className="settings-section-title">고객 지원</h3>
          
          <div className="settings-item version-item">
            <span className="settings-label">버전정보</span>
            <span className="settings-version">1.11.3</span>
          </div>

          <button className="settings-item">
            <span className="settings-label">공지사항</span>
            <span className="settings-arrow">{'>'}</span>
          </button>

          <button className="settings-item">
            <span className="settings-label">고객센터</span>
            <span className="settings-arrow">{'>'}</span>
          </button>
        </div>

        {/* 하단 섹션 */}
        <div className="settings-section">
          <button className="settings-item">
            <span className="settings-label">로그아웃</span>
          </button>

          <button className="settings-item">
            <span className="settings-label">회원탈퇴</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
