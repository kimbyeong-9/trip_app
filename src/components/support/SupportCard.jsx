import React from 'react';
import styled from 'styled-components';

const SupportCard = ({ icon, title, description, buttonText, onClick }) => {
  return (
    <Card onClick={onClick}>
      <CardIcon>{icon}</CardIcon>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <CardButton>{buttonText}</CardButton>
    </Card>
  );
};

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CardIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
  text-align: center;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
  text-align: center;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #6c757d;
  line-height: 1.6;
  text-align: center;
  margin: 0 0 20px 0;
`;

const CardButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #007bff 0%, #6f42c1 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 123, 255, 0.4);
  }
`;

export default SupportCard;
