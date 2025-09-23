import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';

// Styled Components
const TravelScheduleEditPage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
`;

const EditContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const EditHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e9ecef;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 10px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PageSubtitle = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0;
`;

const EditForm = styled.form`
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
`;

const FormSection = styled.div`
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #e9ecef;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #495057;
`;

const FormInput = styled.input`
  padding: 12px 16px;
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

const FormTextarea = styled.textarea`
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  color: #495057;
  background: white;
  resize: vertical;
  min-height: 120px;
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageUploadArea = styled.div`
  border: 2px dashed #e9ecef;
  border-radius: 8px;
  padding: 30px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8f9fa;

  &:hover {
    border-color: #667eea;
    background: #f0f4ff;
  }
`;

const ImageUploadText = styled.p`
  color: #6c757d;
  margin: 0 0 5px 0;
  font-size: 16px;
`;

const ImageUploadHint = styled.p`
  color: #adb5bd;
  margin: 0;
  font-size: 12px;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #e9ecef;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 40px;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CancelButton = styled.button`
  background: white;
  color: #6c757d;
  border: 2px solid #e9ecef;
  padding: 15px 40px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #495057;
    border-color: #ced4da;
  }
`;

const NotFoundMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
  font-size: 18px;
`;

const TravelScheduleEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scheduleFound, setScheduleFound] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    region: '',
    startDate: '',
    endDate: '',
    description: '',
    image: '',
    author: ''
  });

  // 기존 여행일정 데이터 로드
  useEffect(() => {
    const loadScheduleData = () => {
      const storedSchedules = JSON.parse(localStorage.getItem('travelSchedules')) || [];
      const schedule = storedSchedules.find(s => s.id === parseInt(id));

      if (schedule) {
        // 날짜 분리
        const [startDate, endDate] = schedule.date.split('~');

        setFormData({
          title: schedule.title || '',
          region: schedule.region || '',
          startDate: startDate || '',
          endDate: endDate || '',
          description: schedule.description || schedule.detailedDescription || '',
          image: schedule.image || '',
          author: schedule.author || ''
        });
        setScheduleFound(true);
      } else {
        setScheduleFound(false);
      }
    };

    loadScheduleData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.region || !formData.startDate || !formData.endDate || !formData.description) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 기존 여행일정 업데이트
      const storedSchedules = JSON.parse(localStorage.getItem('travelSchedules')) || [];
      const scheduleIndex = storedSchedules.findIndex(s => s.id === parseInt(id));

      if (scheduleIndex !== -1) {
        // 기존 일정 유지하면서 수정된 필드만 업데이트
        storedSchedules[scheduleIndex] = {
          ...storedSchedules[scheduleIndex],
          title: formData.title,
          region: formData.region,
          date: `${formData.startDate}~${formData.endDate}`,
          description: formData.description,
          detailedDescription: formData.description,
          image: formData.image || storedSchedules[scheduleIndex].image,
          updatedAt: new Date().toISOString(),
          tags: ['여행', '일정', formData.region]
        };

        localStorage.setItem('travelSchedules', JSON.stringify(storedSchedules));

        setTimeout(() => {
          setIsSubmitting(false);
          alert('여행 일정이 성공적으로 수정되었습니다!');
          navigate('/profile/user');
        }, 1000);
      }
    } catch (error) {
      console.error('여행 일정 수정 실패:', error);
      alert('여행 일정 수정에 실패했습니다. 다시 시도해주세요.');
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/profile/user');
  };

  if (!scheduleFound) {
    return (
      <TravelScheduleEditPage>
        <Navigation />
        <EditContainer>
          <NotFoundMessage>
            수정할 여행일정을 찾을 수 없습니다.
            <br />
            <CancelButton onClick={() => navigate('/profile/user')} style={{ marginTop: '20px' }}>
              마이페이지로 돌아가기
            </CancelButton>
          </NotFoundMessage>
        </EditContainer>
      </TravelScheduleEditPage>
    );
  }

  return (
    <TravelScheduleEditPage>
      <Navigation />
      <EditContainer>
        <EditHeader>
          <PageTitle>여행 일정 수정</PageTitle>
          <PageSubtitle>여행 일정 정보를 수정해보세요</PageSubtitle>
        </EditHeader>

        <EditForm onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>기본 정보</SectionTitle>
            <FormRow>
              <FormGroup>
                <FormLabel>제목 *</FormLabel>
                <FormInput
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="여행 일정 제목을 입력하세요"
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>지역 *</FormLabel>
                <FormInput
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  placeholder="여행 지역을 입력하세요"
                  required
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <FormLabel>시작일 *</FormLabel>
                <FormInput
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>종료일 *</FormLabel>
                <FormInput
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </FormRow>
          </FormSection>

          <FormSection>
            <SectionTitle>여행 설명</SectionTitle>
            <FormGroup>
              <FormLabel>상세 설명 *</FormLabel>
              <FormTextarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="여행 일정에 대한 상세한 설명을 작성해주세요&#10;예: 방문 장소, 추천 포인트, 주의사항 등"
                required
              />
            </FormGroup>
          </FormSection>

          <FormSection>
            <SectionTitle>대표 이미지</SectionTitle>
            <FormGroup>
              <FormLabel>이미지 업로드</FormLabel>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <ImageUploadArea>
                  <ImageUploadText>
                    📷 클릭하여 이미지를 업로드하세요
                  </ImageUploadText>
                  <ImageUploadHint>
                    JPG, PNG 파일을 지원합니다 (최대 5MB)
                  </ImageUploadHint>
                </ImageUploadArea>
              </label>
              {formData.image && (
                <PreviewImage src={formData.image} alt="미리보기" />
              )}
            </FormGroup>
          </FormSection>

          <ButtonGroup>
            <CancelButton type="button" onClick={handleCancel}>
              취소
            </CancelButton>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '수정 중...' : '일정 수정'}
            </SubmitButton>
          </ButtonGroup>
        </EditForm>
      </EditContainer>
    </TravelScheduleEditPage>
  );
};

export default TravelScheduleEdit;