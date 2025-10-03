import React from 'react';
import styled from 'styled-components';

const CompanionFormFields = ({
  formData,
  errors,
  onInputChange,
  onTravelStyleChange
}) => {
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

  return (
    <>
      {/* 기본 정보 섹션 */}
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
            onChange={onInputChange}
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
              onChange={onInputChange}
              style={{ flex: 1 }}
              placeholder="출발일"
            />
            <Input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
          >
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </Select>
        </FormGroup>
      </FormSection>

      {/* 여행 상세 정보 섹션 */}
      <FormSection>
        <SectionTitle>여행 상세 정보</SectionTitle>

        <FormGroup>
          <Label>
            여행 소개 <Required>*</Required>
          </Label>
          <TextArea
            name="description"
            value={formData.description}
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
                  onChange={() => onTravelStyleChange(style)}
                />
                <CheckboxText>{style}</CheckboxText>
              </CheckboxItem>
            ))}
          </CheckboxGroup>
          {errors.travelStyle && <ErrorMessage>{errors.travelStyle}</ErrorMessage>}
        </FormGroup>
      </FormSection>

      {/* 추가 안내사항 섹션 */}
      <FormSection>
        <SectionTitle>추가 안내사항</SectionTitle>

        <FormGroup>
          <Label>특별 안내사항</Label>
          <TextArea
            name="notice"
            value={formData.notice}
            onChange={onInputChange}
            placeholder="동행자에게 전달하고 싶은 특별한 안내사항이 있다면 입력해주세요"
          />
        </FormGroup>
      </FormSection>
    </>
  );
};

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

export default CompanionFormFields;
