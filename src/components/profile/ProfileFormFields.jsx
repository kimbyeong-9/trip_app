import React from 'react';
import styled from 'styled-components';

const ProfileFormFields = ({ formData, onChange }) => {
  return (
    <>
      <FormGroup>
        <Label htmlFor="name">이름</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="location">지역</Label>
        <Select
          id="location"
          name="location"
          value={formData.location}
          onChange={onChange}
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
          onChange={onChange}
          placeholder="나를 소개해보세요!"
        />
      </FormGroup>
    </>
  );
};

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

export default ProfileFormFields;
