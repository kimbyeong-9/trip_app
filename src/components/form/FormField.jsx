import React from 'react';
import styled from 'styled-components';

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  maxLength,
  options,
  required = false,
  showCharCount = false
}) => {
  return (
    <FormSection>
      <Label>
        {label}
        {required && <span className="required">*</span>}
      </Label>
      {type === 'textarea' ? (
        <TextArea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      ) : type === 'select' ? (
        <Select name={name} value={value} onChange={onChange}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      )}
      {showCharCount && maxLength && (
        <CharCount>{value.length}/{maxLength}</CharCount>
      )}
    </FormSection>
  );
};

const FormSection = styled.div`
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;

  .required {
    color: #e74c3c;
    margin-left: 4px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  color: #2c3e50;
  background: #f8f9fa;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #6c757d;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  color: #2c3e50;
  background: #f8f9fa;
  transition: all 0.3s ease;
  box-sizing: border-box;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #6c757d;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  color: #2c3e50;
  background: #f8f9fa;
  transition: all 0.3s ease;
  box-sizing: border-box;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const CharCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #6c757d;
  margin-top: 5px;
`;

export default FormField;
