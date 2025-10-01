// 동행 카드 데이터는 Supabase의 CompanionSection 테이블에서 가져옵니다

// 일정 카드 데이터는 Supabase의 Itinerary 테이블에서 가져옵니다

// 매거진 카드 데이터
export const magazineCards = [
  {
    id: 1,
    title: "가을 단풍 명소 베스트 10",
    region: "전국",
    category: "국내여행",
    author: "여행매거진",
    date: "2025-10-01",
    description: "전국의 아름다운 가을 단풍을 만날 수 있는 최고의 명소들을 소개합니다.",
    views: 1250,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "서울 숨은 맛집 발견기",
    region: "서울",
    category: "맛집",
    author: "맛집헌터",
    date: "2025-09-28",
    description: "서울 골목골목에 숨어있는 진짜 맛집들을 찾아 떠나는 미식 여행.",
    views: 980,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "제주도 카페 투어 가이드",
    region: "제주",
    category: "문화",
    author: "카페투어",
    date: "2025-09-25",
    description: "제주도만의 특별한 분위기를 가진 카페들을 소개하는 완벽 가이드.",
    views: 756,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "부산 해운대 완전정복",
    region: "부산",
    category: "액티비티",
    author: "해변러버",
    date: "2025-09-22",
    description: "부산 해운대에서 즐길 수 있는 다양한 액티비티와 볼거리를 총정리.",
    views: 1134,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    title: "강원도 겨울 스키장 가이드",
    region: "강원",
    category: "액티비티",
    author: "스키매니아",
    date: "2025-09-20",
    description: "강원도 최고의 스키장들과 겨울 스포츠를 즐기는 완벽 가이드.",
    views: 892,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    title: "전주 한옥마을 숙박 추천",
    region: "전라",
    category: "문화",
    author: "전통문화",
    date: "2025-09-18",
    description: "전주 한옥마을에서 전통의 멋을 느낄 수 있는 최고의 숙박시설들.",
    views: 643,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
  },
  {
    id: 7,
    title: "경기도 당일치기 여행 코스",
    region: "경기",
    category: "국내여행",
    author: "당일여행",
    date: "2025-09-15",
    description: "서울에서 가까운 경기도의 당일치기로 즐길 수 있는 완벽 코스.",
    views: 567,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop"
  },
  {
    id: 8,
    title: "인천 차이나타운 먹거리 투어",
    region: "인천",
    category: "맛집",
    author: "먹방여행자",
    date: "2025-09-12",
    description: "인천 차이나타운의 진짜 맛을 찾아 떠나는 먹거리 투어 가이드.",
    views: 721,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop"
  },
  {
    id: 9,
    title: "충청도 온천 힐링 여행",
    region: "충청",
    category: "국내여행",
    author: "힐링여행",
    date: "2025-09-10",
    description: "몸과 마음이 편안해지는 충청도 최고의 온천들을 소개합니다.",
    views: 834,
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop"
  },
  {
    id: 10,
    title: "경상도 사찰 순례길",
    region: "경상",
    category: "문화",
    author: "사찰순례",
    date: "2025-09-08",
    description: "마음의 평안을 찾을 수 있는 경상도의 아름다운 사찰들.",
    views: 456,
    image: "https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?w=400&h=300&fit=crop"
  },
  {
    id: 11,
    title: "서울 한강 사이클링 코스",
    region: "서울",
    category: "액티비티",
    author: "사이클링매니아",
    date: "2025-09-05",
    description: "서울 한강을 따라 즐기는 최고의 사이클링 코스를 안내합니다.",
    views: 612,
    image: "https://images.unsplash.com/photo-1549693578-d683be217e58?w=400&h=300&fit=crop"
  },
  {
    id: 12,
    title: "제주 해녀 체험 프로그램",
    region: "제주",
    category: "문화",
    author: "제주문화",
    date: "2025-09-03",
    description: "제주의 전통 해녀 문화를 직접 체험할 수 있는 특별한 프로그램.",
    views: 789,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop"
  },
  {
    id: 13,
    title: "부산 자갈치시장 맛집 탐방",
    region: "부산",
    category: "맛집",
    author: "부산맛집",
    date: "2025-09-01",
    description: "부산 자갈치시장에서만 맛볼 수 있는 신선한 해산물 맛집들.",
    views: 923,
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop"
  },
  {
    id: 14,
    title: "강원도 설악산 등반 가이드",
    region: "강원",
    category: "액티비티",
    author: "산악여행",
    date: "2025-08-30",
    description: "설악산의 아름다운 자연을 만끽할 수 있는 등반 코스 완벽 가이드.",
    views: 1087,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
  },
  {
    id: 15,
    title: "전주 비빔밥 맛집 순례",
    region: "전라",
    category: "맛집",
    author: "전주맛집",
    date: "2025-08-28",
    description: "전주 비빔밥의 진수를 맛볼 수 있는 최고의 맛집들을 소개합니다.",
    views: 578,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop"
  },
  {
    id: 16,
    title: "경기도 아침고요수목원",
    region: "경기",
    category: "국내여행",
    author: "자연여행",
    date: "2025-08-25",
    description: "사계절 아름다운 꽃과 나무를 감상할 수 있는 아침고요수목원.",
    views: 445,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop"
  },
  {
    id: 17,
    title: "인천 송도 센트럴파크",
    region: "인천",
    category: "문화",
    author: "도시여행",
    date: "2025-08-23",
    description: "도심 속 자연을 만끽할 수 있는 송도 센트럴파크의 모든 것.",
    views: 367,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
  },
  {
    id: 18,
    title: "충청도 공주 백제문화단지",
    region: "충청",
    category: "문화",
    author: "역사여행",
    date: "2025-08-20",
    description: "백제의 찬란한 문화를 체험할 수 있는 공주 백제문화단지 탐방기.",
    views: 632,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
  }
];

// 관광공사 추천여행지 데이터
export const tourismCards = [
  {
    id: 1,
    title: "서울 명동",
    description: "서울의 대표적인 쇼핑과 관광지",
    image: "https://images.unsplash.com/photo-1549693578-d683be217e58?w=300&h=200&fit=crop",
    region: "서울",
    keywords: ["쇼핑", "도시", "관광"]
  },
  {
    id: 2,
    title: "제주 한라산",
    description: "제주도의 상징인 한라산 등반",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    region: "제주",
    keywords: ["등산", "자연", "산"]
  },
  {
    id: 3,
    title: "부산 해운대",
    description: "부산의 대표적인 해변 관광지",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
    region: "부산",
    keywords: ["바다", "해변", "휴양"]
  },
  {
    id: 4,
    title: "강원 설악산",
    description: "강원도의 아름다운 설악산",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    region: "강원",
    keywords: ["등산", "자연", "산", "단풍"]
  },
  {
    id: 5,
    title: "경주 불국사",
    description: "신라의 역사가 살아있는 불국사",
    image: "https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?w=300&h=200&fit=crop",
    region: "경상",
    keywords: ["역사", "문화", "사찰"]
  },
  {
    id: 6,
    title: "전주 한옥마을",
    description: "전통 한옥의 아름다움을 느낄 수 있는 곳",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=300&h=200&fit=crop",
    region: "전라",
    keywords: ["역사", "문화", "전통", "한옥"]
  },
  {
    id: 7,
    title: "인천 차이나타운",
    description: "인천의 다문화 특색을 느낄 수 있는 곳",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop",
    region: "경기",
    keywords: ["문화", "음식", "쇼핑"]
  },
  {
    id: 8,
    title: "안동 하회마을",
    description: "유네스코 세계문화유산 하회마을",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop",
    region: "경상",
    keywords: ["역사", "문화", "전통", "마을"]
  },
  {
    id: 9,
    title: "서울 북촌한옥마을",
    description: "서울 도심 속 전통 한옥마을",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    region: "서울",
    keywords: ["역사", "문화", "전통", "한옥"]
  },
  {
    id: 10,
    title: "제주 성산일출봉",
    description: "제주도 동쪽 끝 일출 명소",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    region: "제주",
    keywords: ["자연", "일출", "해안"]
  },
  {
    id: 11,
    title: "부산 감천문화마을",
    description: "부산의 산토리니라 불리는 컬러풀한 마을",
    image: "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?w=300&h=200&fit=crop",
    region: "부산",
    keywords: ["문화", "마을", "예술"]
  },
  {
    id: 12,
    title: "강원 남이섬",
    description: "겨울연가 촬영지로 유명한 낭만적인 섬",
    image: "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=300&h=200&fit=crop",
    region: "강원",
    keywords: ["자연", "휴양", "섬"]
  },
  {
    id: 13,
    title: "서울 경복궁",
    description: "조선왕조의 법궁, 대한민국 대표 궁궐",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
    region: "서울",
    keywords: ["역사", "문화", "궁궐", "전통"]
  },
  {
    id: 14,
    title: "제주 우도",
    description: "소가 누워있는 모양의 아름다운 섬",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    region: "제주",
    keywords: ["자연", "섬", "바다", "휴양"]
  },
  {
    id: 15,
    title: "부산 용두산공원",
    description: "부산타워가 있는 부산의 대표 공원",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    region: "부산",
    keywords: ["도시", "관광", "전망"]
  },
  {
    id: 16,
    title: "강원 춘천호",
    description: "춘천 시내를 흐르는 아름다운 호수",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    region: "강원",
    keywords: ["자연", "호수", "휴양"]
  },
  {
    id: 17,
    title: "전라 여수 밤바다",
    description: "아름다운 야경으로 유명한 여수 해안",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=300&h=200&fit=crop",
    region: "전라",
    keywords: ["바다", "야경", "휴양"]
  },
  {
    id: 18,
    title: "경상 포항 호미곶",
    description: "한국 최동단 일출 명소",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    region: "경상",
    keywords: ["자연", "일출", "해안"]
  },
  {
    id: 19,
    title: "충청 단양팔경",
    description: "단양강 일대의 아름다운 8경",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    region: "충청",
    keywords: ["자연", "강", "명승"]
  },
  {
    id: 20,
    title: "서울 홍대거리",
    description: "젊음과 열정이 넘치는 문화거리",
    image: "https://images.unsplash.com/photo-1549693578-d683be217e58?w=300&h=200&fit=crop",
    region: "서울",
    keywords: ["문화", "쇼핑", "음식", "도시"]
  }
];

// 동행모집 채팅방 데이터
export const chatRooms = [
  {
    id: 1,
    title: "제주여행",
    members: 8,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    creator: {
      name: "제주러버",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  },
  {
    id: 2,
    title: "사진찍기 좋은곳",
    members: 52,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    creator: {
      name: "포토그래퍼",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
    }
  },
  {
    id: 3,
    title: "서울 맛집",
    members: 23,
    image: "https://images.unsplash.com/photo-1549693578-d683be217e58?w=400&h=300&fit=crop",
    creator: {
      name: "맛집헌터",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  },
  {
    id: 4,
    title: "등산 동호회",
    members: 15,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    creator: {
      name: "산악대장",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  },
  {
    id: 5,
    title: "부산 해운대",
    members: 31,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    creator: {
      name: "바다매니아",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
    }
  },
  {
    id: 6,
    title: "강원도 여행",
    members: 19,
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop",
    creator: {
      name: "강원도민",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  },
  {
    id: 7,
    title: "전주 한옥마을",
    members: 12,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    creator: {
      name: "한옥지킴이",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    }
  },
  {
    id: 8,
    title: "경주 역사투어",
    members: 27,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    creator: {
      name: "역사탐험가",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    }
  },
  {
    id: 9,
    title: "인천 차이나타운",
    members: 14,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    creator: {
      name: "차이나타운가이드",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face"
    }
  },
  {
    id: 10,
    title: "안동 하회마을",
    members: 6,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    creator: {
      name: "전통마을지킴이",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    }
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

// 완전한 동행모집 데이터 (CompanionList와 CompanionDetail에서 사용)
export const fullCompanionPosts = [
  {
    id: 1,
    title: "제주도 3박4일 여행 같이 가실 분!",
    ageGroup: "20대",
    region: "제주",
    date: "2024-02-15 ~ 2024-02-18",
    description: "제주도 한라산과 성산일출봉을 함께 둘러보실 분 모집합니다. 렌터카로 이동하며 자유롭게 여행할 예정입니다.",
    participants: { current: 2, max: 4 },
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    author: {
      name: "김여행",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      age: 25,
      location: "서울"
    },
    meetingPoint: "제주공항",
    estimatedCost: "1인당 15만원",
    travelStyle: ["자유여행", "자연탐방", "사진"],
    notice: "렌터카 운전 가능하신 분이면 더욱 좋겠습니다!"
  },
  {
    id: 2,
    title: "서울 맛집 투어",
    ageGroup: "30대",
    region: "서울",
    date: "2024-02-20 ~ 2024-02-21",
    description: "서울의 숨은 맛집들을 찾아 떠나는 투어입니다. 홍대, 이태원, 강남 일대를 돌아다닐 예정이에요.",
    participants: { current: 1, max: 3 },
    image: "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?w=400&h=300&fit=crop",
    author: {
      name: "이맛집",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b950?w=100&h=100&fit=crop&crop=face",
      age: 32,
      location: "서울"
    },
    meetingPoint: "홍대입구역",
    estimatedCost: "1인당 8만원",
    travelStyle: ["맛집투어", "도시여행"],
    notice: "매운 음식을 못 드시는 분은 미리 말씀해주세요!"
  },
  {
    id: 3,
    title: "부산 해운대 바다 여행",
    ageGroup: "20대",
    region: "부산",
    date: "2024-02-25 ~ 2024-02-27",
    description: "부산의 대표 관광지들을 함께 둘러보실 분 모집합니다. 해운대 해수욕장과 감천문화마을을 중심으로!",
    participants: { current: 3, max: 5 },
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    author: {
      name: "박부산",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      age: 28,
      location: "부산"
    },
    meetingPoint: "부산역",
    estimatedCost: "1인당 12만원",
    travelStyle: ["관광", "해변", "문화체험"],
    notice: "걷기 편한 신발로 와주세요!"
  },
  {
    id: 4,
    title: "강원도 겨울 산행",
    ageGroup: "30대",
    region: "강원",
    date: "2024-03-01 ~ 2024-03-03",
    description: "강원도의 아름다운 겨울 산행을 함께할 분들을 모집합니다. 설경이 아름다운 설악산을 함께 오르실래요?",
    participants: { current: 2, max: 4 },
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    author: {
      name: "최산행",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      age: 31,
      location: "강원"
    },
    meetingPoint: "속초터미널",
    estimatedCost: "1인당 10만원",
    travelStyle: ["등산", "자연탐방", "겨울스포츠"],
    notice: "등산화와 방한용품 필수입니다!"
  },
  {
    id: 5,
    title: "경주 역사 탐방 여행",
    ageGroup: "40대",
    region: "경상",
    date: "2024-03-05 ~ 2024-03-07",
    description: "경주의 천년 고도 역사를 탐방하는 여행입니다. 불국사, 석굴암, 첨성대 등을 함께 둘러보실 분 모집합니다.",
    participants: { current: 4, max: 6 },
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    author: {
      name: "한역사",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      age: 42,
      location: "경주"
    },
    meetingPoint: "경주역",
    estimatedCost: "1인당 13만원",
    travelStyle: ["역사탐방", "문화체험", "관광"],
    notice: "편한 걸음으로 역사 이야기를 나누며 천천히 둘러보아요!"
  },
  {
    id: 6,
    title: "전주 한옥마을 체험",
    ageGroup: "20대",
    region: "전라",
    date: "2024-03-10 ~ 2024-03-12",
    description: "전주 한옥마을에서 전통문화를 체험하고 맛있는 전주비빔밥을 맛보러 가실 분 모집합니다.",
    participants: { current: 2, max: 5 },
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop",
    author: {
      name: "전한옥",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      age: 26,
      location: "전주"
    },
    meetingPoint: "전주역",
    estimatedCost: "1인당 11만원",
    travelStyle: ["전통문화체험", "맛집투어", "한옥체험"],
    notice: "한복 대여도 가능하니 원하시는 분은 미리 말씀해주세요!"
  }
];

// 공통 상수 데이터
export const regions = [
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
