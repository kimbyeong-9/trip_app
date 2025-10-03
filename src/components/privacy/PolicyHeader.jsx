import React from 'react';
import styled from 'styled-components';

const PolicyHeader = ({ onBack }) => {
  return (
    <Header>
      <BackButton onClick={onBack}>← 뒤로</BackButton>
      <Title>개인정보처리방침</Title>
    </Header>
  );
};

const Header = styled.div`
  margin-bottom: 40px;
  position: relative;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #667eea;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 0;
  margin-bottom: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
`;

export default PolicyHeader;
