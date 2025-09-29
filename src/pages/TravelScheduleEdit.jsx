import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';

// Styled Components (DirectScheduleCreate와 동일한 구조)
const DirectScheduleCreatePage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
  padding-bottom: 20px;

  @media (max-width: 1024px) {
    padding-bottom: 100px;
  }
`;

const CreateContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  top: -10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-size: 20px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
  }
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const DateInfo = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px 25px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
  }

  &:active {
    transform: translateY(0);
  }
`;

const FormSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #f8f9fa;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const KeywordButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 768px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 5px 0;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    & > * {
      flex-shrink: 0;
    }
  }
`;

const OptionButton = styled.button`
  background: ${props => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.$active ? 'white' : '#667eea'};
  border: 2px solid #667eea;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f8f9ff'};
  }
`;

const LocationsSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const DaySection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
`;

const DayTitle = styled.h4`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #f8f9fa;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const RemoveDayButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #c82333;
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
`;

const PlacesContainer = styled.div`
  margin-bottom: 20px;
`;

const AddedPlaceCard = styled.div`
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #e9ecef;
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  }
`;

const AddedPlaceImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  background: #f0f0f0;

  &::before {
    content: '🏞️';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 20px;
    background: #f0f0f0;
  }
`;

const AddedPlaceInfo = styled.div`
  flex: 1;
`;

const AddedPlaceName = styled.h5`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 5px 0;
`;

const AddedPlaceMeta = styled.div`
  display: flex;
  gap: 8px;
`;

const SmallBadge = styled.span`
  background: ${props => props.type === 'region' ? '#e8f4f8' : '#f8e8ff'};
  color: ${props => props.type === 'region' ? '#0c5460' : '#6f42c1'};
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
`;

const DayAddButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
  }
`;

const AddDayButton = styled.button`
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(40, 167, 69, 0.6);
  }
`;

const AddDayIcon = styled.span`
  font-size: 20px;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 30px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ImageUploadSection = styled.div`
  margin-top: 20px;
`;

const ImageUploadBox = styled.div`
  border: 2px dashed #e9ecef;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  background: #f8f9fa;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: #667eea;
    background: #f0f4ff;
  }

  &.dragover {
    border-color: #667eea;
    background: #e8f2ff;
  }
`;

const ImagePreview = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 15px;
`;

const PreviewImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #c82333;
    transform: scale(1.1);
  }
`;

const ImageUploadText = styled.div`
  font-size: 16px;
  color: #495057;
  margin-bottom: 8px;
  font-weight: 600;
`;

const ImageUploadSubText = styled.div`
  font-size: 14px;
  color: #6c757d;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const DistanceIndicator = styled.div`
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
`;

// 장소 검색 모달 스타일
const LocationSearchModalOverlay = styled.div`
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

const LocationSearchModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 800px;
  height: 80vh;
  display: flex;
  flex-direction: column;
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

const LocationSearchHeader = styled.div`
  padding: 20px 30px;
  border-bottom: 2px solid #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LocationSearchTitle = styled.h2`
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
  padding: 5px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #2c3e50;
  }
`;

const SearchContent = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
`;

const SearchBox = styled.div`
  margin-bottom: 30px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  margin-bottom: 20px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const RegionSection = styled.div`
  margin-bottom: 20px;
`;

const RegionTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 10px 0;
`;

const RegionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

const RegionButton = styled.button`
  background: ${props => props.$active ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' : 'white'};
  color: ${props => props.$active ? 'white' : '#28a745'};
  border: 2px solid #28a745;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$active ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' : '#f0fff4'};
  }
`;

const CategorySection = styled.div`
  margin-bottom: 30px;
`;

const CategoryTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const CategoryButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const CategoryButton = styled.button`
  background: ${props => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.$active ? 'white' : '#667eea'};
  border: 2px solid #667eea;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f8f9ff'};
  }
`;

const SearchResults = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  min-height: 200px;
`;

const EmptyResults = styled.div`
  grid-column: 1 / -1;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  color: #6c757d;
  font-size: 16px;
`;

const PlaceCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: #667eea;
  }
`;

const PlaceImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const PlaceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const PlaceName = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  flex: 1;
`;

const PlaceRating = styled.div`
  background: linear-gradient(135deg, #ffd700 0%, #ffb700 100%);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  margin-left: 10px;
`;

const PlaceMeta = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const PlaceRegion = styled.span`
  background: #e8f4f8;
  color: #0c5460;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
`;

const PlaceCategory = styled.span`
  background: #f8e8ff;
  color: #6f42c1;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
`;

// 확인 모달 스타일
const ConfirmModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 20px;
`;

const ConfirmModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
`;

const ConfirmIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const ConfirmTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const ConfirmMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 30px 0;
  line-height: 1.6;
`;

const ConfirmButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const ConfirmButton = styled.button`
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
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
    box-shadow: 0 8px 25px rgba(40, 167, 69, 0.5);
  }
`;

const CancelConfirmButton = styled.button`
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
  }
`;

const TravelScheduleEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // 현재 로그인된 사용자 정보 가져오기
  const getCurrentUser = () => {
    try {
      const loginData = localStorage.getItem('loginData') || sessionStorage.getItem('loginData');
      return loginData ? JSON.parse(loginData) : null;
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error);
      return null;
    }
  };

  // 폼 상태
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    region: '',
    transportation: [],
    companions: '',
    accommodation: '',
    representativeImage: '',
  });

  // 장소 검색 관련 상태
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [targetDay, setTargetDay] = useState(1);

  // 선택된 장소들 관리 (일차별)
  const [dailyPlaces, setDailyPlaces] = useState({
    1: [] // 1일차부터 시작
  });

  // 현재 활성화된 일차 수
  const [activeDays, setActiveDays] = useState(1);

  // 날짜 정보
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // 기존 데이터 로드
  useEffect(() => {
    const loadScheduleData = () => {
      try {
        const savedSchedules = JSON.parse(localStorage.getItem('userSchedules') || '[]');
        const scheduleToEdit = savedSchedules.find(schedule => schedule.id === id);

        if (scheduleToEdit) {
          setFormData({
            title: scheduleToEdit.title || '',
            description: scheduleToEdit.description || '',
            region: scheduleToEdit.region || '',
            transportation: scheduleToEdit.transportation || [],
            companions: scheduleToEdit.companions || '',
            accommodation: scheduleToEdit.accommodation || '',
            representativeImage: scheduleToEdit.image || '',
          });

          setStartDate(scheduleToEdit.startDate || '');
          setEndDate(scheduleToEdit.endDate || '');
          setActiveDays(scheduleToEdit.totalDays || 1);
          setDailyPlaces(scheduleToEdit.places || { 1: [] });
        }
      } catch (error) {
        console.error('일정 데이터 로드 실패:', error);
      }
    };

    if (id) {
      loadScheduleData();
    }
  }, [id]);

  // 추천 장소 데이터
  const recommendedPlaces = [
    { id: 1, name: '경복궁', region: '서울', category: '역사', rating: 4.5, image: 'https://picsum.photos/300/200?random=1' },
    { id: 2, name: 'N서울타워', region: '서울', category: '야경', rating: 4.3, image: 'https://picsum.photos/300/200?random=2' },
    { id: 3, name: '홍대입구', region: '서울', category: '데이트', rating: 4.2, image: 'https://picsum.photos/300/200?random=3' },
    { id: 4, name: '해운대해수욕장', region: '부산', category: '휴양지', rating: 4.6, image: 'https://picsum.photos/300/200?random=4' },
    { id: 5, name: '감천문화마을', region: '부산', category: '체험', rating: 4.4, image: 'https://picsum.photos/300/200?random=5' },
    { id: 6, name: '제주올레길', region: '제주', category: '자연', rating: 4.7, image: 'https://picsum.photos/300/200?random=6' },
    { id: 7, name: '성산일출봉', region: '제주', category: '자연', rating: 4.8, image: 'https://picsum.photos/300/200?random=7' },
    { id: 8, name: '명동교자', region: '서울', category: '음식점', rating: 4.1, image: 'https://picsum.photos/300/200?random=8' },
    { id: 9, name: '스타벅스 압구정점', region: '서울', category: '카페', rating: 4.0, image: 'https://picsum.photos/300/200?random=9' },
    { id: 10, name: '롯데월드', region: '서울', category: '키즈', rating: 4.5, image: 'https://picsum.photos/300/200?random=10' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOptionToggle = (field, option) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(option)
        ? prev[field].filter(item => item !== option)
        : [...prev[field], option]
    }));
  };

  // 이미지 업로드 처리 함수
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하로 선택해주세요.');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          representativeImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 삭제 함수
  const handleImageRemove = () => {
    setFormData(prev => ({
      ...prev,
      representativeImage: ''
    }));
  };

  // 드래그 앤 드롭 처리
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        if (file.size > 5 * 1024 * 1024) {
          alert('파일 크기는 5MB 이하로 선택해주세요.');
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            representativeImage: e.target.result
          }));
        };
        reader.readAsDataURL(file);
      } else {
        alert('이미지 파일만 업로드 가능합니다.');
      }
    }
  };

  const addLocation = (day = 1) => {
    setTargetDay(day);
    setShowLocationSearch(true);
  };

  // 장소 필터링 함수
  const getFilteredPlaces = () => {
    return recommendedPlaces.filter(place => {
      const matchesRegion = selectedRegion === '전체' || place.region === selectedRegion;
      const matchesCategory = selectedCategory === '전체' || place.category === selectedCategory;
      const matchesSearch = !searchQuery || place.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesCategory && matchesSearch;
    });
  };

  // 장소 선택 핸들러
  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    setShowConfirmModal(true);
  };

  // 기존 장소 카드 클릭 시 재선택
  const handleExistingPlaceClick = (day, placeIndex) => {
    setTargetDay(day);
    setShowLocationSearch(true);
  };

  // 장소 추가 확정
  const confirmAddPlace = () => {
    if (!selectedPlace) return;

    setDailyPlaces(prev => ({
      ...prev,
      [targetDay]: [...(prev[targetDay] || []), { ...selectedPlace, addedAt: Date.now() }]
    }));

    setShowConfirmModal(false);
    setShowLocationSearch(false);
    setSelectedPlace(null);
  };

  // 간단한 거리 계산 함수
  const calculateDistance = (place1, place2) => {
    const distance = Math.floor(Math.random() * 20 + 1);
    return { distance };
  };

  // 일차 추가 함수
  const addDay = () => {
    const newDay = activeDays + 1;
    setActiveDays(newDay);
    setDailyPlaces(prev => ({
      ...prev,
      [newDay]: []
    }));
  };

  // 일차 제거 함수
  const removeDay = (day) => {
    if (day === 1 || activeDays <= 1) return;

    const newDailyPlaces = { ...dailyPlaces };
    delete newDailyPlaces[day];

    const reorderedPlaces = {};
    let newDayCounter = 1;

    for (let i = 1; i <= activeDays; i++) {
      if (i !== day && newDailyPlaces[i]) {
        reorderedPlaces[newDayCounter] = newDailyPlaces[i];
        newDayCounter++;
      }
    }

    setDailyPlaces(reorderedPlaces);
    setActiveDays(activeDays - 1);
  };

  const handleSubmit = () => {
    // 검증 로직
    if (!formData.title.trim()) {
      alert('여행 제목을 입력해주세요.');
      return;
    }

    if (!formData.description.trim()) {
      alert('여행 설명을 입력해주세요.');
      return;
    }

    if (!formData.region) {
      alert('여행 지역을 선택해주세요.');
      return;
    }

    if (formData.transportation.length === 0) {
      alert('교통수단을 최소 1개 이상 선택해주세요.');
      return;
    }

    if (!formData.accommodation.trim()) {
      alert('숙박 정보를 입력해주세요.');
      return;
    }

    if (!formData.companions.trim()) {
      alert('동행인 정보를 입력해주세요.');
      return;
    }

    const hasPlaces = Object.values(dailyPlaces).some(places => places.length > 0);
    if (!hasPlaces) {
      alert('여행 일정에 최소 1개 이상의 장소를 추가해주세요.');
      return;
    }

    try {
      // 기존 일정 목록 가져오기
      const existingSchedules = JSON.parse(localStorage.getItem('userSchedules') || '[]');

      // 수정된 일정 데이터 생성
      const updatedSchedule = {
        id: id,
        title: formData.title,
        region: formData.region,
        transportation: formData.transportation,
        companions: formData.companions,
        accommodation: formData.accommodation,
        startDate: startDate,
        endDate: endDate,
        date: `${startDate} ~ ${endDate}`,
        duration: `${activeDays}박 ${activeDays + 1}일`,
        places: dailyPlaces,
        totalDays: activeDays,
        author: {
          name: getCurrentUser()?.user?.name || '여행자',
          profileImage: getCurrentUser()?.user?.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'
        },
        image: formData.representativeImage || Object.values(dailyPlaces).flat()[0]?.image || 'https://picsum.photos/300/200?random=1',
        description: formData.description,
        updatedAt: new Date().toISOString(),
        tags: [formData.region, ...formData.transportation],
        views: 1,
        likes: 0
      };

      // 기존 일정 업데이트
      const updatedSchedules = existingSchedules.map(schedule =>
        schedule.id === id ? updatedSchedule : schedule
      );

      // localStorage에 저장
      localStorage.setItem('userSchedules', JSON.stringify(updatedSchedules));

      alert('일정이 성공적으로 수정되었습니다!');
      navigate(-1); // 이전 페이지로 돌아가기
    } catch (error) {
      console.error('일정 수정 오류:', error);
      alert('일정 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <DirectScheduleCreatePage>
      <Navigation />

      <CreateContainer>
        <PageHeader>
          <BackButton onClick={() => navigate(-1)}>
            ←
          </BackButton>
          <PageTitle>여행 일정 수정</PageTitle>
          {startDate && endDate && (
            <DateInfo>
              {startDate} ~ {endDate}
            </DateInfo>
          )}
        </PageHeader>

        <FormSection>
          <SectionTitle>기본 정보</SectionTitle>

          <FormGroup>
            <Label>제목</Label>
            <Input
              type="text"
              placeholder="여행 제목을 입력하세요"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>여행 설명</Label>
            <TextArea
              placeholder="여행에 대한 설명을 입력하세요"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </FormGroup>

          <FormGroup>
            <Label>같이 간 사람</Label>
            <Input
              type="text"
              placeholder="동행인을 입력하세요 (예: 친구 2명, 가족 4명)"
              value={formData.companions}
              onChange={(e) => handleInputChange('companions', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>대표사진</Label>
            <ImageUploadSection>
              {!formData.representativeImage ? (
                <ImageUploadBox
                  onClick={() => document.getElementById('imageUpload').click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <ImageUploadText>대표사진을 업로드하세요</ImageUploadText>
                  <ImageUploadSubText>
                    클릭하거나 드래그 앤 드롭으로 이미지 업로드 (최대 5MB)
                  </ImageUploadSubText>
                  <HiddenFileInput
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </ImageUploadBox>
              ) : (
                <ImagePreview>
                  <PreviewImage
                    src={formData.representativeImage}
                    alt="대표사진 미리보기"
                  />
                  <RemoveImageButton onClick={handleImageRemove}>
                    ×
                  </RemoveImageButton>
                </ImagePreview>
              )}
            </ImageUploadSection>
          </FormGroup>
        </FormSection>

        <FormSection>
          <SectionTitle>여행 정보</SectionTitle>

          <FormGroup>
            <Label>지역</Label>
            <KeywordButtonGroup>
              {['서울', '부산', '제주', '경기', '강원', '전라', '충청', '경상', '인천'].map(region => (
                <OptionButton
                  key={region}
                  $active={formData.region === region}
                  onClick={() => handleInputChange('region', region)}
                >
                  {region}
                </OptionButton>
              ))}
            </KeywordButtonGroup>
          </FormGroup>

          <FormGroup>
            <Label>교통편 (복수 선택 가능)</Label>
            <KeywordButtonGroup>
              {['자동차', '기차', '버스', '비행기', '배', '도보', '자전거'].map(option => (
                <OptionButton
                  key={option}
                  $active={formData.transportation.includes(option)}
                  onClick={() => handleOptionToggle('transportation', option)}
                >
                  {option}
                </OptionButton>
              ))}
            </KeywordButtonGroup>
          </FormGroup>

          <FormGroup>
            <Label>숙소 종류</Label>
            <KeywordButtonGroup>
              {['호텔', '펜션', '리조트', '게스트하우스', '민박', '캠핑', '에어비앤비'].map(option => (
                <OptionButton
                  key={option}
                  $active={formData.accommodation === option}
                  onClick={() => handleInputChange('accommodation', option)}
                >
                  {option}
                </OptionButton>
              ))}
            </KeywordButtonGroup>
          </FormGroup>
        </FormSection>

        <LocationsSection>
          <SectionTitle>방문 장소</SectionTitle>

          {Array.from({ length: activeDays }, (_, index) => {
            const day = index + 1;
            const dayPlaceList = dailyPlaces[day] || [];

            return (
              <DaySection key={day}>
                <DayHeader>
                  <DayTitle>{day}일차</DayTitle>
                  {activeDays > 1 && (
                    <RemoveDayButton
                      onClick={() => removeDay(day)}
                      disabled={day === 1}
                    >
                      삭제
                    </RemoveDayButton>
                  )}
                </DayHeader>

                {dayPlaceList.length > 0 && (
                  <PlacesContainer>
                    {dayPlaceList.map((place, idx) => (
                      <div key={`${place.id}-${place.addedAt}`}>
                        <AddedPlaceCard onClick={() => handleExistingPlaceClick(day, idx)}>
                          <AddedPlaceImage src={place.image} alt={place.name} />
                          <AddedPlaceInfo>
                            <AddedPlaceName>{place.name}</AddedPlaceName>
                            <AddedPlaceMeta>
                              <SmallBadge type="region">{place.region}</SmallBadge>
                              <SmallBadge type="category">{place.category}</SmallBadge>
                            </AddedPlaceMeta>
                          </AddedPlaceInfo>
                        </AddedPlaceCard>

                        {idx < dayPlaceList.length - 1 && (
                          <DistanceIndicator>
                            <Arrow>↓</Arrow>
                            <DistanceText>
                              {(() => {
                                const { distance } = calculateDistance(place, dayPlaceList[idx + 1]);
                                return `${distance}km`;
                              })()}
                            </DistanceText>
                          </DistanceIndicator>
                        )}
                      </div>
                    ))}
                  </PlacesContainer>
                )}

                <DayAddButton onClick={() => addLocation(day)}>
                  장소 추가 +
                </DayAddButton>
              </DaySection>
            );
          })}

          <AddDayButton onClick={addDay}>
            <AddDayIcon>+</AddDayIcon>
            {activeDays + 1}일차 추가
          </AddDayButton>
        </LocationsSection>

        <SubmitButton onClick={handleSubmit}>
          일정 수정하기
        </SubmitButton>
      </CreateContainer>

      {/* 장소 검색 모달 */}
      {showLocationSearch && (
        <LocationSearchModalOverlay onClick={() => setShowLocationSearch(false)}>
          <LocationSearchModalContainer onClick={(e) => e.stopPropagation()}>
            <LocationSearchHeader>
              <LocationSearchTitle>장소 검색</LocationSearchTitle>
              <CloseButton onClick={() => setShowLocationSearch(false)}>
                ×
              </CloseButton>
            </LocationSearchHeader>

            <SearchContent>
              <SearchBox>
                <SearchInput
                  type="text"
                  placeholder="장소명을 검색하세요 (예: 경복궁, N서울타워)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </SearchBox>

              <RegionSection>
                <RegionTitle>지역</RegionTitle>
                <RegionButtons>
                  {['전체', '서울', '부산', '제주', '경기', '강원', '전라', '충청', '경상', '인천'].map(region => (
                    <RegionButton
                      key={region}
                      $active={selectedRegion === region}
                      onClick={() => setSelectedRegion(region)}
                    >
                      {region}
                    </RegionButton>
                  ))}
                </RegionButtons>
              </RegionSection>

              <CategorySection>
                <CategoryTitle>카테고리</CategoryTitle>
                <CategoryButtons>
                  {['전체', '음식점', '카페', '키즈', '휴양지', '자연', '체험', '전시', '레포츠', '축제공연', '역사', '숙박', '야경', '데이트'].map(category => (
                    <CategoryButton
                      key={category}
                      $active={selectedCategory === category}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </CategoryButton>
                  ))}
                </CategoryButtons>
              </CategorySection>

              <SearchResults>
                {getFilteredPlaces().length > 0 ? (
                  getFilteredPlaces().map(place => (
                    <PlaceCard key={place.id} onClick={() => handlePlaceSelect(place)}>
                      <PlaceImage src={place.image} alt={place.name} />
                      <PlaceInfo>
                        <PlaceName>{place.name}</PlaceName>
                        <PlaceRating>⭐ {place.rating}</PlaceRating>
                      </PlaceInfo>
                      <PlaceMeta>
                        <PlaceRegion>{place.region}</PlaceRegion>
                        <PlaceCategory>{place.category}</PlaceCategory>
                      </PlaceMeta>
                    </PlaceCard>
                  ))
                ) : (
                  <EmptyResults>
                    선택한 조건에 맞는 장소가 없습니다.<br />
                    다른 지역이나 카테고리를 선택해보세요.
                  </EmptyResults>
                )}
              </SearchResults>
            </SearchContent>
          </LocationSearchModalContainer>
        </LocationSearchModalOverlay>
      )}

      {/* 장소 선택 확인 모달 */}
      {showConfirmModal && selectedPlace && (
        <ConfirmModalOverlay>
          <ConfirmModalContainer>
            <ConfirmIcon>📍</ConfirmIcon>
            <ConfirmTitle>장소 추가</ConfirmTitle>
            <ConfirmMessage>
              <strong>{selectedPlace.name}</strong>을(를)<br />
              일정에 추가하시겠습니까?
            </ConfirmMessage>
            <ConfirmButtons>
              <ConfirmButton onClick={confirmAddPlace}>
                추가
              </ConfirmButton>
              <CancelConfirmButton onClick={() => setShowConfirmModal(false)}>
                취소
              </CancelConfirmButton>
            </ConfirmButtons>
          </ConfirmModalContainer>
        </ConfirmModalOverlay>
      )}
    </DirectScheduleCreatePage>
  );
};

export default TravelScheduleEdit;