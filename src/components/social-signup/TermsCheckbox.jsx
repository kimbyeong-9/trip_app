import React from 'react';
import styled from 'styled-components';

const TermsCheckbox = ({ id, label, checked, onChange, disabled, isRequired, isAllAgree }) => {
  return (
    <CheckboxGroup className={isAllAgree ? 'all-agree' : ''}>
      <Checkbox
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <CheckboxLabel htmlFor={id} $isAllAgree={isAllAgree}>
        {label} {isRequired && <span>(필수)</span>}
      </CheckboxLabel>
    </CheckboxGroup>
  );
};

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
  padding: 12px;
  background: white;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9fa;
  }

  &.all-agree {
    background: #667eea;
    color: white;
    font-weight: 600;
    margin-bottom: 15px;

    &:hover {
      background: #5a6fd8;
    }
  }
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: #667eea;
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 2px;
`;

const CheckboxLabel = styled.label`
  color: ${props => props.$isAllAgree ? 'white' : '#2c3e50'};
  font-size: 14px;
  cursor: pointer;
  flex: 1;
  line-height: 1.5;
  user-select: none;

  span {
    color: ${props => props.$isAllAgree ? '#ffd700' : '#dc3545'};
    font-weight: 600;
  }
`;

export default TermsCheckbox;
