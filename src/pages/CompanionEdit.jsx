import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import CompanionFormFields from '../components/companion/CompanionFormFields';
import CompanionImageUploader from '../components/companion/CompanionImageUploader';
import ConfirmModal from '../components/common/ConfirmModal';
import { useCompanionForm } from '../hooks/useCompanionForm';

const CompanionEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
  } = useCompanionForm(null, true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // 기존 데이터 로드
  useEffect(() => {
    const loadCompanionData = () => {
      try {
        const savedPosts = JSON.parse(localStorage.getItem('companionPosts') || '[]');
        const postToEdit = savedPosts.find(post => post.id === parseInt(id));

        if (postToEdit) {
          // date 필드에서 시작일과 종료일 분리
          const [startDate, endDate] = postToEdit.date ? postToEdit.date.split(' ~ ') : ['', ''];

          setFormData({
            title: postToEdit.title || '',
            startDate: startDate || '',
            endDate: endDate || '',
            ageGroup: postToEdit.ageGroup || '20대',
            maxParticipants: postToEdit.participants?.max || 2,
            region: postToEdit.region || '서울',
            description: postToEdit.description || '',
            meetingPoint: postToEdit.meetingPoint || '',
            estimatedCost: postToEdit.estimatedCost || '',
            travelStyle: postToEdit.travelStyle || [],
            images: [],
            notice: postToEdit.notice || ''
          });

          // 기존 이미지가 있다면 미리보기에 추가
          if (postToEdit.image) {
            setImagePreview([postToEdit.image]);
          }
        }
      } catch (error) {
        console.error('동행모집 데이터 로드 실패:', error);
      }
    };

    if (id) {
      loadCompanionData();
    }
  }, [id, setFormData, setImagePreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // 로그인된 사용자 정보 가져오기
    const getLoginData = () => {
      const localData = localStorage.getItem('loginData');
      const sessionData = sessionStorage.getItem('loginData');
      return localData ? JSON.parse(localData) : (sessionData ? JSON.parse(sessionData) : null);
    };

    const loginData = getLoginData();

    try {
      // 기존 게시물 목록 가져오기
      const existingPosts = JSON.parse(localStorage.getItem('companionPosts') || '[]');

      // 수정된 게시물 데이터 생성
      const updatedPost = {
        id: parseInt(id),
        title: formData.title,
        ageGroup: formData.ageGroup,
        region: formData.region,
        date: `${formData.startDate} ~ ${formData.endDate}`,
        description: formData.description,
        participants: { current: 1, max: formData.maxParticipants },
        image: imagePreview[0] || "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        author: loginData?.user?.name || "익명사용자",
        meetingPoint: formData.meetingPoint,
        estimatedCost: formData.estimatedCost,
        travelStyle: formData.travelStyle,
        notice: formData.notice,
        updatedAt: new Date().toISOString()
      };

      // 기존 게시물 업데이트
      const updatedPosts = existingPosts.map(post =>
        post.id === parseInt(id) ? updatedPost : post
      );

      localStorage.setItem('companionPosts', JSON.stringify(updatedPosts));

      setTimeout(() => {
        setIsSubmitting(false);
        setShowSubmitModal(true);
      }, 2000);
    } catch (error) {
      console.error('동행모집 수정 오류:', error);
      alert('수정 중 오류가 발생했습니다. 다시 시도해주세요.');
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    navigate(-1);
  };

  const confirmSubmit = () => {
    setShowSubmitModal(false);
    navigate(-1);
  };

  return (
    <CompanionEditPage>
      <Navigation />

      <CompanionEditContainer>
        <PageHeader>
          <PageTitle>동행모집 글 수정</PageTitle>
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
              isRequired={false}
            />

            <ButtonGroup>
              <Button type="button" onClick={handleCancel}>
                취소
              </Button>
              <Button type="submit" $primary disabled={isSubmitting}>
                {isSubmitting ? '수정 중...' : '수정하기'}
              </Button>
            </ButtonGroup>
          </form>
        </FormContainer>
      </CompanionEditContainer>

      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={confirmCancel}
        title="수정을 취소하시겠습니까?"
        message="수정 중인 내용이 모두 사라집니다."
        icon="⚠️"
        confirmText="취소하기"
        cancelText="계속 수정"
      />

      <ConfirmModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onConfirm={confirmSubmit}
        title="수정이 완료되었습니다!"
        message="동행모집 글이 성공적으로 수정되었습니다."
        confirmText="확인"
        showCancel={false}
      />
    </CompanionEditPage>
  );
};

const CompanionEditPage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
`;

const CompanionEditContainer = styled.div`
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

export default CompanionEdit;
