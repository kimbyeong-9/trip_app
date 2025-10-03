import React from 'react';
import styled from 'styled-components';

const SocialLoginButtons = ({ isLoading, onSocialLogin }) => {
  return (
    <Container>
      <SocialButton
        onClick={() => onSocialLogin('구글')}
        disabled={isLoading}
        $bgColor="white"
        $textColor="#333"
        $borderColor="#DADCE0"
        $hoverBorderColor="#9AA0A6"
        $shadowColor="rgba(66, 133, 244, 0.3)"
      >
        <SocialIcon
          src="https://www.google.com/favicon.ico"
          alt="구글"
        />
        Google 로그인
      </SocialButton>

      <SocialButton
        onClick={() => onSocialLogin('페이스북')}
        disabled={isLoading}
        $bgColor="#1877F2"
        $textColor="white"
        $borderColor="#1877F2"
        $hoverBorderColor="#166FE5"
        $shadowColor="rgba(24, 119, 242, 0.4)"
      >
        <SocialIcon
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMjAgMTBDMjAgNC40NzcgMTUuNTIzIDAgMTAgMEM0LjQ3NyAwIDAgNC40NzcgMCAxMEMwIDE0Ljk5MSAzLjY1NyAxOS4xMjggOC40MzggMTkuODc4VjEyLjg5SDUuODk4VjEwSDguNDM4VjcuNzk3QzguNDM4IDUuMjkgOS45MyAzLjkwNyAxMi4yMTUgMy45MDdDMTMuMzA5IDMuOTA3IDE0LjQ1MyA0LjEwMiAxNC40NTMgNC4xMDJWNi41NjJIMTMuMTkzQzExLjk1IDYuNTYyIDExLjU2MyA3LjMzMyAxMS41NjMgOC4xMjRWMTBIMTQuMzM2TDEzLjg5MyAxMi44OUgxMS41NjNWMTkuODc4QzE2LjM0MyAxOS4xMjggMjAgMTQuOTkxIDIwIDEwWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg=="
          alt="페이스북"
        />
        Facebook으로 로그인
      </SocialButton>

      <SocialButton
        onClick={() => onSocialLogin('애플')}
        disabled={isLoading}
        $bgColor="#000000"
        $textColor="white"
        $borderColor="#000000"
        $hoverBorderColor="#333333"
        $shadowColor="rgba(0, 0, 0, 0.3)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
        </svg>
        Apple로 로그인
      </SocialButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid ${props => props.$borderColor || '#e9ecef'};
  border-radius: 12px;
  background: ${props => props.$bgColor || 'white'};
  color: ${props => props.$textColor || '#2c3e50'};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  position: relative;
  overflow: hidden;
  min-height: 56px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${props => props.$shadowColor || 'rgba(0, 0, 0, 0.15)'};
    border-color: ${props => props.$hoverBorderColor || props.$borderColor || '#667eea'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SocialIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default SocialLoginButtons;
