import React from 'react';
import styled from 'styled-components';

const ScheduleImageUploader = ({
  image,
  onImageUpload,
  onImageRemove,
  onDragOver,
  onDragLeave,
  onDrop
}) => {
  return (
    <Section>
      <Label>대표사진</Label>
      <UploadSection>
        {!image ? (
          <UploadBox
            onClick={() => document.getElementById('imageUpload').click()}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <UploadText>대표사진을 업로드하세요</UploadText>
            <UploadSubText>
              클릭하거나 드래그 앤 드롭으로 이미지 업로드 (최대 5MB)
            </UploadSubText>
            <HiddenFileInput
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={onImageUpload}
            />
          </UploadBox>
        ) : (
          <ImagePreview>
            <PreviewImage src={image} alt="대표사진 미리보기" />
            <RemoveButton onClick={onImageRemove}>×</RemoveButton>
          </ImagePreview>
        )}
      </UploadSection>
    </Section>
  );
};

const Section = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 10px;
`;

const UploadSection = styled.div`
  width: 100%;
`;

const UploadBox = styled.div`
  width: 100%;
  min-height: 200px;
  border: 3px dashed #dee2e6;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8f9fa;

  &:hover, &.dragover {
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.05);
  }
`;

const UploadText = styled.div`
  font-size: 16px;
  color: #495057;
  margin-bottom: 8px;
  font-weight: 600;
`;

const UploadSubText = styled.div`
  font-size: 14px;
  color: #6c757d;
  text-align: center;
  line-height: 1.5;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  line-height: 1;

  &:hover {
    background: #c82333;
    transform: scale(1.1);
  }
`;

export default ScheduleImageUploader;
