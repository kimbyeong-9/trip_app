import React from 'react';
import styled from 'styled-components';
import EyeIcon from './EyeIcon';

const PasswordInput = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  disabled,
  showPassword,
  onTogglePassword,
  error,
  errorMessage
}) => {
  return (
    <div>
      <PasswordInputContainer>
        <Input
          type={showPassword ? "text" : "password"}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          disabled={disabled}
          className={error ? 'error' : ''}
        />
        <PasswordToggle
          type="button"
          onClick={onTogglePassword}
          disabled={disabled}
        >
          <EyeIcon isVisible={showPassword} />
        </PasswordToggle>
      </PasswordInputContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

const PasswordInputContainer = styled.div`
  position: relative;
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

  &:disabled {
    background-color: #f8f9fa;
    opacity: 0.6;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;

  &:hover {
    color: #667eea;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 12px;
  margin-top: 5px;
  padding-left: 5px;
`;

export default PasswordInput;
