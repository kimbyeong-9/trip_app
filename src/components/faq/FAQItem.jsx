import React from 'react';
import styled from 'styled-components';

const FAQItem = ({ item, isExpanded, onToggle }) => {
  return (
    <ItemContainer>
      <Question onClick={onToggle}>
        <QuestionText>{item.question}</QuestionText>
        <ExpandIcon expanded={isExpanded}>▼</ExpandIcon>
      </Question>
      <Answer expanded={isExpanded}>
        <AnswerContent dangerouslySetInnerHTML={{ __html: item.answer }} />
      </Answer>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  margin-bottom: 20px;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const Question = styled.div`
  padding: 20px 25px;
  background: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s ease;

  &:hover {
    background: #f8f9fa;
  }
`;

const QuestionText = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  flex: 1;
  line-height: 1.4;
`;

const ExpandIcon = styled.div`
  font-size: 20px;
  color: #667eea;
  transition: transform 0.3s ease;
  transform: ${props => props.expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  margin-left: 15px;
`;

const Answer = styled.div`
  max-height: ${props => props.expanded ? '500px' : '0'};
  opacity: ${props => props.expanded ? '1' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
`;

const AnswerContent = styled.div`
  padding: 25px;
  color: #6c757d;
  font-size: 16px;
  line-height: 1.6;

  p {
    margin: 0 0 15px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    color: #2c3e50;
    font-weight: 600;
  }

  ul {
    margin: 15px 0;
    padding-left: 20px;

    li {
      margin-bottom: 8px;
    }
  }
`;

export default FAQItem;
