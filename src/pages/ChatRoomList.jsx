import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../supabaseClient';



const ChatRoomList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // 검색 필터링
  const filteredChatRooms = chatRooms.filter(room =>
    room.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateChatRoom = () => {
    navigate('/chat-room-create');
  };

  const handleJoinChatRoom = (roomId) => {
    navigate(`/chat-room/${roomId}`);
  };

  if (loading) {
    return (
      <ChatRoomListContainer>
        <Header>
          <HeaderContent>
            <HeaderTitle>
              <h1>동행모집 채팅방</h1>
              <p>여행 동행을 찾고 새로운 인연을 만나보세요</p>
            </HeaderTitle>
          </HeaderContent>
        </Header>
        <Content>
          <LoadingSpinner>
            <Spinner />
            <LoadingText>채팅방 목록 로딩중...</LoadingText>
          </LoadingSpinner>
        </Content>
      </ChatRoomListContainer>
    );
  }

  return (
    <ChatRoomListContainer>
      <Header>
        <HeaderContent>
          <HeaderTitle>
            <h1>동행모집 채팅방</h1>
            <p>여행 동행을 찾고 새로운 인연을 만나보세요</p>
          </HeaderTitle>
          <CreateButton onClick={handleCreateChatRoom}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            채팅방 생성
          </CreateButton>
        </HeaderContent>
      </Header>

      <SearchContainer>
        <SearchBox>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            type="text"
            placeholder="채팅방을 검색해보세요..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBox>
      </SearchContainer>

      <Content>
        <SectionTitle>활성 채팅방 ({filteredChatRooms.length}개)</SectionTitle>

        {filteredChatRooms.length > 0 ? (
          <ChatRoomGrid>
            {filteredChatRooms.map((room) => (
              <ChatRoomCard key={room.id} onClick={() => handleJoinChatRoom(room.id)}>
                <CardImageContainer>
                  <CardImage src={room.image} alt={room.title} />
                  <MembersCount>{room.members}명</MembersCount>
                  <CreatorProfile>
                    <CreatorAvatar
                      src={room.creator?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"}
                      alt={room.creator?.name || "채팅방 생성자"}
                    />
                    <CreatorName>{room.creator?.name || "여행매니저"}</CreatorName>
                  </CreatorProfile>
                </CardImageContainer>
                <CardContent>
                  <CardTitle>{room.title}</CardTitle>
                  <CardDescription>
                    함께 {room.title.split(' ')[0]}를 즐기며 새로운 인연을 만들어보세요.
                    다양한 연령대의 여행객들과 소통하며 특별한 추억을 만들어보세요.
                  </CardDescription>
                  <JoinButton onClick={(e) => {
                    e.stopPropagation();
                    handleJoinChatRoom(room.id);
                  }}>
                    채팅방 참여하기
                  </JoinButton>
                </CardContent>
              </ChatRoomCard>
            ))}
          </ChatRoomGrid>
        ) : (
          <EmptyState>
            <div className="icon">💬</div>
            <h3>검색 결과가 없습니다</h3>
            <p>다른 검색어로 시도해보시거나<br />새로운 채팅방을 생성해보세요!</p>
          </EmptyState>
        )}
      </Content>
    </ChatRoomListContainer>
  );
};


const ChatRoomListContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-bottom: 80px;

  @media (min-width: 1025px) {
    padding-bottom: 0;
  }
`;

const Header = styled.div`
  background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
  padding: 60px 20px 40px 20px;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1" fill="rgba(255,255,255,0.05)"/><circle cx="40" cy="80" r="1.5" fill="rgba(255,255,255,0.08)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    animation: float 20s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateX(0) translateY(0); }
    25% { transform: translateX(-20px) translateY(-10px); }
    50% { transform: translateX(20px) translateY(-20px); }
    75% { transform: translateX(-10px) translateY(10px); }
  }
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.div`
  h1 {
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 8px 0;
  }

  p {
    font-size: 16px;
    opacity: 0.9;
    margin: 0;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 24px;
    }
    p {
      font-size: 14px;
    }
  }
`;

const CreateButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 20px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }

  svg {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 12px;
  }
`;

const SearchContainer = styled.div`
  max-width: 1200px;
  margin: -20px auto 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const SearchBox = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #2c3e50;
  background: transparent;

  &::placeholder {
    color: #6c757d;
  }
`;

const SearchIcon = styled.div`
  color: #6c757d;
  font-size: 20px;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 30px 0;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '💬';
    font-size: 28px;
  }
`;

const ChatRoomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ChatRoomCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CardImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ChatRoomCard}:hover & {
    transform: scale(1.05);
  }
`;

const MembersCount = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 152, 0, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: '👥';
    font-size: 10px;
  }
`;

const CreatorProfile = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.95);
  padding: 8px 12px;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const CreatorAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
`;

const CreatorName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #2c3e50;
  white-space: nowrap;
`;

const CardContent = styled.div`
  padding: 25px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
  line-height: 1.4;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0 0 20px 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const JoinButton = styled.button`
  background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 4px 15px rgba(255, 152, 0, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 152, 0, 0.5);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #6c757d;

  .icon {
    font-size: 64px;
    margin-bottom: 20px;
    opacity: 0.5;
  }

  h3 {
    font-size: 24px;
    margin: 0 0 10px 0;
    color: #495057;
  }

  p {
    font-size: 16px;
    margin: 0;
    line-height: 1.6;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
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

export default ChatRoomList;