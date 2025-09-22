import React, { useRef } from 'react';

const ProfileInfo = ({ onClose }) => {
  const fileInputRef = useRef(null);

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      // 여기에 이미지 업로드 로직 추가 가능
    }
  };
  return (
    <div className="profile-info-page">
      <div className="profile-info-header">
        <button className="back-button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="profile-info-title">프로필 정보</h1>
        <button className="edit-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="profile-info-content">
        {/* 프로필 이미지 및 이름 */}
        <div className="profile-main-info">
          <div className="profile-avatar-large" onClick={handleProfileImageClick}>
            <div className="avatar-circle-large">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="profile-image-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="white" strokeWidth="2"/>
                <circle cx="8.5" cy="8.5" r="1.5" stroke="white" strokeWidth="2"/>
                <path d="M21 15L16 10L5 21" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <h2 className="profile-name-large">김병구</h2>
        </div>

        {/* 연결된 계정 */}
        <div className="profile-section">
          <div className="profile-item">
            <span className="profile-label">연결된 계정</span>
            <div className="connected-account">
              <div className="kakao-icon">
                <div className="kakao-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 5.58 2 10C2 12.5 3.5 14.75 5.75 16.25C5.5 17.25 5 18.75 5 18.75S6.5 18.25 7.5 17.75C9 18.25 10.5 18.5 12 18.5C17.52 18.5 22 14.92 22 10.5C22 5.58 17.52 2 12 2Z" fill="#3C1E1E"/>
                    <circle cx="9" cy="10" r="1" fill="#FEE500"/>
                    <circle cx="15" cy="10" r="1" fill="#FEE500"/>
                    <path d="M12 13C13.1 13 14 12.1 14 11H10C10 12.1 10.9 13 12 13Z" fill="#FEE500"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 회원 정보 */}
        <div className="profile-section">
          <h3 className="section-title">회원 정보</h3>
          
          <div className="profile-item">
            <span className="profile-label">이름</span>
            <span className="profile-value">정보 없음</span>
          </div>

          <div className="profile-item">
            <span className="profile-label">이메일</span>
            <span className="profile-value">gkrjawnrkf@naver.com</span>
          </div>

          <div className="profile-item">
            <span className="profile-label">생년월일</span>
            <span className="profile-value">정보 없음</span>
          </div>

          <div className="profile-item">
            <span className="profile-label">MBTI</span>
            <span className="profile-value">나의 MBTI는 무엇일까요?</span>
          </div>

          <div className="profile-item">
            <span className="profile-label">성별</span>
            <span className="profile-value">선택하지 않음</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
