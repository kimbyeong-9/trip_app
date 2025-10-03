import React from 'react';
import styled from 'styled-components';

const ScheduleOverview = ({
  schedule,
  authorUploadCount,
  isLiked,
  isUserSchedule,
  onLike,
  onAuthorClick
}) => {
  return (
    <OverviewContainer>
      {/* 메인 이미지 */}
      <MainImage>
        <img
          src={schedule.image || "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=300&fit=crop"}
          alt={schedule.title}
        />
      </MainImage>

      <Title>{schedule.title}</Title>
      <MetaContainer>
        <Badge>{schedule.region}</Badge>
      </MetaContainer>

      {/* 통계 정보 */}
      <StatsSection>
        <StatItem>
          <StatValue>{schedule.views || 0}</StatValue>
          <StatLabel>조회</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{schedule.likes || 0}</StatValue>
          <StatLabel>좋아요</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{authorUploadCount}</StatValue>
          <StatLabel>업로드</StatLabel>
        </StatItem>
      </StatsSection>

      <Description>{schedule.description}</Description>

      {/* 작성자 정보 */}
      <AuthorSection>
        <AuthorLeftSection onClick={onAuthorClick}>
          <AuthorAvatar>
            <img
              src={
                schedule.author?.profileImage ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
              }
              alt={schedule.author?.name || "사용자"}
            />
          </AuthorAvatar>
          <AuthorInfo>
            <AuthorLabel>작성자</AuthorLabel>
            <AuthorName>{schedule.author?.name || "여행자"}</AuthorName>
          </AuthorInfo>
        </AuthorLeftSection>
        <AuthorActionButton onClick={onLike} title="좋아요">
          <HeartIcon $liked={isLiked} />
        </AuthorActionButton>
      </AuthorSection>
    </OverviewContainer>
  );
};

const OverviewContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
`;

const MainImage = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 25px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.02);
  }
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const MetaContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const Badge = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 16px;
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-top: 1px solid #e9ecef;
  margin-top: 20px;
`;

const AuthorLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #e9ecef;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const AuthorName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
`;

const AuthorActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;

  &:hover {
    background: #f8f9fa;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const HeartIcon = styled.span`
  font-size: 24px;
  color: ${props => props.$liked ? '#e74c3c' : '#bdc3c7'};
  transition: all 0.3s ease;

  &::before {
    content: '♥';
  }
`;

const StatsSection = styled.div`
  display: flex;
  justify-content: space-around;
  background: white;
  border-radius: 12px;
  padding: 15px;
  margin: 20px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const StatValue = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
`;

const StatLabel = styled.span`
  font-size: 12px;
  color: #6c757d;
`;

const AuthorLabel = styled.span`
  font-size: 14px;
  color: #6c757d;
`;

export default ScheduleOverview;
