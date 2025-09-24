import React, { useState } from 'react';

const Booking = () => {
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  const bookingDetails = {
    hotel: "제주 오션뷰 리조트",
    room: "스탠다드 오션뷰",
    checkIn: "2024-03-15",
    checkOut: "2024-03-17",
    nights: 2,
    guests: 2,
    roomPrice: 120000,
    tax: 12000,
    total: 252000
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuestInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('예약이 완료되었습니다!');
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>예약 확인 및 결제</h1>
      </div>

      <div className="booking-content">
        <div className="booking-form-section">
          <div className="guest-info-section">
            <h2>예약자 정보</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">이름 *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={guestInfo.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">이메일 *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={guestInfo.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">전화번호 *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={guestInfo.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="specialRequests">특별 요청사항</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={guestInfo.specialRequests}
                  onChange={handleInputChange}
                  placeholder="특별한 요청사항이 있으시면 입력해주세요"
                  rows="3"
                />
              </div>
            </form>
          </div>

          <div className="payment-section">
            <h2>결제 방법</h2>
            <div className="payment-methods">
              <label className="payment-option">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>신용카드/체크카드</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>무통장입금</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  value="kakaopay"
                  checked={paymentMethod === 'kakaopay'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>카카오페이</span>
              </label>
            </div>
          </div>
        </div>

        <div className="booking-summary">
          <div className="summary-card">
            <h2>예약 정보</h2>
            
            <div className="hotel-summary">
              <h3>{bookingDetails.hotel}</h3>
              <p>{bookingDetails.room}</p>
            </div>

            <div className="date-summary">
              <div className="date-item">
                <span className="label">체크인</span>
                <span className="value">{bookingDetails.checkIn}</span>
              </div>
              <div className="date-item">
                <span className="label">체크아웃</span>
                <span className="value">{bookingDetails.checkOut}</span>
              </div>
              <div className="date-item">
                <span className="label">숙박일수</span>
                <span className="value">{bookingDetails.nights}박</span>
              </div>
              <div className="date-item">
                <span className="label">게스트</span>
                <span className="value">{bookingDetails.guests}명</span>
              </div>
            </div>

            <div className="price-breakdown">
              <div className="price-item">
                <span>객실료 ({bookingDetails.nights}박)</span>
                <span>{(bookingDetails.roomPrice * bookingDetails.nights).toLocaleString()}원</span>
              </div>
              <div className="price-item">
                <span>세금 및 수수료</span>
                <span>{bookingDetails.tax.toLocaleString()}원</span>
              </div>
              <div className="price-total">
                <span>총 결제금액</span>
                <span>{bookingDetails.total.toLocaleString()}원</span>
              </div>
            </div>

            <button 
              type="submit" 
              className="confirm-booking-button"
              onClick={handleSubmit}
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;