import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import { supabase } from '../supabaseClient';
import DateRangePicker from '../components/schedule/DateRangePicker';
import PlaceSearchModal from '../components/schedule/PlaceSearchModal';
import DayPlacesList from '../components/schedule/DayPlacesList';
import FormInputSection from '../components/schedule/FormInputSection';
import TransportationSelector from '../components/schedule/TransportationSelector';
import ScheduleImageUploader from '../components/schedule/ScheduleImageUploader';
import ConfirmModal from '../components/common/ConfirmModal';

const DirectScheduleCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isEditMode = location.state?.isEdit || false;
  const editScheduleData = location.state?.scheduleData || null;

  const getCurrentUser = () => {
    try {
      const loginData = localStorage.getItem('loginData') || sessionStorage.getItem('loginData');
      return loginData ? JSON.parse(loginData) : null;
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error);
      return null;
    }
  };

  const searchParams = new URLSearchParams(location.search);
  const startDate = isEditMode ? editScheduleData?.startDate : searchParams.get('startDate');
  const endDate = isEditMode ? editScheduleData?.endDate : searchParams.get('endDate');

  const [formData, setFormData] = useState({
    title: isEditMode ? editScheduleData?.title || '' : '',
    description: isEditMode ? editScheduleData?.description || '' : '',
    region: isEditMode ? editScheduleData?.region || '' : '',
    transportation: isEditMode ? editScheduleData?.transportation || [] : [],
    companions: isEditMode ? editScheduleData?.companions || '' : '',
    accommodation: isEditMode ? editScheduleData?.accommodation || '' : '',
    representativeImage: isEditMode ? editScheduleData?.image || '' : '',
  });

  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [targetDay, setTargetDay] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(startDate || '');
  const [tempEndDate, setTempEndDate] = useState(endDate || '');

  const [dailyPlaces, setDailyPlaces] = useState(() => {
    if (isEditMode && editScheduleData?.places) {
      return editScheduleData.places;
    }
    return { 1: [] };
  });

  const [activeDays, setActiveDays] = useState(() => {
    if (isEditMode && editScheduleData?.totalDays) {
      return editScheduleData.totalDays;
    }
    return 1;
  });

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
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
        setFormData(prev => ({ ...prev, representativeImage: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setFormData(prev => ({ ...prev, representativeImage: '' }));
  };

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
          setFormData(prev => ({ ...prev, representativeImage: e.target.result }));
        };
        reader.readAsDataURL(file);
      } else {
        alert('이미지 파일만 업로드 가능합니다.');
      }
    }
  };

  const handleOptionToggle = (field, option) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(option)
        ? prev[field].filter(item => item !== option)
        : [...prev[field], option]
    }));
  };

  const addLocation = (day = 1) => {
    setTargetDay(day);
    setShowLocationSearch(true);
  };

  const getFilteredPlaces = () => {
    return recommendedPlaces.filter(place => {
      const matchesRegion = selectedRegion === '전체' || place.region === selectedRegion;
      const matchesCategory = selectedCategory === '전체' || place.category === selectedCategory;
      const matchesSearch = !searchQuery || place.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesCategory && matchesSearch;
    });
  };

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    setShowConfirmModal(true);
  };

  const handleExistingPlaceClick = (day, placeIndex) => {
    const updatedPlaces = { ...dailyPlaces };
    updatedPlaces[day] = updatedPlaces[day].filter((_, idx) => idx !== placeIndex);
    setDailyPlaces(updatedPlaces);
  };

  const confirmAddPlace = () => {
    if (selectedPlace && targetDay) {
      const newPlace = { ...selectedPlace, addedAt: Date.now() };
      setDailyPlaces(prev => ({
        ...prev,
        [targetDay]: [...(prev[targetDay] || []), newPlace]
      }));
      setShowConfirmModal(false);
      setShowLocationSearch(false);
      setSelectedPlace(null);
    }
  };

  const addDay = () => {
    setActiveDays(prev => prev + 1);
    setDailyPlaces(prev => ({ ...prev, [activeDays + 1]: [] }));
  };

  const removeDay = (day) => {
    if (day === 1) return;
    const newDailyPlaces = {};
    Object.keys(dailyPlaces).forEach(d => {
      const dayNum = parseInt(d);
      if (dayNum < day) {
        newDailyPlaces[dayNum] = dailyPlaces[dayNum];
      } else if (dayNum > day) {
        newDailyPlaces[dayNum - 1] = dailyPlaces[dayNum];
      }
    });
    setDailyPlaces(newDailyPlaces);
    setActiveDays(prev => prev - 1);
  };

  const calculateDistance = () => {
    const distance = (Math.random() * 20 + 1).toFixed(1);
    return { distance };
  };

  const handleDateClick = () => {
    setShowDatePicker(true);
  };

  const handleDateCancel = () => {
    setShowDatePicker(false);
    setTempStartDate(startDate || '');
    setTempEndDate(endDate || '');
  };

  const handleDateConfirm = () => {
    if (!tempStartDate || !tempEndDate) {
      alert('여행 시작일과 종료일을 모두 선택해주세요.');
      return;
    }
    const start = new Date(tempStartDate);
    const end = new Date(tempEndDate);
    if (start > end) {
      alert('종료일은 시작일보다 이후여야 합니다.');
      return;
    }
    window.location.href = `/direct-schedule-create?startDate=${tempStartDate}&endDate=${tempEndDate}`;
  };

  const handleSubmit = async () => {
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
    if (!isEditMode && !formData.representativeImage) {
      alert('대표 이미지를 최소 1개 이상 선택해주세요.');
      return;
    }

    const hasPlaces = Object.values(dailyPlaces).some(places => places.length > 0);
    if (!hasPlaces) {
      alert('여행 일정에 최소 1개 이상의 장소를 추가해주세요.');
      return;
    }

    let emptyDays = [];
    for (let day = 1; day <= activeDays; day++) {
      if (!dailyPlaces[day] || dailyPlaces[day].length === 0) {
        emptyDays.push(day);
      }
    }
    if (emptyDays.length > 0) {
      alert(`${emptyDays.join('일차, ')}일차에 장소를 추가해주세요.`);
      return;
    }

    try {
      const currentUser = getCurrentUser();
      const { data: maxIdData } = await supabase
        .from('Itinerary')
        .select('id')
        .order('id', { ascending: false })
        .limit(1);

      let nextId = 1;
      if (maxIdData && maxIdData.length > 0) {
        nextId = maxIdData[0].id + 1;
      }

      const newSchedule = {
        id: nextId,
        title: formData.title,
        region: formData.region,
        author: currentUser?.user?.name || '여행자',
        author_user_id: currentUser?.user?.id || null,
        date: `${startDate} ~ ${endDate}`,
        image: formData.representativeImage || Object.values(dailyPlaces).flat()[0]?.image || 'https://picsum.photos/300/200?random=1',
        description: formData.description,
        detailedDescription: JSON.stringify({
          transportation: formData.transportation,
          companions: formData.companions,
          accommodation: formData.accommodation,
          startDate: startDate,
          endDate: endDate,
          duration: `${activeDays}박 ${activeDays + 1}일`,
          places: dailyPlaces,
          totalDays: activeDays,
          authorProfile: currentUser?.user?.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'
        }),
        tags: [formData.region, ...formData.transportation],
        views: 0,
        likes: 0,
        "createdAt": new Date().toISOString()
      };

      if (isEditMode) {
        const updateSchedule = {
          ...newSchedule,
          id: editScheduleData.id,
          author: editScheduleData.author,
          author_user_id: editScheduleData.author_user_id,
          createdAt: editScheduleData.createdAt
        };

        const { error } = await supabase
          .from('Itinerary')
          .update(updateSchedule)
          .eq('id', editScheduleData.id);

        if (error) {
          alert(`일정 수정 중 오류가 발생했습니다: ${error.message}`);
          return;
        }
        alert('일정이 성공적으로 수정되었습니다!');
      } else {
        const { error } = await supabase
          .from('Itinerary')
          .insert([newSchedule]);

        if (error) {
          alert(`일정 등록 중 오류가 발생했습니다: ${error.message}`);
          return;
        }
        alert('일정이 성공적으로 등록되었습니다!');
      }

      navigate('/travel-schedules');
    } catch (error) {
      alert(`일정 등록 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  return (
    <DirectScheduleCreatePage>
      <Navigation />

      <CreateContainer>
        <PageHeader>
          <BackButton onClick={() => navigate(-1)}>←</BackButton>
          <PageTitle>여행 일정 등록</PageTitle>
          {startDate && endDate && (
            <DateInfo onClick={handleDateClick}>
              {startDate} ~ {endDate}
            </DateInfo>
          )}
        </PageHeader>

        <FormInputSection
          formData={formData}
          onInputChange={handleInputChange}
        />

        <ScheduleImageUploader
          image={formData.representativeImage}
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        />

        <TransportationSelector
          formData={formData}
          onInputChange={handleInputChange}
          onOptionToggle={handleOptionToggle}
        />

        <LocationsSection>
          <SectionTitle>방문 장소</SectionTitle>

          <DayPlacesList
            activeDays={activeDays}
            dailyPlaces={dailyPlaces}
            onAddLocation={addLocation}
            onRemoveDay={removeDay}
            onPlaceClick={handleExistingPlaceClick}
            calculateDistance={calculateDistance}
            startDate={startDate}
            endDate={endDate}
          />

          {(!startDate || !endDate) && (
            <AddDayButton onClick={addDay}>
              <AddDayIcon>+</AddDayIcon>
              {activeDays + 1}일차 추가
            </AddDayButton>
          )}
        </LocationsSection>

        <SubmitButton onClick={handleSubmit}>
          {isEditMode ? '일정 수정하기' : '일정 등록하기'}
        </SubmitButton>
      </CreateContainer>

      <PlaceSearchModal
        isOpen={showLocationSearch}
        onClose={() => setShowLocationSearch(false)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredPlaces={getFilteredPlaces()}
        onPlaceSelect={handlePlaceSelect}
      />

      <ConfirmModal
        isOpen={showConfirmModal && selectedPlace}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmAddPlace}
        title="장소 추가"
        message={
          <>
            <strong>{selectedPlace?.name}</strong>을(를)<br />
            일정에 추가하시겠습니까?
          </>
        }
        icon="📍"
        confirmText="추가"
        cancelText="취소"
      />

      <DateRangePicker
        isOpen={showDatePicker}
        onClose={handleDateCancel}
        tempStartDate={tempStartDate}
        tempEndDate={tempEndDate}
        onStartDateChange={setTempStartDate}
        onEndDateChange={setTempEndDate}
        onConfirm={handleDateConfirm}
      />
    </DirectScheduleCreatePage>
  );
};

const DirectScheduleCreatePage = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 50px;
`;

const CreateContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px;
`;

const PageHeader = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 30px;
  left: 30px;
  background: rgba(102, 126, 234, 0.1);
  border: 2px solid #667eea;
  border-radius: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #667eea;
  font-size: 24px;
  font-weight: bold;

  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const DateInfo = styled.div`
  text-align: center;
  font-size: 16px;
  color: #667eea;
  font-weight: 600;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.1);
  }
`;

const LocationsSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 25px 0;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
`;

const AddDayButton = styled.button`
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(40, 167, 69, 0.5);
  }
`;

const AddDayIcon = styled.span`
  font-size: 24px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export default DirectScheduleCreate;
