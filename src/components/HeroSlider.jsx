import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const HeroSliderContainer = styled.div`
  position: relative;
  height: 480px;
  overflow: hidden;
  margin-bottom: 60px;
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const HeroSlide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.8s ease-in-out;
  cursor: pointer;

  &.active {
    opacity: 1;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 20px;

  h1 {
    font-size: 48px;
    font-weight: 700;
    margin: 0 0 20px 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    line-height: 1.2;

    @media (max-width: 768px) {
      font-size: 32px;
    }
  }

  p {
    font-size: 20px;
    font-weight: 500;
    margin: 0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    opacity: 0.9;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

const ControlContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10;
`;

const SlideCounter = styled.div`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  backdrop-filter: blur(10px);
`;

const PauseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const HeroSlider = ({ heroSlides, showServiceModal, setShowServiceModal }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // 자동 슬라이드
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, heroSlides.length]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // 슬라이드 클릭 핸들러
  const handleSlideClick = (slideId) => {
    switch(slideId) {
      case 1: // 한일쿠폰
        setShowServiceModal(true);
        break;
      case 2: // 버스대절
        setShowServiceModal(true);
        break;
      case 3: // 여행보험
        setShowServiceModal(true);
        break;
      case 4: // 동행모집
        navigate('/companion-list');
        break;
      default:
        break;
    }
  };

  return (
    <HeroSliderContainer>
      <SliderContainer>
        {heroSlides.map((slide, index) => (
          <HeroSlide
            key={slide.id}
            className={index === currentSlide ? 'active' : ''}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`
            }}
            onClick={() => handleSlideClick(slide.id)}
          >
            <HeroContent>
              <h1>{slide.title}<br />{slide.subtitle}</h1>
              <p>{slide.link}</p>
            </HeroContent>
          </HeroSlide>
        ))}
      </SliderContainer>
      
      <ControlContainer>
        <SlideCounter>
          {currentSlide + 1}/{heroSlides.length}
        </SlideCounter>
        <PauseButton onClick={togglePlayPause}>
          {isPlaying ? '⏸' : '▶'}
        </PauseButton>
      </ControlContainer>
    </HeroSliderContainer>
  );
};

export default HeroSlider;
