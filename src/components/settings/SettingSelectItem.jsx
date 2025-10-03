import React from 'react';
import styled from 'styled-components';

const SettingSelectItem = ({ title, description, value, options, onChange }) => {
  return (
    <SettingItem>
      <SettingLabel>
        <SettingTitle>{title}</SettingTitle>
        <SettingDescription>{description}</SettingDescription>
      </SettingLabel>
      <SelectBox value={value} onChange={onChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectBox>
    </SettingItem>
  );
};

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f8f9fa;

  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.div`
  display: flex;
  flex-direction: column;
`;

const SettingTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 5px;
`;

const SettingDescription = styled.span`
  font-size: 14px;
  color: #6c757d;
`;

const SelectBox = styled.select`
  padding: 8px 12px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  background: white;
  color: #495057;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export default SettingSelectItem;
