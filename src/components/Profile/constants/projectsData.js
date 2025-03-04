export const projects = [
  {
    id: 1,
    title: "Beevarium",
    description: "Web-RTC 기반 실시간 욕설 필터링 + 한/영 번역 웹 라이브 스트리밍 서비스",
    tech: ["Vue.js", "Java", "Spring Boot", "WebRTC", "OpenVidu"],
    thumbnail: "/assets/projects/beevarium.png",
    demoUrl: "https://chajunseok.github.io/beevarium",
    githubUrl: "https://github.com/chajunseok/beevarium",
    isMobile: false,
    features: [
      "실시간 스트리밍",
      "채팅 욕설 필터링",
      "실시간 한/영 번역",
      "클립 생성 및 공유"
    ]
  },
  {
    id: 2,
    title: "POTLESS",
    description: "도로 파손 데이터 시각화 및 관리 시스템",
    tech: [
      "Vue.js",
      "Spring Boot",
      "Python",
      "YOLO v8",
      "MySQL"
    ],
    thumbnail: "/assets/projects/potless.png",
    demoUrl: "https://chajunseok.github.io/potless",
    githubUrl: "https://github.com/chajunseok/potless",
    isMobile: false,
    features: [
      "도로 파손 위치 시각화",
      "지역별 통계 대시보드",
      "파손 유형별 분류",
      "위험도 분석 및 관리"
    ]
  },
  {
    id: 3,
    title: "BeddingHome",
    description: "침구 브랜드 웹사이트 제작 외주",
    tech: ["React.js", "Node.js", "MongoDB"],
    thumbnail: "/assets/projects/beddinghome.png",
    demoUrl: "https://beddinghome.co.kr",
    githubUrl: "https://github.com/chajunseok/beddinghome",
    isMobile: false,
    features: [
      "반응형 웹 디자인",
      "제품 카탈로그",
      "주문/결제 시스템",
      "관리자 CMS"
    ]
  },
  {
    id: 4,
    title: "Finance Fit Mate",
    description: "금융 데이터를 활용한 맞춤형 금융 상품 추천 서비스",
    tech: ["Vue.js", "Django", "Python", "MySQL"],
    thumbnail: "/assets/projects/finance-fit-mate.png",
    demoUrl: "https://chajunseok.github.io/finance-fit-mate",
    githubUrl: "https://github.com/chajunseok/finance-fit-mate",
    isMobile: false,
    features: [
      "금융 상품 추천 알고리즘",
      "실시간 환율 정보",
      "은행 지점 찾기",
      "커뮤니티 서비스"
    ]
  },
  {
    id: 5,
    title: "TISO",
    description: "빅데이터 분산처리를 기반한 재난 대피 모바일 애플리케이션 서비스",
    tech: ["React Native", "FastAPI", "MongoDB", "OpenAI", "Firebase"],
    thumbnail: "/assets/projects/tiso.gif",
    isMobile: true,
    demoUrl: 0,
    githubUrl: "https://github.com/chajunseok/tiso",
    features: [
      "재난 문자 분석 및 푸시 알림",
      "A* 알고리즘 기반 최적 대피 경로",
      "대피소/병원/약국 정보 제공",
      "재난별 행동요령 가이드"
    ]
  }
]; 