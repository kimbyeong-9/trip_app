import React from 'react';
import styled from 'styled-components';

const ContactForm = ({ formData, onInputChange, onSubmit }) => {
  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <FormLabel>이름 *</FormLabel>
        <FormInput
          type="text"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          placeholder="이름을 입력해주세요"
          required
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>이메일 *</FormLabel>
        <FormInput
          type="email"
          name="email"
          value={formData.email}
          onChange={onInputChange}
          placeholder="이메일을 입력해주세요"
          required
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>문의 유형 *</FormLabel>
        <FormSelect
          name="category"
          value={formData.category}
          onChange={onInputChange}
          required
        >
          <option value="">문의 유형을 선택해주세요</option>
          <option value="booking">예약 관련</option>
          <option value="payment">결제 관련</option>
          <option value="account">계정 관련</option>
          <option value="technical">기술적 문제</option>
          <option value="refund">환불 관련</option>
          <option value="other">기타</option>
        </FormSelect>
      </FormGroup>

      <FormGroup>
        <FormLabel>제목 *</FormLabel>
        <FormInput
          type="text"
          name="subject"
          value={formData.subject}
          onChange={onInputChange}
          placeholder="문의 제목을 입력해주세요"
          required
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>내용 *</FormLabel>
        <FormTextarea
          name="message"
          value={formData.message}
          onChange={onInputChange}
          placeholder="문의 내용을 자세히 입력해주세요"
          required
        />
      </FormGroup>

      <SubmitButton type="submit">
        문의 전송
      </SubmitButton>
    </Form>
  );
};

const Form = styled.form`
  display: grid;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const FormSelect = styled.select`
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 14px;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #007bff 0%, #6f42c1 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  justify-self: center;
  min-width: 200px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 123, 255, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export default ContactForm;
