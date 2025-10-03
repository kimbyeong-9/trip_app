import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FormField from '../components/form/FormField';
import ImageUploader from '../components/form/ImageUploader';



const ChatRoomCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '여행',
    maxMembers: 10,
    image: null,
    imagePreview: null
  });

  const categories = [
    '여행', '맛집', '문화', '액티비티', '사진', '힐링', '쇼핑', '기타'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: null
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 폼 검증
    if (!formData.title.trim()) {
      alert('채팅방 제목을 입력해주세요.');
      return;
    }

    if (!formData.description.trim()) {
      alert('채팅방 설명을 입력해주세요.');
      return;
    }

    // 실제로는 여기서 API 호출을 통해 채팅방을 생성
    console.log('새 채팅방 생성:', formData);

    // 성공적으로 생성되었다는 알림
    alert('채팅방이 성공적으로 생성되었습니다!');

    // 채팅방 목록으로 이동
    navigate('/chat-room-list');
  };

  const handleCancel = () => {
    if (window.confirm('작성 중인 내용이 삭제됩니다. 정말 취소하시겠습니까?')) {
      navigate('/chat-room-list');
    }
  };

  const isFormValid = formData.title.trim() && formData.description.trim();

  return (
    <ChatRoomCreateContainer>
      <Header>
        <HeaderContent>
          <BackButton onClick={() => navigate('/chat-room-list')}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </BackButton>
          <HeaderTitle>
            <h1>새 채팅방 만들기</h1>
            <p>여행 동행을 찾기 위한 채팅방을 생성해보세요</p>
          </HeaderTitle>
        </HeaderContent>
      </Header>

      <FormContainer>
        <FormCard>
          <form onSubmit={handleSubmit}>
            <FormField
              label="채팅방 제목"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="예: 제주도 3박4일 같이 가실 분!"
              maxLength={50}
              required={true}
              showCharCount={true}
            />

            <FormField
              label="채팅방 설명"
              name="description"
              type="textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="채팅방에 대한 자세한 설명을 작성해주세요. 여행 일정, 예상 비용, 만날 장소 등을 포함하면 좋습니다."
              maxLength={500}
              required={true}
              showCharCount={true}
            />

            <FormField
              label="카테고리"
              name="category"
              type="select"
              value={formData.category}
              onChange={handleInputChange}
              options={categories.map(cat => ({ value: cat, label: cat }))}
            />

            <FormField
              label="최대 참여인원"
              name="maxMembers"
              type="select"
              value={formData.maxMembers}
              onChange={handleInputChange}
              options={[5, 10, 15, 20, 25, 30].map(num => ({ value: num, label: `${num}명` }))}
            />

            <ImageUploadSection>
              <ImageLabel>대표 이미지</ImageLabel>
              <ImageUploader
                imagePreview={formData.imagePreview}
                onImageChange={handleImageChange}
                onRemoveImage={removeImage}
              />
            </ImageUploadSection>

            <ButtonContainer>
              <CancelButton type="button" onClick={handleCancel}>
                취소
              </CancelButton>
              <CreateButton type="submit" disabled={!isFormValid}>
                채팅방 생성하기
              </CreateButton>
            </ButtonContainer>
          </form>
        </FormCard>
      </FormContainer>
    </ChatRoomCreateContainer>
  );
};


const ChatRoomCreateContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-bottom: 80px;

  @media (min-width: 1025px) {
    padding-bottom: 0;
  }
`;

const Header = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60px 20px 40px 20px;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1" fill="rgba(255,255,255,0.05)"/><circle cx="40" cy="80" r="1.5" fill="rgba(255,255,255,0.08)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    animation: float 20s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateX(0) translateY(0); }
    25% { transform: translateX(-20px) translateY(-10px); }
    50% { transform: translateX(20px) translateY(-20px); }
    75% { transform: translateX(-10px) translateY(10px); }
  }
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const HeaderTitle = styled.div`
  h1 {
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 8px 0;
  }

  p {
    font-size: 16px;
    opacity: 0.9;
    margin: 0;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 24px;
    }
    p {
      font-size: 14px;
    }
  }
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: -20px auto 0 auto;
  padding: 0 20px 40px 20px;
  position: relative;
  z-index: 2;
`;

const FormCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const ImageUploadSection = styled.div`
  margin-bottom: 30px;
`;

const ImageLabel = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 16px 24px;
  border: 2px solid #6c757d;
  background: transparent;
  color: #6c757d;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #6c757d;
    color: white;
  }
`;

const CreateButton = styled.button`
  flex: 2;
  padding: 16px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export default ChatRoomCreate;