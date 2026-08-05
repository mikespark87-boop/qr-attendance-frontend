import React, { useContext, useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { AppContext, calculateRanking } from '../contexts/AppContext';
import './QuizScreen.css';

export default function QuizScreen() {
  const { state, answerQuiz, setQuizIndex, setScreen } = useContext(AppContext);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const currentQuiz = state.quizzes[state.currentQuizIndex];
  const isLastQuestion = state.currentQuizIndex === state.quizzes.length - 1;

  useEffect(() => {
    setSelectedAnswer(null);
    setAnswered(false);
    setShowResult(false);
    setIsCorrect(false);
  }, [state.currentQuizIndex]);

  if (!state.currentAttendee) {
    return (
      <div className="quiz-screen error-screen">
        <div className="error-card">
          <h2>❌ 오류</h2>
          <p>참석자 정보를 찾을 수 없습니다</p>
          <button
            className="btn btn-primary"
            onClick={() => setScreen('qr-scan')}
          >
            QR 스캔 화면으로
          </button>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (optionIndex) => {
    if (!answered) {
      setSelectedAnswer(optionIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      alert('답변을 선택해주세요');
      return;
    }

    const correct = selectedAnswer === currentQuiz.correct;
    setIsCorrect(correct);
    answerQuiz(state.currentQuizIndex, selectedAnswer);
    setAnswered(true);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setScreen('ranking');
    } else {
      setQuizIndex(state.currentQuizIndex + 1);
    }
  };

  const ranking = calculateRanking(state.scores);
  const currentRank = ranking.find((r) => r.userId === state.currentAttendee.id);

  return (
    <div className="quiz-screen">
      <div className="quiz-container">
        {/* 헤더 */}
        <div className="quiz-header">
          <div className="quiz-header-left">
            <h2>❓ 퀴즈</h2>
            <div className="progress-info">
              <span className="current-q">Q{state.currentQuizIndex + 1}</span>
              <span className="total-q">/ {state.quizzes.length}</span>
            </div>
          </div>
          <div className="quiz-header-right">
            <div className="attendee-qr">
              <QRCode
                value={state.currentAttendee.id}
                size={80}
                level="H"
                includeMargin={true}
              />
              <span className="qr-label">참석자 QR</span>
            </div>
          </div>
        </div>

        {/* 진행률 바 */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((state.currentQuizIndex + 1) / state.quizzes.length) * 100}%`
            }}
          ></div>
        </div>

        {/* 퀴즈 내용 */}
        <div className="quiz-content">
          <div className="quiz-info">
            <span className="category-badge">{currentQuiz.category}</span>
            <span className="difficulty-badge" data-difficulty={currentQuiz.difficulty}>
              {currentQuiz.difficulty === 'easy'
                ? '쉬움'
                : currentQuiz.difficulty === 'medium'
                ? '중간'
                : '어려움'}
            </span>
            <span className="points-badge">{currentQuiz.points}점</span>
          </div>

          <h3 className="quiz-question">{currentQuiz.question}</h3>

          <div className="quiz-options">
            {currentQuiz.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedAnswer === index ? 'selected' : ''} ${
                  answered && index === currentQuiz.correct ? 'correct' : ''
                } ${answered && selectedAnswer === index && !isCorrect ? 'incorrect' : ''}`}
                onClick={() => handleAnswerSelect(index)}
                disabled={answered}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>

          {showResult && (
            <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? (
                <>
                  <strong>✅ 정답입니다!</strong>
                  <span>+{currentQuiz.points}점</span>
                </>
              ) : (
                <>
                  <strong>❌ 오답입니다</strong>
                  <span>정답은 {String.fromCharCode(65 + currentQuiz.correct)}번입니다</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* 실시간 랭킹 */}
        <div className="realtime-ranking">
          <h4>🏆 실시간 랭킹</h4>
          <div className="ranking-list">
            {ranking.slice(0, 3).map((rank, idx) => (
              <div
                key={idx}
                className={`ranking-item ${
                  rank.userId === state.currentAttendee.id ? 'current-user' : ''
                }`}
              >
                <div className="rank-badge">#{rank.rank}</div>
                <div className="rank-info">
                  <strong>{rank.userId}</strong>
                  <span>{rank.score}점</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 버튼 */}
        <div className="quiz-actions">
          {!answered ? (
            <button
              className="btn btn-primary btn-large"
              onClick={handleSubmitAnswer}
            >
              제출하기
            </button>
          ) : (
            <button
              className="btn btn-primary btn-large"
              onClick={handleNextQuestion}
            >
              {isLastQuestion ? '결과 보기' : '다음 문제'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
