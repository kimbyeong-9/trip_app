import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import { supabase } from '../supabaseClient';
import PlaceCard from '../components/travel-schedule-detail/PlaceCard';
import PlaceDetailModal from '../components/travel-schedule-detail/PlaceDetailModal';
import SimpleModal from '../components/travel-schedule-detail/SimpleModal';
import ConfirmModal from '../components/travel-schedule-detail/ConfirmModal';
import SaveSuccessModal from '../components/travel-schedule-detail/SaveSuccessModal';

const TravelScheduleDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showSaveSuccessModal, setShowSaveSuccessModal] = useState(false);
  const [isUserSchedule, setIsUserSchedule] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [authorUploadCount, setAuthorUploadCount] = useState(0);

  // 샘플 일정 데이터
  const sampleItinerary = {
    day1: {
      date: "2024년 3월 15일 (금)",
      places: [
        {
          id: 1,
          name: "인천국제공항",
          category: "공항",
          image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop",
          description: "여행의 시작점, 제주도행 항공편 탑승",
          phone: "1577-2600",
          address: "인천광역시 중구 공항로 272",
          hours: "24시간 운영",
          distance: "38km"
        },
        {
          id: 2,
          name: "제주국제공항",
          category: "공항",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
          description: "제주도 도착, 렌터카 픽업 및 여행 시작",
          phone: "064-797-2114",
          address: "제주특별자치도 제주시 공항로 2",
          hours: "05:30 - 23:00",
          distance: "15km"
        },
        {
          id: 3,
          name: "성산일출봉",
          category: "관광지",
          image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
          description: "제주도의 대표적인 일출 명소, 유네스코 세계자연유산",
          phone: "064-783-0959",
          address: "제주특별자치도 서귀포시 성산읍 성산리",
          hours: "일출 1시간 전 - 20:00",
          distance: "25km"
        },
        {
          id: 4,
          name: "우도",
          category: "관광지",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
          description: "제주 동쪽의 작은 섬, 아름다운 해변과 자연경관",
          phone: "064-728-4316",
          address: "제주특별자치도 제주시 우도면",
          hours: "페리 운항시간에 따라 상이",
          distance: "50km"
        }
      ]
    },
    day2: {
      date: "2024년 3월 16일 (토)",
      places: [
        {
          id: 5,
          name: "한라산 국립공원",
          category: "자연/등산",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
          description: "제주도의 최고봉, 등산과 자연 관찰의 명소",
          phone: "064-747-9950",
          address: "제주특별자치도 제주시 1100로",
          hours: "05:00 - 18:00 (계절별 상이)",
          distance: "40km"
        },
        {
          id: 6,
          name: "천지연폭포",
          category: "자연",
          image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
          description: "제주도 3대 폭포 중 하나, 야간 조명이 아름다운 곳",
          phone: "064-760-6304",
          address: "제주특별자치도 서귀포시 천지동",
          hours: "09:00 - 22:00",
          distance: "30km"
        },
        {
          id: 7,
          name: "정방폭포",
          category: "자연",
          image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
          description: "바다로 직접 떨어지는 동양 유일의 해안폭포",
          phone: "064-733-1530",
          address: "제주특별자치도 서귀포시 칠십리로",
          hours: "09:00 - 18:00",
          distance: "20km"
        }
      ]
    },
    day3: {
      date: "2024년 3월 17일 (일)",
      places: [
        {
          id: 8,
          name: "제주 올레시장",
          category: "시장/쇼핑",
          image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
          description: "제주도 전통 시장, 다양한 특산품과 먹거리",
          phone: "064-752-3001",
          address: "제주특별자치도 제주시 관덕로 14길",
          hours: "06:00 - 21:00",
          distance: "10km"
        },
        {
          id: 9,
          name: "제주국제공항",
          category: "공항",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
          description: "제주도 여행 마무리, 서울행 항공편 탑승",
          phone: "064-797-2114",
          address: "제주특별자치도 제주시 공항로 2",
          hours: "05:30 - 23:00",
          distance: "끝"
        }
      ]
    }
  };

  useEffect(() => {
    // 저장된 사용자 일정 데이터 로드
    const loadUserSchedule = async () => {
      try {
        // 현재 로그인한 사용자 정보 가져오기
        const getLoginData = () => {
          const localData = localStorage.getItem('loginData');
          const sessionData = sessionStorage.getItem('loginData');
          return localData ? JSON.parse(localData) : (sessionData ? JSON.parse(sessionData) : null);
        };

        const loginData = getLoginData();
        const currentUserId = loginData?.user?.id;

        // Supabase에서 Itinerary 데이터 가져오기
        const { data: itineraryData, error } = await supabase
          .from('Itinerary')
          .select('*')
          .eq('id', parseInt(id))
          .single();

        if (error) {
          console.error('Error fetching itinerary:', error);
          setSchedule(null);
          setLoading(false);
          return;
        }

        if (itineraryData) {
          // 작성자 확인
          const isMySchedule = currentUserId && itineraryData.author_user_id &&
                               currentUserId === itineraryData.author_user_id;
          setIsUserSchedule(isMySchedule);

          // detailedDescription 파싱
          let detailedInfo = {};
          if (itineraryData.detailedDescription) {
            try {
              detailedInfo = JSON.parse(itineraryData.detailedDescription);
            } catch (e) {
              console.error('detailedDescription 파싱 오류:', e);
            }
          }

          // places 데이터로 itinerary 구성
          const formattedItinerary = [];
          if (detailedInfo.places) {
            for (let day = 1; day <= detailedInfo.totalDays; day++) {
              const dayPlaces = detailedInfo.places[day] || [];
              if (dayPlaces.length > 0) {
                formattedItinerary.push({
                  day: `${day}일차`,
                  places: dayPlaces
                });
              }
            }
          }

          setSchedule({
            id: itineraryData.id,
            title: itineraryData.title,
            region: itineraryData.region,
            duration: detailedInfo.duration || itineraryData.date || "여행 기간",
            description: itineraryData.description || "여행 일정에 대한 설명입니다.",
            author: itineraryData.author,
            author_user_id: itineraryData.author_user_id,
            itinerary: formattedItinerary.length > 0 ? formattedItinerary : sampleItinerary,
            transportation: detailedInfo.transportation || [],
            companions: detailedInfo.companions || '',
            accommodation: detailedInfo.accommodation || '',
            image: itineraryData.image,
            startDate: detailedInfo.startDate || (itineraryData.date ? itineraryData.date.split('~')[0]?.trim() : ''),
            endDate: detailedInfo.endDate || (itineraryData.date ? itineraryData.date.split('~')[1]?.trim() : ''),
            views: itineraryData.views || 0,
            likes: itineraryData.likes || 0,
            tags: itineraryData.tags || []
          });

          // 조회수 증가 (본인이 아닐 때만, 그리고 이번 세션에서 처음 조회할 때만)
          if (!isMySchedule) {
            const viewedSchedulesKey = `viewedSchedules_${currentUserId || 'guest'}`;
            const viewedSchedules = JSON.parse(sessionStorage.getItem(viewedSchedulesKey) || '[]');

            // 이미 조회한 일정인지 확인
            if (!viewedSchedules.includes(parseInt(id))) {
              const { error: viewError } = await supabase
                .from('Itinerary')
                .update({ views: (itineraryData.views || 0) + 1 })
                .eq('id', parseInt(id));

              if (viewError) {
                console.error('조회수 업데이트 오류:', viewError);
              } else {
                // 조회 기록 저장
                viewedSchedules.push(parseInt(id));
                sessionStorage.setItem(viewedSchedulesKey, JSON.stringify(viewedSchedules));

                // 로컬 상태도 업데이트
                setSchedule(prev => prev ? { ...prev, views: (prev.views || 0) + 1 } : null);
              }
            }
          }

          // 작성자가 업로드한 총 일정 개수 가져오기
          if (itineraryData.author_user_id) {
            const { data: authorItineraries, error: countError } = await supabase
              .from('Itinerary')
              .select('id')
              .eq('author_user_id', itineraryData.author_user_id);

            if (!countError && authorItineraries) {
              setAuthorUploadCount(authorItineraries.length);
            }
          }

          // 좋아요 상태 확인 (localStorage에서)
          if (currentUserId) {
            const likedSchedulesKey = `likedSchedules_${currentUserId}`;
            const likedSchedules = JSON.parse(localStorage.getItem(likedSchedulesKey) || '[]');
            setIsLiked(likedSchedules.includes(parseInt(id)));
          }
        } else {
          setSchedule(null);
        }

        setLoading(false);
      } catch (error) {
        console.error('일정 데이터 로드 실패:', error);
        setLoading(false);
      }
    };

    loadUserSchedule();
  }, [id]);

  const handleBackClick = () => {
    navigate('/travel-schedules');
  };

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
  };

  const handleCloseModal = () => {
    setSelectedPlace(null);
  };

  const handleUseCoupon = () => {
    setShowCouponModal(true);
  };

  const handleCloseCouponModal = () => {
    setShowCouponModal(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedPlace.name,
        text: selectedPlace.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      console.log('링크가 클립보드에 복사되었습니다!');
    }
  };

  const handleSave = () => {
    // 로컬스토리지에 저장된 일정 목록 가져오기
    const savedSchedules = JSON.parse(localStorage.getItem('savedSchedules') || '[]');

    // 현재 일정이 이미 저장되어 있는지 확인
    const isAlreadySaved = savedSchedules.some(saved => saved.id === schedule.id);

    if (!isAlreadySaved) {
      // 새로운 일정 저장
      savedSchedules.push({
        id: schedule.id,
        title: schedule.title,
        region: schedule.region,
        date: schedule.date,
        image: schedule.image,
        author: schedule.author,
        savedAt: new Date().toISOString()
      });
      localStorage.setItem('savedSchedules', JSON.stringify(savedSchedules));
    }

    // 성공 모달 표시
    setShowSaveSuccessModal(true);
  };

  const handleCloseSaveSuccessModal = () => {
    setShowSaveSuccessModal(false);
  };

  const handleLike = async () => {
    try {
      // 현재 로그인한 사용자 정보 가져오기
      const getLoginData = () => {
        const localData = localStorage.getItem('loginData');
        const sessionData = sessionStorage.getItem('loginData');
        return localData ? JSON.parse(localData) : (sessionData ? JSON.parse(sessionData) : null);
      };

      const loginData = getLoginData();
      const currentUserId = loginData?.user?.id;

      if (!currentUserId) {
        alert('로그인이 필요합니다.');
        return;
      }

      const newLikedState = !isLiked;
      const newLikesCount = newLikedState ? (schedule.likes + 1) : (schedule.likes - 1);

      // Supabase 업데이트
      const { error } = await supabase
        .from('Itinerary')
        .update({ likes: newLikesCount })
        .eq('id', parseInt(id));

      if (error) {
        console.error('좋아요 업데이트 오류:', error);
        return;
      }

      // localStorage에 좋아요 상태 저장
      const likedSchedulesKey = `likedSchedules_${currentUserId}`;
      const likedSchedules = JSON.parse(localStorage.getItem(likedSchedulesKey) || '[]');

      if (newLikedState) {
        // 좋아요 추가
        likedSchedules.push(parseInt(id));
      } else {
        // 좋아요 제거
        const index = likedSchedules.indexOf(parseInt(id));
        if (index > -1) {
          likedSchedules.splice(index, 1);
        }
      }

      localStorage.setItem(likedSchedulesKey, JSON.stringify(likedSchedules));

      // 로컬 상태 업데이트
      setIsLiked(newLikedState);
      setSchedule(prev => prev ? { ...prev, likes: newLikesCount } : null);
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
    }
  };

  const handleAuthorClick = () => {
    console.log('handleAuthorClick called');
    console.log('schedule:', schedule);
    console.log('schedule.author:', schedule?.author);
    console.log('isUserSchedule:', isUserSchedule);

    if (schedule && schedule.author && schedule.author.name) {
      console.log('Navigating to profile...');
      if (isUserSchedule) {
        console.log('Going to my profile');
        // 내가 작성한 일정인 경우 마이페이지로 이동
        navigate('/profile/user');
      } else {
        console.log('Going to user profile:', schedule.author.name);
        // 다른 사용자 일정인 경우 해당 사용자 프로필로 이동
        navigate(`/profile/${schedule.author.name}`);
      }
    } else {
      console.log('Conditions not met for navigation');
      console.log('schedule exists:', !!schedule);
      console.log('schedule.author exists:', !!(schedule?.author));
      console.log('schedule.author.name exists:', !!(schedule?.author?.name));
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      // Supabase에서 일정 삭제
      const { error } = await supabase
        .from('Itinerary')
        .delete()
        .eq('id', parseInt(id));

      if (error) {
        console.error('일정 삭제 오류:', error);
        alert('일정 삭제에 실패했습니다. 다시 시도해주세요.');
        return;
      }

      alert('일정이 성공적으로 삭제되었습니다.');
      // 삭제 후 일정 목록 페이지로 이동
      navigate('/travel-schedules');
    } catch (error) {
      console.error('일정 삭제 실패:', error);
      alert('일정 삭제에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <TravelScheduleDetailPage>
        <Navigation />
        <DetailContainer>
          <LoadingContainer>로딩중...</LoadingContainer>
        </DetailContainer>
      </TravelScheduleDetailPage>
    );
  }

  if (!schedule || !schedule.title) {
    return (
      <TravelScheduleDetailPage>
        <Navigation />
        <DetailContainer>
          <PageHeader>
            <PageTitle>일정 상세</PageTitle>
            <BackButton onClick={handleBackClick}>
              뒤로가기
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
          <PageTitle>일정 상세</PageTitle>
          <BackButton onClick={handleBackClick}>
            뒤로가기
          </BackButton>
        </PageHeader>

        {/* 일정 개요 */}
        <ScheduleOverview>
          {/* 메인 이미지 추가 */}
          <ScheduleMainImage>
            <img
              src={
                schedule.image || "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=300&fit=crop"
              }
              alt={schedule.title}
            />
          </ScheduleMainImage>

          <ScheduleTitle>{schedule.title}</ScheduleTitle>
          <ScheduleMeta>
            <Badge>{schedule.region}</Badge>
          </ScheduleMeta>

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

          <ScheduleDescription>{schedule.description}</ScheduleDescription>

          {/* 작성자 정보 */}
          <AuthorSection>
            <AuthorLeftSection onClick={handleAuthorClick}>
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
            <AuthorActionButton onClick={handleLike} title="좋아요">
              <HeartIcon $liked={isLiked} />
            </AuthorActionButton>
          </AuthorSection>
        </ScheduleOverview>

        {/* 여행 상세 정보 */}
        {(schedule.transportation || schedule.companions || schedule.accommodation || schedule.startDate) && (
          <TravelInfoSection>
            <TravelInfoTitle>여행 정보</TravelInfoTitle>
            <TravelInfoGrid>
              {schedule.startDate && schedule.endDate && (
                <TravelInfoItem>
                  <TravelInfoLabel>여행 기간</TravelInfoLabel>
                  <TravelInfoValue>{schedule.startDate} ~ {schedule.endDate}</TravelInfoValue>
                </TravelInfoItem>
              )}

              {schedule.transportation && schedule.transportation.length > 0 && (
                <TravelInfoItem>
                  <TravelInfoLabel>교통수단</TravelInfoLabel>
                  <TransportationTags>
                    {schedule.transportation.map((transport, index) => (
                      <TransportationTag key={index}>{transport}</TransportationTag>
                    ))}
                  </TransportationTags>
                </TravelInfoItem>
              )}

              {schedule.companions && (
                <TravelInfoItem>
                  <TravelInfoLabel>동행인</TravelInfoLabel>
                  <TravelInfoValue>{schedule.companions}</TravelInfoValue>
                </TravelInfoItem>
              )}

              {schedule.accommodation && (
                <TravelInfoItem>
                  <TravelInfoLabel>숙박</TravelInfoLabel>
                  <TravelInfoValue>{schedule.accommodation}</TravelInfoValue>
                </TravelInfoItem>
              )}
            </TravelInfoGrid>
          </TravelInfoSection>
        )}

        {/* 일차별 일정 */}
        {schedule.itinerary && Array.isArray(schedule.itinerary) ? (
          // 새로운 사용자 작성 일정 형태 (배열)
          schedule.itinerary.map((dayData, index) => (
            <DaySection key={index}>
              <DayHeader>
                <DayTitle>{dayData.day}</DayTitle>
              </DayHeader>
              <PlacesContainer>
                {dayData.places.map((place, placeIndex) => (
                  <div key={placeIndex}>
                    <PlaceCard place={place} onClick={handlePlaceClick} />

                    {placeIndex < dayData.places.length - 1 && (
                      <ArrowSection>
                        <Arrow>↓</Arrow>
                        <DistanceText>{place.distance || '도보 5분'}</DistanceText>
                      </ArrowSection>
                    )}
                  </div>
                ))}
              </PlacesContainer>
            </DaySection>
          ))
        ) : schedule.itinerary ? (
          // 기존 샘플 데이터 형태 (객체)
          Object.entries(schedule.itinerary).map(([day, dayData]) => (
          <DaySection key={day}>
            <DayHeader>
              <DayTitle>{day.replace('day', '')}일차</DayTitle>
              <DayDate>{dayData.date}</DayDate>
            </DayHeader>

            <PlacesContainer>
              {dayData.places.map((place, index) => (
                <div key={place.id}>
                  <PlaceCard place={place} onClick={handlePlaceClick} />

                  {index < dayData.places.length - 1 && place.distance !== '끝' && (
                    <ArrowSection>
                      <Arrow>↓</Arrow>
                      <DistanceText>{place.distance}</DistanceText>
                    </ArrowSection>
                  )}
                </div>
              ))}
            </PlacesContainer>
          </DaySection>
        ))
        ) : (
          <DaySection>
            <div style={{ textAlign: 'center', padding: '40px', color: '#6c757d' }}>
              일정 정보가 없습니다.
            </div>
          </DaySection>
        )}

        {/* 내가 작성한 일정이 아닌 경우만 저장 버튼 표시 */}
        {!isUserSchedule && (
          <BottomSaveButton onClick={handleSave}>
            저장
          </BottomSaveButton>
        )}

        {/* 사용자 일정일 경우만 삭제 버튼 표시 */}
        {isUserSchedule && (
          <DeleteButton onClick={handleDeleteClick}>
            일정 삭제
          </DeleteButton>
        )}
      </DetailContainer>

      {/* 장소 상세 정보 모달 */}
      <PlaceDetailModal
        place={selectedPlace}
        onClose={handleCloseModal}
        onShare={handleShare}
      />

      {/* 쿠폰 준비중 모달 */}
      <SimpleModal
        show={showCouponModal}
        title="준비중"
        message="쿠폰 기능을 준비중입니다."
        buttonText="닫기"
        onClose={handleCloseCouponModal}
      />


      {/* 저장 성공 모달 */}
      <SaveSuccessModal
        show={showSaveSuccessModal}
        onClose={handleCloseSaveSuccessModal}
      />

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        show={showDeleteModal}
        title="일정 삭제"
        message="정말로 이 일정을 삭제하시겠습니까?<br />삭제된 일정은 복구할 수 없습니다."
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteModal}
      />
    </TravelScheduleDetailPage>
  );
};


const TravelScheduleDetailPage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
  padding-bottom: 100px;
`;

const DetailContainer = styled.div`
  max-width: 1000px;
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

const ScheduleOverview = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
`;

const ScheduleMainImage = styled.div`
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

const ScheduleTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const ScheduleMeta = styled.div`
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

const ScheduleDescription = styled.p`
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

const TravelInfoSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  margin: 20px 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
`;

const TravelInfoTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 20px 0;
  padding-bottom: 15px;
  border-bottom: 2px solid #f8f9fa;
`;

const TravelInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const TravelInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TravelInfoLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #6c757d;
`;

const TravelInfoValue = styled.span`
  font-size: 16px;
  color: #2c3e50;
  font-weight: 500;
`;

const TransportationTags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const TransportationTag = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
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

const DaySection = styled.div`
  margin-bottom: 40px;
`;

const DayHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 30px;
  border-radius: 20px 20px 0 0;
  margin-bottom: 0;
`;

const DayTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 10px 0;
`;

const DayDate = styled.p`
  font-size: 16px;
  margin: 0;
  opacity: 0.9;
`;

const PlacesContainer = styled.div`
  background: white;
  border-radius: 0 0 20px 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  border-top: none;
`;

const ArrowSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
  gap: 15px;
`;

const Arrow = styled.div`
  color: #667eea;
  font-size: 24px;
`;

const DistanceText = styled.div`
  font-size: 14px;
  color: #6c757d;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
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

const BottomSaveButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px 48px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 40px auto 20px;
  display: block;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
  }

  &:active {
    transform: translateY(0);
  }
`;

const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 16px 48px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 20px auto;
  display: block;
  box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(220, 53, 69, 0.6);
    background: #c82333;
  }

  &:active {
    transform: translateY(0);
  }
`;

export default TravelScheduleDetail;