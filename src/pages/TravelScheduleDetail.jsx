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

const AuthorRightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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

const SaveIcon = styled.span`
  font-size: 20px;
  color: #667eea;

  &::before {
    content: '📋';
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

const PlaceCard = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border: 2px solid #f1f3f4;
  border-radius: 16px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  background: #fafbfc;

  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
    background: white;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const PlaceImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  margin-right: 20px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlaceInfo = styled.div`
  flex: 1;
`;

const PlaceName = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
`;

const PlaceCategory = styled.p`
  font-size: 14px;
  color: #667eea;
  margin: 0 0 8px 0;
  font-weight: 500;
`;

const PlaceDescription = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
  line-height: 1.4;
`;

const DistanceInfo = styled.div`
  margin-left: 20px;
  padding: 12px 16px;
  background: #e8f2ff;
  border-radius: 12px;
  font-size: 14px;
  color: #667eea;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ArrowDown = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0;
  color: #667eea;
  font-size: 24px;
`;

const ArrowSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
  gap: 15px;
`;

const ArrowWithDistance = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8f9fa;
  padding: 10px 15px;
  border-radius: 12px;
  border: 2px solid #e9ecef;
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

// 쿠폰 모달 스타일
const CouponModal = styled.div`
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

const CouponModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  position: relative;
`;

const CouponModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const CouponModalMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  line-height: 1.5;
  margin: 0 0 30px 0;
`;

const CouponModalCloseButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }
`;

// 모달 관련 스타일
const Modal = styled.div`
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

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 0;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  position: relative;
  height: 200px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const ModalBody = styled.div`
  padding: 30px;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 20px 0;
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 15px;
  margin-bottom: 30px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const InfoIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  margin-top: 2px;
`;

const InfoText = styled.div`
  flex: 1;
`;

const InfoLabel = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0 0 4px 0;
`;

const InfoValue = styled.p`
  font-size: 16px;
  color: #2c3e50;
  margin: 0;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 12px 16px;
  border: 2px solid #667eea;
  border-radius: 12px;
  background: ${props => props.primary ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.primary ? 'white' : '#667eea'};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.primary ? 'linear-gradient(135deg, #5a6fd8 0%, #6a4c9a 100%)' : '#f0f4ff'};
    transform: translateY(-1px);
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

const FloatingSaveButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 15px 35px rgba(102, 126, 234, 0.6);
  }

  &:active {
    transform: translateY(-2px) scale(1.05);
  }

  @media (max-width: 768px) {
    bottom: 100px;
    right: 20px;
    width: 50px;
    height: 50px;
    font-size: 16px;
  }
`;

const SaveSuccessModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: ${props => props.$show ? 1 : 0};
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const SaveSuccessContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  transform: ${props => props.$show ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)'};
  transition: all 0.3s ease;
`;

const SaveSuccessIcon = styled.div`
  font-size: 60px;
  margin-bottom: 20px;
`;

const SaveSuccessTitle = styled.h3`
  font-size: 24px;
  color: #2c3e50;
  margin: 0 0 16px 0;
  font-weight: 700;
`;

const SaveSuccessMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 30px 0;
  line-height: 1.6;
`;

const SaveSuccessButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }
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

const TravelScheduleDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showSaveSuccessModal, setShowSaveSuccessModal] = useState(false);

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
    // 실제 일정 데이터 로드 (현재는 샘플 데이터 사용)
    setTimeout(() => {
      setSchedule({
        id: id,
        title: "제주도 3박 4일 완벽 여행",
        region: "제주도",
        duration: "3박 4일",
        description: "제주도의 아름다운 자연과 문화를 경험할 수 있는 완벽한 여행 일정입니다.",
        author: {
          name: "김여행",
          profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
        },
        itinerary: sampleItinerary
      });
      setLoading(false);
    }, 1000);
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

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleAuthorClick = () => {
    if (schedule && schedule.author && schedule.author.name) {
      navigate(`/profile/${schedule.author.name}`);
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

  if (!schedule) {
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
              src={schedule.itinerary.day1.places[2]?.image || "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=300&fit=crop"}
              alt={schedule.title}
            />
          </ScheduleMainImage>

          <ScheduleTitle>{schedule.title}</ScheduleTitle>
          <ScheduleMeta>
            <Badge>{schedule.region}</Badge>
            <Badge>{schedule.duration}</Badge>
          </ScheduleMeta>
          <ScheduleDescription>{schedule.description}</ScheduleDescription>

          {/* 작성자 정보 */}
          {schedule.author && (
            <AuthorSection>
              <AuthorLeftSection onClick={handleAuthorClick}>
                <AuthorAvatar>
                  <img src={schedule.author.profileImage} alt={schedule.author.name} />
                </AuthorAvatar>
                <AuthorInfo>
                  <AuthorLabel>작성자</AuthorLabel>
                  <AuthorName>{schedule.author.name}</AuthorName>
                </AuthorInfo>
              </AuthorLeftSection>
              <AuthorActionButton onClick={handleLike} title="좋아요">
                <HeartIcon $liked={isLiked} />
              </AuthorActionButton>
            </AuthorSection>
          )}
        </ScheduleOverview>

        {/* 일차별 일정 */}
        {Object.entries(schedule.itinerary).map(([day, dayData]) => (
          <DaySection key={day}>
            <DayHeader>
              <DayTitle>{day.replace('day', '')}일차</DayTitle>
              <DayDate>{dayData.date}</DayDate>
            </DayHeader>

            <PlacesContainer>
              {dayData.places.map((place, index) => (
                <div key={place.id}>
                  <PlaceCard onClick={() => handlePlaceClick(place)}>
                    <PlaceImage>
                      <img src={place.image} alt={place.name} />
                    </PlaceImage>
                    <PlaceInfo>
                      <PlaceName>{place.name}</PlaceName>
                      <PlaceCategory>{place.category}</PlaceCategory>
                      <PlaceDescription>{place.description}</PlaceDescription>
                    </PlaceInfo>
                  </PlaceCard>

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
        ))}

        {/* 하단 저장 버튼 */}
        <BottomSaveButton onClick={handleSave}>
          저장
        </BottomSaveButton>
      </DetailContainer>

      {/* 장소 상세 정보 모달 */}
      {selectedPlace && (
        <Modal onClick={(e) => e.target === e.currentTarget && handleCloseModal()}>
          <ModalContent>
            <ModalHeader>
              <img src={selectedPlace.image} alt={selectedPlace.name} />
              <CloseButton onClick={handleCloseModal}>✕</CloseButton>
            </ModalHeader>

            <ModalBody>
              <ModalTitle>{selectedPlace.name}</ModalTitle>

              <InfoGrid>
                <InfoItem>
                  <InfoIcon>📞</InfoIcon>
                  <InfoText>
                    <InfoLabel>전화번호</InfoLabel>
                    <InfoValue>{selectedPlace.phone}</InfoValue>
                  </InfoText>
                </InfoItem>

                <InfoItem>
                  <InfoIcon>📍</InfoIcon>
                  <InfoText>
                    <InfoLabel>주소</InfoLabel>
                    <InfoValue>{selectedPlace.address}</InfoValue>
                  </InfoText>
                </InfoItem>

                <InfoItem>
                  <InfoIcon>🕐</InfoIcon>
                  <InfoText>
                    <InfoLabel>운영시간</InfoLabel>
                    <InfoValue>{selectedPlace.hours}</InfoValue>
                  </InfoText>
                </InfoItem>
              </InfoGrid>

              <ActionButtons>
                <ActionButton onClick={handleUseCoupon}>
                  쿠폰사용
                </ActionButton>
                <ActionButton onClick={handleShare}>
                  공유
                </ActionButton>
                <ActionButton primary onClick={handleSave}>
                  장소저장
                </ActionButton>
              </ActionButtons>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {/* 쿠폰 준비중 모달 */}
      {showCouponModal && (
        <CouponModal onClick={(e) => e.target === e.currentTarget && handleCloseCouponModal()}>
          <CouponModalContent>
            <CouponModalTitle>준비중</CouponModalTitle>
            <CouponModalMessage>쿠폰 기능을 준비중입니다.</CouponModalMessage>
            <CouponModalCloseButton onClick={handleCloseCouponModal}>
              닫기
            </CouponModalCloseButton>
          </CouponModalContent>
        </CouponModal>
      )}


      {/* 저장 성공 모달 */}
      <SaveSuccessModal $show={showSaveSuccessModal} onClick={(e) => e.target === e.currentTarget && handleCloseSaveSuccessModal()}>
        <SaveSuccessContent $show={showSaveSuccessModal}>
          <SaveSuccessIcon>✅</SaveSuccessIcon>
          <SaveSuccessTitle>저장 완료!</SaveSuccessTitle>
          <SaveSuccessMessage>
            일정이 관심 일정에 저장되었습니다.<br />
            마이페이지에서 확인하실 수 있습니다.
          </SaveSuccessMessage>
          <SaveSuccessButton onClick={handleCloseSaveSuccessModal}>
            확인
          </SaveSuccessButton>
        </SaveSuccessContent>
      </SaveSuccessModal>
    </TravelScheduleDetailPage>
  );
};

export default TravelScheduleDetail;