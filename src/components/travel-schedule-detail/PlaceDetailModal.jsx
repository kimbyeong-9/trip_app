import React from 'react';
import styled from 'styled-components';

const PlaceDetailModal = ({ place, onClose, onShare }) => {
  if (!place) return null;

  return (
    <Modal onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContent>
        <ModalHeader>
          <img src={place.image} alt={place.name} />
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>

        <ModalBody>
          <ModalTitle>{place.name}</ModalTitle>

          <InfoGrid>
            <InfoItem>
              <InfoText>
                <InfoLabel>전화번호</InfoLabel>
                <InfoValue>{place.phone}</InfoValue>
              </InfoText>
            </InfoItem>

            <InfoItem>
              <InfoText>
                <InfoLabel>주소</InfoLabel>
                <InfoValue>{place.address}</InfoValue>
              </InfoText>
            </InfoItem>

            <InfoItem>
              <InfoText>
                <InfoLabel>운영시간</InfoLabel>
                <InfoValue>{place.hours}</InfoValue>
              </InfoText>
            </InfoItem>
          </InfoGrid>

          <ActionButtons>
            <ActionButton onClick={onShare}>
              공유
            </ActionButton>
          </ActionButtons>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 0;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  position: relative;
  height: 200px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const ModalBody = styled.div`
  padding: 30px;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 20px 0;
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 15px;
  margin-bottom: 30px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const InfoText = styled.div`
  flex: 1;
`;

const InfoLabel = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0 0 4px 0;
`;

const InfoValue = styled.p`
  font-size: 16px;
  color: #2c3e50;
  margin: 0;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  width: 100%;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 14px 20px;
  border: 2px solid #667eea;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4c9a 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`;

export default PlaceDetailModal;
