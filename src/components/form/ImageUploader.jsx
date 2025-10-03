import React from 'react';
import styled from 'styled-components';

const ImageUploader = ({ imagePreview, onImageChange, onRemoveImage }) => {
  return (
    <>
      <ImageUploadContainer
        className={imagePreview ? 'has-image' : ''}
        onClick={() => document.getElementById('imageInput').click()}
      >
        {imagePreview ? (
          <div>
            <PreviewImage src={imagePreview} alt="미리보기" />
            <RemoveImageButton
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveImage();
              }}
            >
              이미지 삭제
            </RemoveImageButton>
          </div>
        ) : (
          <>
            <ImageUploadIcon>📸</ImageUploadIcon>
            <ImageUploadText>이미지를 선택해주세요</ImageUploadText>
            <ImageUploadSubtext>JPG, PNG 파일 (최대 5MB)</ImageUploadSubtext>
          </>
        )}
      </ImageUploadContainer>
      <HiddenFileInput
        id="imageInput"
        type="file"
        accept="image/*"
        onChange={onImageChange}
      />
    </>
  );
};

const ImageUploadContainer = styled.div`
  position: relative;
  border: 2px dashed #dee2e6;
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  background: #f8f9fa;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #667eea;
    background: #f0f2ff;
  }

  &.has-image {
    border-style: solid;
    border-color: #667eea;
    background: #f0f2ff;
  }
`;

const ImageUploadIcon = styled.div`
  font-size: 48px;
  margin-bottom: 15px;
  opacity: 0.5;
`;

const ImageUploadText = styled.div`
  color: #6c757d;
  font-size: 16px;
  margin-bottom: 8px;
`;

const ImageUploadSubtext = styled.div`
  color: #adb5bd;
  font-size: 14px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const RemoveImageButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #c0392b;
  }
`;

export default ImageUploader;
