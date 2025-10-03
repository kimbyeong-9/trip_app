import React from 'react';
import styled from 'styled-components';

const SettingToggleItem = ({ title, description, isActive, onToggle }) => {
  return (
    <SettingItem>
      <SettingLabel>
        <SettingTitle>{title}</SettingTitle>
        <SettingDescription>{description}</SettingDescription>
      </SettingLabel>
      <ToggleSwitch $active={isActive} onClick={onToggle} />
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

const ToggleSwitch = styled.div`
  position: relative;
  width: 50px;
  height: 25px;
  background: ${props => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e9ecef'};
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.$active ? '27px' : '2px'};
    width: 21px;
    height: 21px;
    background: white;
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

export default SettingToggleItem;
