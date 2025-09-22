import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TravelScheduleCreate = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    
    if (option === 'manual') {
      // 직접 일정 작성 페이지로 이동 (향후 구현)
      alert('직접 일정 작성 기능은 준비 중입니다.');
    } else if (option === 'ai') {
      // AI 일정 작성 페이지로 이동 (향후 구현)
      alert('AI 일정 작성 기능은 준비 중입니다.');
    }
  };

  return (
    <div className="travel-schedule-create-page">
      {/* 헤더 */}
      <div className="travel-schedule-create-header">
        <button className="back-button" onClick={handleBackClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1>일정 작성</h1>
        <div className="header-right"></div>
      </div>

      <div className="travel-schedule-create-content">
        {/* 안내 문구 */}
        <div className="create-intro">
          <h2>여행 일정을 어떻게 작성하시겠어요?</h2>
          <p>직접 작성하거나 AI의 도움을 받아 일정을 만들어보세요.</p>
        </div>

        {/* 선택 옵션 */}
        <div className="create-options">
          <div 
            className={`create-option ${selectedOption === 'manual' ? 'selected' : ''}`}
            onClick={() => handleOptionSelect('manual')}
          >
            <div className="option-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4C2.89543 4 2 4.89543 2 6V20C2 21.1046 2.89543 22 4 22H18C19.1046 22 20 21.1046 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.5C18.8978 2.10218 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10218 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10218 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="option-content">
              <h3>직접 일정 작성</h3>
              <p>직접 장소를 선택하고<br/>나만의 여행 일정을 만들어보세요</p>
              <div className="option-features">
                <span className="feature-tag">자유로운 구성</span>
                <span className="feature-tag">세밀한 계획</span>
              </div>
            </div>
            <div className="option-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <div 
            className={`create-option ${selectedOption === 'ai' ? 'selected' : ''}`}
            onClick={() => handleOptionSelect('ai')}
          >
            <div className="option-icon ai-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 19L20.09 20.26L21 21L20.09 21.74L19 22L17.91 21.74L17 21L17.91 20.26L19 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 19L6.09 20.26L7 21L6.09 21.74L5 22L3.91 21.74L3 21L3.91 20.26L5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="option-content">
              <h3>AI 일정 작성</h3>
              <p>AI가 당신의 취향에 맞는<br/>최적의 여행 일정을 추천해드려요</p>
              <div className="option-features">
                <span className="feature-tag">빠른 작성</span>
                <span className="feature-tag">맞춤 추천</span>
              </div>
            </div>
            <div className="option-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* 도움말 */}
        <div className="create-help">
          <div className="help-item">
            <div className="help-icon">💡</div>
            <div className="help-text">
              <strong>직접 작성</strong>
              <span>원하는 장소와 시간을 자유롭게 선택하여 일정을 만들 수 있어요</span>
            </div>
          </div>
          <div className="help-item">
            <div className="help-icon">🤖</div>
            <div className="help-text">
              <strong>AI 작성</strong>
              <span>여행지, 기간, 관심사를 입력하면 AI가 최적의 일정을 추천해드려요</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelScheduleCreate;

