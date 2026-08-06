import React, { createContext, useReducer, useCallback } from 'react';
import { mockUsers } from '../data/mockUsers';
import { mockQuizzes } from '../data/mockQuizzes';
import { mockPrizes } from '../data/mockPrizes';

export const AppContext = createContext();

// localStorage 저장 함수
const saveToStorage = (state) => {
  console.log('[saveToStorage] 호출됨, attendees:', state.attendees.length);
  try {
    const toSave = {
      attendees: state.attendees,
      currentScreen: state.currentScreen,
    };
    console.log('[saveToStorage] 저장할 데이터:', toSave);
    localStorage.setItem('qr_app_state', JSON.stringify(toSave));
    console.log('✅ 저장 성공:', toSave.attendees.length, toSave.currentScreen);
  } catch (e) {
    console.error('❌ 저장 실패:', e.message);
  }
};

// 초기 상태 생성 함수 (localStorage에서 복원)
const initializeState = (defaultState) => {
  try {
    const saved = localStorage.getItem('qr_app_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.attendees && parsed.attendees.length > 0) {
        console.log('✅ 복원됨:', parsed.attendees.length, parsed.currentScreen);
        return {
          ...defaultState,
          attendees: parsed.attendees,
          currentScreen: parsed.currentScreen,
        };
      }
    }
  } catch (e) {
    console.error('복원 실패:', e);
  }
  console.log('❌ 복원 불가, 기본값 사용');
  return defaultState;
};

// 기본 초기 상태
const getInitialState = () => ({
  // 참석자 관리
  attendees: [], // 참석한 사람들
  allUsers: mockUsers, // 등록된 모든 참석자

  // 퀴즈 관리
  quizzes: mockQuizzes,
  currentQuizIndex: 0,

  // 현재 참석자 정보
  currentAttendee: null, // 현재 스캔/입력한 참석자
  registeredQR: null, // ReservationScreen에서 생성한 QR 코드

  // 퀴즈 응답
  answers: {}, // { userId: [답변들] }
  scores: {}, // { userId: 점수 }

  // 경품
  prizes: mockPrizes,
  winners: {}, // { userId: 경품정보 }

  // UI 상태
  currentScreen: 'admin', // 'admin', 'reservation', 'operator-qr-scan', 'quiz-entry', 'quiz', 'ranking'
  isQRMode: false, // QR 스캔 모드
  isQuizStarted: false, // 퀴즈 시작 여부
});

const initialState = getInitialState();

function appReducer(state, action) {
  switch (action.type) {
    // 화면 전환
    case 'SET_SCREEN': {
      const newState = { ...state, currentScreen: action.payload };
      saveToStorage(newState);
      return newState;
    }

    // 참석자 추가 (예약 또는 QR 스캔)
    case 'ADD_ATTENDEE': {
      const newState = {
        ...state,
        attendees: [...state.attendees, { ...action.payload, timestamp: new Date() }],
        currentAttendee: action.payload
      };
      saveToStorage(newState);
      return newState;
    }

    // 현재 참석자 설정
    case 'SET_CURRENT_ATTENDEE':
      return { ...state, currentAttendee: action.payload };

    // 퀴즈 답변 저장
    case 'ANSWER_QUIZ': {
      const userId = state.currentAttendee?.id;
      const updatedAnswers = { ...state.answers };
      if (!updatedAnswers[userId]) {
        updatedAnswers[userId] = [];
      }
      updatedAnswers[userId][action.payload.quizIndex] = action.payload.answer;

      // 점수 계산
      const updatedScores = calculateScores(updatedAnswers, state.quizzes);

      return {
        ...state,
        answers: updatedAnswers,
        scores: updatedScores,
        winners: calculateWinners(updatedScores, state.prizes)
      };
    }

    // 퀴즈 인덱스 업데이트
    case 'SET_QUIZ_INDEX':
      return { ...state, currentQuizIndex: action.payload };

    // 모든 상태 리셋 (관리자 초기화)
    case 'START_QUIZ':
      return { ...state, isQuizStarted: true, currentQuizIndex: 0 };

    case 'RESET_ALL':
      return initialState;

    default:
      return state;
  }
}

// 점수 계산 함수
function calculateScores(answers, quizzes) {
  const scores = {};

  Object.entries(answers).forEach(([userId, userAnswers]) => {
    let totalScore = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === quizzes[index].correct) {
        totalScore += quizzes[index].points;
      }
    });
    scores[userId] = totalScore;
  });

  return scores;
}

// 경품 판정 함수
function calculateWinners(scores, prizes) {
  const winners = {};

  Object.entries(scores).forEach(([userId, score]) => {
    const prize = prizes.find(p => score >= p.minScore && score <= p.maxScore);
    if (prize) {
      winners[userId] = prize;
    }
  });

  return winners;
}

// 랭킹 계산 함수 (점수 기준 내림차순)
export function calculateRanking(scores) {
  return Object.entries(scores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .map(([userId, score], index) => ({
      rank: index + 1,
      userId,
      score
    }));
}

export function AppProvider({ children }) {
  // useReducer의 초기화 함수로 localStorage 복원
  const [state, dispatch] = useReducer(appReducer, initialState, initializeState);

  // Action creators
  const setScreen = useCallback((screen) => {
    dispatch({ type: 'SET_SCREEN', payload: screen });
  }, []);

  const addAttendee = useCallback((attendeeData) => {
    dispatch({ type: 'ADD_ATTENDEE', payload: attendeeData });
  }, []);

  const setCurrentAttendee = useCallback((attendee) => {
    dispatch({ type: 'SET_CURRENT_ATTENDEE', payload: attendee });
  }, []);

  const answerQuiz = useCallback((quizIndex, answer) => {
    dispatch({ type: 'ANSWER_QUIZ', payload: { quizIndex, answer } });
  }, []);

  const setQuizIndex = useCallback((index) => {
    dispatch({ type: 'SET_QUIZ_INDEX', payload: index });
  }, []);

  const resetAll = useCallback(() => {
    dispatch({ type: 'RESET_ALL' });
  }, []);

  const startQuiz = useCallback(() => {
    dispatch({ type: 'START_QUIZ' });
  }, []);

  // 미참석자 목록 계산
  const getMissingAttendees = useCallback(() => {
    const attendeeIds = state.attendees.map(a => a.id);
    return state.allUsers.filter(user => !attendeeIds.includes(user.id));
  }, [state.attendees, state.allUsers]);

  const value = {
    state,
    setScreen,
    addAttendee,
    setCurrentAttendee,
    answerQuiz,
    setQuizIndex,
    resetAll,
    startQuiz,
    getMissingAttendees,
    calculateRanking: () => calculateRanking(state.scores)
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
