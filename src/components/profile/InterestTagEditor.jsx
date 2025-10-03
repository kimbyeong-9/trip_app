import React from 'react';
import styled from 'styled-components';

const InterestTagEditor = ({ interests, onAdd, onRemove }) => {
  const handleAddInterest = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      const value = e.target.value.trim();
      if (value && !interests.includes(value)) {
        onAdd(value);
        // 입력 필드 초기화
        setTimeout(() => {
          e.target.value = '';
        }, 0);
      }
    }
  };

  return (
    <Container>
      <Label>관심사</Label>
      <InterestTags>
        {interests.map((interest, index) => (
          <InterestTag key={index}>
            {interest}
            <RemoveButton onClick={() => onRemove(index)}>×</RemoveButton>
          </InterestTag>
        ))}
        <AddInterestInput
          type="text"
          placeholder="관심사 추가..."
          onKeyDown={handleAddInterest}
        />
      </InterestTags>
    </Container>
  );
};

const Container = styled.div`
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

export default InterestTagEditor;
