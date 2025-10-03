import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchFilters from '../components/search/SearchFilters';
import HotelCard from '../components/search/HotelCard';

const Search = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  // URL 파라미터에서 검색어 추출
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  const searchResults = [
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
  ];

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>숙소 검색 결과</h1>
        {searchQuery && <p>'{searchQuery}' 검색 결과</p>}
        <p>총 {searchResults.length}개의 숙소를 찾았습니다</p>
      </div>

      <div className="search-content">
        <SearchFilters />

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
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;