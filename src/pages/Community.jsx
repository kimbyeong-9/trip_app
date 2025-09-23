import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const CommunityPage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
  padding-bottom: 20px;

  @media (max-width: 1024px) {
    padding-bottom: 100px;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e9ecef;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CreateButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }
`;

const StoriesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

const StoryCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const StoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  position: relative;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const StoryInfo = styled.div`
  flex: 1;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const AuthorName = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 5px 0;
`;

const StoryDate = styled.span`
  font-size: 14px;
  color: #6c757d;
`;

const MenuButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  color: #6c757d;
  font-size: 18px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #495057;
  }
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid #e9ecef;
  overflow: hidden;
  z-index: 100;
  min-width: 120px;
`;

const MenuOption = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 12px 16px;
  text-align: left;
  color: #495057;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #f8f9fa;
  }

  &.danger {
    color: #dc3545;
  }
`;

const StoryContent = styled.div`
  margin-bottom: 15px;
`;

const StoryText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #495057;
  margin: 0 0 15px 0;
`;

const StoryImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 15px;
`;

const StoryTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
`;

const Tag = styled.span`
  background: #e9ecef;
  color: #495057;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
`;

const StoryActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #e9ecef;
`;

const LeftActions = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #6c757d;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.3s ease;

  &:hover {
    color: #667eea;
  }

  &.liked {
    color: #e91e63;
  }
`;

const CreateStoryModal = styled.div`
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

const ModalContainer = styled.div`
  background: white;
  max-width: 600px;
  width: 100%;
  border-radius: 20px;
  padding: 30px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6c757d;
  cursor: pointer;

  &:hover {
    color: #495057;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 8px;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 14px;
  color: #495057;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ImageUploadArea = styled.div`
  border: 2px dashed #e9ecef;
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  background: #f8f9fa;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    background: #f0f4ff;
  }

  input {
    display: none;
  }
`;

const UploadText = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0;
`;

const PreviewImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 15px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CommentModal = styled.div`
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

const CommentContainer = styled.div`
  background: white;
  max-width: 500px;
  width: 100%;
  border-radius: 20px;
  padding: 30px;
  max-height: 80vh;
  overflow-y: auto;
`;

const CommentList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const Comment = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const CommentAuthor = styled.div`
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
  margin-bottom: 5px;
`;

const CommentText = styled.div`
  color: #495057;
  font-size: 14px;
  line-height: 1.4;
`;

const CommentInput = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;
`;

const CommentTextarea = styled.textarea`
  flex: 1;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 14px;
  resize: none;
  min-height: 40px;
  max-height: 100px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const CommentSubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Community = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [storyText, setStoryText] = useState('');
  const [storyImage, setStoryImage] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [stories, setStories] = useState([
    {
      id: 1,
      author: '여행러버',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      date: '2024-01-15',
      content: '오늘 제주도에서 정말 아름다운 일몰을 봤어요! 성산일출봉에서 바라본 바다가 정말 환상적이었습니다. 다음에는 더 오래 머물고 싶어요.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
      tags: ['제주도', '일몰', '성산일출봉'],
      likes: 24,
      comments: [
        { id: 1, author: '바다러버', text: '정말 아름다운 일몰이네요!' },
        { id: 2, author: '여행매니아', text: '저도 다음에 꼭 가보고 싶어요' }
      ],
      liked: false
    },
    {
      id: 2,
      author: '산악인',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      date: '2024-01-12',
      content: '설악산 등반 완료! 힘들었지만 정상에서 본 풍경은 정말 잊을 수 없을 것 같아요. 겨울 설경이 이렇게 아름다울 줄 몰랐네요.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      tags: ['설악산', '등반', '겨울여행'],
      likes: 18,
      comments: [
        { id: 1, author: '등산러버', text: '겨울 설악산 정말 아름답죠!' }
      ],
      liked: false
    },
    {
      id: 3,
      author: '맛집헌터',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      date: '2024-01-10',
      content: '부산 자갈치시장에서 먹은 회가 정말 신선하고 맛있었어요! 현지 아저씨가 추천해주신 곳인데 진짜 대박이었습니다.',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=400&fit=crop',
      tags: ['부산', '자갈치시장', '회', '맛집'],
      likes: 32,
      comments: [
        { id: 1, author: '부산토박이', text: '여기 정말 맛있죠!' },
        { id: 2, author: '회러버', text: '다음에 부산가면 꼭 가볼게요' },
        { id: 3, author: '맛집탐험가', text: '추천 감사합니다!' }
      ],
      liked: true
    }
  ]);

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuId !== null) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  const handleCreateStory = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setStoryText('');
    setStoryImage('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStoryImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitStory = () => {
    if (!storyText.trim()) return;

    const newStory = {
      id: stories.length + 1,
      author: '나',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face',
      date: new Date().toISOString().split('T')[0],
      content: storyText,
      image: storyImage,
      tags: ['여행', '스토리'],
      likes: 0,
      comments: [],
      liked: false
    };

    setStories([newStory, ...stories]);
    handleCloseModal();
  };

  const handleLike = (id) => {
    setStories(stories.map(story =>
      story.id === id
        ? {
            ...story,
            liked: !story.liked,
            likes: story.liked ? story.likes - 1 : story.likes + 1
          }
        : story
    ));
  };

  const handleMenuToggle = (id, event) => {
    event.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleReport = (id) => {
    alert('신고가 접수되었습니다.');
    setOpenMenuId(null);
  };

  const handleHide = (id) => {
    setStories(stories.filter(story => story.id !== id));
    setOpenMenuId(null);
  };

  const handleComment = (id) => {
    setSelectedStoryId(id);
    setShowCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setShowCommentModal(false);
    setSelectedStoryId(null);
    setNewComment('');
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      author: '나',
      text: newComment.trim()
    };

    setStories(stories.map(story =>
      story.id === selectedStoryId
        ? {
            ...story,
            comments: [...story.comments, newCommentObj]
          }
        : story
    ));

    handleCloseCommentModal();
  };

  const handleProfileClick = (authorName) => {
    // 작성자 이름을 URL에 안전한 형태로 변환
    const username = authorName.replace(/\s+/g, '-').toLowerCase();
    navigate(`/profile/${username}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <CommunityPage>
      <Container>
        <PageHeader>
          <PageTitle>여행 커뮤니티</PageTitle>
          <CreateButton onClick={handleCreateStory}>
            스토리 등록
          </CreateButton>
        </PageHeader>

        <StoriesGrid>
          {stories.map(story => (
            <StoryCard key={story.id}>
              <StoryHeader>
                <Avatar
                  src={story.avatar}
                  alt={story.author}
                  onClick={() => handleProfileClick(story.author)}
                />
                <StoryInfo onClick={() => handleProfileClick(story.author)}>
                  <AuthorName>{story.author}</AuthorName>
                  <StoryDate>{formatDate(story.date)}</StoryDate>
                </StoryInfo>
                <MenuButton onClick={(e) => handleMenuToggle(story.id, e)}>
                  ⋯
                </MenuButton>
                {openMenuId === story.id && (
                  <MenuDropdown onClick={(e) => e.stopPropagation()}>
                    <MenuOption onClick={() => handleReport(story.id)} className="danger">
                      신고하기
                    </MenuOption>
                    <MenuOption onClick={() => handleHide(story.id)}>
                      숨기기
                    </MenuOption>
                  </MenuDropdown>
                )}
              </StoryHeader>

              <StoryContent>
                <StoryText>{story.content}</StoryText>
                {story.image && (
                  <StoryImage src={story.image} alt="여행 사진" />
                )}
                <StoryTags>
                  {story.tags.map((tag, index) => (
                    <Tag key={index}>#{tag}</Tag>
                  ))}
                </StoryTags>
              </StoryContent>

              <StoryActions>
                <LeftActions>
                  <ActionButton
                    className={story.liked ? 'liked' : ''}
                    onClick={() => handleLike(story.id)}
                  >
                    {story.liked ? '♥' : '♡'} {story.likes}
                  </ActionButton>
                  <ActionButton onClick={() => handleComment(story.id)}>
                    댓글달기 {story.comments.length}
                  </ActionButton>
                </LeftActions>
                <RightActions>
                  <ActionButton>
                    공유
                  </ActionButton>
                </RightActions>
              </StoryActions>
            </StoryCard>
          ))}
        </StoriesGrid>
      </Container>

      {showCreateModal && (
        <CreateStoryModal onClick={(e) => e.target === e.currentTarget && handleCloseModal()}>
          <ModalContainer>
            <ModalHeader>
              <ModalTitle>여행 스토리 작성</ModalTitle>
              <CloseButton onClick={handleCloseModal}>✕</CloseButton>
            </ModalHeader>

            <FormGroup>
              <FormLabel>스토리 내용</FormLabel>
              <FormTextarea
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                placeholder="여행에서의 특별한 순간을 공유해보세요..."
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>사진 첨부</FormLabel>
              <ImageUploadArea>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  id="story-image"
                />
                <label htmlFor="story-image">
                  <UploadText>📷 클릭하여 사진을 업로드하세요</UploadText>
                </label>
                {storyImage && (
                  <PreviewImage src={storyImage} alt="미리보기" />
                )}
              </ImageUploadArea>
            </FormGroup>

            <SubmitButton
              onClick={handleSubmitStory}
              disabled={!storyText.trim()}
            >
              스토리 올리기
            </SubmitButton>
          </ModalContainer>
        </CreateStoryModal>
      )}

      {showCommentModal && (
        <CommentModal onClick={(e) => e.target === e.currentTarget && handleCloseCommentModal()}>
          <CommentContainer>
            <ModalHeader>
              <ModalTitle>댓글</ModalTitle>
              <CloseButton onClick={handleCloseCommentModal}>✕</CloseButton>
            </ModalHeader>

            <CommentList>
              {selectedStoryId && stories.find(s => s.id === selectedStoryId)?.comments.map(comment => (
                <Comment key={comment.id}>
                  <CommentAuthor>{comment.author}</CommentAuthor>
                  <CommentText>{comment.text}</CommentText>
                </Comment>
              ))}
            </CommentList>

            <CommentInput>
              <CommentTextarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitComment();
                  }
                }}
              />
              <CommentSubmitButton
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
              >
                등록
              </CommentSubmitButton>
            </CommentInput>
          </CommentContainer>
        </CommentModal>
      )}
    </CommunityPage>
  );
};

export default Community;