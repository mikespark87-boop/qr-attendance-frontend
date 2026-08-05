// Mock 데이터 - Backend 완성 후 API로 대체

export const mockUsers = [
  {
    id: 1,
    name: "김철수",
    email: "chulsu@company.com",
    department: "개발팀",
    qrCode: "QR001"
  },
  {
    id: 2,
    name: "이영희",
    email: "younghee@company.com",
    department: "마케팅팀",
    qrCode: "QR002"
  },
  {
    id: 3,
    name: "박민준",
    email: "minjun@company.com",
    department: "기획팀",
    qrCode: "QR003"
  },
  {
    id: 4,
    name: "최수진",
    email: "sujin@company.com",
    department: "디자인팀",
    qrCode: "QR004"
  },
  {
    id: 5,
    name: "정준호",
    email: "junho@company.com",
    department: "영업팀",
    qrCode: "QR005"
  }
];

export const mockQuizzes = [
  {
    id: 1,
    question: "우리 회사의 설립 연도는 몇 년인가요?",
    options: ["2010년", "2015년", "2020년", "2025년"],
    correctAnswer: "2015년",
    difficulty: "easy"
  },
  {
    id: 2,
    question: "QR 코드는 어느 나라에서 개발되었나요?",
    options: ["일본", "미국", "한국", "독일"],
    correctAnswer: "일본",
    difficulty: "easy"
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
    difficulty: "medium"
  }
];

export const mockPrizes = [
  {
    id: 1,
    name: "스타벅스 기프트카드",
    description: "10,000원 상당",
    image: "☕"
  },
  {
    id: 2,
    name: "무선 이어폰",
    description: "프리미엄 블루투스",
    image: "🎧"
  },
  {
    id: 3,
    name: "편의점 상품권",
    description: "50,000원 상당",
    image: "🎫"
  },
  {
    id: 4,
    name: "스마트 워치",
    description: "최신형",
    image: "⌚"
  }
];
