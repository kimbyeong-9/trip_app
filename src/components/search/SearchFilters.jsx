import React from 'react';
import FilterSection from './FilterSection';

const SearchFilters = () => {
  return (
    <div className="filters-sidebar">
      <h3>맞춤 검색</h3>

      <FilterSection title="가격 범위">
        <div className="price-range">
          <input type="range" min="0" max="500000" />
          <div className="price-labels">
            <span>0원</span>
            <span>500,000원</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="평점">
        <div className="rating-filter">
          {[5, 4, 3, 2, 1].map(star => (
            <label key={star}>
              <input type="radio" name="rating" value={star} />
              <span>{star}성급 이상</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="편의시설">
        <div className="amenities-filter">
          {["WiFi", "주차", "수영장", "피트니스", "조식", "스파"].map(amenity => (
            <label key={amenity}>
              <input type="checkbox" value={amenity} />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );
};

export default SearchFilters;
