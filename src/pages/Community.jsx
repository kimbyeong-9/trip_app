import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StoryCard from '../components/community/StoryCard';
import CreateStoryModal from '../components/community/CreateStoryModal';
import CommentModal from '../components/community/CommentModal';



const Community = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [storyText, setStoryText] = useState('');
  const [storyImage, setStoryImage] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [expandedStories, setExpandedStories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { key: 'kids', label: '아이들과 함께' },
    { key: 'restaurant', label: '맛집' },
    { key: 'cafe', label: '카페' },
    { key: 'experience', label: '체험' },
    { key: 'festival', label: '축제' },
    { key: 'sports', label: '스포츠' },
    { key: 'resort', label: '리조트' },
    { key: 'historical', label: '역사' },
    { key: 'nature', label: '자연' },
    { key: 'tourism', label: '관광' },
    { key: 'architecture', label: '건축' }
  ];

  // 초기 스토리 데이터를 함수로 생성 (번역을 위해)
  const getInitialStories = () => [
    {
      id: 1,
      author: '여행러버',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      date: '2024-01-15',
      content: '오늘 제주도에서 정말 아름다운 일몰을 봤어요! 성산일출봉에서 바라본 바다가 정말 환상적이었습니다. 다음에는 더 오래 머물고 싶어요.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
      tags: ['제주도', '일몼', '성산일출봉'],
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
      tags: ['설악산', '등산', '겨울여행'],
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
  ];

  const [stories, setStories] = useState(getInitialStories());


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
    setSelectedCategory('');
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
    if (!storyText.trim() || !selectedCategory) {
      alert('카테고리를 선택해주세요');
      return;
    }

    // 현재 로그인한 사용자 정보 가져오기
    const getCurrentUser = () => {
      const loginData = localStorage.getItem('loginData') || sessionStorage.getItem('loginData');
      if (loginData) {
        return JSON.parse(loginData);
      }
      return null;
    };

    const currentUser = getCurrentUser();

    const newStory = {
      id: Date.now(), // 더 고유한 ID 생성
      author: currentUser?.user?.name || '익명',
      avatar: currentUser?.user?.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face',
      date: new Date().toISOString().split('T')[0],
      content: storyText,
      image: storyImage,
      tags: [selectedCategory, '여행', '스토리'],
      category: selectedCategory,
      likes: 0,
      comments: [],
      liked: false
    };

    setStories([newStory, ...stories]);

    // 폼 초기화
    setStoryText('');
    setStoryImage('');
    setSelectedCategory('');

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
    alert('신고가 접수되었습니다');
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
    // 작성자 이름을 그대로 사용 (한글 이름 유지)
    navigate(`/profile/${authorName}`);
  };

  const toggleStoryExpansion = (storyId) => {
    setExpandedStories(prev => ({
      ...prev,
      [storyId]: !prev[storyId]
    }));
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
          <PageTitle>커뮤니티</PageTitle>
          <CreateButton onClick={handleCreateStory}>
스토리 작성
          </CreateButton>
        </PageHeader>

        <StoriesGrid>
          {stories.map(story => (
            <StoryCard
              key={story.id}
              story={story}
              onLike={handleLike}
              onComment={handleComment}
              onMenuToggle={handleMenuToggle}
              onProfileClick={handleProfileClick}
              expandedStories={expandedStories}
              toggleExpansion={toggleStoryExpansion}
              openMenuId={openMenuId}
              onReport={handleReport}
              onHide={handleHide}
              formatDate={formatDate}
            />
          ))}
        </StoriesGrid>
      </Container>

      <CreateStoryModal
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        storyText={storyText}
        setStoryText={setStoryText}
        storyImage={storyImage}
        onImageUpload={handleImageUpload}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        onSubmit={handleSubmitStory}
      />

      <CommentModal
        isOpen={showCommentModal}
        onClose={handleCloseCommentModal}
        comments={selectedStoryId ? stories.find(s => s.id === selectedStoryId)?.comments || [] : []}
        newComment={newComment}
        setNewComment={setNewComment}
        onSubmitComment={handleSubmitComment}
      />
    </CommunityPage>
  );
};


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

export default Community;