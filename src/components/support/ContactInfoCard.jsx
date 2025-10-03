import React from 'react';
import styled from 'styled-components';

const ContactInfoCard = ({ icon, title, details }) => {
  return (
    <Card>
      <CardIcon>{icon}</CardIcon>
      <CardTitle>{title}</CardTitle>
      <CardDetail>{details}</CardDetail>
    </Card>
  );
};

const Card = styled.div`
  text-align: center;
`;

const CardIcon = styled.div`
  font-size: 32px;
  margin-bottom: 15px;
`;

const CardTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 10px 0;
`;

const CardDetail = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
  line-height: 1.5;
  white-space: pre-line;
`;

export default ContactInfoCard;
