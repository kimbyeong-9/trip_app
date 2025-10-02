import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import { mockCoupons, myPageData, userProfileData, followerNames, followingNames } from '../data/mockData';
import { supabase } from '../supabaseClient';

const UserProfile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [savedSchedules, setSavedSchedules] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [activePostTab, setActivePostTab] = useState('companion');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [isAICreate, setIsAICreate] = useState(false);
  const [myCompanionPosts, setMyCompanionPosts] = useState([]);
  const [myTravelSchedules, setMyTravelSchedules] = useState([]);

  // 현재 로그인한 사용자 정보 가져오기
  const getCurrentUser = () => {
    const loginData = localStorage.getItem('loginData') || sessionStorage.getItem('loginData');
    if (loginData) {
      return JSON.parse(loginData);
    }
    return null;
  };

  const currentUser = getCurrentUser();
  const currentUserId = currentUser?.user?.id;

  // 유효하지 않은 blob URL을 기본 이미지로 교체하는 함수
  const sanitizeImageUrl = (imageUrl) => {
    if (!imageUrl || imageUrl.startsWith('blob:')) {
      return 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop';
    }
    return imageUrl;
  };

  // Supabase에서 내가 올린 동행모집 가져오기
  useEffect(() => {
    const fetchMyCompanionPosts = async () => {
      if (!currentUserId) {
        setMyCompanionPosts([]);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('CompanionList')
          .select('*')
          .order('id', { ascending: false });

        if (error) {
          console.error('Error fetching companion posts:', error);
          setMyCompanionPosts([]);
          return;
        }

        // 현재 로그인한 사용자의 user_id와 일치하는 게시물만 필터링
        const myPosts = data.filter(post => {
          const authorUserId = post.author?.user_id;
          return authorUserId === currentUserId;
        });

        setMyCompanionPosts(myPosts);
      } catch (err) {
        console.error('Error:', err);
        setMyCompanionPosts([]);
      }
    };

    fetchMyCompanionPosts();
  }, [currentUserId]);

  // Supabase에서 내가 올린 여행일정 가져오기
  useEffect(() => {
    const fetchMyTravelSchedules = async () => {
      if (!currentUserId) {
        setMyTravelSchedules([]);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('Itinerary')
          .select('*')
          .order('id', { ascending: false });

        if (error) {
          console.error('Error fetching travel schedules:', error);
          setMyTravelSchedules([]);
          return;
        }

        // 현재 로그인한 사용자의 author_user_id와 일치하는 일정만 필터링
        const mySchedules = data.filter(schedule => {
          const authorUserId = schedule.author_user_id;
          return authorUserId === currentUserId;
        });

        setMyTravelSchedules(mySchedules);
      } catch (err) {
        console.error('Error:', err);
        setMyTravelSchedules([]);
      }
    };

    fetchMyTravelSchedules();
  }, [currentUserId]);

  // 동행모집 삭제 함수 (Supabase)
  const deleteCompanionPost = async (postId) => {
    if (window.confirm('정말로 이 동행모집을 삭제하시겠습니까?')) {
      try {
        const { error } = await supabase
          .from('CompanionList')
          .delete()
          .eq('id', postId);

        if (error) {
          console.error('Error deleting companion post:', error);
          alert('삭제에 실패했습니다. 다시 시도해주세요.');
          return;
        }

        alert('동행모집이 성공적으로 삭제되었습니다.');
        // 상태 업데이트로 목록 새로고침
        setMyCompanionPosts(prev => prev.filter(post => post.id !== postId));
      } catch (err) {
        console.error('Error:', err);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  // 여행일정 삭제 함수 (Supabase)
  const deleteTravelSchedule = async (scheduleId) => {
    if (window.confirm('정말로 이 여행일정을 삭제하시겠습니까?')) {
      try {
        const { error } = await supabase
          .from('Itinerary')
          .delete()
          .eq('id', scheduleId);

        if (error) {
          console.error('Error deleting travel schedule:', error);
          alert('삭제에 실패했습니다. 다시 시도해주세요.');
          return;
        }

        alert('여행일정이 성공적으로 삭제되었습니다.');
        // 상태 업데이트로 목록 새로고침
        setMyTravelSchedules(prev => prev.filter(schedule => schedule.id !== scheduleId));
      } catch (err) {
        console.error('Error:', err);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  // 저장된 일정 삭제 함수
  const deleteSavedSchedule = (scheduleId) => {
    if (window.confirm('정말로 이 관심 일정을 삭제하시겠습니까?')) {
      const saved = JSON.parse(localStorage.getItem('savedSchedules') || '[]');
      const updatedSaved = saved.filter(schedule => schedule.id !== scheduleId);
      localStorage.setItem('savedSchedules', JSON.stringify(updatedSaved));
      setSavedSchedules(updatedSaved); // 상태 업데이트
    }
  };

  // 동행모집 수정 함수
  const editCompanionPost = (postId) => {
    // 해당 게시물 찾기
    const postToEdit = myCompanionPosts.find(post => post.id === postId);
    if (postToEdit) {
      // 기존 데이터를 state로 전달하며 수정 페이지로 이동
      navigate('/companion/create', {
        state: {
          isEdit: true,
          postData: postToEdit
        }
      });
    }
  };

  // 여행일정 수정 함수
  const editTravelSchedule = (scheduleId) => {
    // 해당 일정 찾기
    const scheduleToEdit = myTravelSchedules.find(schedule => schedule.id === scheduleId);
    if (scheduleToEdit) {
      // detailedDescription 파싱
      let detailedInfo = {};
      if (scheduleToEdit.detailedDescription) {
        try {
          detailedInfo = JSON.parse(scheduleToEdit.detailedDescription);
        } catch (e) {
          console.error('detailedDescription 파싱 오류:', e);
        }
      }

      // 기존 데이터를 state로 전달하며 수정 페이지로 이동
      navigate('/direct-schedule-create', {
        state: {
          isEdit: true,
          scheduleData: {
            ...scheduleToEdit,
            ...detailedInfo
          }
        }
      });
    }
  };

  // 새 동행모집 추가
  const addNewCompanionPost = () => {
    // 부드러운 페이지 전환을 위한 추가 설정
    navigate('/companion/create', {
      replace: false,
      state: { from: '/profile/user' }
    });
  };

  // 새 여행일정 추가
  const addNewTravelSchedule = () => {
    setShowCreateModal(true);
  };

  // 직접 작성 선택 시
  const handleDirectCreate = () => {
    setIsAICreate(false);
    setShowCreateModal(false);
    setShowDatePicker(true);
  };

  // AI 작성 선택 시
  const handleAICreate = () => {
    setIsAICreate(true);
    setShowCreateModal(false);
    setShowDatePicker(true);
  };

  // 날짜 확인 시
  const handleDateConfirm = () => {
    if (selectedStartDate && selectedEndDate) {
      setShowDatePicker(false);
      if (isAICreate) {
        // AI 일정 작성 페이지로 이동
        navigate(`/ai-schedule-create?startDate=${selectedStartDate}&endDate=${selectedEndDate}`);
      } else {
        // 직접 일정 작성 페이지로 이동
        navigate(`/direct-schedule-create?startDate=${selectedStartDate}&endDate=${selectedEndDate}`);
      }
    } else {
      alert('출발일과 도착일을 모두 선택해주세요.');
    }
  };

  // 날짜 선택 취소
  const handleDateCancel = () => {
    setShowDatePicker(false);
    setSelectedStartDate('');
    setSelectedEndDate('');
  };

  // 팔로우 버튼 클릭 처리
  const handleFollowClick = () => {
    const followData = JSON.parse(localStorage.getItem('followData') || '{}');

    if (!followData[username]) {
      followData[username] = { followers: user?.followers || 0, isFollowing: false };
    }

    const newIsFollowing = !isFollowing;
    const newFollowerCount = newIsFollowing
      ? followerCount + 1
      : Math.max(0, followerCount - 1);

    // 상태 업데이트
    setIsFollowing(newIsFollowing);
    setFollowerCount(newFollowerCount);

    // localStorage 업데이트
    followData[username] = {
      followers: newFollowerCount,
      isFollowing: newIsFollowing
    };
    localStorage.setItem('followData', JSON.stringify(followData));

    // 피드백 메시지
    alert(newIsFollowing ? '팔로우했습니다!' : '팔로우를 취소했습니다.');
  };

  // 팔로워/팔로잉 리스트 핸들러
  const handleFollowerClick = () => {
    setShowFollowerModal(true);
  };

  const handleFollowingClick = () => {
    setShowFollowingModal(true);
  };

  const handleCouponClick = () => {
    setShowCouponModal(true);
  };

  // 팔로워 데이터 생성 (이름 배열은 mockData.js에서 import)
  const generateFollowers = (count) => {
    const followers = [];

    for (let i = 0; i < count; i++) {
      const nameIndex = i % followerNames.length;
      const name = i < followerNames.length ? followerNames[nameIndex] : `${followerNames[nameIndex]}${Math.floor(i / followerNames.length) + 1}`;
      followers.push({
        id: i + 1,
        name: name,
        username: `user_${i + 1}`,
        avatar: name.charAt(0)
      });
    }
    return followers;
  };

  const generateFollowing = (count) => {
    const following = [];

    for (let i = 0; i < count; i++) {
      const nameIndex = i % followingNames.length;
      const name = i < followingNames.length ? followingNames[nameIndex] : `${followingNames[nameIndex]}${Math.floor(i / followingNames.length) + 1}`;
      following.push({
        id: i + 1,
        name: name,
        username: `following_${i + 1}`,
        avatar: name.charAt(0)
      });
    }
    return following;
  };

  // Mock followers and following will be generated after user is defined

  // 쿠폰 데이터는 mockData.js에서 import

  // 마이페이지 데이터는 mockData.js에서 import

  // 유저 프로필 데이터는 mockData.js에서 import

  // 현재 사용자의 프로필 데이터 가져오기
  let user = userProfileData[username];

  // 본인 프로필인 경우 실제 저장된 데이터 사용
  if (username === 'user' && currentUser?.user) {
    user = {
      ...userProfileData['user'],
      name: currentUser.user.name || userProfileData['user'].name,
      bio: currentUser.user.bio || userProfileData['user'].bio,
      location: currentUser.user.location || userProfileData['user'].location,
      interests: currentUser.user.interests || userProfileData['user'].interests,
      profileImage: sanitizeImageUrl(currentUser.user.profileImage || userProfileData['user'].profileImage),
      email: currentUser.user.email || userProfileData['user'].email,
      phone: currentUser.user.phone || userProfileData['user'].phone
    };
  }

  if (!user) {
    user = userProfileData['user'];
  }

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

  // 저장된 일정 로드 및 팔로우 상태 초기화
  useEffect(() => {
    // localStorage의 잘못된 blob URL들을 정리하는 함수
    const cleanupBlobUrls = () => {
      // companionPosts 정리
      const companionPosts = JSON.parse(localStorage.getItem('companionPosts') || '[]');
      const cleanedCompanionPosts = companionPosts.map(post => ({
        ...post,
        image: sanitizeImageUrl(post.image)
      }));
      localStorage.setItem('companionPosts', JSON.stringify(cleanedCompanionPosts));

      // userSchedules 정리
      const userSchedules = JSON.parse(localStorage.getItem('userSchedules') || '[]');
      const cleanedUserSchedules = userSchedules.map(schedule => ({
        ...schedule,
        image: sanitizeImageUrl(schedule.image)
      }));
      localStorage.setItem('userSchedules', JSON.stringify(cleanedUserSchedules));

      // savedSchedules 정리
      const savedSchedules = JSON.parse(localStorage.getItem('savedSchedules') || '[]');
      const cleanedSavedSchedules = savedSchedules.map(schedule => ({
        ...schedule,
        image: sanitizeImageUrl(schedule.image),
        author: schedule.author ? {
          ...schedule.author,
          profileImage: sanitizeImageUrl(schedule.author.profileImage)
        } : schedule.author
      }));
      localStorage.setItem('savedSchedules', JSON.stringify(cleanedSavedSchedules));
    };

    // 정리 후 데이터 로드
    cleanupBlobUrls();

    const loadSavedSchedules = async () => {
      const saved = JSON.parse(localStorage.getItem('savedSchedules') || '[]');

      if (saved.length === 0) {
        setSavedSchedules([]);
        return;
      }

      // localStorage에 저장된 일정 ID들을 가져와서 Supabase에서 최신 데이터 조회
      const scheduleIds = saved.map(schedule => schedule.id);

      try {
        const { data, error } = await supabase
          .from('Itinerary')
          .select('*')
          .in('id', scheduleIds);

        if (error) {
          console.error('Error fetching saved schedules:', error);
          setSavedSchedules(saved);
          return;
        }

        // Supabase에서 가져온 최신 데이터로 업데이트
        const updatedSchedules = data.map(schedule => ({
          id: schedule.id,
          title: schedule.title,
          region: schedule.region,
          date: schedule.date,
          image: schedule.image,
          author: schedule.author,
          savedAt: saved.find(s => s.id === schedule.id)?.savedAt || new Date().toISOString()
        }));

        setSavedSchedules(updatedSchedules);
      } catch (err) {
        console.error('Error:', err);
        setSavedSchedules(saved);
      }
    };

    // 팔로워 데이터 로드 및 초기화
    const loadFollowerData = () => {
      if (username !== 'user') {
        // localStorage에서 팔로우 데이터 로드
        const followData = JSON.parse(localStorage.getItem('followData') || '{}');
        const userFollowData = followData[username] || { followers: user?.followers || 0, isFollowing: false };

        setFollowerCount(userFollowData.followers);
        setIsFollowing(userFollowData.isFollowing);
      }
    };

    loadSavedSchedules();
    loadFollowerData();
  }, [username]);

  // Generate mock followers and following data after user is defined
  const mockFollowers = generateFollowers(user?.followers || 234);
  const mockFollowing = generateFollowing(user?.following || 156);

  return (
    <UserProfilePage>
      <Navigation />

      <UserProfileContainer>
        <ProfileContent>
          <ProfileCard>
            <ProfileMain>
              <ProfileLeft>
                <ProfileAvatar>
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = (user.name || 'U').charAt(0);
                      }}
                    />
                  ) : (
                    (user.name || 'U').charAt(0)
                  )}
                </ProfileAvatar>

                {/* 프로필 편집하기 버튼을 프로필 사진 밑에 배치 */}
                {username === 'user' && (
                  <ProfileEditButton onClick={() => navigate('/profile-edit')}>
                    프로필 편집하기
                  </ProfileEditButton>
                )}
              </ProfileLeft>

              <ProfileRight>
                {/* 이름과 한줄소개를 더 아래로 배치 */}
                <div style={{marginTop: '40px'}}>
                  <ProfileName>
                    {user.name || '이름 없음'}
                  </ProfileName>
                  <ProfileBio style={{margin: '12px 0 0 0', paddingTop: '55px'}}>{user.bio || '소개가 없습니다.'}</ProfileBio>
                </div>
              </ProfileRight>
            </ProfileMain>

            {/* 지역과 가입일 정보 - 가로 기준 정중앙 배치 */}
            <div style={{display: 'flex', justifyContent: 'center', gap: '16px', margin: '20px 0', flexWrap: 'wrap'}}>
              <ProfileLocation>
                <LocationIcon>📍</LocationIcon>
                <span>{user.location || '위치 정보 없음'}</span>
              </ProfileLocation>
              <ProfileJoinDate>
                <JoinIcon>📅</JoinIcon>
                <span>{user.joinDate || '가입일 정보 없음'} 가입</span>
              </ProfileJoinDate>
            </div>

            {/* 키워드 섹션 - 가로 기준 정중앙 배치 */}
            <div style={{display: 'flex', justifyContent: 'center', margin: '20px 0'}}>
              <InterestTags>
                {(user.interests || []).map((interest, index) => (
                  <InterestTag key={index}>{interest}</InterestTag>
                ))}
              </InterestTags>
            </div>

            <ProfileStats>
              <StatItem>
                <StatNumber>{myTravelSchedules.length || 0}</StatNumber>
                <StatLabel>여행</StatLabel>
              </StatItem>
              <StatItem $clickable onClick={handleFollowerClick}>
                <StatNumber>{username !== 'user' ? followerCount : 0}</StatNumber>
                <StatLabel>팔로워</StatLabel>
              </StatItem>
              <StatItem $clickable onClick={handleFollowingClick}>
                <StatNumber>0</StatNumber>
                <StatLabel>팔로잉</StatLabel>
              </StatItem>
            </ProfileStats>

            {/* 다른 사용자일 때는 팔로우/메시지 버튼, 본인일 때는 쿠폰 섹션 */}
            {username !== 'user' ? (
              <ActionButtonsContainer>
                <FollowButton
                  className={isFollowing ? 'following' : ''}
                  onClick={handleFollowClick}
                >
                  {isFollowing ? '✓ 팔로잉' : '+ 팔로우'}
                </FollowButton>
                <MessageButton onClick={() => alert('메시지 기능 준비 중입니다.')}>
                  메시지
                </MessageButton>
              </ActionButtonsContainer>
            ) : (
              <CouponSection onClick={handleCouponClick} style={{cursor: 'pointer'}}>
                <CouponSectionTitle>보유 쿠폰</CouponSectionTitle>
                <CouponCount>3장</CouponCount>
                <CouponSectionDescription>사용 가능한 할인 쿠폰이 있습니다</CouponSectionDescription>
              </CouponSection>
            )}
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
                    <PointsUseButton onClick={() => alert('포인트 사용 기능 준비 중입니다.')}>
                      사용
                    </PointsUseButton>
                  </PointsInfo>
                </MyPageSection>



                {/* 관심 일정 */}
                <MyPageSection>
                  <SectionTitle>관심 일정</SectionTitle>
                  {savedSchedules.length > 0 ? (
                    savedSchedules.map(trip => (
                    <InterestedTripCard key={trip.id}>
                      <InterestedTripImage
                        src={trip.image}
                        alt={trip.title}
                        onClick={() => navigate(`/travel-schedule/${trip.id}`)}
                        style={{ cursor: 'pointer' }}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop';
                        }}
                      />
                      <InterestedTripInfo onClick={() => navigate(`/travel-schedule/${trip.id}`)} style={{ cursor: 'pointer' }}>
                        <InterestedTripTitle>{trip.title}</InterestedTripTitle>
                        <InterestedTripMeta>{trip.region} • {trip.date}</InterestedTripMeta>
                        {trip.author && (
                          <TripAuthorInfo>
                            <TripAuthorAvatar>
                              <img
                                src={trip.author.profileImage}
                                alt={trip.author.name}
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face';
                                }}
                              />
                            </TripAuthorAvatar>
                            <TripAuthorName>{trip.author.name}</TripAuthorName>
                          </TripAuthorInfo>
                        )}
                      </InterestedTripInfo>
                      <SavedScheduleDeleteButton
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSavedSchedule(trip.id);
                        }}
                        title="관심 일정에서 삭제"
                      >
                        삭제
                      </SavedScheduleDeleteButton>
                    </InterestedTripCard>
                    ))
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6c757d' }}>
                      <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                        저장된 관심 일정이 없습니다
                      </div>
                      <div style={{ fontSize: '14px' }}>
                        마음에 드는 일정을 저장해보세요!
                      </div>
                    </div>
                  )}
                </MyPageSection>
              </>
            )}

            {/* 일반 프로필 정보 */}

            {/* 내가 올린 게시물들 */}
            {username === 'user' && (
              <>
                {/* 내가 올린 동행모집 */}
                <RecentTripsSection>
                  <SectionHeader>
                    <SectionTitle>내가 올린 동행모집</SectionTitle>
                    <AddButton onClick={addNewCompanionPost}>
                      <span>+</span>
                      새 동행모집 등록
                    </AddButton>
                  </SectionHeader>
                  <TextListContainer>
                    {myCompanionPosts.length > 0 ? (
                      myCompanionPosts.map((post) => (
                        <TextListItem key={post.id}>
                          <TextListImage
                            src={post.image}
                            alt={post.title}
                            onClick={() => navigate(`/companion/${post.id}`)}
                            style={{cursor: 'pointer'}}
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop';
                            }}
                          />
                          <TextListContent
                            onClick={() => navigate(`/companion/${post.id}`)}
                            style={{cursor: 'pointer'}}
                          >
                            <TextListTitle>{post.title}</TextListTitle>
                            <TextListMeta>{post.region} • {post.date}</TextListMeta>
                          </TextListContent>
                          <TextListActions>
                            <TextListButton
                              className="edit"
                              onClick={(e) => {
                                e.stopPropagation();
                                editCompanionPost(post.id);
                              }}
                            >
                              수정
                            </TextListButton>
                            <TextListButton
                              className="delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteCompanionPost(post.id);
                              }}
                            >
                              삭제
                            </TextListButton>
                          </TextListActions>
                        </TextListItem>
                      ))
                    ) : (
                      <EmptyMessage>아직 올린 동행모집이 없습니다.</EmptyMessage>
                    )}
                  </TextListContainer>
                </RecentTripsSection>

                {/* 내가 올린 여행일정 */}
                <RecentTripsSection>
                  <SectionHeader>
                    <SectionTitle>내가 올린 여행일정</SectionTitle>
                    <AddButton onClick={addNewTravelSchedule}>
                      <span>+</span>
                      새 여행일정 등록
                    </AddButton>
                  </SectionHeader>
                  <TextListContainer>
                    {myTravelSchedules.length > 0 ? (
                      myTravelSchedules.map((schedule) => (
                        <TextListItem key={schedule.id}>
                          <TextListImage
                            src={schedule.image}
                            alt={schedule.title}
                            onClick={() => navigate(`/travel-schedule/${schedule.id}`)}
                            style={{cursor: 'pointer'}}
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop';
                            }}
                          />
                          <TextListContent
                            onClick={() => navigate(`/travel-schedule/${schedule.id}`)}
                            style={{cursor: 'pointer'}}
                          >
                            <TextListTitle>{schedule.title}</TextListTitle>
                            <TextListMeta>{schedule.region} • {schedule.duration || schedule.date || `${schedule.startDate} ~ ${schedule.endDate}`}</TextListMeta>
                          </TextListContent>
                          <TextListActions>
                            <TextListButton
                              className="edit"
                              onClick={(e) => {
                                e.stopPropagation();
                                editTravelSchedule(schedule.id);
                              }}
                            >
                              수정
                            </TextListButton>
                            <TextListButton
                              className="delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTravelSchedule(schedule.id);
                              }}
                            >
                              삭제
                            </TextListButton>
                          </TextListActions>
                        </TextListItem>
                      ))
                    ) : (
                      <EmptyMessage>아직 올린 여행일정이 없습니다.</EmptyMessage>
                    )}
                  </TextListContainer>
                </RecentTripsSection>
              </>
            )}

            {/* 다른 사용자 프로필일 때 해당 유저의 게시물들 */}
            {username !== 'user' && (
              <UserPostsSection>
                <PostsSectionTitle>{user.name}님의 게시물</PostsSectionTitle>
                <PostTabs>
                  <PostTab
                    className={activePostTab === 'companion' ? 'active' : ''}
                    onClick={() => setActivePostTab('companion')}
                  >
                    동행모집
                  </PostTab>
                  <PostTab
                    className={activePostTab === 'schedule' ? 'active' : ''}
                    onClick={() => setActivePostTab('schedule')}
                  >
                    여행일정
                  </PostTab>
                </PostTabs>
                <PostsList>
                  {activePostTab === 'companion' ? (
                    // Mock companion posts - in real app would fetch by user
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6c757d' }}>
                      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤝</div>
                      <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                        등록된 동행모집이 없습니다
                      </div>
                      <div style={{ fontSize: '14px' }}>
                        아직 동행모집 게시물이 없습니다.
                      </div>
                    </div>
                  ) : (
                    // Mock travel schedules - in real app would fetch by user
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6c757d' }}>
                      <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
                      <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                        등록된 여행일정이 없습니다
                      </div>
                      <div style={{ fontSize: '14px' }}>
                        아직 여행일정 게시물이 없습니다.
                      </div>
                    </div>
                  )}
                </PostsList>
              </UserPostsSection>
            )}
          </ProfileSections>
        </ProfileContent>
      </UserProfileContainer>

      {/* 팔로워 모달 */}
      {showFollowerModal && (
        <FollowModal onClick={(e) => e.target === e.currentTarget && setShowFollowerModal(false)}>
          <FollowModalContainer>
            <FollowModalHeader>
              <FollowModalTitle>팔로워</FollowModalTitle>
              <FollowModalClose onClick={() => setShowFollowerModal(false)}>×</FollowModalClose>
            </FollowModalHeader>
            <FollowList>
              {mockFollowers.map(follower => (
                <FollowItem key={follower.id}>
                  <FollowAvatar>{follower.avatar}</FollowAvatar>
                  <FollowInfo>
                    <FollowName>{follower.name}</FollowName>
                    <FollowUsername>@{follower.username}</FollowUsername>
                  </FollowInfo>
                </FollowItem>
              ))}
            </FollowList>
          </FollowModalContainer>
        </FollowModal>
      )}

      {/* 팔로잉 모달 */}
      {showFollowingModal && (
        <FollowModal onClick={(e) => e.target === e.currentTarget && setShowFollowingModal(false)}>
          <FollowModalContainer>
            <FollowModalHeader>
              <FollowModalTitle>팔로잉</FollowModalTitle>
              <FollowModalClose onClick={() => setShowFollowingModal(false)}>×</FollowModalClose>
            </FollowModalHeader>
            <FollowList>
              {mockFollowing.map(following => (
                <FollowItem key={following.id}>
                  <FollowAvatar>{following.avatar}</FollowAvatar>
                  <FollowInfo>
                    <FollowName>{following.name}</FollowName>
                    <FollowUsername>@{following.username}</FollowUsername>
                  </FollowInfo>
                </FollowItem>
              ))}
            </FollowList>
          </FollowModalContainer>
        </FollowModal>
      )}

      {/* 쿠폰 모달 */}
      {showCouponModal && (
        <CouponModal onClick={(e) => e.target === e.currentTarget && setShowCouponModal(false)}>
          <CouponModalContainer>
            <FollowModalHeader>
              <FollowModalTitle>쿠폰함</FollowModalTitle>
              <FollowModalClose onClick={() => setShowCouponModal(false)}>×</FollowModalClose>
            </FollowModalHeader>
            <CouponList>
              {mockCoupons.map(coupon => (
                <CouponCard key={coupon.id}>
                  <CouponHeader>
                    <CouponTitle>{coupon.title}</CouponTitle>
                    <CouponDiscount>{coupon.discount}</CouponDiscount>
                  </CouponHeader>
                  <CouponDescription>{coupon.description}</CouponDescription>
                  <CouponMinAmount>{coupon.minAmount}</CouponMinAmount>
                  <CouponFooter>
                    <CouponCode>{coupon.code}</CouponCode>
                    <CouponExpiry>{coupon.expiryDate}까지</CouponExpiry>
                  </CouponFooter>
                </CouponCard>
              ))}
            </CouponList>
          </CouponModalContainer>
        </CouponModal>
      )}

      {/* 일정 생성 선택 모달 */}
      {showCreateModal && (
        <CreateModalOverlay onClick={() => setShowCreateModal(false)}>
          <CreateModalContainer onClick={(e) => e.stopPropagation()}>
            <CreateModalTitle>일정 작성 방법 선택</CreateModalTitle>
            <CreateModalMessage>
              어떤 방식으로 일정을 작성하시겠습니까?
            </CreateModalMessage>
            <CreateOptionsContainer>
              <CreateOptionButton onClick={handleDirectCreate}>
                <CreateOptionText>직접일정 작성</CreateOptionText>
              </CreateOptionButton>
              <CreateOptionButton $primary onClick={handleAICreate}>
                <CreateOptionText>AI 일정 작성</CreateOptionText>
              </CreateOptionButton>
            </CreateOptionsContainer>
            <CreateCancelButton onClick={() => setShowCreateModal(false)}>
              취소
            </CreateCancelButton>
          </CreateModalContainer>
        </CreateModalOverlay>
      )}

      {/* 날짜 선택 모달 */}
      {showDatePicker && (
        <DatePickerModalOverlay onClick={() => setShowDatePicker(false)}>
          <DatePickerModalContainer onClick={(e) => e.stopPropagation()}>
            <DatePickerTitle>여행 날짜 선택</DatePickerTitle>
            <DatePickerMessage>
              여행 시작일과 종료일을 선택해주세요
            </DatePickerMessage>

            <DateInputContainer>
              <DateInputGroup>
                <DateLabel>시작일</DateLabel>
                <DateInput
                  type="date"
                  value={selectedStartDate}
                  onChange={(e) => setSelectedStartDate(e.target.value)}
                />
              </DateInputGroup>

              <DateInputGroup>
                <DateLabel>종료일</DateLabel>
                <DateInput
                  type="date"
                  value={selectedEndDate}
                  onChange={(e) => setSelectedEndDate(e.target.value)}
                />
              </DateInputGroup>
            </DateInputContainer>

            <DateButtonGroup>
              <DateCancelButton onClick={handleDateCancel}>
                취소
              </DateCancelButton>
              <DateConfirmButton onClick={handleDateConfirm}>
                확인
              </DateConfirmButton>
            </DateButtonGroup>
          </DatePickerModalContainer>
        </DatePickerModalOverlay>
      )}
    </UserProfilePage>
  );
};


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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: 2px solid #e9ecef;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: white;
  font-weight: 600;
  font-size: 36px;

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
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: all 0.3s ease;

  &:hover {
    ${props => props.$clickable && `
      transform: translateY(-2px);
      color: #667eea;
    `}
  }
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

const CouponSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
  color: white;
  text-align: center;
`;

const CouponSectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px 0;
`;

const CouponCount = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const CouponSectionDescription = styled.p`
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
`;

const FollowModal = styled.div`
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

const FollowModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  max-width: 400px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    max-width: 90vw;
    padding: 20px;
    max-height: 85vh;
  }
`;

const FollowModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f8f9fa;
`;

const FollowModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
`;

const FollowModalClose = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6c757d;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #495057;
  }
`;

const FollowList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
  flex: 1;
  padding-right: 5px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const FollowItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 12px;
  background: #f8f9fa;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
  }
`;

const FollowAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const FollowInfo = styled.div`
  flex: 1;
`;

const FollowName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 2px;
`;

const FollowUsername = styled.div`
  font-size: 14px;
  color: #6c757d;
`;

const CouponModal = styled.div`
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

const CouponModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    max-width: 90vw;
    padding: 20px;
    max-height: 85vh;
  }
`;

const CouponList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
  flex: 1;
  padding-right: 5px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const CouponCard = styled.div`
  border: 2px solid #e9ecef;
  border-radius: 15px;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.1);
  }
`;

const CouponHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const CouponTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
`;

const CouponDiscount = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`;

const CouponDescription = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 8px 0;
  line-height: 1.4;
`;

const CouponFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #e9ecef;
`;

const CouponCode = styled.span`
  font-family: 'Courier New', monospace;
  background: #f8f9fa;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  color: #495057;
  border: 1px solid #e9ecef;
`;

const CouponExpiry = styled.span`
  font-size: 12px;
  color: #dc3545;
  font-weight: 500;
`;

const CouponMinAmount = styled.span`
  font-size: 12px;
  color: #6c757d;
  margin-top: 5px;
  display: block;
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

const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;
  font-size: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px dashed #dee2e6;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
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

const PointsUseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: #495057;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
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
  position: relative;

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

const TripAuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #e9ecef;
`;

const TripAuthorAvatar = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TripAuthorName = styled.span`
  font-size: 12px;
  color: #6c757d;
  font-weight: 500;
`;

const SavedScheduleDeleteButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);

  ${InterestedTripCard}:hover & {
    opacity: 1;
  }

  &:hover {
    background: #c82333;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin: 20px 0;
`;

const FollowButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  &.following {
    background: #e9ecef;
    color: #6c757d;
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
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 12px 24px;
  }
`;

const UserPostsSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
`;

const PostsSectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 20px 0;
  text-align: center;
`;

const PostTabs = styled.div`
  display: flex;
  border-bottom: 2px solid #f8f9fa;
  margin-bottom: 20px;
`;

const PostTab = styled.button`
  flex: 1;
  padding: 15px 20px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  color: #6c757d;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;

  &.active {
    color: #667eea;
    border-bottom-color: #667eea;
  }

  &:hover {
    color: #667eea;
  }
`;

const PostsList = styled.div`
  display: grid;
  gap: 16px;
`;

const PostCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    transform: translateY(-2px);
  }
`;

const PostTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
`;

const PostMeta = styled.div`
  font-size: 14px;
  color: #6c757d;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 일정 작성 방법 선택 모달 스타일
const CreateModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const CreateModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px 30px 30px 30px;
  text-align: center;
  max-width: 500px;
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

const CreateModalTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const CreateModalMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 30px 0;
  line-height: 1.6;
`;

const CreateOptionsContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const CreateOptionButton = styled.button`
  background: ${props => props.$primary ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.$primary ? 'white' : '#667eea'};
  border: 2px solid #667eea;
  padding: 15px 25px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${props => props.$primary ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#667eea'};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;

const CreateOptionText = styled.span`
  font-size: 14px;
`;

const CreateCancelButton = styled.button`
  background: white;
  color: #6c757d;
  border: 2px solid #e9ecef;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #495057;
  }
`;

// 날짜 선택 모달 스타일
const DatePickerModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const DatePickerModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
`;

const DatePickerTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const DatePickerMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 30px 0;
  line-height: 1.6;
`;

const DateInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`;

const DateInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const DateLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
`;

const DateInput = styled.input`
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const DateButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const DateConfirmButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
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

const DateCancelButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #5a6268;
    transform: translateY(-2px);
  }
`;

// 텍스트 리스트 형식을 위한 새로운 스타일 컴포넌트들
const TextListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TextListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  cursor: pointer;
  gap: 12px;

  &:hover {
    background: #e9ecef;
    border-color: #667eea;
  }
`;

const TextListImage = styled.img`
  width: 60px;
  height: 45px;
  border-radius: 6px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
`;

const TextListContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TextListTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  line-height: 1.3;
`;

const TextListMeta = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
`;

const TextListActions = styled.div`
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${TextListItem}:hover & {
    opacity: 1;
  }
`;

const TextListButton = styled.button`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  &.edit {
    background: #28a745;
    color: white;
  }

  &.delete {
    background: #dc3545;
    color: white;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

export default UserProfile;
