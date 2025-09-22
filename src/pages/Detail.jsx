import React, { useState } from 'react';

const Detail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const hotel = {
    id: 1,
    name: "제주 오션뷰 리조트",
    location: "제주도 서귀포시 중문관광로 72번길 35",
    rating: 4.8,
    reviewCount: 1247,
    price: 120000,
    images: [
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400"
    ],
    amenities: ["WiFi", "주차", "수영장", "조식", "피트니스", "스파", "룸서비스", "컨시어지"],
    description: "제주의 아름다운 바다를 한눈에 내려다볼 수 있는 럭셔리 리조트입니다. 모든 객실에서 오션뷰를 감상할 수 있으며, 다양한 부대시설과 서비스를 제공합니다.",
    rooms: [
      {
        id: 1,
        type: "스탠다드 오션뷰",
        size: "32㎡",
        capacity: 2,
        price: 120000,
        amenities: ["킹사이즈 베드", "오션뷰", "미니바", "WiFi"]
      },
      {
        id: 2,
        type: "디럭스 오션뷰",
        size: "45㎡",
        capacity: 3,
        price: 180000,
        amenities: ["킹사이즈 베드", "소파베드", "발코니", "오션뷰", "미니바", "WiFi"]
      }
    ]
  };

  return (
    <div className="detail-page">
      <div className="detail-header">
        <h1>{hotel.name}</h1>
        <div className="hotel-meta">
          <div className="rating">
            <span className="stars">★★★★★</span>
            <span className="rating-number">{hotel.rating}</span>
            <span className="review-count">({hotel.reviewCount}개 후기)</span>
          </div>
          <p className="location">{hotel.location}</p>
        </div>
      </div>

      <div className="image-gallery">
        <div className="main-image">
          <img src={hotel.images[selectedImage]} alt={hotel.name} />
        </div>
        <div className="thumbnail-list">
          {hotel.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${hotel.name} ${index + 1}`}
              className={selectedImage === index ? 'active' : ''}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      <div className="detail-content">
        <div className="hotel-info">
          <div className="description">
            <h2>숙소 소개</h2>
            <p>{hotel.description}</p>
          </div>

          <div className="amenities-section">
            <h2>편의시설</h2>
            <div className="amenities-grid">
              {hotel.amenities.map(amenity => (
                <div key={amenity} className="amenity-item">
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rooms-section">
            <h2>객실 선택</h2>
            <div className="rooms-list">
              {hotel.rooms.map(room => (
                <div key={room.id} className="room-card">
                  <div className="room-info">
                    <h3>{room.type}</h3>
                    <p className="room-details">{room.size} • 최대 {room.capacity}명</p>
                    <div className="room-amenities">
                      {room.amenities.map(amenity => (
                        <span key={amenity} className="room-amenity">{amenity}</span>
                      ))}
                    </div>
                  </div>
                  <div className="room-booking">
                    <div className="room-price">
                      <span className="price">{room.price.toLocaleString()}원</span>
                      <span className="per-night">/박</span>
                    </div>
                    <button className="select-room-button">선택</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="booking-sidebar">
          <div className="booking-card">
            <div className="price-display">
              <span className="price">{hotel.price.toLocaleString()}원</span>
              <span className="per-night">/박</span>
            </div>

            <div className="booking-form">
              <div className="date-inputs">
                <div className="input-group">
                  <label>체크인</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>체크아웃</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>게스트</label>
                <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                  <option value={1}>게스트 1명</option>
                  <option value={2}>게스트 2명</option>
                  <option value={3}>게스트 3명</option>
                  <option value={4}>게스트 4명</option>
                </select>
              </div>

              <button className="reserve-button">예약하기</button>
            </div>

            <div className="booking-summary">
              <p>예약 전까지 요금이 부과되지 않습니다</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;