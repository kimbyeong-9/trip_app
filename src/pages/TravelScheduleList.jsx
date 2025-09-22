import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

const TravelScheduleList = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const postsPerPage = 10;

  // 임의의 여행 일정 데이터
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
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "부산 해운대 & 감천문화마을 투어",
      region: "부산",
      duration: "2박3일",
      author: "박부산",
      authorAvatar: "박",
      views: 980,
      likes: 67,
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop",
      description: "부산의 대표 관광지들을 효율적으로 돌아볼 수 있는 일정입니다. 맛집도 놓치지 마세요!",
      tags: ["문화", "맛집", "바다"],
      date: "2024-01-20"
    },
    {
      id: 3,
      title: "서울 한강 라이딩 & 야경투어",
      region: "서울",
      duration: "당일",
      author: "이서울",
      authorAvatar: "이",
      views: 2100,
      likes: 156,
      image: "https://images.unsplash.com/photo-1549693578-d683be217e58?w=400&h=300&fit=crop",
      description: "서울의 야경을 만끽할 수 있는 당일 코스입니다. 한강 자전거 라이딩과 용산 전망대까지!",
      tags: ["액티비티", "야경", "운동"],
      date: "2024-01-25"
    },
    {
      id: 4,
      title: "경주 역사여행 & 불국사 관광",
      region: "경상",
      duration: "2박3일",
      author: "최경주",
      authorAvatar: "최",
      views: 780,
      likes: 45,
      image: "https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?w=400&h=300&fit=crop",
      description: "천년고도 경주의 역사를 느낄 수 있는 여행입니다. 불국사, 석굴암, 첨성대까지!",
      tags: ["역사", "문화", "교육"],
      date: "2024-01-28"
    },
    {
      id: 5,
      title: "강원도 평창 스키장 겨울여행",
      region: "강원",
      duration: "2박3일",
      author: "정강원",
      authorAvatar: "정",
      views: 1450,
      likes: 98,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      description: "평창 알펜시아 스키장에서 즐기는 겨울 스포츠 여행입니다. 초보자도 환영!",
      tags: ["겨울", "스키", "스포츠"],
      date: "2024-02-01"
    },
    {
      id: 6,
      title: "전주 한옥마을 & 맛집투어",
      region: "전라",
      duration: "1박2일",
      author: "한전주",
      authorAvatar: "한",
      views: 920,
      likes: 72,
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
      description: "전주 한옥마을의 전통과 현대를 만나는 여행입니다. 비빔밥과 한지 체험까지!",
      tags: ["전통", "맛집", "체험"],
      date: "2024-02-05"
    },
    {
      id: 7,
      title: "인천 차이나타운 & 월미도 관광",
      region: "인천",
      duration: "당일",
      author: "오인천",
      authorAvatar: "오",
      views: 650,
      likes: 38,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      description: "인천의 독특한 매력을 느낄 수 있는 당일 코스입니다. 차이나타운과 월미도 해변까지!",
      tags: ["다문화", "바다", "당일"],
      date: "2024-02-08"
    },
    {
      id: 8,
      title: "대구 팔공산 등반 & 동화사 탐방",
      region: "경상",
      duration: "1박2일",
      author: "윤대구",
      authorAvatar: "윤",
      views: 580,
      likes: 34,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      description: "팔공산의 자연과 동화사의 불교문화를 체험하는 힐링 여행입니다.",
      tags: ["등산", "힐링", "문화"],
      date: "2024-02-10"
    },
    {
      id: 9,
      title: "울산 대왕암 & 태화강 국립공원",
      region: "경상",
      duration: "1박2일",
      author: "강울산",
      authorAvatar: "강",
      views: 720,
      likes: 51,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      description: "울산의 아름다운 자연을 만끽할 수 있는 여행입니다. 대왕암 일출과 태화강 산책까지!",
      tags: ["자연", "일출", "산책"],
      date: "2024-02-12"
    },
    {
      id: 10,
      title: "광주 5.18 기념공원 & 무등산",
      region: "전라",
      duration: "1박2일",
      author: "조광주",
      authorAvatar: "조",
      views: 890,
      likes: 63,
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
      description: "광주의 역사와 문화, 그리고 자연을 모두 체험하는 의미 있는 여행입니다.",
      tags: ["역사", "문화", "등산"],
        date: "2024-02-15"
      },
      {
        id: 11,
        title: "여수 밤바다 & 오동도 야경투어",
        region: "전라",
        duration: "2박3일",
        author: "송여수",
        authorAvatar: "송",
        views: 1150,
        likes: 78,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        description: "여수의 아름다운 밤바다와 오동도의 야경을 감상하는 로맨틱 여행입니다.",
        tags: ["야경", "바다", "로맨틱"],
        date: "2024-02-18"
      },
      {
        id: 12,
        title: "안동 하회마을 & 도산서원 탐방",
        region: "경상",
        duration: "1박2일",
        author: "배안동",
        authorAvatar: "배",
        views: 650,
        likes: 42,
        image: "https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?w=400&h=300&fit=crop",
        description: "안동의 전통문화와 유교문화를 체험하는 교육적인 여행입니다.",
        tags: ["전통", "문화", "교육"],
        date: "2024-02-20"
      },
      {
        id: 13,
        title: "춘천 남이섬 & 청평호수",
        region: "강원",
        duration: "1박2일",
        author: "임춘천",
        authorAvatar: "임",
        views: 980,
        likes: 65,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        description: "춘천의 대표 관광지 남이섬과 청평호수의 자연을 만끽하는 힐링 여행입니다.",
        tags: ["자연", "힐링", "섬"],
        date: "2024-02-22"
      },
      {
        id: 14,
        title: "목포 유달산 & 죽녹원",
        region: "전라",
        duration: "당일",
        author: "허목포",
        authorAvatar: "허",
        views: 520,
        likes: 35,
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
        description: "목포의 아름다운 자연과 죽녹원의 푸른 대나무를 감상하는 당일 여행입니다.",
        tags: ["자연", "대나무", "당일"],
        date: "2024-02-25"
      },
      {
        id: 15,
        title: "통영 미륵산 & 동피랑마을",
        region: "경상",
        duration: "1박2일",
        author: "신통영",
        authorAvatar: "신",
        views: 780,
        likes: 58,
        image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop",
        description: "통영의 바다와 미륵산, 그리고 예술마을 동피랑을 탐방하는 문화 여행입니다.",
        tags: ["바다", "예술", "문화"],
        date: "2024-02-28"
      },
      {
        id: 16,
        title: "속초 설악산 & 영금정",
        region: "강원",
        duration: "2박3일",
        author: "노속초",
        authorAvatar: "노",
        views: 1200,
        likes: 85,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        description: "속초의 설악산과 영금정에서 즐기는 자연과 바다를 모두 만끽하는 여행입니다.",
        tags: ["산", "바다", "자연"],
        date: "2024-03-02"
      },
      {
        id: 17,
        title: "순천만 갈대숲 & 선암사",
        region: "전라",
        duration: "1박2일",
        author: "문순천",
        authorAvatar: "문",
        views: 950,
        likes: 72,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        description: "순천만의 아름다운 갈대숲과 선암사의 고즈넉한 분위기를 느끼는 힐링 여행입니다.",
        tags: ["자연", "힐링", "갈대숲"],
        date: "2024-03-05"
      },
      {
        id: 18,
        title: "포항 호미곶 일출 & 경주 불국사",
        region: "경상",
        duration: "1박2일",
        author: "강포항",
        authorAvatar: "강",
        views: 1100,
        likes: 89,
        image: "https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?w=400&h=300&fit=crop",
        description: "포항 호미곶에서 보는 일출과 경주 불국사의 역사를 함께 체험하는 의미 있는 여행입니다.",
        tags: ["일출", "역사", "문화"],
        date: "2024-03-08"
      },
      {
        id: 19,
        title: "단양 도담삼봉 & 온달동굴",
        region: "충청",
        duration: "1박2일",
        author: "조단양",
        authorAvatar: "조",
        views: 680,
        likes: 48,
        image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop",
        description: "단양의 아름다운 자연과 도담삼봉, 온달동굴을 탐방하는 자연 체험 여행입니다.",
        tags: ["자연", "동굴", "체험"],
        date: "2024-03-10"
      },
      {
        id: 20,
        title: "태안 반딧불이 & 안면도",
        region: "충청",
        duration: "1박2일",
        author: "한태안",
        authorAvatar: "한",
        views: 850,
        likes: 61,
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
        description: "태안의 아름다운 반딧불이와 안면도의 자연을 감상하는 특별한 여행입니다.",
        tags: ["반딧불이", "자연", "특별"],
        date: "2024-03-12"
      },
      {
        id: 21,
        title: "강릉 정동진 & 커피거리",
        region: "강원",
        duration: "1박2일",
        author: "김강릉",
        authorAvatar: "김",
        views: 1350,
        likes: 95,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        description: "강릉 정동진의 아름다운 일출과 커피거리의 감성을 만끽하는 힐링 여행입니다.",
        tags: ["일출", "커피", "힐링"],
        date: "2024-03-15"
      },
      {
        id: 22,
        title: "거제 바람의 언덕 & 해금강",
        region: "경상",
        duration: "2박3일",
        author: "박거제",
        authorAvatar: "박",
        views: 980,
        likes: 74,
        image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop",
        description: "거제의 바람의 언덕과 해금강의 아름다운 자연을 감상하는 바다 여행입니다.",
        tags: ["바다", "자연", "풍경"],
        date: "2024-03-18"
      },
      {
        id: 23,
        title: "영월 청령포 & 단종능",
        region: "강원",
        duration: "1박2일",
        author: "최영월",
        authorAvatar: "최",
        views: 720,
        likes: 52,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        description: "영월 청령포의 아름다운 자연과 단종능의 역사를 함께 체험하는 의미 있는 여행입니다.",
        tags: ["역사", "자연", "문화"],
        date: "2024-03-20"
      },
      {
        id: 24,
        title: "보령 무창포 & 대천해수욕장",
        region: "충청",
        duration: "1박2일",
        author: "정보령",
        authorAvatar: "정",
        views: 650,
        likes: 43,
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
        description: "보령 무창포와 대천해수욕장에서 즐기는 바다와 해변의 즐거움을 만끽하는 여행입니다.",
        tags: ["바다", "해수욕장", "여름"],
        date: "2024-03-22"
      },
      {
        id: 25,
        title: "화천 산천어축제 & 평화의댐",
        region: "강원",
        duration: "1박2일",
        author: "윤화천",
        authorAvatar: "윤",
        views: 890,
        likes: 67,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        description: "화천의 산천어축제와 평화의댐을 함께 즐기는 특별한 축제 여행입니다.",
        tags: ["축제", "자연", "특별"],
        date: "2024-03-25"
      }
    ];

  const regions = ['전체', '서울', '부산', '제주', '경상', '전라', '강원', '인천'];
  const durations = ['전체', '당일', '1박2일', '2박3일', '3박4일', '4박5일 이상'];

  // 필터링된 데이터
  const filteredSchedules = travelSchedules.filter(schedule => {
    const regionMatch = selectedRegion === 'all' || schedule.region === selectedRegion;
    const durationMatch = selectedDuration === 'all' || schedule.duration === selectedDuration;
    const searchMatch = searchTerm === '' || 
      schedule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.region.toLowerCase().includes(searchTerm.toLowerCase());
    return regionMatch && durationMatch && searchMatch;
  });

  // 페이지네이션
  const totalPages = Math.ceil(filteredSchedules.length / postsPerPage);
  const currentSchedules = filteredSchedules.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleScheduleClick = (id) => {
    navigate(`/travel-schedule/${id}`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  // 로그인 상태 확인
  const getLoginData = () => {
    const localData = localStorage.getItem('loginData');
    const sessionData = sessionStorage.getItem('loginData');
    return localData ? JSON.parse(localData) : (sessionData ? JSON.parse(sessionData) : null);
  };
  
  const loginData = getLoginData();
  const isLoggedIn = loginData && loginData.isLoggedIn;

  const handleCreateSchedule = () => {
    if (isLoggedIn) {
      navigate('/travel-schedule/create');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginClick = () => {
    setShowLoginModal(false);
    navigate('/login');
  };

  return (
    <div className="travel-schedule-list-page">
      <Navigation />
      {/* 헤더 */}
      <div className="travel-schedule-list-header">
        <button className="back-button" onClick={handleBackClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1>여행 일정</h1>
        <button className="create-schedule-button" onClick={handleCreateSchedule}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          일정 추가
        </button>
      </div>

      <div className="travel-schedule-list-content">
        {/* 검색 */}
        <div className="search-section">
          <div className="search-container">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="여행지, 제목으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* 필터 */}
        <div className="filter-section">
          <div className="filter-group">
            <label>지역</label>
            <div className="filter-buttons">
              {regions.map(region => (
                <button
                  key={region}
                  className={`filter-btn ${selectedRegion === (region === '전체' ? 'all' : region) ? 'active' : ''}`}
                  onClick={() => setSelectedRegion(region === '전체' ? 'all' : region)}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>여행 기간</label>
            <div className="filter-buttons">
              {durations.map(duration => (
                <button
                  key={duration}
                  className={`filter-btn ${selectedDuration === (duration === '전체' ? 'all' : duration) ? 'active' : ''}`}
                  onClick={() => setSelectedDuration(duration === '전체' ? 'all' : duration)}
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 일정 목록 */}
        <div className="schedule-list">
          <div className="schedule-table">
            {/* 테이블 헤더 */}
            <div className="table-header">
              <div className="table-cell">사진</div>
              <div className="table-cell">제목</div>
              <div className="table-cell">지역</div>
              <div className="table-cell">기간</div>
              <div className="table-cell">작성자</div>
              <div className="table-cell">조회수</div>
              <div className="table-cell">좋아요</div>
            </div>
            
            {currentSchedules.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🗺️</div>
                <h3>검색 결과가 없습니다</h3>
                <p>다른 검색어나 필터를 시도해보세요.</p>
              </div>
            ) : (
              <div className="table-body">
                  {currentSchedules.map(schedule => (
                    <div 
                      key={schedule.id} 
                      className="table-row"
                      onClick={() => handleScheduleClick(schedule.id)}
                    >
                      <div className="table-cell image-cell">
                        <div className="representative-image">
                          <img src={schedule.image} alt={schedule.title} />
                        </div>
                      </div>
                      <div className="table-cell title-cell">
                        <div className="post-title">{schedule.title}</div>
                        <div className="post-description">{schedule.description.length > 20 ? schedule.description.substring(0, 20) + '...' : schedule.description}</div>
                      </div>
                      <div className="table-cell region-cell">
                        <span className="region-badge">{schedule.region}</span>
                      </div>
                      <div className="table-cell duration-cell">
                        <span className="duration-text">{schedule.duration}</span>
                      </div>
                      <div className="table-cell author-cell">
                        <div className="author-info">
                          <div className="author-avatar">{schedule.authorAvatar}</div>
                          <span className="author-name">{schedule.author}</span>
                        </div>
                      </div>
                      <div className="table-cell views-cell">
                        <span className="views-count">{schedule.views}</span>
                      </div>
                      <div className="table-cell likes-cell">
                        <span className="likes-count">{schedule.likes}</span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                이전
              </button>
              
              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`pagination-number ${page === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button 
                className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                다음
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 로그인 안내 모달 */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>해당 서비스는 로그인을 해야 이용 가능합니다</h3>
            <p>여행 일정을 작성하려면 로그인이 필요합니다.</p>
            <div className="modal-actions">
              <button className="modal-cancel-btn" onClick={() => setShowLoginModal(false)}>
                뒤로
              </button>
              <button className="modal-confirm-btn" onClick={handleLoginClick}>
                로그인하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelScheduleList;
