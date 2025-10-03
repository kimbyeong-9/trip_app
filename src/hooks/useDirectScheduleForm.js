import { useState, useEffect } from 'react';

export const useDirectScheduleForm = (initialData = {}, isEditMode = false, aiData = {}) => {
  const {
    isAIGenerated = false,
    aiRegion = '',
    aiRestaurantCount = 0,
    aiCafeCount = 0,
    aiActivities = [],
    aiCompanion = '',
    startDate = '',
    endDate = ''
  } = aiData;

  // 지역명을 한글로 변환하는 함수
  const getRegionName = (regionId) => {
    const regionMap = {
      'seoul': '서울',
      'busan': '부산',
      'jeju': '제주',
      'gangwon': '강원',
      'gyeonggi': '경기',
      'incheon': '인천',
      'chungcheong': '충청',
      'jeolla': '전라',
      'gyeongsang': '경상'
    };
    return regionMap[regionId] || regionId;
  };

  // AI 기반 제목 생성 함수
  const generateAITitle = () => {
    if (!isAIGenerated) return '';
    const regionName = getRegionName(aiRegion);
    const activityText = aiActivities.length > 0 ? ` ${aiActivities[0]} 중심` : '';
    return `${regionName}${activityText} 여행`;
  };

  // AI 기반 상세 설명 생성 함수
  const generateAIDescription = () => {
    if (!isAIGenerated) return '';
    return `AI가 추천하는 맞춤형 여행 일정입니다. 여러분의 취향과 선호도를 바탕으로 신중히 선별한 여행 계획으로, 각 장소와 활동들이 조화롭게 연결되어 잊지 못할 여행 경험을 선사할 것입니다.`;
  };

  // 폼 상태
  const [formData, setFormData] = useState({
    title: isEditMode ? initialData?.title || '' : generateAITitle(),
    description: isEditMode ? initialData?.description || '' : generateAIDescription(),
    region: isEditMode ? initialData?.region || '' : (isAIGenerated ? getRegionName(aiRegion) : ''),
    transportation: isEditMode ? initialData?.transportation || [] : [],
    companions: isEditMode ? initialData?.companions || '' : (isAIGenerated && aiCompanion ? aiCompanion : ''),
    accommodation: isEditMode ? initialData?.accommodation || '' : '',
    representativeImage: isEditMode ? initialData?.image || '' : '',
  });

  // 장소 관리
  const [dailyPlaces, setDailyPlaces] = useState(() => {
    if (isEditMode && initialData?.places) {
      return initialData.places;
    }
    return { 1: [] };
  });

  const [activeDays, setActiveDays] = useState(() => {
    if (isEditMode && initialData?.totalDays) {
      return initialData.totalDays;
    }
    return 1;
  });

  // 입력 변경 핸들러
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 옵션 토글 (복수 선택)
  const handleOptionToggle = (field, option) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(option)
        ? prev[field].filter(item => item !== option)
        : [...prev[field], option]
    }));
  };

  // 이미지 업로드 핸들러
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

  const handleImageRemove = () => {
    setFormData(prev => ({
      ...prev,
      representativeImage: ''
    }));
  };

  // 드래그 앤 드롭 핸들러
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

  // 장소 추가
  const addPlace = (day, place) => {
    setDailyPlaces(prev => ({
      ...prev,
      [day]: [
        ...(prev[day] || []),
        { ...place, addedAt: Date.now() }
      ]
    }));
  };

  // 장소 제거
  const removePlace = (day, index) => {
    setDailyPlaces(prev => ({
      ...prev,
      [day]: prev[day].filter((_, idx) => idx !== index)
    }));
  };

  // 일차 추가
  const addDay = () => {
    setActiveDays(prev => prev + 1);
    setDailyPlaces(prev => ({
      ...prev,
      [activeDays + 1]: []
    }));
  };

  // 일차 제거
  const removeDay = (day) => {
    if (day === 1) return; // 1일차는 삭제 불가

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

  // 거리 계산
  const calculateDistance = (place1, place2) => {
    const distance = (Math.random() * 20 + 1).toFixed(1);
    return { distance };
  };

  // 폼 유효성 검증
  const validateForm = () => {
    if (!formData.title.trim()) {
      alert('여행 제목을 입력해주세요.');
      return false;
    }

    if (!formData.description.trim()) {
      alert('여행 설명을 입력해주세요.');
      return false;
    }

    if (!formData.region) {
      alert('여행 지역을 선택해주세요.');
      return false;
    }

    if (formData.transportation.length === 0) {
      alert('교통수단을 최소 1개 이상 선택해주세요.');
      return false;
    }

    if (!formData.accommodation.trim()) {
      alert('숙박 정보를 입력해주세요.');
      return false;
    }

    if (!formData.companions.trim()) {
      alert('동행인 정보를 입력해주세요.');
      return false;
    }

    if (!isEditMode && !formData.representativeImage) {
      alert('대표 이미지를 최소 1개 이상 선택해주세요.');
      return false;
    }

    const hasPlaces = Object.values(dailyPlaces).some(places => places.length > 0);
    if (!hasPlaces) {
      alert('여행 일정에 최소 1개 이상의 장소를 추가해주세요.');
      return false;
    }

    let emptyDays = [];
    for (let day = 1; day <= activeDays; day++) {
      if (!dailyPlaces[day] || dailyPlaces[day].length === 0) {
        emptyDays.push(day);
      }
    }

    if (emptyDays.length > 0) {
      alert(`${emptyDays.join('일차, ')}일차에 장소를 추가해주세요.`);
      return false;
    }

    return true;
  };

  return {
    formData,
    setFormData,
    dailyPlaces,
    setDailyPlaces,
    activeDays,
    setActiveDays,
    handleInputChange,
    handleOptionToggle,
    handleImageUpload,
    handleImageRemove,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    addPlace,
    removePlace,
    addDay,
    removeDay,
    calculateDistance,
    validateForm
  };
};
