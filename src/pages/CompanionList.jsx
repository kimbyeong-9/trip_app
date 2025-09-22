import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';

// Styled Components - 기존 CSS와 동일한 스타일
const CompanionListPage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
`;

const CompanionListContainer = styled.div`
  max-width: 1200px;
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

const FilterSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
`;

const FilterTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 20px 0;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #495057;
`;

const FilterSelect = styled.select`
  padding: 10px 12px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  color: #495057;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const SearchInput = styled.input`
  padding: 10px 12px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  color: #495057;
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #6c757d;
  }
`;

const PostsSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr 80px 80px 140px 120px 80px;
  gap: 15px;
  padding: 15px 20px;
  background: #f8f9fa;
  border-radius: 8px;
  font-weight: 600;
  color: #495057;
  font-size: 14px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    grid-template-columns: 120px 1fr 60px 60px 120px 100px 70px;
    padding: 12px 15px;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 80px 1fr 50px 50px 100px 80px 60px;
    padding: 10px 12px;
    font-size: 11px;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr 80px 80px 140px 120px 80px;
  gap: 15px;
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #f8f9fa;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 120px 1fr 60px 60px 120px 100px 70px;
    padding: 15px;
    gap: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 80px 1fr 50px 50px 100px 80px 60px;
    padding: 12px;
    gap: 10px;
  }
`;

const ImageCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

const RepresentativeImage = styled.img`
  width: 100%;
  height: 38px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 20px;
  }

  @media (max-width: 480px) {
    height: 15px;
  }

  @media (max-width: 360px) {
    height: 16px;
  }
`;

const TitleCell = styled.div`
  font-weight: 600;
  color: #2c3e50;
  font-size: 16px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const MetaCell = styled.div`
  font-size: 14px;
  color: #6c757d;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const AgeGroupCell = styled.div`
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 3px 6px;
  }
`;

const DateCell = styled.div`
  background: #f3e5f5;
  color: #7b1fa2;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 3px 6px;
  }
`;

const ParticipantsCell = styled.div`
  background: #e8f5e8;
  color: #2e7d32;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 3px 6px;
  }
`;

const StatusCell = styled.div`
  background: ${props => props.isRecruiting ? '#e8f5e8' : '#ffebee'};
  color: ${props => props.isRecruiting ? '#2e7d32' : '#c62828'};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 3px 6px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #e9ecef;
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#495057'};
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#5a6fd8' : '#f8f9fa'};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoginModal = styled.div`
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
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px 30px 30px 30px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h3`
  font-size: 24px;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const ModalMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 25px 0;
  line-height: 1.5;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const ModalButton = styled.button`
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  ${props => props.primary ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
    }
  ` : `
    background: white;
    color: #6c757d;
    border: 2px solid #e9ecef;

    &:hover {
      background: #f8f9fa;
      color: #495057;
    }
  `}
`;

const NoResults = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
`;

const NoResultsIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const NoResultsTitle = styled.h3`
  font-size: 24px;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const NoResultsText = styled.p`
  font-size: 16px;
  margin: 0;
`;

const CompanionList = () => {
  const navigate = useNavigate();
  const [selectedAge, setSelectedAge] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const postsPerPage = 10;

  // 로그인 상태 확인
  const getLoginData = () => {
    const localData = localStorage.getItem('loginData');
    const sessionData = sessionStorage.getItem('loginData');
    return localData ? JSON.parse(localData) : (sessionData ? JSON.parse(sessionData) : null);
  };
  
  const loginData = getLoginData();
  const isLoggedIn = loginData && loginData.isLoggedIn;
  
  const handleCreateCompanion = () => {
    if (isLoggedIn) {
      navigate('/companion/create');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginClick = () => {
    setShowLoginModal(false);
    navigate('/login');
  };

  // 소개글 50자 제한 유틸리티
  const truncateDescription = (text, max = 50) => {
    if (!text) return '';
    const trimmed = text.trim();
    return trimmed.length > max ? trimmed.slice(0, max) + '…' : trimmed;
  };

  // 임의의 동행모집 데이터 (총 25개)
  const companionPosts = [
    {
      id: 1,
      title: "제주도 3박4일 여행 같이 가실 분!",
      ageGroup: "20대",
      region: "제주",
      date: "2024-02-15 ~ 2024-02-18",
      description: "제주도 한라산과 성산일출봉을 함께 둘러보실 분 모집합니다. 렌터카로 이동하며 자유롭게 여행할 예정입니다.",
      participants: { current: 2, max: 4 },
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "서울 맛집 투어",
      ageGroup: "30대",
      region: "서울",
      date: "2024-02-20 ~ 2024-02-21",
      description: "서울의 숨은 맛집들을 찾아 떠나는 투어입니다. 홍대, 이태원, 강남 일대를 돌아다닐 예정이에요.",
      participants: { current: 1, max: 3 },
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "부산 해운대 & 감천문화마을",
      ageGroup: "20대",
      region: "부산",
      date: "2024-02-25 ~ 2024-02-26",
      description: "부산의 대표 관광지들을 함께 둘러보실 분 모집합니다. 해운대 해수욕장과 감천문화마을을 중심으로!",
      participants: { current: 3, max: 5 },
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "강릉 커피거리 & 정동진 해돋이",
      ageGroup: "30대",
      region: "강원",
      date: "2024-03-01 ~ 2024-03-02",
      description: "강릉의 유명한 커피거리와 정동진에서 해돋이를 보러 가실 분 모집합니다. 로맨틱한 여행을 원하시는 분들!",
      participants: { current: 2, max: 4 },
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "전주 한옥마을 & 한지체험",
      ageGroup: "40대",
      region: "전라",
      date: "2024-03-05 ~ 2024-03-06",
      description: "전주 한옥마을에서 전통문화를 체험하고 맛있는 전주비빔밥을 맛보러 가실 분 모집합니다.",
      participants: { current: 4, max: 6 },
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "경주 불국사 & 첨성대",
      ageGroup: "30대",
      region: "경상",
      date: "2024-03-10 ~ 2024-03-11",
      description: "경주의 유네스코 세계문화유산을 함께 둘러보실 분 모집합니다. 역사에 관심있는 분들 환영!",
      participants: { current: 1, max: 4 },
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    },
    {
      id: 7,
      title: "인천 차이나타운 & 월미도",
      ageGroup: "20대",
      region: "인천",
      date: "2024-03-15 ~ 2024-03-16",
      description: "인천의 차이나타운과 월미도를 함께 둘러보실 분 모집합니다. 맛있는 중국음식도 함께!",
      participants: { current: 2, max: 3 },
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop"
    },
    {
      id: 8,
      title: "안동 하회마을 & 도산서원",
      ageGroup: "40대",
      region: "경상",
      date: "2024-03-20 ~ 2024-03-21",
      description: "안동 하회마을과 도산서원에서 유교문화를 체험하실 분 모집합니다. 전통문화에 관심있는 분들!",
      participants: { current: 5, max: 6 },
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    },
    {
      id: 9,
      title: "제주도 서귀포 & 중문관광단지",
      ageGroup: "20대",
      region: "제주",
      date: "2024-03-22 ~ 2024-03-24",
      description: "서귀포와 중문관광단지에서 휴양하실 분 모집합니다. 해변과 카페 투어 계획입니다.",
      participants: { current: 1, max: 4 },
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"
    },
    {
      id: 10,
      title: "부산 감천문화마을 & 태종대",
      ageGroup: "30대",
      region: "부산",
      date: "2024-03-25 ~ 2024-03-26",
      description: "감천문화마을과 태종대에서 부산의 매력을 느껴보실 분 모집합니다. 맛집 투어도 함께!",
      participants: { current: 3, max: 5 },
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop"
    },
    {
      id: 11,
      title: "강릉 커피거리 & 정동진 해돋이",
      ageGroup: "20대",
      region: "강원",
      date: "2024-03-28 ~ 2024-03-29",
      description: "강릉 커피거리와 정동진에서 해돋이를 보러 가실 분 모집합니다. 로맨틱한 여행!",
      participants: { current: 2, max: 6 },
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 12,
      title: "전주 한지체험 & 전통시장 투어",
      ageGroup: "30대",
      region: "전라",
      date: "2024-04-03 ~ 2024-04-04",
      description: "전주에서 한지체험과 전통시장을 둘러보실 분 모집합니다. 전통문화 체험에 관심있는 분들!",
      participants: { current: 4, max: 5 },
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop"
    },
    {
      id: 13,
      title: "서울 이태원 & 한남동 카페투어",
      ageGroup: "20대",
      region: "서울",
      date: "2024-04-08 ~ 2024-04-09",
      description: "서울의 트렌디한 이태원과 한남동 카페들을 탐방하실 분 모집합니다. 인스타 감성 사진도 함께!",
      participants: { current: 2, max: 4 },
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop"
    },
    {
      id: 14,
      title: "제주도 성산일출봉 & 만장굴",
      ageGroup: "30대",
      region: "제주",
      date: "2024-04-12 ~ 2024-04-14",
      description: "제주도의 대표 관광지 성산일출봉과 만장굴을 함께 둘러보실 분 모집합니다. 3박4일 일정입니다.",
      participants: { current: 1, max: 3 },
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 15,
      title: "부산 자갈치시장 & 국제시장",
      ageGroup: "40대",
      region: "부산",
      date: "2024-04-16 ~ 2024-04-17",
      description: "부산의 전통시장들을 탐방하며 맛있는 해산물을 맛보러 가실 분 모집합니다. 먹방 투어!",
      participants: { current: 3, max: 6 },
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop"
    },
    {
      id: 16,
      title: "강릉 오대산 & 월정사",
      ageGroup: "30대",
      region: "강원",
      date: "2024-04-20 ~ 2024-04-21",
      description: "강릉 오대산과 월정사에서 힐링하실 분 모집합니다. 자연 속에서 마음의 평화를 찾아보세요.",
      participants: { current: 2, max: 4 },
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 17,
      title: "전주 한옥마을 & 전통문화체험",
      ageGroup: "20대",
      region: "전라",
      date: "2024-04-25 ~ 2024-04-26",
      description: "전주 한옥마을에서 전통문화를 체험하고 한지를 만들어보실 분 모집합니다.",
      participants: { current: 1, max: 3 },
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop"
    },
    {
      id: 18,
      title: "경주 보문관광단지 & 불국사",
      ageGroup: "40대",
      region: "경상",
      date: "2024-04-30 ~ 2024-05-01",
      description: "경주의 보문관광단지와 불국사를 함께 둘러보실 분 모집합니다. 가족 단위로도 환영!",
      participants: { current: 4, max: 8 },
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    },
    {
      id: 19,
      title: "인천 송도 & 영종도",
      ageGroup: "20대",
      region: "인천",
      date: "2024-05-05 ~ 2024-05-06",
      description: "인천 송도의 현대적인 건축물과 영종도의 자연을 함께 즐기실 분 모집합니다.",
      participants: { current: 2, max: 4 },
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop"
    },
    {
      id: 20,
      title: "제주도 한라산 등반",
      ageGroup: "30대",
      region: "제주",
      date: "2024-05-10 ~ 2024-05-11",
      description: "제주도 한라산을 함께 등반하실 분 모집합니다. 체력이 좋으신 분들만 신청해주세요!",
      participants: { current: 1, max: 2 },
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 21,
      title: "부산 해운대 & 광안리",
      ageGroup: "20대",
      region: "부산",
      date: "2024-05-15 ~ 2024-05-16",
      description: "부산의 대표 해수욕장 해운대와 광안리를 함께 둘러보실 분 모집합니다. 바다 투어!",
      participants: { current: 3, max: 5 },
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop"
    },
    {
      id: 22,
      title: "강릉 정동진 & 강릉커피거리",
      ageGroup: "30대",
      region: "강원",
      date: "2024-05-20 ~ 2024-05-21",
      description: "강릉 정동진에서 해돋이를 보고 커피거리에서 힐링하실 분 모집합니다.",
      participants: { current: 2, max: 4 },
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 23,
      title: "전주 전통시장 & 맛집투어",
      ageGroup: "40대",
      region: "전라",
      date: "2024-05-25 ~ 2024-05-26",
      description: "전주의 전통시장과 맛집들을 탐방하실 분 모집합니다. 먹방 투어로 함께해요!",
      participants: { current: 4, max: 6 },
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop"
    },
    {
      id: 24,
      title: "경주 첨성대 & 대릉원",
      ageGroup: "30대",
      region: "경상",
      date: "2024-05-30 ~ 2024-05-31",
      description: "경주의 첨성대와 대릉원을 함께 둘러보실 분 모집합니다. 역사에 관심있는 분들!",
      participants: { current: 1, max: 3 },
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    },
    {
      id: 25,
      title: "서울 북촌한옥마을 & 인사동",
      ageGroup: "20대",
      region: "서울",
      date: "2024-06-05 ~ 2024-06-06",
      description: "서울 북촌한옥마을과 인사동을 함께 둘러보실 분 모집합니다. 전통과 현대가 만나는 곳!",
      participants: { current: 2, max: 4 },
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop"
    }
  ];

  // 필터링된 포스트 계산
  const filteredPosts = companionPosts.filter(post => {
    const matchesAge = selectedAge === 'all' || post.ageGroup === selectedAge;
    const matchesRegion = selectedRegion === 'all' || post.region === selectedRegion;
    const matchesMonth = selectedMonth === 'all' || post.date.includes(selectedMonth);
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.region.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesAge && matchesRegion && matchesMonth && matchesSearch;
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <CompanionListPage>
      <Navigation />
      
      <CompanionListContainer>
        <PageHeader>
          <PageTitle>동행모집</PageTitle>
          <CreateButton onClick={handleCreateCompanion}>
            동행모집 등록
          </CreateButton>
        </PageHeader>

        <FilterSection>
          <FilterTitle>필터</FilterTitle>
          <FilterGrid>
            <FilterGroup>
              <FilterLabel>검색</FilterLabel>
              <SearchInput
                type="text"
                placeholder="제목, 지역, 내용으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>나이대</FilterLabel>
              <FilterSelect value={selectedAge} onChange={(e) => setSelectedAge(e.target.value)}>
                <option value="all">전체</option>
                <option value="20대">20대</option>
                <option value="30대">30대</option>
                <option value="40대">40대</option>
                <option value="50대+">50대+</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>지역</FilterLabel>
              <FilterSelect value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
                <option value="all">전체</option>
                <option value="서울">서울</option>
                <option value="경기">경기</option>
                <option value="인천">인천</option>
                <option value="강원">강원</option>
                <option value="충청">충청</option>
                <option value="전라">전라</option>
                <option value="경상">경상</option>
                <option value="제주">제주</option>
                <option value="부산">부산</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>여행월</FilterLabel>
              <FilterSelect value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                <option value="all">전체</option>
                <option value="1월">1월</option>
                <option value="2월">2월</option>
                <option value="3월">3월</option>
                <option value="4월">4월</option>
                <option value="5월">5월</option>
                <option value="6월">6월</option>
                <option value="7월">7월</option>
                <option value="8월">8월</option>
                <option value="9월">9월</option>
                <option value="10월">10월</option>
                <option value="11월">11월</option>
                <option value="12월">12월</option>
              </FilterSelect>
            </FilterGroup>
          </FilterGrid>
        </FilterSection>

        <PostsSection>
          <TableHeader>
            <div>사진</div>
            <div>제목</div>
            <div>나이</div>
            <div>지역</div>
            <div>기간</div>
            <div>인원수</div>
            <div>모집여부</div>
          </TableHeader>

          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <TableRow key={post.id} onClick={() => navigate(`/companion/${post.id}`)}>
                <ImageCell>
                  <RepresentativeImage src={post.image} alt={post.title} />
                </ImageCell>
                <TitleCell>
                  {post.title}
                </TitleCell>
                <AgeGroupCell>
                  {post.ageGroup}
                </AgeGroupCell>
                <MetaCell>
                  {post.region}
                </MetaCell>
                <DateCell>
                  {post.date}
                </DateCell>
                <ParticipantsCell>
                  {post.participants.current}/{post.participants.max}명
                </ParticipantsCell>
                <StatusCell isRecruiting={post.participants.current < post.participants.max}>
                  {post.participants.current < post.participants.max ? '모집중' : '마감'}
                </StatusCell>
              </TableRow>
            ))
          ) : (
            <NoResults>
              <NoResultsIcon>🔍</NoResultsIcon>
              <NoResultsTitle>검색 결과가 없습니다</NoResultsTitle>
              <NoResultsText>다른 검색어나 필터를 시도해보세요</NoResultsText>
            </NoResults>
          )}
        </PostsSection>

        {/* 페이지네이션 */}
        {filteredPosts.length > 0 && (
          <Pagination>
            <PageButton 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              이전
            </PageButton>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <PageButton
                key={page}
                onClick={() => setCurrentPage(page)}
                active={currentPage === page}
              >
                {page}
              </PageButton>
            ))}
            
            <PageButton 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              다음
            </PageButton>
          </Pagination>
        )}
      </CompanionListContainer>

      {/* 로그인 모달 */}
      {showLoginModal && (
        <LoginModal onClick={() => setShowLoginModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalIcon>🔒</ModalIcon>
            <ModalTitle>로그인이 필요합니다</ModalTitle>
            <ModalMessage>동행모집 글을 작성하려면 로그인해주세요.</ModalMessage>
            <ModalButtons>
              <ModalButton primary onClick={handleLoginClick}>로그인</ModalButton>
              <ModalButton onClick={() => setShowLoginModal(false)}>취소</ModalButton>
            </ModalButtons>
          </ModalContent>
        </LoginModal>
      )}
    </CompanionListPage>
  );
};

export default CompanionList;