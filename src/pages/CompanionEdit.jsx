import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';

// Styled Components - CompanionCreate와 동일한 스타일 재사용
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

const DateInputGroup = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const NotFoundMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
  font-size: 18px;
`;

const CompanionEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
    notice: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postFound, setPostFound] = useState(false);

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

  // 기존 게시물 데이터 로드
  useEffect(() => {
    const loadPostData = () => {
      const storedPosts = JSON.parse(localStorage.getItem('companionPosts')) || [];
      const post = storedPosts.find(p => p.id === parseInt(id));

      if (post) {
        // 날짜 분리
        const [startDate, endDate] = post.date.split(' ~ ');

        setFormData({
          title: post.title || '',
          startDate: startDate || '',
          endDate: endDate || '',
          ageGroup: post.ageGroup || '20대',
          maxParticipants: post.participants?.max || 2,
          region: post.region || '서울',
          description: post.description || '',
          meetingPoint: post.meetingPoint || '',
          estimatedCost: post.estimatedCost || '',
          travelStyle: post.travelStyle || [],
          notice: post.notice || ''
        });
        setPostFound(true);
      } else {
        setPostFound(false);
      }
    };

    loadPostData();
  }, [id]);

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

    try {
      // 기존 게시물 업데이트
      const storedPosts = JSON.parse(localStorage.getItem('companionPosts')) || [];
      const postIndex = storedPosts.findIndex(p => p.id === parseInt(id));

      if (postIndex !== -1) {
        // 기존 게시물 유지하면서 수정된 필드만 업데이트
        storedPosts[postIndex] = {
          ...storedPosts[postIndex],
          title: formData.title,
          ageGroup: formData.ageGroup,
          region: formData.region,
          date: `${formData.startDate} ~ ${formData.endDate}`,
          description: formData.description,
          participants: { ...storedPosts[postIndex].participants, max: formData.maxParticipants },
          meetingPoint: formData.meetingPoint,
          estimatedCost: formData.estimatedCost,
          travelStyle: formData.travelStyle,
          notice: formData.notice,
          updatedAt: new Date().toISOString()
        };

        localStorage.setItem('companionPosts', JSON.stringify(storedPosts));

        setTimeout(() => {
          setIsSubmitting(false);
          alert('동행모집이 성공적으로 수정되었습니다!');
          navigate('/profile/user');
        }, 1000);
      }
    } catch (error) {
      console.error('수정 중 오류가 발생했습니다:', error);
      alert('수정에 실패했습니다. 다시 시도해주세요.');
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/profile/user');
  };

  if (!postFound) {
    return (
      <CompanionEditPage>
        <Navigation />
        <CompanionEditContainer>
          <NotFoundMessage>
            수정할 게시물을 찾을 수 없습니다.
            <br />
            <Button onClick={() => navigate('/profile/user')} style={{ marginTop: '20px' }}>
              마이페이지로 돌아가기
            </Button>
          </NotFoundMessage>
        </CompanionEditContainer>
      </CompanionEditPage>
    );
  }

  return (
    <CompanionEditPage>
      <Navigation />

      <CompanionEditContainer>
        <PageHeader>
          <PageTitle>동행모집 수정</PageTitle>
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
                <DateInputGroup>
                  <Input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    style={{ flex: 1 }}
                    placeholder="출발일"
                  />
                  <Input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    style={{ flex: 1 }}
                    placeholder="도착일"
                  />
                </DateInputGroup>
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
                {isSubmitting ? '수정 중...' : '수정하기'}
              </Button>
            </ButtonGroup>
          </form>
        </FormContainer>
      </CompanionEditContainer>
    </CompanionEditPage>
  );
};

export default CompanionEdit;