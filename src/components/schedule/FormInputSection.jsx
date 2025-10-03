import React from 'react';
import styled from 'styled-components';

const FormInputSection = ({ formData, onInputChange }) => {
  return (
    <Section>
      <SectionTitle>기본 정보</SectionTitle>

      <FormGroup>
        <Label>제목</Label>
        <Input
          type="text"
          placeholder="여행 제목을 입력하세요"
          value={formData.title}
          onChange={(e) => onInputChange('title', e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label>여행 설명</Label>
        <TextArea
          placeholder="여행에 대한 설명을 입력하세요"
          value={formData.description}
          onChange={(e) => onInputChange('description', e.target.value)}
          rows={3}
        />
      </FormGroup>

      <FormGroup>
        <Label>같이 간 사람</Label>
        <Input
          type="text"
          placeholder="동행인을 입력하세요 (예: 친구 2명, 가족 4명)"
          value={formData.companions}
          onChange={(e) => onInputChange('companions', e.target.value)}
        />
      </FormGroup>
    </Section>
  );
};

const Section = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 25px 0;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

export default FormInputSection;
