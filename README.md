# QR 기반 출석 검증 및 퀴즈응모 시스템 - Frontend

React를 사용한 QR 코드 기반 출석 검증 시스템의 Frontend 구현입니다.

## 🚀 시작하기

### 필수 사항
- Node.js 18.x 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 프로덕션 빌드
npm build
```

## 📋 프로젝트 구조

```
src/
├── components/
│   ├── QRScanner.js          # QR 스캔 및 출석 검증 컴포넌트
│   └── QRScanner.css
├── mockData.js               # Mock 데이터 (Backend 추후 대체)
├── App.js                    # 메인 애플리케이션
├── App.css
├── index.js                  # React 진입점
└── index.css
```

## ✨ 주요 기능

### 현재 구현된 기능
- ✅ QR 코드 입력 및 검증
- ✅ 참석자 정보 확인
- ✅ Mock 데이터를 통한 UI 테스트
- ✅ 중복 스캔 감지
- ✅ 출석 현황 리스트 표시

### 테스트용 QR 코드
```
QR001 - 김철수 (개발팀)
QR002 - 이영희 (마케팅팀)
QR003 - 박민준 (기획팀)
QR004 - 최수진 (디자인팀)
QR005 - 정준호 (영영팀)
```

## 🔄 Backend 추후 통합

Backend가 완성되면 다음을 수행하세요:

1. **환경 변수 설정**
   ```bash
   # .env 파일 생성
   REACT_APP_API_URL=https://your-api-domain.com/api
   ```

2. **API 호출 통합**
   - `src/services/api.js` 생성
   - Mock 데이터 대신 실제 API 호출로 변경

3. **재배포**
   ```bash
   npm run build
   git add .
   git commit -m "Integrate backend API"
   git push origin main
   ```

## 📦 배포

### Vercel에 배포
```bash
# Vercel CLI 설치 (선택사항)
npm i -g vercel

# 배포
vercel
```

또는 GitHub에 푸시하면 자동으로 배포됩니다.

## 🛠️ 기술 스택

- **Framework**: React 18.2.0
- **Package Manager**: npm
- **Styling**: CSS3
- **HTTP Client**: Axios (Backend 연동 시)
- **Build Tool**: React Scripts

## 📝 License

MIT

## 👨‍💻 개발자

- Email: mikesh.park@cheil.com
- Created: 2026-08-05

---

**Next Step**: Backend API 구성 후 `REACT_APP_API_URL` 환경 변수 추가
