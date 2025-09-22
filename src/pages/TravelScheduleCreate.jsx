import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';

// Styled Components
const TravelScheduleCreatePage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
`;

const CreateContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const CreateHeader = styled.div`
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

const CreateForm = styled.form`
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
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #6c757d;
  }
`;

const FormSelect = styled.select`
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  color: #495057;
  background: white;
  transition: all 0.3s ease;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const ImageUploadArea = styled.div`
  border: 2px dashed #e9ecef;
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  background: #f8f9fa;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #667eea;
    background: #f0f4ff;
  }

  &.active {
    border-color: #667eea;
    background: #f0f4ff;
  }
`;

const ImageUploadText = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 10px 0;
`;

const ImageUploadHint = styled.p`
  font-size: 14px;
  color: #adb5bd;
  margin: 0;
`;

const PreviewImage = styled.img`
  width: 100%;
  max-width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-top: 15px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
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

const TravelScheduleCreate = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    region: '',
    startDate: '',
    endDate: '',
    description: '',
    image: '',
    author: ''
  });

  // 로그인된 사용자 정보 가져오기
  const getLoginData = () => {
    const localData = localStorage.getItem('loginData');
    const sessionData = sessionStorage.getItem('loginData');
    return localData ? JSON.parse(localData) : (sessionData ? JSON.parse(sessionData) : null);
  };

  const loginData = getLoginData();

  React.useEffect(() => {
    if (loginData && loginData.user.name) {
      setFormData(prev => ({ ...prev, author: loginData.user.name }));
    }
  }, []);

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
      // 새 여행 일정 생성
      const newSchedule = {
        id: Date.now(),
        title: formData.title,
        region: formData.region,
        date: `${formData.startDate}~${formData.endDate}`,
        description: formData.description,
        image: formData.image || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
        author: formData.author || '여행자'
      };

      // localStorage에 저장
      const existingSchedules = JSON.parse(localStorage.getItem('travelSchedules')) || [];
      existingSchedules.unshift(newSchedule); // 맨 앞에 추가
      localStorage.setItem('travelSchedules', JSON.stringify(existingSchedules));

      setTimeout(() => {
        alert('여행 일정이 성공적으로 등록되었습니다!');
        navigate('/travel-schedules');
      }, 1000);

    } catch (error) {
      console.error('여행 일정 등록 실패:', error);
      alert('여행 일정 등록에 실패했습니다. 다시 시도해주세요.');
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/travel-schedules');
  };

  return (
    <TravelScheduleCreatePage>
      <CreateContainer>
        <CreateHeader>
          <PageTitle>여행 일정 등록</PageTitle>
          <PageSubtitle>새로운 여행 일정을 등록하고 다른 사람들과 공유해보세요</PageSubtitle>
        </CreateHeader>

        <CreateForm onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>기본 정보</SectionTitle>
            <FormRow>
              <FormGroup>
                <FormLabel>여행 제목 *</FormLabel>
                <FormInput
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="여행 제목을 입력하세요"
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>여행 지역 *</FormLabel>
                <FormSelect
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">지역을 선택하세요</option>
                  <option value="서울">서울</option>
                  <option value="부산">부산</option>
                  <option value="제주도">제주도</option>
                  <option value="강원도">강원도</option>
                  <option value="경기도">경기도</option>
                  <option value="충청도">충청도</option>
                  <option value="전라도">전라도</option>
                  <option value="경상도">경상도</option>
                  <option value="해외">해외</option>
                </FormSelect>
              </FormGroup>
            </FormRow>
          </FormSection>

          <FormSection>
            <SectionTitle>여행 일정</SectionTitle>
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
              {isSubmitting ? '등록 중...' : '일정 등록'}
            </SubmitButton>
          </ButtonGroup>
        </CreateForm>
      </CreateContainer>
    </TravelScheduleCreatePage>
  );
};

export default TravelScheduleCreate;

