import React from 'react';
import styled from 'styled-components';

const CounterInput = ({ label, value, onIncrement, onDecrement, minValue = 1 }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <CounterControls>
        <CounterButton
          onClick={onDecrement}
          disabled={value <= minValue}
        >
          −
        </CounterButton>
        <CounterValue>{value}</CounterValue>
        <CounterButton onClick={onIncrement}>
          +
        </CounterButton>
      </CounterControls>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
`;

const Label = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
`;

const CounterControls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CounterButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const CounterValue = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  min-width: 30px;
  text-align: center;
`;

export default CounterInput;
