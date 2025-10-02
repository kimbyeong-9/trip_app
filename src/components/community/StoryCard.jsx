import React from 'react';
import styled from 'styled-components';

const StoryCard = ({
  story,
  onLike,
  onComment,
  onMenuToggle,
  onProfileClick,
  expandedStories,
  toggleExpansion,
  openMenuId,
  onReport,
  onHide,
  formatDate
}) => {
  return (
    <Card>
      <StoryHeader>
        <Avatar
          src={story.avatar}
          alt={story.author}
          onClick={() => onProfileClick(story.author)}
        />
        <StoryInfo onClick={() => onProfileClick(story.author)}>
          <AuthorName>{story.author}</AuthorName>
          <StoryDate>{formatDate(story.date)}</StoryDate>
        </StoryInfo>
        <MenuButton onClick={(e) => onMenuToggle(story.id, e)}>
          ⋯
        </MenuButton>
        {openMenuId === story.id && (
          <MenuDropdown onClick={(e) => e.stopPropagation()}>
            <MenuOption onClick={() => onReport(story.id)} className="danger">
              신고
            </MenuOption>
            <MenuOption onClick={() => onHide(story.id)}>
              숨기기
            </MenuOption>
          </MenuDropdown>
        )}
      </StoryHeader>

      <StoryContent>
        <StoryText expanded={expandedStories[story.id]}>
          {story.content}
        </StoryText>
        {story.content.length > 100 && (
          <ReadMoreButton onClick={() => toggleExpansion(story.id)}>
            {expandedStories[story.id] ? '접기' : '더 보기'}
          </ReadMoreButton>
        )}
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
            onClick={() => onLike(story.id)}
          >
            {story.liked ? '♥' : '♡'} {story.likes}
          </ActionButton>
          <ActionButton onClick={() => onComment(story.id)}>
            댓글 {story.comments.length}
          </ActionButton>
        </LeftActions>
        <RightActions>
          <ActionButton>
            공유
          </ActionButton>
        </RightActions>
      </StoryActions>
    </Card>
  );
};

const Card = styled.div`
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
  display: ${props => props.expanded ? 'block' : '-webkit-box'};
  -webkit-line-clamp: ${props => props.expanded ? 'unset' : '2'};
  -webkit-box-orient: vertical;
  overflow: ${props => props.expanded ? 'visible' : 'hidden'};
  text-overflow: ellipsis;
`;

const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 15px;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #0056b3;
    text-decoration: underline;
  }
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

export default StoryCard;
