import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ProfileEditContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
`;

const ProfileEditContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const ProfileEditCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  margin: 0 0 30px 0;
`;

const ProfileImageSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
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
    phone: '010-1234-5678',
    bio: '여행을 사랑하는 사용자입니다. 새로운 곳을 탐험하고 좋은 사람들과 만나는 것을 좋아해요.',
    location: '서울',
    interests: ['여행', '사진', '맛집', '문화']
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
    // 여기서 실제 프로필 업데이트 로직을 구현
    alert('프로필이 저장되었습니다!');
    navigate('/profile/user');
  };

  const handleCancel = () => {
    navigate('/profile/user');
  };

  const handleImageChange = () => {
    // 이미지 변경 로직 (실제로는 파일 업로드 구현)
    alert('이미지 변경 기능은 준비 중입니다!');
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
          <Title>프로필 편집</Title>
          
          <ProfileImageSection>
            <ProfileImageContainer>
              <ProfileImage>
                {formData.name.charAt(0)}
              </ProfileImage>
              <ChangeImageButton onClick={handleImageChange} title="이미지 변경">
                📷
              </ChangeImageButton>
            </ProfileImageContainer>
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
                  onKeyPress={handleAddInterest}
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

export default ProfileEdit;
