import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../supabaseClient';


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

  const handleAddInterest = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      const value = e.target.value.trim();
      if (value && !formData.interests.includes(value)) {
        setFormData(prev => ({
          ...prev,
          interests: [...prev.interests, value]
        }));
        // 입력 필드 초기화
        setTimeout(() => {
          e.target.value = '';
        }, 0);
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
              ←
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </ChangeImageButton>
            </ProfileImageContainer>
            <ImageButtonGroup>
              <ImageActionButton className="default" onClick={handleResetToDefault}>
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
              <Label htmlFor="birthDate">생년월일</Label>
              <Input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="location">지역</Label>
              <Select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              >
                <option value="">지역을 선택하세요</option>
                <option value="서울">서울</option>
                <option value="부산">부산</option>
                <option value="대구">대구</option>
                <option value="인천">인천</option>
                <option value="광주">광주</option>
                <option value="대전">대전</option>
                <option value="울산">울산</option>
                <option value="세종">세종</option>
                <option value="경기">경기</option>
                <option value="강원">강원</option>
                <option value="충북">충북</option>
                <option value="충남">충남</option>
                <option value="전북">전북</option>
                <option value="전남">전남</option>
                <option value="경북">경북</option>
                <option value="경남">경남</option>
                <option value="제주">제주</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="bio">소개</Label>
              <TextArea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="나를 소개해보세요!"
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 16px;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &::placeholder {
    color: #999;
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
