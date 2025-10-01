import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


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
    bio: currentUser?.user?.bio || '여행을 사랑하는 사용자입니다. 새로운 곳을 탐험하고 좋은 사람들과 만나는 것을 좋아해요.',
    location: currentUser?.user?.location || '서울',
    interests: currentUser?.user?.interests || ['여행', '사진', '맛집', '문화'],
    profileImage: currentUser?.user?.profileImage || null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    try {
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
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            profileImage: e.target.result
          }));
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

  const handleAddInterest = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value && !formData.interests.includes(value)) {
        setFormData(prev => ({
          ...prev,
          interests: [...prev.interests, value]
        }));
        e.target.value = '';
      }
    }
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
              ← 뒤로가기
            </CardBackButton>
            <CardTitle>프로필 편집</CardTitle>
          </CardHeader>
          
          <ProfileImageSection>
            <ProfileImageContainer>
              <ProfileImage>
                {formData.profileImage ? (
                  <img src={formData.profileImage} alt="프로필 이미지" />
                ) : (
                  formData.name.charAt(0)
                )}
              </ProfileImage>
              <ChangeImageButton onClick={handleImageChange} title="이미지 변경">
                📷
              </ChangeImageButton>
            </ProfileImageContainer>
            <ImageButtonGroup>
              <ImageActionButton onClick={handleImageChange}>
                <span>📷</span>
                이미지 변경
              </ImageActionButton>
              <ImageActionButton className="default" onClick={handleResetToDefault}>
                <span>👤</span>
                기본 이미지로 변경
              </ImageActionButton>
            </ImageButtonGroup>
          </ProfileImageSection>

          <Form onSubmit={handleSave}>
            <FormGroup>
              <Label htmlFor="name">이름</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">이메일</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">전화번호</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="010-1234-5678"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="location">지역</Label>
              <Input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="bio">소개</Label>
              <TextArea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="자신을 소개해주세요"
              />
            </FormGroup>

            <FormGroup>
              <Label>관심사</Label>
              <InterestTags>
                {formData.interests.map((interest, index) => (
                  <InterestTag key={index}>
                    {interest}
                    <RemoveButton onClick={() => removeInterest(index)}>×</RemoveButton>
                  </InterestTag>
                ))}
                <AddInterestInput
                  type="text"
                  placeholder="관심사 추가..."
                  onKeyDown={handleAddInterest}
                />
              </InterestTags>
            </FormGroup>

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
  background: white;
  padding: 0;
  padding-top: 0 !important;
`;


const ProfileEditContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0;
`;

const ProfileEditCard = styled.div`
  background: white;
  border-radius: 0;
  padding: 40px 20px;
  box-shadow: none;
  position: relative;
  min-height: 100vh;
  border: none;
  margin: 0;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
`;

const CardBackButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  position: absolute;
  left: 0;
  top: 0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }
`;

const CardTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
`;


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
  background: #667eea;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;

  &:hover {
    background: #5a6fd8;
    transform: scale(1.1);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
`;

const Input = styled.input`
  padding: 15px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  padding: 15px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
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
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;

const CancelButton = styled.button`
  flex: 1;
  background: #6c757d;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #5a6268;
    transform: translateY(-2px);
  }
`;

const InterestTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const InterestTag = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  background: #667eea;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const AddInterestInput = styled.input`
  padding: 6px 12px;
  border: 2px solid #e9ecef;
  border-radius: 20px;
  font-size: 14px;
  min-width: 120px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

export default ProfileEdit;
