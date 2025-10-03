import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../supabaseClient';
import ProfileImageEditor from '../components/profile/ProfileImageEditor';
import InterestTagEditor from '../components/profile/InterestTagEditor';
import ProfileFormFields from '../components/profile/ProfileFormFields';


const ProfileEdit = () => {
  const navigate = useNavigate();
  
  // 현재 로그인한 사용자 정보 가져오기
  const getCurrentUser = () => {
    const loginData = localStorage.getItem('loginData') || sessionStorage.getItem('loginData');
    if (loginData) {
      return JSON.parse(loginData);
    }
    return null;
  };

  const currentUser = getCurrentUser();
  
  const [formData, setFormData] = useState({
    name: currentUser?.user?.name || '홍길동',
    email: currentUser?.user?.email || 'hong@example.com',
    phone: currentUser?.user?.phone || '010-1234-5678',
    birthDate: currentUser?.user?.birthDate || '',
    bio: currentUser?.user?.bio || '',
    location: currentUser?.user?.location || '',
    interests: currentUser?.user?.interests || [],
    profileImage: currentUser?.user?.profileImage || null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const userId = currentUser?.user?.id;
      const provider = currentUser?.user?.provider;

      // Supabase 업데이트
      if (userId) {
        if (provider && provider !== 'email') {
          // 소셜 로그인 사용자 - social_login_users 테이블 업데이트
          const { error } = await supabase
            .from('social_login_users')
            .update({
              name: formData.name,
              profile_image: formData.profileImage,
              bio: formData.bio,
              location: formData.location,
              interests: formData.interests,
              birth_date: formData.birthDate || null,
              updated_at: new Date().toISOString()
            })
            .eq('auth_user_id', userId);

          if (error) {
            console.error('소셜 로그인 프로필 업데이트 오류:', error);
          }
        } else {
          // 일반 이메일 사용자 - user_profiles 테이블 업데이트
          const { error } = await supabase
            .from('user_profiles')
            .update({
              username: formData.name,
              phone: formData.phone,
              birth_date: formData.birthDate || null,
              profile_image: formData.profileImage,
              bio: formData.bio,
              location: formData.location,
              interests: formData.interests,
              updated_at: new Date().toISOString()
            })
            .eq('id', userId);

          if (error) {
            console.error('프로필 업데이트 오류:', error);
          }
        }
      }

      // 현재 로그인 데이터 가져오기
      const localData = localStorage.getItem('loginData');
      const sessionData = sessionStorage.getItem('loginData');

      if (localData) {
        const updatedData = JSON.parse(localData);
        // 사용자 정보 업데이트
        updatedData.user = {
          ...updatedData.user,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          birthDate: formData.birthDate,
          bio: formData.bio,
          location: formData.location,
          interests: formData.interests,
          profileImage: formData.profileImage
        };
        // localStorage에 저장
        localStorage.setItem('loginData', JSON.stringify(updatedData));
      }

      if (sessionData) {
        const updatedData = JSON.parse(sessionData);
        // 사용자 정보 업데이트
        updatedData.user = {
          ...updatedData.user,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          birthDate: formData.birthDate,
          bio: formData.bio,
          location: formData.location,
          interests: formData.interests,
          profileImage: formData.profileImage
        };
        // sessionStorage에 저장
        sessionStorage.setItem('loginData', JSON.stringify(updatedData));
      }

      alert('프로필이 성공적으로 저장되었습니다!');
      navigate('/');

    } catch (error) {
      console.error('프로필 저장 중 오류가 발생했습니다:', error);
      alert('프로필 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleCancel = () => {
    navigate('/profile/user');
  };

  const handleImageChange = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // 이미지 리사이즈하여 용량 줄이기
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            // Canvas로 이미지 리사이즈 (최대 200x200)
            const canvas = document.createElement('canvas');
            const maxSize = 200;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > maxSize) {
                height = height * (maxSize / width);
                width = maxSize;
              }
            } else {
              if (height > maxSize) {
                width = width * (maxSize / height);
                height = maxSize;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // 압축된 이미지를 Base64로 변환 (품질 0.7)
            const resizedImage = canvas.toDataURL('image/jpeg', 0.7);

            setFormData(prev => ({
              ...prev,
              profileImage: resizedImage
            }));
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleResetToDefault = () => {
    setFormData(prev => ({
      ...prev,
      profileImage: null
    }));
  };

  const handleAddInterest = (value) => {
    setFormData(prev => ({
      ...prev,
      interests: [...prev.interests, value]
    }));
  };

  const removeInterest = (index) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index)
    }));
  };

  return (
    <ProfileEditContainer>
      <ProfileEditContent>
        <ProfileEditCard>
          <CardHeader>
            <CardBackButton onClick={() => navigate(-1)}>
              ←
            </CardBackButton>
            <CardTitle>프로필 편집</CardTitle>
          </CardHeader>

          <ProfileImageEditor
            profileImage={formData.profileImage}
            name={formData.name}
            onImageChange={handleImageChange}
            onResetToDefault={handleResetToDefault}
          />

          <Form onSubmit={handleSave}>
            <ProfileFormFields
              formData={formData}
              onChange={handleInputChange}
            />

            <InterestTagEditor
              interests={formData.interests}
              onAdd={handleAddInterest}
              onRemove={removeInterest}
            />

            <ButtonGroup>
              <SaveButton type="submit">저장하기</SaveButton>
              <CancelButton type="button" onClick={handleCancel}>취소</CancelButton>
            </ButtonGroup>
          </Form>
        </ProfileEditCard>
      </ProfileEditContent>
    </ProfileEditContainer>
  );
};


const ProfileEditContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

const ProfileEditContent = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`;

const ProfileEditCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 50px 60px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;

  @media (max-width: 768px) {
    padding: 40px 30px;
  }

  @media (max-width: 480px) {
    padding: 30px 20px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  position: relative;
`;

const CardBackButton = styled.button`
  position: absolute;
  top: -10px;
  left: -10px;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid #667eea;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #667eea;
  font-size: 18px;

  &:hover {
    background: rgba(102, 126, 234, 0.2);
    transform: translateX(-2px);
  }
`;

const CardTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 20px 0;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const SaveButton = styled.button`
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 12px;
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

const CancelButton = styled.button`
  flex: 1;
  background: white;
  color: #6c757d;
  border: 2px solid #e9ecef;
  padding: 15px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #495057;
  }
`;

export default ProfileEdit;
