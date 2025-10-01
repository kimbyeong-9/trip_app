import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import repairManIcon from '../assets/icons/free-icon-repair-man-4429935.png';
import { supabase } from '../supabaseClient';

const ChatRoomsSection = ({ onCardClick }) => {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [showChatRoomModal, setShowChatRoomModal] = useState(false);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const { data, error } = await supabase
          .from('ChatRooms')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          console.error('Error fetching chat rooms:', error);
        } else {
          setChatRooms(data || []);
        }
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatRooms();
  }, []);

  // 로그인 상태 체크 함수
  const isLoggedIn = () => {
    const loginData = localStorage.getItem('loginData') || sessionStorage.getItem('loginData');
    return !!loginData;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubMenuClick = (path) => {
    if (!isLoggedIn()) {
      onCardClick(path);
      setIsMenuOpen(false);
      return;
    }

    if (path === '/gallery-shop') {
      setShowGalleryModal(true);
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  const closeGalleryModal = () => {
    setShowGalleryModal(false);
  };

  const handleChatRoomClick = (room) => {
    setSelectedChatRoom(room);
    setShowChatRoomModal(true);
  };

  const closeChatRoomModal = () => {
    setShowChatRoomModal(false);
    setSelectedChatRoom(null);
  };

  const handleJoinChatRoom = () => {
    if (!isLoggedIn()) {
      onCardClick(`/chat-room/${selectedChatRoom.id}`);
      closeChatRoomModal();
      return;
    }

    // 로그인된 경우 채팅방으로 이동
    navigate(`/chat-room/${selectedChatRoom.id}`);
    closeChatRoomModal();
  };

  if (loading) {
    return (
      <ChatRoomsSectionContainer>
        <LoadingSpinner>
          <Spinner />
          <LoadingText>채팅방 로딩중...</LoadingText>
        </LoadingSpinner>
      </ChatRoomsSectionContainer>
    );
  }

  return (
    <ChatRoomsSectionContainer>
      <SectionHeader>
        <h2>동행모집 채팅방</h2>
      </SectionHeader>
      <ChatRooms>
        {chatRooms.map((room) => (
          <ChatRoomCard key={room.id} onClick={() => handleChatRoomClick(room)}>
            <RoomImageContainer>
              <RoomImage src={room.image} alt={room.title} />
              <CreatorProfileContainer>
                <CreatorAvatar
                  src={room.creator?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"}
                  alt={room.creator?.name || "채팅방 생성자"}
                />
                <CreatorName>{room.creator?.name || "여행매니저"}</CreatorName>
              </CreatorProfileContainer>
            </RoomImageContainer>
            <RoomInfo>
              <RoomTitle>{room.title}</RoomTitle>
              <RoomMembers>{room.members}명</RoomMembers>
            </RoomInfo>
          </ChatRoomCard>
        ))}
      </ChatRooms>

      {/* 고정된 버튼들 */}
      <FloatingButtons>
        <MenuButton
          className={isMenuOpen ? 'active' : ''}
          onClick={toggleMenu}
        >
          <CompanionIcon>
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </CompanionIcon>
          <CompanionText className="menu-text">메뉴</CompanionText>
        </MenuButton>

        <SubMenuContainer $isOpen={isMenuOpen}>
          <SubMenuButton
            color="#667eea"
            onClick={() => handleSubMenuClick('/community')}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 17v2H2v-2s0-4 7-4 7 4 7 4zm-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5zm3.44 11.5A5.5 5.5 0 0 1 22 13.5a5.5 5.5 0 0 1-5.06-7.5 3.5 3.5 0 1 0-1 7z"/>
            </svg>
            커뮤니티
          </SubMenuButton>

          <SubMenuButton
            color="#ff9800"
            onClick={() => handleSubMenuClick('/gallery-shop')}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            갤러리샵
          </SubMenuButton>

          <SubMenuButton
            color="#4caf50"
            onClick={() => handleSubMenuClick('/notice')}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            공지사항
          </SubMenuButton>
        </SubMenuContainer>

        <CompanionButton onClick={() => {
          if (!isLoggedIn()) {
            onCardClick('/companion-list');
          } else {
            navigate('/companion-list');
          }
        }}>
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
      </FloatingButtons>

      {/* 갤러리샵 준비중 모달 */}
      {showGalleryModal && (
        <GalleryModalOverlay onClick={(e) => e.target === e.currentTarget && closeGalleryModal()}>
          <GalleryModalContainer>
            <GalleryModalIcon>
              <img src={repairManIcon} alt="작업중" style={{ width: '64px', height: '64px' }} />
            </GalleryModalIcon>
            <GalleryModalTitle>갤러리샵 준비중</GalleryModalTitle>
            <GalleryModalMessage>
              갤러리샵 서비스는 현재 준비중입니다.<br />
              더욱 멋진 서비스로 찾아뵙겠습니다!
            </GalleryModalMessage>
            <GalleryModalButton onClick={closeGalleryModal}>
              확인
            </GalleryModalButton>
          </GalleryModalContainer>
        </GalleryModalOverlay>
      )}

      {/* 채팅방 상세 모달 */}
      {showChatRoomModal && selectedChatRoom && (
        <ChatRoomModalOverlay onClick={(e) => e.target === e.currentTarget && closeChatRoomModal()}>
          <ChatRoomModalContainer>
            <ChatRoomModalBackground backgroundImage={selectedChatRoom.image}>
              <ChatRoomModalCloseButton onClick={closeChatRoomModal}>
                ×
              </ChatRoomModalCloseButton>
            </ChatRoomModalBackground>

            <ChatRoomModalContent>
              <CreatorProfile>
                <ModalCreatorAvatar
                  src={selectedChatRoom.creator?.avatar || selectedChatRoom.image}
                  alt={selectedChatRoom.creator?.name || "채팅방 생성자"}
                />
                <CreatorInfo>
                  <ModalCreatorName>{selectedChatRoom.creator?.name || "여행 매니저"}</ModalCreatorName>
                  <CreatorRole>채팅방 생성자</CreatorRole>
                </CreatorInfo>
              </CreatorProfile>

              <ChatRoomModalTitle>{selectedChatRoom.title}</ChatRoomModalTitle>

              <ParticipantInfo>
                <ParticipantCount>
                  현재 참여인원: {selectedChatRoom.members}명
                </ParticipantCount>
              </ParticipantInfo>

              <JoinButton onClick={handleJoinChatRoom}>
                채팅방 참여하기
              </JoinButton>
            </ChatRoomModalContent>
          </ChatRoomModalContainer>
        </ChatRoomModalOverlay>
      )}
    </ChatRoomsSectionContainer>
  );
};


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
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  min-width: 280px;
  flex-shrink: 0;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    min-width: 240px;
  }
`;

const RoomImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  overflow: hidden;
`;

const RoomImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CreatorProfileContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.95);
  padding: 6px 10px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CreatorAvatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
`;

const CreatorName = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #2c3e50;
  white-space: nowrap;
`;

const RoomInfo = styled.div`
  padding: 15px;
`;

const RoomTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const RoomMembers = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const FloatingButtons = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;

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

const MenuButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  font-size: 12px;
  font-weight: 600;
  position: relative;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
  }

  &.active {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
  }

  &.active .menu-text {
    display: none;
  }

  &.active ${CompanionIcon} {
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const SubMenuContainer = styled.div`
  position: absolute;
  bottom: 200px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transform: ${props => props.$isOpen ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.8)'};
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  align-items: center;
`;

const SubMenuButton = styled.button`
  background: white;
  border: 2px solid ${props => props.color || '#667eea'};
  color: ${props => props.color || '#667eea'};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-size: 8px;
  font-weight: 600;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;

  &:hover {
    background: ${props => props.color || '#667eea'};
    color: white;
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  svg {
    width: 18px;
    height: 18px;
    margin-bottom: 1px;
    flex-shrink: 0;
  }
`;

const GalleryModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
`;

const GalleryModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px 30px 30px 30px;
  text-align: center;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const GalleryModalIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const GalleryModalTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const GalleryModalMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 30px 0;
  line-height: 1.6;
`;

const GalleryModalButton = styled.button`
  background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 152, 0, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 152, 0, 0.6);
  }
`;

// 채팅방 모달 스타일
const ChatRoomModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
`;

const ChatRoomModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
  position: relative;

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const ChatRoomModalBackground = styled.div`
  width: 100%;
  height: 250px;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7));
  }
`;

const ChatRoomModalCloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 20px;
  transition: all 0.3s ease;
  z-index: 1;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const ChatRoomModalContent = styled.div`
  padding: 30px;
  text-align: center;
`;

const CreatorProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const ModalCreatorAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const CreatorInfo = styled.div`
  text-align: left;
`;

const ModalCreatorName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 5px 0;
`;

const CreatorRole = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
`;

const ChatRoomModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
  line-height: 1.3;
`;

const ParticipantInfo = styled.div`
  background: #f8f9fa;
  padding: 15px 20px;
  border-radius: 12px;
  margin: 20px 0;
`;

const ParticipantCount = styled.p`
  font-size: 16px;
  color: #495057;
  margin: 0;
  font-weight: 600;
`;

const JoinButton = styled.button`
  background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 152, 0, 0.4);
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 152, 0, 0.6);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 20px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #ff9800;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0;
`;

export default ChatRoomsSection;
