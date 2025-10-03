import React from 'react';
import styled from 'styled-components';

const ProfileImageEditor = ({ profileImage, name, onImageChange, onResetToDefault }) => {
  return (
    <ProfileImageSection>
      <ProfileImageContainer>
        <ProfileImage>
          {profileImage ? (
            <img src={profileImage} alt="프로필 이미지" />
          ) : (
            name.charAt(0)
          )}
        </ProfileImage>
        <ChangeImageButton onClick={onImageChange} title="이미지 변경">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        </ChangeImageButton>
      </ProfileImageContainer>
      <ImageButtonGroup>
        <ImageActionButton className="default" onClick={onResetToDefault}>
          기본 이미지로 변경
        </ImageActionButton>
      </ImageButtonGroup>
    </ProfileImageSection>
  );
};

const ProfileImageSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const ImageButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
`;

const ImageActionButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }

  &.default {
    background: #6c757d;

    &:hover {
      background: #5a6268;
      box-shadow: 0 4px 15px rgba(108, 117, 125, 0.4);
    }
  }
`;

const ProfileImageContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 60px;
  margin: 0 auto;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ChangeImageButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  color: white;

  svg {
    stroke: white;
  }

  &:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a3f92 100%);
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.6);
  }
`;

export default ProfileImageEditor;
