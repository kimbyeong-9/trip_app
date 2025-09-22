import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';

// Styled Components
const UserProfilePage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
  padding-bottom: 20px;

  @media (max-width: 1024px) {
    padding-bottom: 100px;
  }
`;

const UserProfileContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const ProfileContent = styled.div`
  display: grid;
  gap: 30px;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
`;

const ProfileMain = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 32px;
  justify-content: center;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 30px;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const ProfileLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const ProfileRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1024px) {
    width: 100%;
    text-align: center;
    align-items: center;
  }
`;


const ProfileAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    border: none;
    box-shadow: none;
  }
`;

const ProfileName = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 16px 0;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const ProfileBio = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: #5a6c7d;
  margin: 0 0 20px 0;
  max-width: 500px;

  @media (max-width: 1024px) {
    max-width: 100%;
    text-align: center;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ProfileMetaInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const ProfileLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6c757d;
  font-size: 15px;
  padding: 6px 12px;
  background: #f8f9fa;
  border-radius: 20px;
  border: 1px solid #e9ecef;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 4px 8px;
  }
`;

const ProfileJoinDate = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6c757d;
  font-size: 15px;
  padding: 6px 12px;
  background: #f8f9fa;
  border-radius: 20px;
  border: 1px solid #e9ecef;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 4px 8px;
  }
`;

const LocationIcon = styled.span`
  font-size: 16px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const JoinIcon = styled.span`
  font-size: 16px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ProfileStats = styled.div`
  display: flex;
  gap: 180px;
  padding: 24px 0;
  border-top: 2px solid #f8f9fa;
  border-bottom: 2px solid #f8f9fa;
  margin-bottom: 32px;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 60px;
    justify-content: center;
  }

  @media (max-width: 480px) {
    gap: 40px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 4px;

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const StatLabel = styled.div`
  font-size: 15px;
  color: #6c757d;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ProfileActions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

const FollowButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 12px 24px;
  }
`;

const MessageButton = styled.button`
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 12px 24px;
  }
`;

const ProfileSections = styled.div`
  display: grid;
  gap: 30px;
`;

const InterestsSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
`;

const RecentTripsSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
`;

const SectionTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #f8f9fa;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const InterestTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const InterestTag = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid #cce7ff;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`;

const TripCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const TripCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #fafbfc;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    background: white;
  }
`;

const TripImage = styled.img`
  width: 100px;
  height: 75px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const TripInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const TripTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 6px 0;
  line-height: 1.3;
`;

const TripMeta = styled.p`
  color: #6c757d;
  font-weight: 500;
  margin: 0;
  font-size: 14px;
`;

const NotFound = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
`;

const NotFoundTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 15px 0;
`;

const NotFoundMessage = styled.p`
  font-size: 16px;
  margin: 0 0 30px 0;
`;

const NotFoundButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
`;

const ProfileEditButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin: 16px auto 0;
  display: block;
  width: 150px;
  transition: all 0.3s ease;

  &:hover {
    background: #0056b3;
    transform: translateY(-1px);
  }
`;

// 마이페이지용 스타일 컴포넌트들
const MyPageSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  margin-bottom: 30px;
`;

const PointsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const PointsLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PointsLabel = styled.span`
  font-size: 14px;
  opacity: 0.9;
`;

const PointsValue = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

const MemberLevel = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
`;

const BookingCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  border: 1px solid #e9ecef;
`;

const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const HotelName = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
`;

const Status = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => props.status === '예약완료' ? '#d4edda' : '#d1ecf1'};
  color: ${props => props.status === '예약완료' ? '#155724' : '#0c5460'};
`;

const BookingDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DetailLabel = styled.span`
  font-size: 12px;
  color: #6c757d;
  font-weight: 500;
`;

const DetailValue = styled.span`
  font-size: 14px;
  color: #2c3e50;
  font-weight: 600;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  &.primary {
    background: #007bff;
    color: white;
  }

  &.secondary {
    background: #6c757d;
    color: white;
  }

  &:hover {
    transform: translateY(-1px);
  }
`;

const FavoriteCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 12px;
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const FavoriteImage = styled.img`
  width: 80px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

const FavoriteInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FavoriteName = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 4px 0;
`;

const FavoriteLocation = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0 0 4px 0;
`;

const FavoritePrice = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #007bff;
`;

const InterestedTripCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 12px;
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const InterestedTripImage = styled.img`
  width: 80px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

const InterestedTripInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InterestedTripTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 4px 0;
`;

const InterestedTripMeta = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
`;

const UserProfile = () => {
  const navigate = useNavigate();
  const { username } = useParams();

  // 현재 로그인한 사용자 정보 가져오기
  const getCurrentUser = () => {
    const loginData = localStorage.getItem('loginData') || sessionStorage.getItem('loginData');
    if (loginData) {
      return JSON.parse(loginData);
    }
    return null;
  };

  const currentUser = getCurrentUser();

  // 마이페이지용 데이터 (본인 프로필일 때만 사용)
  const myPageData = {
    points: 15000,
    memberLevel: '골드',
    bookings: [
      {
        id: 1,
        hotel: '제주 오션뷰 리조트',
        room: '스탠다드 오션뷰',
        checkIn: '2024-03-15',
        checkOut: '2024-03-17',
        status: '예약완료',
        amount: 252000,
        bookingDate: '2024-02-20'
      },
      {
        id: 2,
        hotel: '부산 해운대 호텔',
        room: '디럭스 시티뷰',
        checkIn: '2024-02-10',
        checkOut: '2024-02-12',
        status: '이용완료',
        amount: 190000,
        bookingDate: '2024-01-25'
      }
    ],
    favorites: [
      {
        id: 1,
        name: '서울 명동 비즈니스 호텔',
        location: '서울 중구 명동',
        rating: 4.3,
        price: 85000,
        image: 'https://via.placeholder.com/200x150'
      },
      {
        id: 2,
        name: '강릉 바다뷰 펜션',
        location: '강원도 강릉시',
        rating: 4.6,
        price: 120000,
        image: 'https://via.placeholder.com/200x150'
      }
    ],
    interestedTrips: [
      {
        id: 1,
        title: '제주여행 갈사람~ ✈️',
        region: '제주',
        date: '2025-10-11~2025-10-14',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop'
      },
      {
        id: 2,
        title: '서해안 드라이브 🚗',
        region: '충남',
        date: '2025-10-15~2025-10-16',
        image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=300&h=200&fit=crop'
      }
    ]
  };

  // 유저 프로필 데이터 (실제로는 API에서 가져올 데이터)
  const userProfileData = {
    '제주러버': {
      name: '제주러버',
      bio: '제주도의 모든 매력을 사랑하는 여행자입니다. 한라산 등반부터 해변까지, 제주의 숨은 명소들을 찾아다니는 것을 좋아해요.',
      location: '제주도',
      joinDate: '2024년 1월',
      totalTrips: 15,
      followers: 234,
      following: 156,
      profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
      interests: ['자연', '등산', '카페', '사진', '해변'],
      recentTrips: [
        {
          id: 1,
          title: '제주여행 갈사람~ ✈️',
          region: '제주',
          date: '2025-10-11~2025-10-14',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop'
        }
      ]
    },
    '드라이브매니아': {
      name: '드라이브매니아',
      bio: '자유롭게 운전하며 여행하는 것을 좋아합니다. 서해안의 아름다운 일몰과 신선한 해산물을 사랑해요.',
      location: '서울',
      joinDate: '2023년 11월',
      totalTrips: 8,
      followers: 89,
      following: 67,
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      interests: ['드라이브', '해산물', '일몰', '휴식'],
      recentTrips: [
        {
          id: 2,
          title: '서해안 드라이브 🚗',
          region: '충남',
          date: '2025-10-15~2025-10-16',
          image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=300&h=200&fit=crop'
        }
      ]
    },
    'user': {
      name: currentUser?.user?.name || '사용자',
      bio: '여행을 사랑하는 사용자입니다. 새로운 곳을 탐험하고 좋은 사람들과 만나는 것을 좋아해요.',
      location: '서울',
      joinDate: '2024년 3월',
      totalTrips: 5,
      followers: 45,
      following: 32,
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      interests: ['여행', '사진', '맛집', '문화'],
      recentTrips: [
        {
          id: 3,
          title: '서울 맛집 투어 🍜',
          region: '서울',
          date: '2025-10-20~2025-10-21',
          image: 'https://images.unsplash.com/photo-1549693578-d683be217e58?w=300&h=200&fit=crop'
        }
      ]
    }
  };

  // 현재 사용자의 프로필 데이터 가져오기
  const user = userProfileData[username] || userProfileData['user'];

  if (!user) {
    return (
      <UserProfilePage>
        <Navigation />
        <NotFound>
          <NotFoundTitle>사용자를 찾을 수 없습니다.</NotFoundTitle>
          <NotFoundMessage>요청하신 사용자가 존재하지 않습니다.</NotFoundMessage>
          <NotFoundButton onClick={() => navigate(-1)}>뒤로가기</NotFoundButton>
        </NotFound>
      </UserProfilePage>
    );
  }

  return (
    <UserProfilePage>
      <Navigation />
      
      <UserProfileContainer>
        <ProfileContent>
          <ProfileCard>
            <ProfileMain>
              <ProfileLeft>
                <ProfileAvatar>
                  <img src={user.profileImage} alt={user.name} />
                </ProfileAvatar>

                {username === 'user' && (
                  <ProfileEditButton onClick={() => navigate('/profile-edit')}>
                    프로필 편집하기
                  </ProfileEditButton>
                )}
              </ProfileLeft>

              <ProfileRight>
                <ProfileName>{user.name}</ProfileName>
                <ProfileBio>{user.bio}</ProfileBio>
              </ProfileRight>
            </ProfileMain>

            <ProfileMetaInfo>
              <ProfileLocation>
                <LocationIcon>📍</LocationIcon>
                <span>{user.location}</span>
              </ProfileLocation>
              <ProfileJoinDate>
                <JoinIcon>📅</JoinIcon>
                <span>{user.joinDate} 가입</span>
              </ProfileJoinDate>
              <InterestTags>
                {user.interests.map((interest, index) => (
                  <InterestTag key={index}>{interest}</InterestTag>
                ))}
              </InterestTags>
            </ProfileMetaInfo>

            <ProfileStats>
              <StatItem>
                <StatNumber>{user.totalTrips}</StatNumber>
                <StatLabel>여행</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{user.followers}</StatNumber>
                <StatLabel>팔로워</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{user.following}</StatNumber>
                <StatLabel>팔로잉</StatLabel>
              </StatItem>
            </ProfileStats>

            <ProfileActions>
              <FollowButton>팔로우</FollowButton>
              <MessageButton>메시지</MessageButton>
            </ProfileActions>
          </ProfileCard>

          <ProfileSections>
            {/* 본인 프로필일 때만 마이페이지 기능 표시 */}
            {username === 'user' && (
              <>
                {/* 포인트 정보 */}
                <MyPageSection>
                  <SectionTitle>포인트 정보</SectionTitle>
                  <PointsInfo>
                    <PointsLeft>
                      <PointsLabel>보유 포인트</PointsLabel>
                      <PointsValue>{myPageData.points.toLocaleString()}P</PointsValue>
                    </PointsLeft>
                    <MemberLevel>{myPageData.memberLevel}</MemberLevel>
                  </PointsInfo>
                </MyPageSection>



                {/* 관심 일정 */}
                <MyPageSection>
                  <SectionTitle>관심 일정</SectionTitle>
                  {myPageData.interestedTrips.map(trip => (
                    <InterestedTripCard key={trip.id} onClick={() => navigate(`/companion/${trip.id}`)}>
                      <InterestedTripImage src={trip.image} alt={trip.title} />
                      <InterestedTripInfo>
                        <InterestedTripTitle>{trip.title}</InterestedTripTitle>
                        <InterestedTripMeta>{trip.region} • {trip.date}</InterestedTripMeta>
                      </InterestedTripInfo>
                    </InterestedTripCard>
                  ))}
                </MyPageSection>
              </>
            )}

            {/* 일반 프로필 정보 */}

            <RecentTripsSection>
              <SectionTitle>최근 여행</SectionTitle>
              <TripCards>
                {user.recentTrips.map((trip) => (
                  <TripCard key={trip.id} onClick={() => navigate(`/companion/${trip.id}`)}>
                    <TripImage src={trip.image} alt={trip.title} />
                    <TripInfo>
                      <TripTitle>{trip.title}</TripTitle>
                      <TripMeta>{trip.region} • {trip.date}</TripMeta>
                    </TripInfo>
                  </TripCard>
                ))}
              </TripCards>
            </RecentTripsSection>
          </ProfileSections>
        </ProfileContent>
      </UserProfileContainer>
    </UserProfilePage>
  );
};

export default UserProfile;
