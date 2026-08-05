// Mock 데이터 - Backend 완성 후 API로 대체

// 📋 참석자 데이터 (10명)
export const mockUsers = [
  {
    id: 1,
    name: "김철수",
    email: "chulsu@company.com",
    department: "개발팀",
    position: "개발자",
    phone: "010-1234-5678",
    qrCode: "QR001"
  },
  {
    id: 2,
    name: "이영희",
    email: "younghee@company.com",
    department: "마케팅팀",
    position: "마케팅 담당자",
    phone: "010-2345-6789",
    qrCode: "QR002"
  },
  {
    id: 3,
    name: "박민준",
    email: "minjun@company.com",
    department: "기획팀",
    position: "기획자",
    phone: "010-3456-7890",
    qrCode: "QR003"
  },
  {
    id: 4,
    name: "최수진",
    email: "sujin@company.com",
    department: "디자인팀",
    position: "디자이너",
    phone: "010-4567-8901",
    qrCode: "QR004"
  },
  {
    id: 5,
    name: "정준호",
    email: "junho@company.com",
    department: "영업팀",
    position: "영업 담당자",
    phone: "010-5678-9012",
    qrCode: "QR005"
  },
  {
    id: 6,
    name: "오지은",
    email: "jieun@company.com",
    department: "인사팀",
    position: "인사담당",
    phone: "010-6789-0123",
    qrCode: "QR006"
  },
  {
    id: 7,
    name: "허성민",
    email: "sungmin@company.com",
    department: "재무팀",
    position: "재무 담당자",
    phone: "010-7890-1234",
    qrCode: "QR007"
  },
  {
    id: 8,
    name: "권대호",
    email: "daeho@company.com",
    department: "개발팀",
    position: "선임개발자",
    phone: "010-8901-2345",
    qrCode: "QR008"
  },
  {
    id: 9,
    name: "송미경",
    email: "mikyoung@company.com",
    department: "마케팅팀",
    position: "마케팅 담당자",
    phone: "010-9012-3456",
    qrCode: "QR009"
  },
  {
    id: 10,
    name: "이준형",
    email: "junhyung@company.com",
    department: "기획팀",
    position: "선임기획자",
    phone: "010-0123-4567",
    qrCode: "QR010"
  }
];

// 🎯 퀴즈 데이터 (10개)
export const mockQuizzes = [
  {
    id: 1,
    question: "우리 회사의 설립 연도는 몇 년인가요?",
    options: ["2010년", "2015년", "2020년", "2025년"],
    correctAnswer: "2015년",
    difficulty: "easy",
    points: 10,
    category: "회사정보"
  },
  {
    id: 2,
    question: "QR 코드는 어느 나라에서 개발되었나요?",
    options: ["일본", "미국", "한국", "독일"],
    correctAnswer: "일본",
    difficulty: "easy",
    points: 10,
    category: "기술상식"
  },
  {
    id: 3,
    question: "이번 행사의 주요 목표는 무엇인가요?",
    options: [
      "출석 관리 및 참여도 증대",
      "비용 절감만",
      "단순 정보 공유",
      "교육만"
    ],
    correctAnswer: "출석 관리 및 참여도 증대",
    difficulty: "easy",
    points: 10,
    category: "행사정보"
  },
  {
    id: 4,
    question: "우리 회사의 주요 사업 분야는?",
    options: [
      "소프트웨어 개발",
      "하드웨어 판매",
      "컨설팅",
      "교육"
    ],
    correctAnswer: "소프트웨어 개발",
    difficulty: "easy",
    points: 10,
    category: "회사정보"
  },
  {
    id: 5,
    question: "다음 중 가장 최신 기술은?",
    options: [
      "인공지능(AI)",
      "블록체인",
      "양자 컴퓨팅",
      "클라우드 컴퓨팅"
    ],
    correctAnswer: "양자 컴퓨팅",
    difficulty: "medium",
    points: 15,
    category: "기술상식"
  },
  {
    id: 6,
    question: "React의 주요 장점은?",
    options: [
      "컴포넌트 기반 아키텍처",
      "가장 빠른 속도",
      "가장 쉬운 학습곡선",
      "가장 적은 메모리 사용"
    ],
    correctAnswer: "컴포넌트 기반 아키텍처",
    difficulty: "medium",
    points: 15,
    category: "개발기술"
  },
  {
    id: 7,
    question: "JavaScript는 어느 회사에서 만들었나요?",
    options: [
      "Netscape",
      "Microsoft",
      "Google",
      "Apple"
    ],
    correctAnswer: "Netscape",
    difficulty: "hard",
    points: 20,
    category: "개발기술"
  },
  {
    id: 8,
    question: "REST API의 HTTP 메서드 중 데이터 생성에 사용되는 것은?",
    options: [
      "GET",
      "POST",
      "PUT",
      "DELETE"
    ],
    correctAnswer: "POST",
    difficulty: "medium",
    points: 15,
    category: "개발기술"
  },
  {
    id: 9,
    question: "데이터베이스 정규화의 첫 번째 정규형(1NF)의 조건은?",
    options: [
      "원자성 보장",
      "함수 종속성 제거",
      "이행적 종속성 제거",
      "부분적 종속성 제거"
    ],
    correctAnswer: "원자성 보장",
    difficulty: "hard",
    points: 20,
    category: "개발기술"
  },
  {
    id: 10,
    question: "클라우드 컴퓨팅의 세 가지 주요 서비스 모델은?",
    options: [
      "IaaS, PaaS, SaaS",
      "TCP, UDP, HTTP",
      "HTML, CSS, JavaScript",
      "MySQL, MongoDB, PostgreSQL"
    ],
    correctAnswer: "IaaS, PaaS, SaaS",
    difficulty: "hard",
    points: 20,
    category: "기술상식"
  }
];

// 🎁 경품 데이터 (5개)
export const mockPrizes = [
  {
    id: 1,
    name: "스타벅스 기프트카드",
    description: "10,000원 상당",
    image: "☕",
    value: 10000,
    quantity: 10,
    winCondition: "정답 1개 이상"
  },
  {
    id: 2,
    name: "무선 이어폰",
    description: "프리미엄 블루투스 헤드폰",
    image: "🎧",
    value: 80000,
    quantity: 3,
    winCondition: "정답 5개 이상"
  },
  {
    id: 3,
    name: "편의점 상품권",
    description: "50,000원 상당",
    image: "🎫",
    value: 50000,
    quantity: 5,
    winCondition: "정답 3개 이상"
  },
  {
    id: 4,
    name: "스마트 워치",
    description: "최신형 스마트 워치",
    image: "⌚",
    value: 200000,
    quantity: 1,
    winCondition: "정답 8개 이상"
  },
  {
    id: 5,
    name: "USB 외장하드",
    description: "1TB 용량 고속 저장소",
    image: "💾",
    value: 60000,
    quantity: 2,
    winCondition: "정답 6개 이상"
  }
];

// 🎊 이벤트 정보
export const mockEvent = {
  id: 1,
  name: "2026 상반기 전사 행사",
  date: "2026-08-05",
  time: "14:00 ~ 17:00",
  location: "한빛 빌딩 컨퍼런스홀",
  description: "전사 임직원 대상 팀빌딩 및 기술 세미나",
  totalAttendees: 10,
  currentAttendees: 0,
  status: "진행중"
};

// 🏆 당첨자 샘플 데이터
export const mockWinners = [
  {
    id: 1,
    userId: 1,
    userName: "김철수",
    prizeId: 1,
    prizeName: "스타벅스 기프트카드",
    winDate: "2026-08-05",
    claimStatus: "claimed"
  },
  {
    id: 2,
    userId: 3,
    userName: "박민준",
    prizeId: 3,
    prizeName: "편의점 상품권",
    winDate: "2026-08-05",
    claimStatus: "pending"
  }
];
