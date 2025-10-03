import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import { supabase } from '../supabaseClient';
import CompanionFormFields from '../components/companion/CompanionFormFields';
import CompanionImageUploader from '../components/companion/CompanionImageUploader';
import ConfirmModal from '../components/common/ConfirmModal';
import { useCompanionForm } from '../hooks/useCompanionForm';

const CompanionCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 수정 모드 확인
  const isEditMode = location.state?.isEdit || false;
  const editPostData = location.state?.postData || null;

  const {
    formData,
    setFormData,
    imagePreview,
    setImagePreview,
    errors,
    handleInputChange,
    handleTravelStyleChange,
    handleImageUpload,
    removeImage,
    validateForm
  } = useCompanionForm(null, isEditMode);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (isEditMode && editPostData) {
      const dates = editPostData.date ? editPostData.date.split('~') : ['', ''];

      setFormData({
        title: editPostData.title || '',
        startDate: dates[0]?.trim() || '',
        endDate: dates[1]?.trim() || '',
        ageGroup: editPostData.agegroup || '20대',
        maxParticipants: editPostData.participants?.max || 2,
        region: editPostData.region || '서울',
        description: editPostData.description || '',
        meetingPoint: editPostData.meetingpoint || '',
        estimatedCost: editPostData.estimatedcost || '',
        travelStyle: editPostData.travelstyle || [],
        images: [],
        notice: editPostData.notice || ''
      });

      // 기존 이미지 미리보기 설정
      if (editPostData.images && editPostData.images.length > 0) {
        setImagePreview(editPostData.images);
      } else if (editPostData.image) {
        setImagePreview([editPostData.image]);
      }
    }
  }, [isEditMode, editPostData, setFormData, setImagePreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // 로그인된 사용자 정보 가져오기
      const getLoginData = () => {
        const localData = localStorage.getItem('loginData');
        const sessionData = sessionStorage.getItem('loginData');
        return localData ? JSON.parse(localData) : (sessionData ? JSON.parse(sessionData) : null);
      };

      const loginData = getLoginData();

      // 여러 이미지 업로드 처리
      let uploadedImageUrls = [];
      const defaultImage = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop";

      // 수정 모드일 때 기존 이미지 유지
      if (isEditMode && editPostData) {
        if (editPostData.images && editPostData.images.length > 0) {
          uploadedImageUrls = [...editPostData.images];
        } else if (editPostData.image) {
          uploadedImageUrls = [editPostData.image];
        }
      }

      // 새로 추가된 이미지가 있을 경우에만 업로드
      if (formData.images.length > 0) {
        // 모든 이미지를 순차적으로 업로드
        for (let i = 0; i < formData.images.length; i++) {
          const imageFile = formData.images[i];
          const fileExt = imageFile.name.split('.').pop();
          const fileName = `${Date.now()}_${i}_${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `companion-images/${fileName}`;

          try {
            // Supabase Storage에 업로드
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('trip_images')
              .upload(filePath, imageFile);

            if (uploadError) {
              console.error(`이미지 ${i + 1} 업로드 오류:`, uploadError);
              continue; // 실패한 이미지는 건너뛰기
            }

            // 업로드된 이미지의 공개 URL 가져오기
            const { data: { publicUrl } } = supabase.storage
              .from('trip_images')
              .getPublicUrl(filePath);

            uploadedImageUrls.push(publicUrl);
          } catch (err) {
            console.error(`이미지 ${i + 1} 업로드 중 오류:`, err);
          }
        }
      }

      // 업로드된 이미지가 없으면 기본 이미지 사용
      if (uploadedImageUrls.length === 0) {
        uploadedImageUrls.push(defaultImage);
      }

      // 작성자 정보 구성
      const authorInfo = {
        user_id: loginData?.user?.id || null,
        name: loginData?.user?.name || "익명사용자",
        profileImage: loginData?.user?.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
        age: loginData?.user?.age || null,
        location: loginData?.user?.location || null
      };

      // Supabase에 저장할 데이터 구성
      const postData = {
        title: formData.title,
        agegroup: formData.ageGroup,
        region: formData.region,
        date: `${formData.startDate}~${formData.endDate}`,
        description: formData.description,
        participants: isEditMode ? editPostData.participants : { current: 1, max: formData.maxParticipants },
        image: uploadedImageUrls[0], // 첫 번째 이미지 (호환성)
        images: uploadedImageUrls, // 모든 이미지 배열
        author: isEditMode ? editPostData.author : authorInfo,
        meetingpoint: formData.meetingPoint,
        estimatedcost: formData.estimatedCost,
        travelstyle: formData.travelStyle,
        notice: formData.notice
      };

      let data, error;

      if (isEditMode) {
        // 수정 모드: UPDATE
        const result = await supabase
          .from('CompanionList')
          .update(postData)
          .eq('id', editPostData.id)
          .select();

        data = result.data;
        error = result.error;

        if (error) {
          console.error('Supabase 수정 오류:', error);
          alert('동행모집 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
          setIsSubmitting(false);
          return;
        }
        console.log('수정 성공:', data);
      } else {
        // 등록 모드: INSERT
        const result = await supabase
          .from('CompanionList')
          .insert([postData])
          .select();

        data = result.data;
        error = result.error;

        if (error) {
          console.error('Supabase 저장 오류:', error);
          alert('동행모집 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
          setIsSubmitting(false);
          return;
        }
        console.log('등록 성공:', data);
      }

      // 등록 완료 모달 표시
      setIsSubmitting(false);
      setShowSubmitModal(true);
    } catch (err) {
      console.error('등록 오류:', err);
      alert('동행모집 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    // UserProfile에서 온 경우 profile/user로, 그렇지 않으면 companion-list로 이동
    const returnPath = location.state?.from || '/companion-list';
    navigate(returnPath);
  };

  const confirmSubmit = () => {
    setShowSubmitModal(false);
    // UserProfile에서 온 경우 profile/user로, 그렇지 않으면 companion-list로 이동
    const returnPath = location.state?.from || '/companion-list';
    navigate(returnPath);
  };

  return (
    <CompanionCreatePage>
      <Navigation />

      <CompanionCreateContainer>
        <PageHeader>
          <PageTitle>동행모집 글 작성</PageTitle>
        </PageHeader>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            <CompanionFormFields
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
              onTravelStyleChange={handleTravelStyleChange}
            />

            <CompanionImageUploader
              imagePreview={imagePreview}
              onImageUpload={handleImageUpload}
              onRemoveImage={removeImage}
              error={errors.images}
              isRequired={true}
            />

            <ButtonGroup>
              <Button type="button" onClick={handleCancel}>
                취소
              </Button>
              <Button type="submit" $primary disabled={isSubmitting}>
                {isSubmitting ? '등록 중...' : '등록하기'}
              </Button>
            </ButtonGroup>
          </form>
        </FormContainer>
      </CompanionCreateContainer>

      {/* 취소 확인 모달 */}
      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={confirmCancel}
        title="작성을 취소하시겠습니까?"
        message="작성 중인 내용이 모두 사라집니다."
        icon="⚠️"
        confirmText="취소하기"
        cancelText="계속 작성"
      />

      {/* 등록 완료 모달 */}
      <ConfirmModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onConfirm={confirmSubmit}
        title="등록이 완료되었습니다!"
        message="동행모집 글이 성공적으로 등록되었습니다."
        confirmText="확인"
        showCancel={false}
      />
    </CompanionCreatePage>
  );
};

const CompanionCreatePage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
`;

const CompanionCreateContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

const FormContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 2px solid #f8f9fa;
`;

const Button = styled.button`
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  min-width: 120px;

  ${props => props.$primary ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
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

export default CompanionCreate;
