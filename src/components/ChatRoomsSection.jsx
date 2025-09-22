import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const ChatRoomsSectionContainer = styled.div`
  padding: 60px 20px;
  background: #f8f9fa;
  position: relative;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  h2 {
    font-size: 32px;
    font-weight: 700;
    color: #2c3e50;
    margin: 0;
    background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const ChatRooms = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto 40px auto;
  
  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const ChatRoomCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 15px;
  min-width: 250px;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    min-width: 200px;
  }
`;

const RoomImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const RoomInfo = styled.div`
  flex: 1;
`;

const RoomTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 5px 0;
`;

const RoomMembers = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
`;

const FloatingButton = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 100;

  @media (max-width: 1024px) {
    bottom: 110px;
  }
`;

const CompanionButton = styled.button`
  background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
  color: white;
  border: none;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(255, 152, 0, 0.4);
  font-size: 12px;
  font-weight: 600;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(255, 152, 0, 0.6);
  }
`;

const CompanionIcon = styled.div`
  margin-bottom: 4px;
`;

const CompanionText = styled.span`
  white-space: pre-line;
  text-align: center;
  line-height: 1.2;
`;

const ChatRoomsSection = ({ chatRooms }) => {
  const navigate = useNavigate();

  return (
    <ChatRoomsSectionContainer>
      <SectionHeader>
        <h2>동행모집 채팅방</h2>
      </SectionHeader>
      <ChatRooms>
        {chatRooms.map((room) => (
          <ChatRoomCard key={room.id}>
            <RoomImage src={room.image} alt={room.title} />
            <RoomInfo>
              <RoomTitle>{room.title}</RoomTitle>
              <RoomMembers>참여인원: {room.members}명</RoomMembers>
            </RoomInfo>
          </ChatRoomCard>
        ))}
      </ChatRooms>

      {/* 고정된 동행모집 버튼 */}
      <FloatingButton>
        <CompanionButton onClick={() => navigate('/companion-list')}>
          <CompanionIcon>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4C18.2091 4 20 5.79086 20 8C20 10.2091 18.2091 12 16 12C13.7909 12 12 10.2091 12 8C12 5.79086 13.7909 4 16 4Z" fill="white"/>
              <path d="M8 6C9.65685 6 11 7.34315 11 9C11 10.6569 9.65685 12 8 12C6.34315 12 5 10.6569 5 9C5 7.34315 6.34315 6 8 6Z" fill="white"/>
              <path d="M8 14C11.866 14 15 17.134 15 21H1C1 17.134 4.134 14 8 14Z" fill="white"/>
              <path d="M16.5 14C19.538 14 22 16.462 22 19.5V21H16V19.5C16 17.567 15.433 15.783 14.461 14.301C15.099 14.108 15.787 14 16.5 14Z" fill="white"/>
            </svg>
          </CompanionIcon>
          <CompanionText>동행{'\n'}모집</CompanionText>
        </CompanionButton>
      </FloatingButton>
    </ChatRoomsSectionContainer>
  );
};

export default ChatRoomsSection;
