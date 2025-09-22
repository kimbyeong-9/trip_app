import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';

// Styled Components - 기존 CSS와 동일한 스타일
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
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e9ecef;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6c757d;
  cursor: pointer;
  margin-right: 15px;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #333;
  }
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

const FormSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #f8f9fa;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 8px;
`;

const Required = styled.span`
  color: #dc3545;
  margin-left: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  color: #495057;
  background: white;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #6c757d;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  color: #495057;
  background: white;
  transition: all 0.3s ease;
  box-sizing: border-box;
  min-height: 120px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #6c757d;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  color: #495057;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 10px;
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
  }
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #667eea;
`;

const CheckboxText = styled.span`
  font-size: 14px;
  color: #495057;
`;

const ImageUploadArea = styled.div`
  border: 2px dashed #e9ecef;
  border-radius: 8px;
  padding: 40px 20px;
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
  margin: 0 0 10px 0;
  font-size: 16px;
`;

const ImageUploadSubtext = styled.p`
  color: #adb5bd;
  margin: 0;
  font-size: 14px;
`;

const ImagePreview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

const ImagePreviewItem = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(220, 53, 69, 1);
    transform: scale(1.1);
  }
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

  ${props => props.primary ? `
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

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
`;

const Modal = styled.div`
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

const CompanionCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    ageGroup: '20대',
    maxParticipants: 2,
    region: '서울',
    description: '',
    meetingPoint: '',
    estimatedCost: '',
    travelStyle: [],
    images: [],
    contactMethod: 'profile',
    contactInfo: '',
    notice: ''
  });

  const [imagePreview, setImagePreview] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const travelStyles = [
    '느긋한 여행', '계획적인 여행', '즉흥적인 여행',
    '맛집 투어', '문화 체험', '자연 탐방',
    '쇼핑', '힐링', '액티비티'
  ];

  const regions = [
    '서울', '경기', '인천', '강원', '충청',
    '전라', '경상', '제주', '부산'
  ];

  const ageGroups = ['20대', '30대', '40대', '50대+'];

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // 실제로는 API 호출
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSubmitModal(true);
    }, 2000);
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    navigate('/companion');
  };

  const confirmSubmit = () => {
    setShowSubmitModal(false);
    navigate('/companion');
  };

  return (
    <CompanionCreatePage>
      <Navigation />
      
      <CompanionCreateContainer>
        <PageHeader>
          <BackButton onClick={() => navigate('/companion')}>
            ←
          </BackButton>
          <PageTitle>동행모집 글 작성</PageTitle>
        </PageHeader>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            <FormSection>
              <SectionTitle>기본 정보</SectionTitle>
              
              <FormGroup>
                <Label>
                  제목 <Required>*</Required>
                </Label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="여행 제목을 입력해주세요"
                />
                {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>
                  여행 기간 <Required>*</Required>
                </Label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    style={{ flex: 1 }}
                  />
                  <Input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    style={{ flex: 1 }}
                  />
                </div>
                {errors.startDate && <ErrorMessage>{errors.startDate}</ErrorMessage>}
                {errors.endDate && <ErrorMessage>{errors.endDate}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>
                  연령대 <Required>*</Required>
                </Label>
                <Select
                  name="ageGroup"
                  value={formData.ageGroup}
                  onChange={handleInputChange}
                >
                  {ageGroups.map(age => (
                    <option key={age} value={age}>{age}</option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>
                  모집 인원 <Required>*</Required>
                </Label>
                <Select
                  name="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={handleInputChange}
                >
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num}명</option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>
                  여행 지역 <Required>*</Required>
                </Label>
                <Select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                >
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </Select>
              </FormGroup>
            </FormSection>

            <FormSection>
              <SectionTitle>여행 상세 정보</SectionTitle>
              
              <FormGroup>
                <Label>
                  여행 소개 <Required>*</Required>
                </Label>
                <TextArea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="여행 계획과 함께하고 싶은 이유를 자세히 설명해주세요"
                />
                {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>
                  만남 장소 <Required>*</Required>
                </Label>
                <Input
                  type="text"
                  name="meetingPoint"
                  value={formData.meetingPoint}
                  onChange={handleInputChange}
                  placeholder="예: 서울역 1번 출구"
                />
                {errors.meetingPoint && <ErrorMessage>{errors.meetingPoint}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>
                  예상 비용 <Required>*</Required>
                </Label>
                <Input
                  type="text"
                  name="estimatedCost"
                  value={formData.estimatedCost}
                  onChange={handleInputChange}
                  placeholder="예: 1인당 10만원 (숙박, 식사 포함)"
                />
                {errors.estimatedCost && <ErrorMessage>{errors.estimatedCost}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>
                  여행 스타일 <Required>*</Required>
                </Label>
                <CheckboxGroup>
                  {travelStyles.map(style => (
                    <CheckboxItem key={style}>
                      <Checkbox
                        type="checkbox"
                        checked={formData.travelStyle.includes(style)}
                        onChange={() => handleTravelStyleChange(style)}
                      />
                      <CheckboxText>{style}</CheckboxText>
                    </CheckboxItem>
                  ))}
                </CheckboxGroup>
                {errors.travelStyle && <ErrorMessage>{errors.travelStyle}</ErrorMessage>}
              </FormGroup>
            </FormSection>

            <FormSection>
              <SectionTitle>사진 업로드</SectionTitle>
              
              <FormGroup>
                <ImageUploadArea onClick={() => document.getElementById('imageUpload').click()}>
                  <ImageUploadText>📷 사진을 업로드해주세요</ImageUploadText>
                  <ImageUploadSubtext>최대 10장까지 업로드 가능합니다</ImageUploadSubtext>
                </ImageUploadArea>
                <input
                  id="imageUpload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                
                {imagePreview.length > 0 && (
                  <ImagePreview>
                    {imagePreview.map((url, index) => (
                      <ImagePreviewItem key={index}>
                        <PreviewImage src={url} alt={`Preview ${index + 1}`} />
                        <RemoveButton onClick={() => removeImage(index)}>
                          ×
                        </RemoveButton>
                      </ImagePreviewItem>
                    ))}
                  </ImagePreview>
                )}
              </FormGroup>
            </FormSection>

            <FormSection>
              <SectionTitle>연락처 정보</SectionTitle>
              
              <FormGroup>
                <Label>연락 방법</Label>
                <Select
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleInputChange}
                >
                  <option value="profile">프로필 메시지</option>
                  <option value="kakao">카카오톡</option>
                  <option value="phone">전화번호</option>
                  <option value="email">이메일</option>
                </Select>
              </FormGroup>

              {formData.contactMethod !== 'profile' && (
                <FormGroup>
                  <Label>연락처 정보</Label>
                  <Input
                    type="text"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleInputChange}
                    placeholder="연락처를 입력해주세요"
                  />
                </FormGroup>
              )}
            </FormSection>

            <FormSection>
              <SectionTitle>추가 안내사항</SectionTitle>
              
              <FormGroup>
                <Label>특별 안내사항</Label>
                <TextArea
                  name="notice"
                  value={formData.notice}
                  onChange={handleInputChange}
                  placeholder="동행자에게 전달하고 싶은 특별한 안내사항이 있다면 입력해주세요"
                />
              </FormGroup>
            </FormSection>

            <ButtonGroup>
              <Button type="button" onClick={handleCancel}>
                취소
              </Button>
              <Button type="submit" primary disabled={isSubmitting}>
                {isSubmitting ? '등록 중...' : '등록하기'}
              </Button>
            </ButtonGroup>
          </form>
        </FormContainer>
      </CompanionCreateContainer>

      {/* 취소 확인 모달 */}
      {showCancelModal && (
        <Modal onClick={() => setShowCancelModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalIcon>⚠️</ModalIcon>
            <ModalTitle>작성을 취소하시겠습니까?</ModalTitle>
            <ModalMessage>작성 중인 내용이 모두 사라집니다.</ModalMessage>
            <ModalButtons>
              <ModalButton onClick={() => setShowCancelModal(false)}>계속 작성</ModalButton>
              <ModalButton primary onClick={confirmCancel}>취소하기</ModalButton>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}

      {/* 등록 완료 모달 */}
      {showSubmitModal && (
        <Modal onClick={() => setShowSubmitModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalIcon>✅</ModalIcon>
            <ModalTitle>등록이 완료되었습니다!</ModalTitle>
            <ModalMessage>동행모집 글이 성공적으로 등록되었습니다.</ModalMessage>
            <ModalButtons>
              <ModalButton primary onClick={confirmSubmit}>확인</ModalButton>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </CompanionCreatePage>
  );
};

export default CompanionCreate;