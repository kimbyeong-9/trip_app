import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import { itineraryCards } from '../data/mockData';

// Styled Components
const TravelScheduleDetailPage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
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

const BackButton = styled.button`
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

const DetailContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const ScheduleHeader = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
`;

const ScheduleTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ScheduleMeta = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Badge = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
`;

const ScheduleDescription = styled.p`
  font-size: 16px;
  color: #6c757d;
  line-height: 1.6;
  margin: 0 0 20px 0;
`;

const ScheduleStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
`;

const StatGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #6c757d;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AuthorAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
`;

const AuthorName = styled.span`
  font-size: 14px;
  color: #495057;
  font-weight: 500;
`;

const DetailedDescriptionSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #e9ecef;
`;

const DetailedDescription = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: #495057;
  white-space: pre-line;

  strong {
    color: #2c3e50;
    font-weight: 600;
  }
`;

const TagsSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
`;

const ScheduleImage = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 18px;
  color: #6c757d;
`;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 18px;
  color: #6c757d;
`;

const TravelScheduleDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // localStorage에서 사용자가 만든 일정들과 기본 일정들을 합쳐서 가져오기
    const getScheduleData = () => {
      const storedSchedules = JSON.parse(localStorage.getItem('travelSchedules')) || [];
      const allSchedules = [...storedSchedules, ...itineraryCards];
      return allSchedules;
    };

    const allSchedules = getScheduleData();
    const foundSchedule = allSchedules.find(s => s.id === parseInt(id));

    if (foundSchedule) {
      // 기본 필드가 없는 경우 기본값 설정
      const scheduleWithDefaults = {
        ...foundSchedule,
        views: foundSchedule.views || Math.floor(Math.random() * 1000) + 100,
        likes: foundSchedule.likes || Math.floor(Math.random() * 100) + 10,
        authorAvatar: foundSchedule.author ? foundSchedule.author.charAt(0) : '여',
        duration: foundSchedule.duration || calculateDuration(foundSchedule.date)
      };
      setSchedule(scheduleWithDefaults);
    }
    setLoading(false);
  }, [id]);

  const calculateDuration = (dateRange) => {
    if (!dateRange || !dateRange.includes('~')) return '1일';

    const [startDate, endDate] = dateRange.split('~');
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (diffDays === 1) return '당일';
    return `${diffDays - 1}박${diffDays}일`;
  };

  const handleBackClick = () => {
    navigate('/travel-schedules');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: schedule.title,
        text: schedule.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다!');
    }
  };

  if (loading) {
    return (
      <TravelScheduleDetailPage>
        <Navigation />
        <DetailContainer>
          <LoadingContainer>로딩 중...</LoadingContainer>
        </DetailContainer>
      </TravelScheduleDetailPage>
    );
  }

  if (!schedule) {
    return (
      <TravelScheduleDetailPage>
        <Navigation />
        <DetailContainer>
          <PageHeader>
            <PageTitle>일정 상세보기</PageTitle>
            <BackButton onClick={handleBackClick}>
              목록으로 돌아가기
            </BackButton>
          </PageHeader>
          <NotFoundContainer>
            <div>일정을 찾을 수 없습니다.</div>
          </NotFoundContainer>
        </DetailContainer>
      </TravelScheduleDetailPage>
    );
  }

  return (
    <TravelScheduleDetailPage>
      <Navigation />
      <DetailContainer>
        <PageHeader>
          <PageTitle>{schedule.title}</PageTitle>
          <BackButton onClick={handleBackClick}>
            목록으로 돌아가기
          </BackButton>
        </PageHeader>
        {/* 이미지 섹션 */}
        <ScheduleImage>
          <img src={schedule.image} alt={schedule.title} />
        </ScheduleImage>

        {/* 기본 정보 섹션 */}
        <ScheduleHeader>
          <ScheduleTitle>{schedule.title}</ScheduleTitle>
          <ScheduleMeta>
            <Badge>{schedule.region}</Badge>
            <Badge>{schedule.duration}</Badge>
          </ScheduleMeta>
          <ScheduleDescription>{schedule.description}</ScheduleDescription>
          <ScheduleStats>
            <StatGroup>
              <StatItem>
                <span>👁️</span>
                <span>{schedule.views?.toLocaleString()}</span>
              </StatItem>
              <StatItem>
                <span>❤️</span>
                <span>{schedule.likes}</span>
              </StatItem>
              <StatItem>
                <span>📅</span>
                <span>{schedule.date}</span>
              </StatItem>
            </StatGroup>
            <AuthorInfo>
              <AuthorAvatar>{schedule.authorAvatar}</AuthorAvatar>
              <AuthorName>{schedule.author}</AuthorName>
            </AuthorInfo>
          </ScheduleStats>
        </ScheduleHeader>

        {/* 상세 설명 섹션 */}
        {schedule.detailedDescription && (
          <DetailedDescriptionSection>
            <SectionTitle>상세 일정</SectionTitle>
            <DetailedDescription>
              {schedule.detailedDescription}
            </DetailedDescription>
          </DetailedDescriptionSection>
        )}

        {/* 태그 섹션 */}
        {schedule.tags && schedule.tags.length > 0 && (
          <TagsSection>
            <SectionTitle>여행 테마</SectionTitle>
            <TagsContainer>
              {schedule.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagsContainer>
          </TagsSection>
        )}
      </DetailContainer>
    </TravelScheduleDetailPage>
  );
};

export default TravelScheduleDetail;
