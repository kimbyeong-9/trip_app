import React from 'react';

const HotelCard = ({ hotel }) => {
  return (
    <div className="hotel-card">
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
  );
};

export default HotelCard;
