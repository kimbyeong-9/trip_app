import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';

const TravelScheduleDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);

  // 임시 데이터 (실제로는 API에서 가져와야 함)
  const travelSchedules = [
    {
      id: 1,
      title: "제주도 3박4일 완벽 코스",
      region: "제주",
      duration: "3박4일",
      author: "김제주",
      authorAvatar: "김",
      views: 1250,
      likes: 89,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      description: "제주도의 핫플레이스들을 모두 담은 완벽한 여행 코스입니다. 한라산, 성산일출봉, 협재해수욕장까지!",
      tags: ["자연", "힐링", "사진"],
      date: "2024-01-15",
      itinerary: {
        1: [
          {
            id: 1,
            title: "제주국제공항",
            category: "공항",
            description: "공항도착~",
            image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
            time: "09:00",
            distance: "4.4km",
            phone: "064-797-6114",
            address: "제주특별자치도 제주시 공항로 2",
            hours: "24시간 운영",
            reviews: {
              visitor: 4.2,
              blog: 4.5,
              total: 1247
            }
          },
          {
            id: 2,
            title: "윤옥 본점",
            category: "음식점",
            description: "고기국수보다 찐한 라멘집><",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
            time: "11:30",
            distance: "13.7km",
            phone: "064-123-4567",
            address: "제주특별자치도 제주시 연동 123-45",
            hours: "11:00 - 21:00 (재료소진시 조기마감)",
            reviews: {
              visitor: 4.8,
              blog: 4.6,
              total: 892
            },
            coupon: "10% 할인 쿠폰"
          },
          {
            id: 3,
            title: "델문도",
            category: "카페/전통찻집",
            description: "바다뷰 카페~~♡",
            image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
            time: "13:00",
            distance: "37.7m",
            phone: "064-234-5678",
            address: "제주특별자치도 제주시 조천읍 함덕리 123",
            hours: "10:00 - 20:00",
            reviews: {
              visitor: 4.7,
              blog: 4.8,
              total: 567
            },
            coupon: "아메리카노 1+1 쿠폰"
          },
          {
            id: 4,
            title: "함덕 서우봉 해변 (함덕해수욕장)",
            category: "해수욕장",
            description: "해변에서 물놀이?",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
            time: "15:30",
            distance: "23.2km",
            phone: "064-710-6755",
            address: "제주특별자치도 제주시 조천읍 함덕리",
            hours: "24시간 이용가능",
            reviews: {
              visitor: 4.5,
              blog: 4.4,
              total: 1234
            }
          },
          {
            id: 5,
            title: "엉불턱우도전망대",
            category: "휴양지",
            description: "성산으로 이동해서 전망대?",
            image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop",
            time: "17:00",
            distance: "6.2km",
            phone: "064-783-0955",
            address: "제주특별자치도 서귀포시 성산읍 우도리",
            hours: "09:00 - 18:00",
            reviews: {
              visitor: 4.6,
              blog: 4.7,
              total: 789
            }
          },
          {
            id: 6,
            title: "마우돈",
            category: "음식점",
            description: "헉 생애 첫 말고기",
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
            time: "19:00",
            distance: "1km",
            phone: "064-345-6789",
            address: "제주특별자치도 서귀포시 성산읍 성산리 456-78",
            hours: "12:00 - 22:00",
            reviews: {
              visitor: 4.3,
              blog: 4.4,
              total: 445
            },
            coupon: "말고기 세트 20% 할인"
          },
          {
            id: 7,
            title: "스타벅스 제주성산DT점",
            category: "카페",
            description: "스벅에서 성산일출봉 보며 노을감상?",
            image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
            time: "21:00",
            distance: "2.3km",
            phone: "064-456-7890",
            address: "제주특별자치도 서귀포시 성산읍 성산리 789-12",
            hours: "06:00 - 23:00",
            reviews: {
              visitor: 4.4,
              blog: 4.3,
              total: 678
            },
            coupon: "스타벅스 카드 적립 2배"
          }
        ],
        2: [
          {
            id: 8,
            title: "성산일출봉",
            category: "관광지",
            description: "일출 명소에서 아침을",
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
            time: "06:00",
            distance: "15.2km"
          },
          {
            id: 9,
            title: "중문관광단지",
            category: "관광지",
            description: "제주의 대표 관광지",
            image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop",
            time: "10:00",
            distance: "8.5km"
          },
          {
            id: 10,
            title: "천지연폭포",
            category: "자연",
            description: "제주도 대표 폭포",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            time: "12:00",
            distance: "12.3km"
          }
        ],
        3: [
          {
            id: 11,
            title: "한라산",
            category: "산",
            description: "제주도 최고봉 등반",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
            time: "08:00",
            distance: "20.1km"
          },
          {
            id: 12,
            title: "협재해수욕장",
            category: "해수욕장",
            description: "제주도 최고의 해변",
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
            time: "15:00",
            distance: "25.6km"
          }
        ],
        4: [
          {
            id: 13,
            title: "제주시내",
            category: "쇼핑",
            description: "마지막 쇼핑과 기념품",
            image: "https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?w=400&h=300&fit=crop",
            time: "10:00",
            distance: "15.8km"
          },
          {
            id: 14,
            title: "제주국제공항",
            category: "공항",
            description: "안전한 귀국",
            image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
            time: "14:00",
            distance: "0km"
          }
        ]
      }
    }
  ];

  useEffect(() => {
    const foundSchedule = travelSchedules.find(s => s.id === parseInt(id));
    if (foundSchedule) {
      setSchedule(foundSchedule);
    }
    setLoading(false);
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setShowLocationModal(true);
  };

  const handleCloseModal = () => {
    setShowLocationModal(false);
    setSelectedLocation(null);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedLocation.title,
        text: selectedLocation.description,
        url: window.location.href
      });
    } else {
      // 폴백: 클립보드에 복사
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다!');
    }
  };

  const handleSave = () => {
    // 저장 기능 (로컬 스토리지 등)
    const savedLocations = JSON.parse(localStorage.getItem('savedLocations') || '[]');
    if (!savedLocations.find(loc => loc.id === selectedLocation.id)) {
      savedLocations.push(selectedLocation);
      localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
      alert('저장되었습니다!');
    } else {
      alert('이미 저장된 장소입니다.');
    }
  };

  const handleCoupon = () => {
    alert(`${selectedLocation.coupon}이 발급되었습니다!`);
  };

  const getCategoryStyle = (category) => {
    const categoryStyles = {
      "공항": { bg: "#e3f2fd", color: "#1976d2" },
      "음식점": { bg: "#f3e5f5", color: "#7b1fa2" },
      "카페/전통찻집": { bg: "#e8f5e8", color: "#2e7d32" },
      "카페": { bg: "#e8f5e8", color: "#2e7d32" },
      "해수욕장": { bg: "#e1f5fe", color: "#0277bd" },
      "휴양지": { bg: "#fff3e0", color: "#ef6c00" },
      "관광지": { bg: "#fce4ec", color: "#c2185b" },
      "자연": { bg: "#e8f5e8", color: "#2e7d32" },
      "산": { bg: "#f1f8e9", color: "#558b2f" },
      "쇼핑": { bg: "#f9fbe7", color: "#827717" }
    };
    return categoryStyles[category] || { bg: "#f5f5f5", color: "#666" };
  };

  if (loading) {
    return (
      <div className="travel-schedule-detail-page">
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="travel-schedule-detail-page">
        <div className="not-found">일정을 찾을 수 없습니다.</div>
      </div>
    );
  }

  const currentDayItinerary = schedule.itinerary[selectedDay] || [];

  return (
    <div className="travel-schedule-detail-page">
      <Navigation />
      {/* 헤더 */}
      <div className="travel-schedule-detail-header">
        <button className="back-button" onClick={handleBackClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1>일정 상세보기</h1>
        <button className="menu-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="5" r="1" fill="white"/>
            <circle cx="12" cy="12" r="1" fill="white"/>
            <circle cx="12" cy="19" r="1" fill="white"/>
          </svg>
        </button>
      </div>

      <div className="travel-schedule-detail-content">
        {/* 일정 제목 및 기본 정보 */}
        <div className="schedule-info-section">
          <div className="schedule-header">
            <h2>{schedule.title}</h2>
            <div className="schedule-meta">
              <span className="region-badge">{schedule.region}</span>
              <span className="duration-badge">{schedule.duration}</span>
            </div>
          </div>
          
          <div className="schedule-description">
            <p>{schedule.description}</p>
          </div>

          <div className="schedule-stats">
            <div className="stat-item">
              <span className="stat-icon">👁️</span>
              <span>{schedule.views}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">❤️</span>
              <span>{schedule.likes}</span>
            </div>
            <div className="author-info">
              <div className="author-avatar">{schedule.authorAvatar}</div>
              <span className="author-name">{schedule.author}</span>
            </div>
          </div>
        </div>

        {/* 날짜 선택 */}
        <div className="day-selector">
          <div className="day-info">
            <span className="day-text">{selectedDay}일차</span>
            <span className="date-text">2024-08-13</span>
            <svg className="dropdown-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* 일정 리스트 */}
        <div className="itinerary-list">
          {currentDayItinerary.map((item, index) => (
            <div key={item.id} className="itinerary-item">
              <div className="itinerary-content" onClick={() => handleLocationClick(item)}>
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="item-info">
                  <h3 className="item-title">{item.title}</h3>
                  <div className="item-category">
                    <span 
                      className="category-badge"
                      style={{
                        backgroundColor: getCategoryStyle(item.category).bg,
                        color: getCategoryStyle(item.category).color
                      }}
                    >
                      [{item.category}]
                    </span>
                  </div>
                  <p className="item-description">{item.description}</p>
                </div>
              </div>
              
              {/* 거리 표시 (마지막 항목 제외) */}
              {index < currentDayItinerary.length - 1 && (
                <div className="distance-indicator">
                  <span className="distance-text">{item.distance}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 장소 상세 모달 */}
      {showLocationModal && selectedLocation && (
        <div className="location-modal-overlay" onClick={handleCloseModal}>
          <div className="location-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedLocation.title}</h2>
              <button className="close-button" onClick={handleCloseModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div className="modal-content">
              <div className="location-image">
                <img src={selectedLocation.image} alt={selectedLocation.title} />
              </div>

              <div className="location-info">
                <div className="info-section">
                  <h3>기본 정보</h3>
                  <div className="info-item">
                    <span className="info-label">전화번호</span>
                    <span className="info-value">
                      <a href={`tel:${selectedLocation.phone}`}>{selectedLocation.phone}</a>
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">주소</span>
                    <span className="info-value">{selectedLocation.address}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">영업시간</span>
                    <span className="info-value">{selectedLocation.hours}</span>
                  </div>
                </div>

                <div className="info-section">
                  <h3>리뷰</h3>
                  <div className="review-stats">
                    <div className="review-item">
                      <span className="review-label">방문자 리뷰</span>
                      <div className="review-rating">
                        <span className="rating-score">{selectedLocation.reviews.visitor}</span>
                        <div className="rating-stars">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`star ${i < Math.floor(selectedLocation.reviews.visitor) ? 'filled' : ''}`}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="review-item">
                      <span className="review-label">블로그 리뷰</span>
                      <div className="review-rating">
                        <span className="rating-score">{selectedLocation.reviews.blog}</span>
                        <div className="rating-stars">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`star ${i < Math.floor(selectedLocation.reviews.blog) ? 'filled' : ''}`}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="review-item">
                      <span className="review-label">총 리뷰 수</span>
                      <span className="review-count">{selectedLocation.reviews.total.toLocaleString()}개</span>
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <h3>지도</h3>
                  <div className="map-placeholder">
                    <div className="map-icon">🗺️</div>
                    <p>지도 보기</p>
                    <small>클릭하면 상세 지도로 이동합니다</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="action-button secondary" onClick={handleShare}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12M16 8L12 4M12 4L8 8M12 4V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                공유
              </button>
              <button className="action-button secondary" onClick={handleSave}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                저장
              </button>
              {selectedLocation.coupon && (
                <button className="action-button primary" onClick={handleCoupon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  쿠폰
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelScheduleDetail;
