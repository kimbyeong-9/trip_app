
export const regions = [
  {
    id: 'all',
    name: '전체',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=center'
  },
  {
    id: 'seoul',
    name: '서울',
    image: 'https://images.unsplash.com/photo-1549693578-d683be217e58?w=150&h=150&fit=crop&crop=center'
  },
  {
    id: 'incheon',
    name: '인천',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=150&h=150&fit=crop&crop=center'
  },
  {
    id: 'gyeonggi',
    name: '경기',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=150&h=150&fit=crop&crop=center'
  },
  {
    id: 'gyeongsang',
    name: '경상',
    image: 'https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?w=150&h=150&fit=crop&crop=center'
  },
  {
    id: 'busan',
    name: '부산',
    image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=150&h=150&fit=crop&crop=center'
  },
  {
    id: 'jeju',
    name: '제주',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=150&h=150&fit=crop&crop=center'
  },
  {
    id: 'gangwon',
    name: '강원',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop&crop=center'
  },
  {
    id: 'jeolla',
    name: '전라',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=150&h=150&fit=crop&crop=center'
  },
  {
    id: 'chungcheong',
    name: '충청',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=center'
  }
];


// 히어로 슬라이드 데이터
export const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    title: '여행을 더 특별하게',
    subtitle: '특가 할인 쿠폰',
    link: '할인 쿠폰 받기 >'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=400&fit=crop',
    title: '안전하고 편리한',
    subtitle: '버스 대절 서비스',
    link: '버스 예약하기 >'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop',
    title: '여행의 든든한 파트너',
    subtitle: '여행자 보험',
    link: '보험 가입하기 >'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
    title: '함께 떠나는',
    subtitle: '동행 모집',
    link: '동행 찾기 >'
  }
];

// 공통 상수 데이터
export const regionsData = [
  '서울', '경기', '인천', '강원', '충청',
  '전라', '경상', '제주', '부산'
];

export const ageGroups = ['20대', '30대', '40대', '50대+'];

export const travelStyles = [
  '느긋한 여행', '계획적인 여행', '즉흥적인 여행',
  '맛집 투어', '문화 체험', '자연 탐방',
  '쇼핑', '힐링', '액티비티'
];

// 작성자 프로필 템플릿
export const authorProfiles = [
  { name: "여행러버", profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", age: 28 },
  { name: "모험가", profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b950?w=100&h=100&fit=crop&crop=face", age: 32 },
  { name: "탐험러", profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", age: 29 },
  { name: "여행가", profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", age: 35 },
  { name: "힐링러", profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", age: 26 }
];

// 유틸리티 함수: 누락된 데이터를 자동으로 채워주는 함수
export const fillMissingData = (post) => {
  if (!post.author) {
    post.author = { ...authorProfiles[post.id % authorProfiles.length], location: post.region };
  }
  if (!post.meetingPoint) {
    post.meetingPoint = `${post.region}역`;
  }
  if (!post.estimatedCost) {
    post.estimatedCost = "1인당 10~15만원";
  }
  if (!post.travelStyle || post.travelStyle.length === 0) {
    post.travelStyle = ["여행", "관광", "힐링"];
  }
  if (!post.notice) {
    post.notice = "편안하고 즐거운 여행을 함께해요!";
  }
  return post;
};

// UserProfile 페이지 쿠폰 목 데이터
export const mockCoupons = [
  {
    id: 1,
    title: '숙박 할인 쿠폰',
    discount: '20% 할인',
    description: '전국 호텔 및 펜션 예약 시 사용 가능',
    expiryDate: '2024-12-31',
    minAmount: '50,000원 이상',
    code: 'HOTEL20'
  },
  {
    id: 2,
    title: '여행용품 할인 쿠폰',
    discount: '15% 할인',
    description: '캐리어, 백팩 등 여행용품 구매 시 사용',
    expiryDate: '2024-11-30',
    minAmount: '30,000원 이상',
    code: 'TRAVEL15'
  },
  {
    id: 3,
    title: '액티비티 체험 쿠폰',
    discount: '10,000원 할인',
    description: '패러글라이딩, 다이빙 등 액티비티 예약 시',
    expiryDate: '2024-10-31',
    minAmount: '100,000원 이상',
    code: 'ACTIVITY10K'
  }
];

// UserProfile 마이페이지용 데이터
export const myPageData = {
  points: 15000,
  memberLevel: '골드',
  bookings: [
    {
      id: 1,
      hotel: '제주 오션뷰 리조트',
      room: '스탠다드 오션뷰',
      checkIn: '2024-03-15',
      checkOut: '2024-03-17',
      status: '예약완료',
      amount: 252000,
      bookingDate: '2024-02-20'
    },
    {
      id: 2,
      hotel: '부산 해운대 호텔',
      room: '디럭스 시티뷰',
      checkIn: '2024-02-10',
      checkOut: '2024-02-12',
      status: '이용완료',
      amount: 190000,
      bookingDate: '2024-01-25'
    }
  ],
  favorites: [
    {
      id: 1,
      name: '서울 명동 비즈니스 호텔',
      location: '서울 중구 명동',
      rating: 4.3,
      price: 85000,
      image: 'https://via.placeholder.com/200x150'
    },
    {
      id: 2,
      name: '강릉 바다뷰 펜션',
      location: '강원도 강릉시',
      rating: 4.6,
      price: 120000,
      image: 'https://via.placeholder.com/200x150'
    }
  ],
  interestedTrips: [
    {
      id: 1,
      title: '제주여행 갈사람~ ✈️',
      region: '제주',
      date: '2025-10-11~2025-10-14',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
      author: {
        name: '제주매니아',
        profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b1d1?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 2,
      title: '서해안 드라이브 🚗',
      region: '충남',
      date: '2025-10-15~2025-10-16',
      image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=300&h=200&fit=crop',
      author: {
        name: '서해안드라이버',
        profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
      }
    }
  ]
};

// UserProfile 유저 프로필 데이터
export const userProfileData = {
  '여행러버': {
    name: '여행러버',
    bio: '제주도의 모든 매력을 사랑하는 여행자입니다. 성산일출봉에서 바라본 일몰의 감동을 나누고 싶어요.',
    location: '제주도',
    joinDate: '2024년 1월',
    totalTrips: 15,
    followers: 234,
    following: 156,
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    interests: ['자연', '일몰', '바다', '사진', '제주도'],
    recentTrips: [
      {
        id: 1,
        title: '제주도 성산일출봉 일몰 투어',
        region: '제주',
        date: '2024-01-15~2024-01-17',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop'
      }
    ]
  },
  '산악인': {
    name: '산악인',
    bio: '산을 사랑하는 등반가입니다. 겨울 설악산의 아름다운 설경을 보며 느끼는 성취감이 최고예요.',
    location: '강원도',
    joinDate: '2023년 11월',
    totalTrips: 22,
    followers: 156,
    following: 89,
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    interests: ['등산', '겨울여행', '설악산', '자연', '모험'],
    recentTrips: [
      {
        id: 2,
        title: '설악산 겨울 등반',
        region: '강원',
        date: '2024-01-12~2024-01-14',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop'
      }
    ]
  },
  '맛집헌터': {
    name: '맛집헌터',
    bio: '전국의 숨은 맛집을 찾아다니는 미식가입니다. 부산 자갈치시장의 신선한 회는 정말 최고였어요!',
    location: '부산',
    joinDate: '2023년 8월',
    totalTrips: 18,
    followers: 198,
    following: 112,
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    interests: ['맛집', '해산물', '시장', '미식투어', '부산'],
    recentTrips: [
      {
        id: 3,
        title: '부산 자갈치시장 맛집 투어',
        region: '부산',
        date: '2024-01-10~2024-01-12',
        image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=200&fit=crop'
      }
    ]
  },
  'user': {
    name: '사용자',
    bio: '여행을 사랑하는 사용자입니다. 새로운 곳을 탐험하고 좋은 사람들과 만나는 것을 좋아해요.',
    location: '서울',
    joinDate: '2024년 3월',
    totalTrips: 5,
    followers: 234,
    following: 156,
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    interests: ['여행', '사진', '맛집', '문화'],
    recentTrips: [
      {
        id: 4,
        title: '서울 맛집 투어 🍜',
        region: '서울',
        date: '2025-10-20~2025-10-21',
        image: 'https://images.unsplash.com/photo-1549693578-d683be217e58?w=300&h=200&fit=crop'
      }
    ]
  }
};

// Follower/Following 생성 함수용 이름 배열
export const followerNames = ['바다러버', '여행매니아', '등산러버', '맛집탐험가', '사진작가', '카페러버', '드라이브매니아', '캠핑러버', '백패커', '로드트립러', '제주도민', '부산갈매기', '서울토박이', '강원도아재', '전라도할매', '경상도청년', '충청도미식가', '수도권러버', '해외여행러', '국내여행러', '인생여행러', '여행계획러', '자유여행러', '패키지러버', '고급여행러', '배낭여행러', '가족여행러', '커플여행러', '솔로여행러', '동호회러버'];

export const followingNames = ['여행러버', '산악인', '맛집헌터', '카페러버', '해변러버', '도시탐험가', '문화애호가', '역사덕후', '자연주의자', '모험가', '휴양러버', '액티비티러버', '포토그래퍼', '블로거', '인플루언서', '가이드', '플래너', '백패커프로', '럭셔리러버', '버짓러버'];
