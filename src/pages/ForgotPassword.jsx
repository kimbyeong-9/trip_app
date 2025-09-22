import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      // 비밀번호 재설정 이메일 발송 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
    } catch (err) {
      setError('이메일 발송 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-header">
        <button className="back-button-center" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="forgot-password-content">
        {!success ? (
          <div className="forgot-password-form-section">
            <div className="forgot-password-welcome">
              <h2>비밀번호 찾기</h2>
              <p>가입하신 이메일 주소를 입력하시면<br />비밀번호 재설정 링크를 보내드립니다.</p>
            </div>

            <div className="forgot-password-form">
              <form onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}
                
                <div className="form-group">
                  <label htmlFor="email">이메일</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일을 입력하세요"
                    required
                    disabled={isLoading}
                    className={error && error.includes('이메일') ? 'error' : ''}
                  />
                </div>

                <button 
                  type="submit" 
                  className="forgot-password-submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading-spinner">
                      <span className="spinner"></span>
                      전송 중...
                    </span>
                  ) : (
                    '비밀번호 재설정 이메일 보내기'
                  )}
                </button>
              </form>

              <div className="forgot-password-footer">
                <p>
                  로그인 페이지로 돌아가기
                  <button 
                    className="back-to-login-link" 
                    onClick={handleBackToLogin}
                    disabled={isLoading}
                  >
                    로그인
                  </button>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="forgot-password-success">
            <div className="success-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#4CAF50"/>
                <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>이메일을 확인해주세요</h2>
            <p>
              <strong>{email}</strong>로<br />
              비밀번호 재설정 링크를 보냈습니다.
            </p>
            <p className="success-note">
              이메일이 오지 않았다면 스팸함을 확인해주세요.
            </p>
            <button 
              className="back-to-login-button"
              onClick={handleBackToLogin}
            >
              로그인 페이지로 돌아가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
