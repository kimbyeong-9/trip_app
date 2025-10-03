import React from 'react';
import styled from 'styled-components';

const PolicySection = ({ title, children }) => {
  return (
    <Section>
      <h2>{title}</h2>
      {children}
    </Section>
  );
};

const Section = styled.div`
  margin-bottom: 30px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 15px;
  }

  p {
    color: #6c757d;
    line-height: 1.6;
    margin-bottom: 10px;
  }

  ul {
    color: #6c757d;
    line-height: 1.8;
    padding-left: 20px;
  }

  li {
    margin-bottom: 8px;
  }
`;

export default PolicySection;
