# 🎟️ QR 출석 검증 + 퀴즈 + 경품 시스템

행사/회의 참석자 관리를 위한 **QR 코드 스캔 기반 출석 검증 시스템**에 **퀴즈 응모 및 경품 증정 기능**을 통합한 모바일/웹 애플리케이션입니다.

---

## 📦 프로젝트 구조

```
qr-attendance-frontend/
├── frontend/                 # React 애플리케이션
│   ├── src/
│   │   ├── components/       # React 컴포넌트
│   │   ├── pages/           # 페이지 컴포넌트
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── .env.example
│
├── backend/                  # Node.js/Express API
│   ├── routes/              # API 라우터
│   ├── controllers/          # 비즈니스 로직
│   ├── models/              # 데이터 모델
│   ├── server.js            # 메인 서버 파일
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## 🚀 빠른 시작

### Frontend 실행

```bash
cd frontend
npm install
npm start
```

브라우저에서 `http://localhost:3000` 접속

### Backend 실행

```bash
cd backend
npm install
npm start
```

서버가 `http://localhost:5000`에서 실행됨

---

## 🎯 주요 기능

### 1. QR 코드 스캔 기반 출석 검증
- 카메라를 통한 실시간 QR 코드 인식
- 사전 등록된 참석자 데이터와 비교
- Verified/경고 메시지 표시

### 2. 퀴즈 응모 시스템
- 출석 검증 후 즉시 퀴즈 표시
- 다양한 난이도의 퀴즈 출제
- 실시간 정답 확인

### 3. 경품 증정 시스템
- 퀴즈 정답 기반 당첨 판정
- 당첨자 명단 관리
- 경품 배분 이력 기록

---

## 🛠️ 기술 스택

### Frontend
- React 18+
- Tailwind CSS (스타일링)
- Axios (HTTP 통신)
- react-qr-reader (QR 스캔)

### Backend
- Node.js + Express
- PostgreSQL/MongoDB (선택)
- JWT (인증)
- Nodemon (개발 환경)

---

## 📚 API 문서

### QR & Attendance
```
POST   /api/attendance/verify     # QR 코드 검증
GET    /api/attendance/:eventId   # 출석 기록 조회
```

### Quizzes
```
GET    /api/quizzes/:eventId      # 퀴즈 목록
POST   /api/quizzes/:quizId/respond # 퀴즈 답변 제출
```

### Prizes
```
GET    /api/prizes/:eventId       # 경품 목록
GET    /api/prizes/winners/:eventId # 당첨자 목록
```

---

## 🔗 배포 상태

- **Frontend**: Vercel (https://qr-attendance-frontend-fv1p-519or4cbd-mikey14.vercel.app)
- **Backend**: 준비 중 (Railway/Heroku 예정)

---

## 📝 개발 로드맵

- [ ] Backend API 기본 구조 완성
- [ ] 데이터베이스 스키마 설계
- [ ] QR 검증 로직 구현
- [ ] Frontend 페이지 레이아웃
- [ ] API 연동
- [ ] 통합 테스트
- [ ] 배포

---

## 👤 기여자

- mikey14 (mikespark87-boop)

---

## 📄 라이선스

ISC
