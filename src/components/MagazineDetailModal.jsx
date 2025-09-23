import React from 'react';
import styled from 'styled-components';

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled.div`
  background: white;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: modalSlideIn 0.3s ease-out;

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 768px) {
    margin: 20px;
    max-height: 95vh;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  color: #666;
  z-index: 10;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 1);
    color: #333;
    transform: scale(1.1);
  }
`;

const ModalContent = styled.div`
  overflow-y: auto;
  max-height: 90vh;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const BlogHeader = styled.div`
  padding: 40px 40px 20px;
  text-align: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);

  @media (max-width: 768px) {
    padding: 30px 20px 15px;
  }
`;

const BlogCategory = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const BlogTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: '${props => props.icon}';
    font-size: 16px;
  }
`;

const BlogContent = styled.div`
  padding: 0 40px 40px;

  @media (max-width: 768px) {
    padding: 0 20px 30px;
  }
`;

const ComingSoonSection = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  margin: 20px 0;
  border: 2px dashed #ced4da;
`;

const ComingSoonIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const ComingSoonTitle = styled.h3`
  font-size: 24px;
  color: #495057;
  margin: 0 0 15px 0;
  font-weight: 600;
`;

const ComingSoonText = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 10px 0;
  line-height: 1.6;
`;

const ComingSoonSubtext = styled.p`
  font-size: 14px;
  color: #adb5bd;
  margin: 0;
  font-style: italic;
`;

const BlogSection = styled.section`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #e9ecef;
`;

const BlogText = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: #495057;
  margin: 0 0 15px 0;
`;

const TagSection = styled.div`
  padding: 20px 40px;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const TagTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #6c757d;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  background: #e9ecef;
  color: #495057;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: #667eea;
    color: white;
  }
`;

const MagazineDetailModal = ({ magazine, onClose }) => {
  if (!magazine) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          ✕
        </CloseButton>

        <ModalContent>
          <HeroImage src={magazine.image} alt={magazine.title} />

          <BlogHeader>
            <BlogTitle>{magazine.title}</BlogTitle>
            <BlogMeta>
              <MetaItem icon="👤">
                by {magazine.author}
              </MetaItem>
              <MetaItem icon="📅">
                {formatDate(magazine.date)}
              </MetaItem>
              <MetaItem icon="👁">
                {magazine.views || 0} views
              </MetaItem>
            </BlogMeta>
          </BlogHeader>

          <BlogContent>
            <ComingSoonSection>
              <ComingSoonIcon>🚧</ComingSoonIcon>
              <ComingSoonTitle>준비 중입니다</ComingSoonTitle>
              <ComingSoonText>
                이 매거진 콘텐츠는 현재 준비 중입니다.
              </ComingSoonText>
              <ComingSoonSubtext>
                곧 네이버/구글 블로그와 연결하여 풍부한 내용을 제공할 예정입니다.
              </ComingSoonSubtext>
            </ComingSoonSection>

            {/* 블로그 형식 템플릿 구조 */}
            <BlogSection>
              <SectionTitle>여행 개요</SectionTitle>
              <BlogText>
                {magazine.description || "이곳에 여행 개요가 표시됩니다."}
              </BlogText>
            </BlogSection>

            <BlogSection>
              <SectionTitle>주요 명소</SectionTitle>
              <BlogText>
                주요 명소와 추천 장소들이 여기에 표시됩니다.
              </BlogText>
            </BlogSection>

            <BlogSection>
              <SectionTitle>여행 팁</SectionTitle>
              <BlogText>
                실용적인 여행 팁과 현지 정보가 여기에 표시됩니다.
              </BlogText>
            </BlogSection>

            <BlogSection>
              <SectionTitle>맛집 추천</SectionTitle>
              <BlogText>
                현지 맛집과 음식 추천이 여기에 표시됩니다.
              </BlogText>
            </BlogSection>

            <BlogSection>
              <SectionTitle>교통 정보</SectionTitle>
              <BlogText>
                교통편과 이동 방법에 대한 정보가 여기에 표시됩니다.
              </BlogText>
            </BlogSection>
          </BlogContent>

          <TagSection>
            <TagTitle>태그</TagTitle>
            <TagList>
              {[magazine.region, magazine.category, '여행', '매거진', '가이드']
                .filter(tag => tag && tag.trim() !== '')
                .map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))
              }
            </TagList>
          </TagSection>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default MagazineDetailModal;