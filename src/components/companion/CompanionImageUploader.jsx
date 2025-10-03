import React from 'react';
import styled from 'styled-components';

const CompanionImageUploader = ({
  imagePreview,
  onImageUpload,
  onRemoveImage,
  error,
  isRequired = false
}) => {
  return (
    <FormSection>
      <SectionTitle>
        사진 업로드 {isRequired && <Required>*</Required>}
      </SectionTitle>

      <FormGroup>
        <ImageUploadArea onClick={() => document.getElementById('imageUpload').click()}>
          <ImageUploadText>📷 사진을 업로드해주세요</ImageUploadText>
          <ImageUploadSubtext>
            최대 10장까지 업로드 가능합니다 {isRequired && '(필수)'}
          </ImageUploadSubtext>
        </ImageUploadArea>
        <input
          id="imageUpload"
          type="file"
          multiple
          accept="image/*"
          onChange={onImageUpload}
          style={{ display: 'none' }}
        />

        {imagePreview.length > 0 && (
          <ImagePreview>
            {imagePreview.map((url, index) => (
              <ImagePreviewItem key={index}>
                <PreviewImage src={url} alt={`Preview ${index + 1}`} />
                <RemoveButton onClick={() => onRemoveImage(index)}>
                  ×
                </RemoveButton>
              </ImagePreviewItem>
            ))}
          </ImagePreview>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormGroup>
    </FormSection>
  );
};

const FormSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #f8f9fa;
`;

const Required = styled.span`
  color: #dc3545;
  margin-left: 4px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const ImageUploadArea = styled.div`
  border: 2px dashed #e9ecef;
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8f9fa;

  &:hover {
    border-color: #667eea;
    background: #f0f4ff;
  }
`;

const ImageUploadText = styled.p`
  color: #6c757d;
  margin: 0 0 10px 0;
  font-size: 16px;
`;

const ImageUploadSubtext = styled.p`
  color: #adb5bd;
  margin: 0;
  font-size: 14px;
`;

const ImagePreview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

const ImagePreviewItem = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(220, 53, 69, 1);
    transform: scale(1.1);
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
`;

export default CompanionImageUploader;
