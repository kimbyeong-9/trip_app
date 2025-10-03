import React from 'react';
import styled from 'styled-components';

const FormInput = ({ id, label, type, value, onChange, placeholder, maxLength, disabled, isRequired }) => {
  return (
    <InputGroup>
      <Label htmlFor={id}>
        {label} {isRequired && <span style={{ color: '#dc3545' }}>*</span>}
      </Label>
      <Input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
      />
    </InputGroup>
  );
};

const InputGroup = styled.div`
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 600;
  font-size: 14px;
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

  &.error {
    border-color: #dc3545;
  }
`;

export default FormInput;
