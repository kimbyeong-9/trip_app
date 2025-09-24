import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceRange: [0, 500000],
    rating: 0,
    amenities: []
  });

  // URL 파라미터에서 검색어 추출
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  const [searchResults] = useState([
    {
      id: 1,
      name: "제주 오션뷰 리조트",
      location: "제주도 서귀포시",
      price: 120000,
      rating: 4.8,
      image: "https://via.placeholder.com/300x200",
      amenities: ["WiFi", "주차", "수영장", "조식"]
    },
    {
      id: 2,
      name: "부산 해운대 호텔",
      location: "부산 해운대구",
      price: 95000,
      rating: 4.5,
      image: "https://via.placeholder.com/300x200",
      amenities: ["WiFi", "주차", "피트니스", "조식"]
    },
    {
      id: 3,
      name: "서울 명동 비즈니스 호텔",
      location: "서울 중구 명동",
      price: 85000,
      rating: 4.3,
      image: "https://via.placeholder.com/300x200",
      amenities: ["WiFi", "주차", "비즈니스센터"]
    }
  ]);

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>숙소 검색 결과</h1>
        {searchQuery && <p>'{searchQuery}' 검색 결과</p>}
        <p>총 {searchResults.length}개의 숙소를 찾았습니다</p>
      </div>

      <div className="search-content">
        <div className="filters-sidebar">
          <h3>맞춤 검색</h3>
          
          <div className="filter-section">
            <h4>가격 범위</h4>
            <div className="price-range">
              <input type="range" min="0" max="500000" />
              <div className="price-labels">
                <span>0원</span>
                <span>500,000원</span>
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h4>평점</h4>
            <div className="rating-filter">
              {[5, 4, 3, 2, 1].map(star => (
                <label key={star}>
                  <input type="radio" name="rating" value={star} />
                  <span>{star}성급 이상</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4>편의시설</h4>
            <div className="amenities-filter">
              {["WiFi", "주차", "수영장", "피트니스", "조식", "스파"].map(amenity => (
                <label key={amenity}>
                  <input type="checkbox" value={amenity} />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="results-main">
          <div className="sort-options">
            <select>
              <option>추천순</option>
              <option>가격 낮은순</option>
              <option>가격 높은순</option>
              <option>평점 높은순</option>
            </select>
          </div>

          <div className="results-grid">
            {searchResults.map(hotel => (
              <div key={hotel.id} className="hotel-card">
                <img src={hotel.image} alt={hotel.name} />
                <div className="hotel-info">
                  <h3>{hotel.name}</h3>
                  <p className="location">{hotel.location}</p>
                  <div className="rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-number">{hotel.rating}</span>
                  </div>
                  <div className="amenities">
                    {hotel.amenities.slice(0, 3).map(amenity => (
                      <span key={amenity} className="amenity-tag">{amenity}</span>
                    ))}
                  </div>
                  <div className="price-section">
                    <span className="price">{hotel.price.toLocaleString()}원</span>
                    <span className="per-night">/박</span>
                  </div>
                  <button className="book-button">예약하기</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;