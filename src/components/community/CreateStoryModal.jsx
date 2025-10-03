import React from 'react';
import styled from 'styled-components';
import CategorySelector from './CategorySelector';

const CreateStoryModal = ({
  isOpen,
  onClose,
  storyText,
  setStoryText,
  storyImage,
  onImageUpload,
  selectedCategory,
  setSelectedCategory,
  categories,
  onSubmit
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>스토리 작성</ModalTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>

        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <FormGroup>
          <FormLabel>스토리 내용</FormLabel>
          <FormTextarea
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
            placeholder="오늘의 여행 경험을 공유해주세요..."
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>사진 첨부</FormLabel>
          <ImageUploadArea>
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              id="story-image"
            />
            <label htmlFor="story-image">
              <UploadText>사진을 여기에 끌어다 놓거나 클릭하세요</UploadText>
            </label>
            {storyImage && (
              <PreviewImage src={storyImage} alt="미리보기" />
            )}
          </ImageUploadArea>
        </FormGroup>

        <SubmitButton
          onClick={onSubmit}
          disabled={!storyText.trim() || !selectedCategory}
        >
          게시하기
        </SubmitButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: white;
  max-width: 600px;
  width: 100%;
  border-radius: 20px;
  padding: 30px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6c757d;
  cursor: pointer;

  &:hover {
    color: #495057;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 8px;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 14px;
  color: #495057;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ImageUploadArea = styled.div`
  border: 2px dashed #e9ecef;
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  background: #f8f9fa;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    background: #f0f4ff;
  }

  input {
    display: none;
  }
`;

const UploadText = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0;
`;

const PreviewImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 15px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export default CreateStoryModal;
