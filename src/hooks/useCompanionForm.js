import { useState } from 'react';

export const useCompanionForm = (initialData = null, isEditMode = false) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    ageGroup: initialData?.ageGroup || '20대',
    maxParticipants: initialData?.maxParticipants || 2,
    region: initialData?.region || '서울',
    description: initialData?.description || '',
    meetingPoint: initialData?.meetingPoint || '',
    estimatedCost: initialData?.estimatedCost || '',
    travelStyle: initialData?.travelStyle || [],
    images: [],
    notice: initialData?.notice || ''
  });

  const [imagePreview, setImagePreview] = useState(initialData?.imagePreview || []);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 에러 메시지 제거
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTravelStyleChange = (style) => {
    setFormData(prev => ({
      ...prev,
      travelStyle: prev.travelStyle.includes(style)
        ? prev.travelStyle.filter(s => s !== style)
        : [...prev.travelStyle, style]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));

    setImagePreview(prev => [...prev, ...newImages]);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    setImagePreview(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = '제목을 입력해주세요.';
    if (!formData.startDate) newErrors.startDate = '출발일을 선택해주세요.';
    if (!formData.endDate) newErrors.endDate = '도착일을 선택해주세요.';
    if (!formData.description.trim()) newErrors.description = '여행 소개를 입력해주세요.';
    if (!formData.meetingPoint.trim()) newErrors.meetingPoint = '만남 장소를 입력해주세요.';
    if (!formData.estimatedCost.trim()) newErrors.estimatedCost = '예상 비용을 입력해주세요.';
    if (formData.travelStyle.length === 0) newErrors.travelStyle = '여행 스타일을 선택해주세요.';

    // 이미지 필수 검사 (수정 모드가 아닐 때 또는 새 이미지 추가 없이 기존 이미지도 없을 때)
    if (!isEditMode && formData.images.length === 0) {
      newErrors.images = '이미지를 최소 1개 이상 선택해주세요.';
    } else if (isEditMode && formData.images.length === 0 && imagePreview.length === 0) {
      newErrors.images = '이미지를 최소 1개 이상 선택해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    setFormData,
    imagePreview,
    setImagePreview,
    errors,
    setErrors,
    handleInputChange,
    handleTravelStyleChange,
    handleImageUpload,
    removeImage,
    validateForm
  };
};
