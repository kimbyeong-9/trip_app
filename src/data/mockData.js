// 동행 카드 데이터 (fullCompanionPosts에서 추출)
export const companionCards = [
  {
    id: 1,
    title: "제주도 3박4일 여행 같이 가실 분!",
    region: "제주",
    ageGroup: "20대",
    date: "2024-02-15 ~ 2024-02-18",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "서울 맛집 투어",
    region: "서울",
    ageGroup: "30대",
    date: "2024-02-20 ~ 2024-02-21",
    image: "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "부산 해운대 바다 여행",
    region: "부산",
    ageGroup: "20대",
    date: "2024-02-25 ~ 2024-02-27",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "강원도 겨울 산행",
    region: "강원",
    ageGroup: "30대",
    date: "2024-03-01 ~ 2024-03-03",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    title: "경주 역사 탐방 여행",
    region: "경상",
    ageGroup: "40대",
    date: "2024-03-05 ~ 2024-03-07",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    title: "전주 한옥마을 체험",
    region: "전라",
    ageGroup: "20대",
    date: "2024-03-10 ~ 2024-03-12",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop"
  }
];

// 일정 카드 데이터
export const itineraryCards = [
  {
    id: 1,
    title: "서울 2박3일 완벽 코스",
    region: "서울",
    author: "서울러버",
    date: "2024-01-10~2024-01-12",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    description: "서울의 대표 명소들을 효율적으로 돌아보는 완벽한 코스입니다. 경복궁, 북촌한옥마을, 인사동, 명동을 포함한 핫플레이스까지!",
    views: 1524,
    likes: 89,
    createdAt: "2024-01-10T09:00:00Z",
    detailedDescription: "서울의 전통과 현대가 공존하는 매력을 만끽할 수 있는 완벽한 2박3일 코스입니다.\n\n▶ 1일차: 경복궁 - 북촌한옥마을 - 인사동 - 청계천\n▶ 2일차: 명동 - 남산타워 - 동대문 디자인플라자 - 홍대\n▶ 3일차: 강남 - 압구정 - 한강공원 - 쇼핑\n\n대중교통으로 편리하게 이동 가능하며, 맛집 정보와 포토스팟까지 모두 포함된 알찬 일정입니다!",
    tags: ["문화", "쇼핑", "맛집", "전통"]
  },
  {
    id: 2,
    title: "제주도 4박5일 자유여행",
    region: "제주",
    author: "제주매니아",
    date: "2024-01-15~2024-01-19",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    description: "제주도의 숨은 명소와 맛집을 찾아 떠나는 자유여행 코스입니다. 한라산, 성산일출봉, 우도까지 완주!",
    views: 1856,
    likes: 142,
    createdAt: "2024-01-15T08:00:00Z",
    detailedDescription: "제주도의 숨겨진 보석같은 명소들을 찾아 떠나는 완벽한 자유여행 코스입니다.\n\n▶ 1일차: 제주공항 - 용두암 - 제주시내 맛집투어 - 동문시장\n▶ 2일차: 한라산 국립공원 - 1100고지 - 중문관광단지 - 천지연폭포\n▶ 3일차: 성산일출봉 - 우도 - 성산포 해수욕장 - 섭지코지\n▶ 4일차: 만장굴 - 김녕해수욕장 - 제주민속촌 - 카페거리\n▶ 5일차: 애월해안도로 - 한림공원 - 협재해수욕장 - 공항\n\n렌터카로 자유롭게 이동하며 제주도만의 특별한 매력을 만끽할 수 있는 일정입니다!",
    tags: ["자연탐방", "해변", "맛집", "드라이브"]
  },
  {
    id: 3,
    title: "부산 먹거리 투어",
    region: "부산",
    author: "부산푸드",
    date: "2024-02-01~2024-02-02",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
    description: "부산의 대표 먹거리들을 맛볼 수 있는 투어입니다. 해운대, 광안리, 자갈치시장의 신선한 해산물까지!",
    views: 2134,
    likes: 178,
    createdAt: "2024-02-01T10:30:00Z",
    detailedDescription: "부산의 진짜 맛을 찾아 떠나는 미식 여행! 바다가 주는 신선한 해산물부터 부산만의 독특한 길거리 음식까지.\n\n▶ 1일차 오전: 자갈치시장 - 신선한 회와 해산물 시식\n▶ 1일차 점심: 부산어묵 체험관 - 밀면 맛집 투어\n▶ 1일차 저녁: 해운대 포장마차 - 부산 대표 술집\n▶ 2일차 오전: 국제시장 - 씨앗호떡, 비빔당면\n▶ 2일차 점심: 광안리 해변 - 조개구이, 꼼장어\n▶ 2일차 저녁: 서면 맛집거리 - 돼지국밥, 동래파전\n\n부산 현지인이 추천하는 진짜 맛집들만 엄선했습니다!",
    tags: ["맛집투어", "해산물", "길거리음식", "시장"]
  },
  {
    id: 4,
    title: "강원도 설악산 등반",
    region: "강원",
    author: "등산러버",
    date: "2024-02-10~2024-02-11",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    description: "겨울 설악산의 웅장한 설경을 만날 수 있는 등반 코스입니다. 케이블카와 도보 코스 선택 가능!",
    views: 1672,
    likes: 126,
    createdAt: "2024-02-10T07:00:00Z",
    detailedDescription: "겨울 설악산의 절경을 만끽할 수 있는 완벽한 등반 코스입니다. 눈꽃이 만들어내는 환상적인 풍경을 경험해보세요.\n\n▶ 1일차 오전: 속초 도착 - 설악산 국립공원 입장\n▶ 1일차 점심: 비선대 코스 등반 - 천불동계곡\n▶ 1일차 저녁: 권금성 케이블카 - 일몰 감상\n▶ 2일차 오전: 신흥사 - 울산바위 등반 코스\n▶ 2일차 점심: 토왕성폭포 - 비룡폭포 탐방\n▶ 2일차 저녁: 온천욕 - 속초 해산물 맛집\n\n초급자도 안전하게 즐길 수 있는 코스와 전문 등반 코스 모두 준비되어 있습니다!",
    tags: ["등산", "설경", "국립공원", "겨울여행"]
  },
  {
    id: 5,
    title: "전주 한옥마을 체험",
    region: "전라",
    author: "전주여행자",
    date: "2024-02-15~2024-02-16",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop",
    description: "전주 한옥마을에서 전통문화를 체험하고 맛있는 전라도 음식을 맛보는 코스입니다.",
    views: 1789,
    likes: 156,
    createdAt: "2024-02-15T09:15:00Z",
    detailedDescription: "한국의 전통미가 살아 숨쉬는 전주 한옥마을에서 특별한 문화체험을 즐겨보세요.\n\n▶ 1일차 오전: 전주 한옥마을 도착 - 한복 체험\n▶ 1일차 점심: 전주비빔밥 맛집 - 콩나물국밥\n▶ 1일차 오후: 경기전 - 오목대 - 한옥생활체험관\n▶ 1일차 저녁: 전주 막걸리 골목 - 전통주 체험\n▶ 2일차 오전: 한지공예 체험 - 전통차 체험\n▶ 2일차 점심: 한정식 맛집 - 전주 교동 최씨고택\n▶ 2일차 오후: 전주향교 - 풍남문 - 기념품 쇼핑\n\n한옥에서의 하룻밤으로 조선시대로 시간여행을 떠나보세요!",
    tags: ["전통문화", "한옥체험", "한복", "전라도음식"]
  },
  {
    id: 6,
    title: "경주 불국사와 석굴암",
    region: "경상",
    author: "역사탐방가",
    date: "2024-03-01~2024-03-02",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    description: "신라 천년의 역사가 살아 숨쉬는 경주의 대표 문화재를 탐방하는 여행입니다.",
    views: 1453,
    likes: 118,
    createdAt: "2024-03-01T08:30:00Z",
    detailedDescription: "천년고도 경주에서 신라의 찬란한 문화유산을 만나는 역사탐방 여행입니다.\n\n▶ 1일차 오전: 불국사 - 다보탑, 석가탑 관람\n▶ 1일차 점심: 토함산 맛집 - 경주쌈밥\n▶ 1일차 오후: 석굴암 - 동해바다 전망대\n▶ 1일차 저녁: 경주 황리단길 - 전통찻집\n▶ 2일차 오전: 첨성대 - 대릉원(천마총)\n▶ 2일차 점심: 경주향토음식 - 황남빵 체험\n▶ 2일차 오후: 안압지(동궁과 월지) - 국립경주박물관\n\n유네스코 세계문화유산을 직접 체험하며 신라 문화의 깊이를 느껴보세요!",
    tags: ["역사탐방", "문화유산", "불교문화", "신라"]
  },
  {
    id: 7,
    title: "인천 차이나타운 & 월미도",
    region: "인천",
    author: "인천탐험가",
    date: "2024-03-10~2024-03-11",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    description: "인천의 이국적인 분위기를 느낄 수 있는 차이나타운과 월미도 테마파크 코스입니다.",
    views: 1921,
    likes: 134,
    createdAt: "2024-03-10T10:00:00Z",
    detailedDescription: "인천의 독특한 매력을 만끽할 수 있는 다문화 체험 여행입니다.\n\n▶ 1일차 오전: 인천 차이나타운 - 짜장면 박물관\n▶ 1일차 점심: 공화춘 짜장면 - 중국식 만두\n▶ 1일차 오후: 자유공원 - 인천아트플랫폼\n▶ 1일차 저녁: 신포국제시장 - 닭강정 골목\n▶ 2일차 오전: 월미도 테마파크 - 바이킹, 디스코팡팡\n▶ 2일차 점심: 월미도 해산물 맛집 - 바다뷰 카페\n▶ 2일차 오후: 월미문화의거리 - 월미공원 산책\n\n이국적인 정취와 바다의 낭만을 동시에 즐길 수 있는 특별한 코스입니다!",
    tags: ["차이나타운", "테마파크", "다문화", "바다"]
  },
  {
    id: 8,
    title: "충청도 온천여행",
    region: "충청",
    author: "힐링여행자",
    date: "2024-03-15~2024-03-17",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop",
    description: "충청도의 유명 온천지에서 몸과 마음을 힐링할 수 있는 여행 코스입니다.",
    views: 1368,
    likes: 95,
    createdAt: "2024-03-15T11:20:00Z",
    detailedDescription: "일상의 피로를 말끔히 씻어줄 힐링 온천 여행으로 떠나보세요.\n\n▶ 1일차 오전: 온양온천 도착 - 온천 역사 탐방\n▶ 1일차 점심: 온양 맛집 - 순대국, 아산 배 체험\n▶ 1일차 저녁: 온양온천 입욕 - 족욕 체험\n▶ 2일차 오전: 도고온천 - 도고 8경 탐방\n▶ 2일차 점심: 충청도 향토음식 - 칼국수 맛집\n▶ 2일차 저녁: 스파 & 마사지 - 온천수 족욕\n▶ 3일차 오전: 유성온천 - 족욕공원 산책\n▶ 3일차 점심: 대전 맛집 - 성심당 튀김소보로\n\n자연이 주는 따뜻한 온천수로 몸과 마음의 힐링을 경험해보세요!",
    tags: ["온천", "힐링", "스파", "휴양"]
  },
  {
    id: 9,
    title: "서울 한강 자전거 투어",
    region: "서울",
    author: "자전거매니아",
    date: "2024-04-01~2024-04-02",
    image: "https://images.unsplash.com/photo-1549693578-d683be217e58?w=400&h=300&fit=crop",
    description: "한강을 따라 자전거로 달리며 서울의 아름다운 경치를 감상하는 액티비티 여행입니다.",
    views: 2045,
    likes: 167,
    createdAt: "2024-04-01T07:30:00Z",
    detailedDescription: "봄바람과 함께 한강을 달리는 상쾌한 자전거 여행을 즐겨보세요.\n\n▶ 1일차 오전: 여의도 한강공원 - 자전거 대여\n▶ 1일차 점심: 63빌딩 - 한강뷰 맛집\n▶ 1일차 오후: 반포 레인보우브릿지 - 반포한강공원\n▶ 1일차 저녁: 잠수교 - 한강 치킨 & 맥주\n▶ 2일차 오전: 뚝섬한강공원 - 자벌레 체험\n▶ 2일차 점심: 성수동 카페거리 - 브런치\n▶ 2일차 오후: 잠실 한강공원 - 석촌호수\n\n총 40km의 한강 자전거도로를 따라 서울의 숨겨진 매력을 발견해보세요!",
    tags: ["자전거", "한강", "액티비티", "봄여행"]
  },
  {
    id: 10,
    title: "제주 올레길 완주",
    region: "제주",
    author: "올레꾼",
    date: "2024-04-10~2024-04-14",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    description: "제주 올레길의 대표 코스들을 걸으며 제주의 자연을 온몸으로 느끼는 트래킹 여행입니다.",
    views: 1677,
    likes: 143,
    createdAt: "2024-04-10T06:00:00Z",
    detailedDescription: "제주의 아름다운 자연을 온몸으로 느끼는 올레길 완주 도전! 제주만의 특별한 풍경을 만나보세요.\n\n▶ 1일차: 올레 1코스 - 시흥초등학교~광치기해변 (15km)\n▶ 2일차: 올레 2코스 - 광치기해변~온평포구 (14.5km)\n▶ 3일차: 올레 7코스 - 외돌개~월평포구 (16.2km)\n▶ 4일차: 올레 10코스 - 화순금모래해변~모슬포항 (15.5km)\n▶ 5일차: 올레 15코스 - 한림공원~협재해수욕장 (19.3km)\n\n총 80km의 올레길을 완주하며 제주도의 숨겨진 비경과 해안절경을 만끽할 수 있습니다!",
    tags: ["올레길", "트래킹", "자연탐방", "도보여행"]
  },
  {
    id: 11,
    title: "부산 감천문화마을 탐방",
    region: "부산",
    author: "문화탐방가",
    date: "2024-04-20~2024-04-21",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    description: "부산의 대표 관광지 감천문화마을의 알록달록한 벽화마을을 탐방하는 여행입니다.",
    views: 1834,
    likes: 152,
    createdAt: "2024-04-20T09:45:00Z",
    detailedDescription: "부산의 마추픽추라 불리는 감천문화마을에서 예술과 문화가 어우러진 특별한 여행을 즐겨보세요.\n\n▶ 1일차 오전: 감천문화마을 - 하늘마루 전망대\n▶ 1일차 점심: 마을 카페 - 부산 전통 밀면\n▶ 1일차 오후: 벽화거리 탐방 - 예술 작품 감상\n▶ 1일차 저녁: 자갈치시장 - 해산물 맛집\n▶ 2일차 오전: 감천문화마을 체험 프로그램\n▶ 2일차 점심: 국제시장 - 부산 길거리 음식\n▶ 2일차 오후: 용두산공원 - 부산타워\n\n알록달록한 벽화와 함께 부산의 독특한 문화를 체험할 수 있는 포토제닉 여행코스입니다!",
    tags: ["벽화마을", "문화체험", "포토스팟", "예술"]
  },
  {
    id: 12,
    title: "강원도 춘천 레일바이크",
    region: "강원",
    author: "레일바이크러",
    date: "2024-05-01~2024-05-02",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    description: "춘천의 아름다운 자연 속에서 레일바이크를 타며 힐링하는 여행 코스입니다.",
    views: 1596,
    likes: 121,
    createdAt: "2024-05-01T08:15:00Z",
    detailedDescription: "춘천의 맑은 공기와 아름다운 자연 속에서 레일바이크의 특별한 즐거움을 만끽해보세요.\n\n▶ 1일차 오전: 김유정역 - 레일바이크 체험 시작\n▶ 1일차 점심: 강촌역 맛집 - 춘천닭갈비\n▶ 1일차 오후: 남이섬 - 강변 산책로\n▶ 1일차 저녁: 춘천명동 - 막국수 골목\n▶ 2일차 오전: 삼악산 케이블카 - 전망대\n▶ 2일차 점심: 춘천호반 - 호수뷰 카페\n▶ 2일차 오후: 소양강댐 - 청평사 템플스테이\n\n폐선로를 활용한 레일바이크로 춘천의 산과 강을 가로지르는 특별한 추억을 만들어보세요!",
    tags: ["레일바이크", "춘천", "자연체험", "액티비티"]
  },
  {
    id: 13,
    title: "경기도 에버랜드 & 한국민속촌",
    region: "경기",
    author: "테마파크러버",
    date: "2024-05-10~2024-05-11",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    description: "에버랜드에서 신나는 놀이기구를 즐기고 한국민속촌에서 전통문화를 체험하는 코스입니다.",
    views: 2278,
    likes: 189,
    createdAt: "2024-05-10T09:00:00Z",
    detailedDescription: "스릴 넘치는 놀이기구와 전통문화를 동시에 즐길 수 있는 완벽한 가족 여행 코스입니다.\n\n▶ 1일차 오전: 에버랜드 - T익스프레스, 아마존익스프레스\n▶ 1일차 점심: 에버랜드 내 레스토랑 - 세계음식\n▶ 1일차 오후: 사파리월드 - 동물 친구들과 만남\n▶ 1일차 저녁: 로즈페스티벌 - 야간 퍼레이드\n▶ 2일차 오전: 한국민속촌 - 전통혼례 체험\n▶ 2일차 점심: 민속촌 전통음식 - 궁중요리\n▶ 2일차 오후: 전통공예 체험 - 도자기 만들기\n\n현대적인 즐거움과 전통의 멋이 조화된 특별한 하루를 선사합니다!",
    tags: ["테마파크", "가족여행", "전통문화", "놀이기구"]
  },
  {
    id: 14,
    title: "전라도 여수 밤바다",
    region: "전라",
    author: "야경매니아",
    date: "2024-05-15~2024-05-17",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    description: "여수의 아름다운 밤바다와 야경을 감상할 수 있는 로맨틱한 여행 코스입니다.",
    views: 1945,
    likes: 164,
    createdAt: "2024-05-15T18:00:00Z",
    detailedDescription: "여수 밤바다의 로맨틱한 매력에 푹 빠져보는 감성 가득한 여행입니다.\n\n▶ 1일차 오후: 여수 엑스포 - 해양레일바이크\n▶ 1일차 저녁: 돌산대교 야경 - 로맨틱 디너\n▶ 1일차 밤: 여수 밤바다 유람선 - 야경 투어\n▶ 2일차 오전: 오동도 - 동백꽃 산책로\n▶ 2일차 점습: 여수 해산물 맛집 - 서대회무침\n▶ 2일차 저녁: 만성리 해수욕장 - 일몰 감상\n▶ 3일차 오전: 여수 웅천친수공원 - 아쿠아리움\n▶ 3일차 점심: 여수 10미 맛집 투어\n\n'여수 밤바다' 노래의 감성을 직접 느낄 수 있는 최고의 야경 명소들을 모두 담았습니다!",
    tags: ["야경", "밤바다", "로맨틱", "유람선"]
  },
  {
    id: 15,
    title: "경상도 안동 하회마을",
    region: "경상",
    author: "전통문화애호가",
    date: "2024-05-20~2024-05-21",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    description: "유네스코 세계문화유산인 안동 하회마을에서 전통 한옥 체험을 할 수 있는 여행입니다.",
    views: 1523,
    likes: 108,
    createdAt: "2024-05-20T07:45:00Z",
    detailedDescription: "600년 전통의 하회마을에서 조선시대 양반문화를 직접 체험하는 의미있는 여행입니다.\n\n▶ 1일차 오전: 안동 하회마을 도착 - 전통가옥 탐방\n▶ 1일차 점심: 안동찜닭 본고장 - 헛제사밥\n▶ 1일차 오후: 하회탈춤 공연 관람 - 탈 만들기 체험\n▶ 1일차 저녁: 한옥 숙박 - 전통차 체험\n▶ 2일차 오전: 부용대 - 낙동강 절경 감상\n▶ 2일차 점심: 안동간고등어 - 안동소주 시음\n▶ 2일차 오후: 도산서원 - 퇴계 이황의 흔적\n\n유네스코가 인정한 세계문화유산에서 한국의 전통 생활문화를 깊이 있게 체험해보세요!",
    tags: ["세계문화유산", "전통마을", "한옥체험", "탈춤"]
  },
  {
    id: 16,
    title: "서울 북한산 등반",
    region: "서울",
    author: "서울등산러",
    date: "2024-06-01~2024-06-02",
    image: "https://images.unsplash.com/photo-1549693578-d683be217e58?w=400&h=300&fit=crop",
    description: "서울 시민들의 대표 휴식처 북한산에서 등반과 힐링을 동시에 즐기는 여행입니다.",
    views: 1712,
    likes: 137,
    createdAt: "2024-06-01T06:30:00Z",
    detailedDescription: "도심 속 자연의 보고, 북한산에서 등반의 즐거움과 서울 전경을 한눈에 감상하는 여행입니다.\n\n▶ 1일차 오전: 북한산성 입구 - 대동문 코스\n▶ 1일차 점심: 산 중턱 쉼터 - 도시락 피크닉\n▶ 1일차 오후: 백운대 정상 등반 - 서울 전경 감상\n▶ 1일차 저녁: 정릉 맛집 - 산채정식\n▶ 2일차 오전: 인수봉 코스 - 암벽 바위 감상\n▶ 2일차 점심: 우이동 맛집 - 산나물 비빔밥\n▶ 2일차 오후: 북한산 둘레길 - 솔샘길 산책\n\n서울에서 가장 가까운 산행지에서 자연의 치유와 도시의 활력을 동시에 느껴보세요!",
    tags: ["등산", "도심산행", "자연치유", "서울전경"]
  },
  {
    id: 17,
    title: "제주 성산일출봉 일출 투어",
    region: "제주",
    author: "일출헌터",
    date: "2024-06-10~2024-06-12",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    description: "성산일출봉에서 장엄한 일출을 감상하고 우도까지 둘러보는 제주 동부 투어입니다.",
    views: 1889,
    likes: 158,
    createdAt: "2024-06-10T05:00:00Z",
    detailedDescription: "제주 동부의 절경과 함께 잊을 수 없는 일출의 감동을 만끽하는 특별한 여행입니다.\n\n▶ 1일차 새벽: 성산일출봉 일출 등반 (오전 5시)\n▶ 1일차 오전: 성산포항 - 우도 페리 탑승\n▶ 1일차 점심: 우도 땅콩 맛집 - 해산물라면\n▶ 1일차 오후: 우도 섭지코지 - 등대 투어\n▶ 2일차 오전: 만장굴 동굴 탐험\n▶ 2일차 점심: 김녕해수욕장 - 해변 카페\n▶ 2일차 오후: 월정리 해변 - 에메랄드빛 바다\n▶ 3일차 오전: 비자림 - 삼나무 숲길 산책\n▶ 3일차 점심: 표선 해비치 - 제주 흑돼지\n\n유네스코 세계자연유산의 웅장함과 제주 바다의 푸른 매력을 모두 담은 코스입니다!",
    tags: ["일출", "성산일출봉", "우도", "동부여행"]
  },
  {
    id: 18,
    title: "부산 태종대 & 용두산공원",
    region: "부산",
    author: "부산탐험가",
    date: "2024-06-15~2024-06-16",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
    description: "부산의 대표 관광지 태종대의 절경과 용두산공원의 부산타워를 구경하는 코스입니다.",
    views: 1643,
    likes: 129,
    createdAt: "2024-06-15T08:20:00Z",
    detailedDescription: "부산의 아름다운 자연 절경과 도시 전망을 모두 감상할 수 있는 완벽한 부산 투어입니다.\n\n▶ 1일차 오전: 태종대 국립공원 - 다누비 열차\n▶ 1일차 점심: 태종대 맛집 - 회센타 물회\n▶ 1일차 오후: 태종대 등대 - 절벽 해안 절경\n▶ 1일차 저녁: 자갈치시장 - 산 낙지 회\n▶ 2일차 오전: 용두산공원 - 부산타워 전망대\n▶ 2일차 점심: 남포동 맛집 - 부산어묵\n▶ 2일차 오후: 보수동 책방골목 - 국제시장\n\n부산 바다의 웅장함과 도심의 활기를 동시에 느낄 수 있는 부산 대표 명소 투어입니다!",
    tags: ["태종대", "부산타워", "절경", "해안경관"]
  },
  {
    id: 19,
    title: "강원도 정동진 기차여행",
    region: "강원",
    author: "기차여행러",
    date: "2024-07-01~2024-07-02",
    image: "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=400&h=300&fit=crop",
    description: "정동진역에서 바다를 바라보며 기차여행의 낭만을 느낄 수 있는 힐링 여행입니다.",
    views: 1456,
    likes: 113,
    createdAt: "2024-07-01T06:00:00Z",
    detailedDescription: "바다 가장 가까운 기차역 정동진에서 느끼는 특별한 기차여행의 낭만과 추억을 만들어보세요.\n\n▶ 1일차 오전: 청량리역 - 정동진행 기차 탑승\n▶ 1일차 점심: 기차 안 도시락 - 동해 바다 감상\n▶ 1일차 오후: 정동진역 도착 - 해변 산책\n▶ 1일차 저녁: 정동진 일출공원 - 조각공원\n▶ 2일차 새벽: 정동진 해변 일출 감상\n▶ 2일차 오전: 헌화로 드라이브 - 기암괴석\n▶ 2일차 점심: 강릉 맛집 - 초당순두부\n▶ 2일차 오후: 강릉역 - 서울행 KTX\n\n기차 창밖으로 펼쳐지는 동해안의 아름다운 경치와 함께하는 감성 충만한 여행입니다!",
    tags: ["기차여행", "정동진", "일출", "동해안"]
  },
  {
    id: 20,
    title: "충청도 단양 패러글라이딩",
    region: "충청",
    author: "익스트림러버",
    date: "2024-07-10~2024-07-11",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    description: "단양의 아름다운 자연 위로 패러글라이딩을 하며 스릴과 경치를 동시에 즐기는 여행입니다.",
    views: 2156,
    likes: 173,
    createdAt: "2024-07-10T07:00:00Z",
    detailedDescription: "충청북도 단양의 웅장한 자연 위에서 패러글라이딩을 통해 스릴과 절경을 만끽하는 익스트림 스포츠 여행입니다.\n\n▶ 1일차 오전: 단양 페러글라이딩장 도착 - 안전교육 및 장비 착용\n▶ 1일차 점심: 단양 맛집 - 마늘정식, 단양강 매운탕\n▶ 1일차 오후: 패러글라이딩 체험 - 활공 및 착륙\n▶ 1일차 저녁: 단양8경 투어 - 도담삼봉, 석문\n▶ 2일차 오전: 고수동굴 탐험 - 석회동굴 신비체험\n▶ 2일차 점심: 소백산 자락 맛집 - 산채정식\n▶ 2일차 오후: 단양강 래프팅 - 계곡 액티비티\n\n높은 곳에서 내려다보는 단양의 절경과 함께 아드레날린이 솟구치는 패러글라이딩의 짜릿함을 경험해보세요!",
    tags: ["패러글라이딩", "익스트림스포츠", "단양8경", "액티비티"]
  }
];

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
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    title: "사진찍기 좋은곳",
    members: 52,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    title: "서울 맛집",
    members: 23,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    title: "등산 동호회",
    members: 15,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    title: "부산 해운대",
    members: 31,
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 6,
    title: "강원도 여행",
    members: 19,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 7,
    title: "전주 한옥마을",
    members: 12,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 8,
    title: "경주 역사투어",
    members: 27,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 9,
    title: "인천 차이나타운",
    members: 14,
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 10,
    title: "안동 하회마을",
    members: 6,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
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
