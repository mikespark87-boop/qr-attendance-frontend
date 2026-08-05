export const mockQuizzes = [
  // 회사정보 (2개)
  {
    id: 1,
    category: '회사정보',
    difficulty: 'easy',
    points: 10,
    question: '제일기획의 설립년도는?',
    options: ['1984년', '1994년', '2000년', '2010년'],
    correct: 0
  },
  {
    id: 2,
    category: '회사정보',
    difficulty: 'medium',
    points: 15,
    question: '제일기획의 주요 비즈니스는?',
    options: ['광고제작', '컨설팅', '미디어플래닝', '모두 포함'],
    correct: 3
  },

  // 기술상식 (3개)
  {
    id: 3,
    category: '기술상식',
    difficulty: 'easy',
    points: 10,
    question: 'AI의 정의는?',
    options: ['인공지능', '자동화', '머신러닝', '기계학습'],
    correct: 0
  },
  {
    id: 4,
    category: '기술상식',
    difficulty: 'medium',
    points: 15,
    question: 'React는 무엇인가?',
    options: ['프로그래밍언어', 'JavaScript 라이브러리', '데이터베이스', '운영체제'],
    correct: 1
  },
  {
    id: 5,
    category: '기술상식',
    difficulty: 'hard',
    points: 20,
    question: 'REST API의 특징이 아닌 것은?',
    options: ['Stateless', 'Client-Server', 'Stateful', 'Cacheable'],
    correct: 2
  },

  // 개발기술 (4개)
  {
    id: 6,
    category: '개발기술',
    difficulty: 'easy',
    points: 10,
    question: 'HTML은 어떤 언어인가?',
    options: ['마크업언어', '프로그래밍언어', '스크립트언어', '쿼리언어'],
    correct: 0
  },
  {
    id: 7,
    category: '개발기술',
    difficulty: 'medium',
    points: 15,
    question: '다음 중 데이터베이스가 아닌 것은?',
    options: ['PostgreSQL', 'MongoDB', 'React', 'MySQL'],
    correct: 2
  },
  {
    id: 8,
    category: '개발기술',
    difficulty: 'hard',
    points: 20,
    question: '다음 중 프론트엔드 프레임워크는?',
    options: ['Django', 'Express', 'Vue', 'Flask'],
    correct: 2
  },
  {
    id: 9,
    category: '개발기술',
    difficulty: 'hard',
    points: 20,
    question: '버전 관리 시스템으로 가장 많이 사용되는 것은?',
    options: ['SVN', 'Git', 'Mercurial', 'Perforce'],
    correct: 1
  },

  // 행사정보 (1개)
  {
    id: 10,
    category: '행사정보',
    difficulty: 'easy',
    points: 10,
    question: '이 타운홀 미팅의 주제는?',
    options: ['AI 기술동향', '마케팅전략', '개발문화', '회사비전'],
    correct: 3
  }
];
