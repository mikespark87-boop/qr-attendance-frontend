import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { state, setScreen, resetAll, startQuiz, getMissingAttendees } = useContext(AppContext);

  const handleStartReservation = () => {
    setScreen('reservation');
  };

  const handleStartEvent = () => {
    setScreen('operator-qr-scan');
  };

  const handleStartQuiz = () => {
    if (state.attendees.length === 0) {
      alert('참석자가 없습니다. 먼저 참석자를 등록해주세요.');
      return;
    }
    startQuiz();
    setScreen('quiz');
  };

  const handleResetEvent = () => {
    if (window.confirm('정말로 모든 데이터를 초기화하시겠습니까?')) {
      resetAll();
    }
  };

  const missingAttendees = getMissingAttendees();

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        {/* 헤더 */}
        <div className="admin-header">
          <h2>🔧 관리자 대시보드</h2>
          <div className="admin-actions">
            <button className="btn btn-secondary" onClick={handleStartReservation}>
              📝 참석 등록
            </button>
            <button className="btn btn-primary" onClick={handleStartEvent}>
              🔍 참석자 QR 스캔
            </button>
            <button
              className="btn btn-success"
              onClick={handleStartQuiz}
              disabled={state.attendees.length === 0}
            >
              ▶️ 퀴즈 시작
            </button>
            <button className="btn btn-secondary" onClick={handleResetEvent}>
              초기화
            </button>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="admin-grid">
          {/* 예약자 현황 */}
          <div className="admin-card">
            <div className="card-header">
              <h3>📋 예약자 현황</h3>
              <span className="badge badge-primary">{state.allUsers.length}명</span>
            </div>
            <div className="card-body">
              <div className="user-list">
                {state.allUsers.map((user) => (
                  <div key={user.id} className="user-item">
                    <div className="user-info">
                      <strong>{user.name}</strong>
                      <span className="text-small">{user.department}</span>
                    </div>
                    <span className="badge badge-gray">{user.id}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 참석자 현황 */}
          <div className="admin-card">
            <div className="card-header">
              <h3>✅ 참석자 현황</h3>
              <span className="badge badge-success">{state.attendees.length}명</span>
            </div>
            <div className="card-body">
              {state.attendees.length === 0 ? (
                <p className="text-center">참석자가 없습니다</p>
              ) : (
                <div className="attendee-list">
                  {state.attendees.map((attendee, idx) => (
                    <div key={idx} className="attendee-item">
                      <div className="attendee-info">
                        <strong>{attendee.name || attendee.id}</strong>
                        <span className="text-small">{attendee.department}</span>
                      </div>
                      <span className="badge badge-success">참석</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 미참석자 현황 */}
          <div className="admin-card">
            <div className="card-header">
              <h3>⏳ 미참석자 현황</h3>
              <span className="badge badge-warning">{missingAttendees.length}명</span>
            </div>
            <div className="card-body">
              {missingAttendees.length === 0 ? (
                <p className="text-center">모든 예약자가 참석했습니다!</p>
              ) : (
                <div className="missing-list">
                  {missingAttendees.map((user) => (
                    <div key={user.id} className="missing-item">
                      <div className="missing-info">
                        <strong>{user.name}</strong>
                        <span className="text-small">{user.department}</span>
                      </div>
                      <span className="badge badge-warning">미참석</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 퀴즈 관리 */}
          <div className="admin-card">
            <div className="card-header">
              <h3>❓ 퀴즈 관리</h3>
              <span className="badge badge-primary">{state.quizzes.length}개</span>
            </div>
            <div className="card-body">
              <div className="quiz-summary">
                <div className="summary-item">
                  <strong>쉬움(Easy)</strong>
                  <span>{state.quizzes.filter((q) => q.difficulty === 'easy').length}개</span>
                </div>
                <div className="summary-item">
                  <strong>중간(Medium)</strong>
                  <span>{state.quizzes.filter((q) => q.difficulty === 'medium').length}개</span>
                </div>
                <div className="summary-item">
                  <strong>어려움(Hard)</strong>
                  <span>{state.quizzes.filter((q) => q.difficulty === 'hard').length}개</span>
                </div>
              </div>
              <div className="quiz-list">
                {state.quizzes.map((quiz) => (
                  <div key={quiz.id} className="quiz-item">
                    <strong>{quiz.id}. {quiz.question}</strong>
                    <span className="badge badge-gray">{quiz.difficulty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 경품 관리 */}
          <div className="admin-card">
            <div className="card-header">
              <h3>🎁 경품 관리</h3>
              <span className="badge badge-primary">{state.prizes.length}개</span>
            </div>
            <div className="card-body">
              <div className="prize-list">
                {state.prizes.map((prize) => (
                  <div key={prize.id} className="prize-item">
                    <div className="prize-info">
                      <strong>{prize.rank}위: {prize.name}</strong>
                      <span className="text-small">{prize.value} × {prize.quantity}개</span>
                    </div>
                    <span className="prize-rank" style={{ backgroundColor: prize.color }}>
                      {prize.minScore}~{prize.maxScore}점
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 실시간 스코어 */}
          <div className="admin-card">
            <div className="card-header">
              <h3>📊 실시간 스코어</h3>
              <span className="badge badge-primary">{Object.keys(state.scores).length}명</span>
            </div>
            <div className="card-body">
              {Object.keys(state.scores).length === 0 ? (
                <p className="text-center">스코어 데이터가 없습니다</p>
              ) : (
                <div className="score-list">
                  {Object.entries(state.scores)
                    .sort(([, a], [, b]) => b - a)
                    .map(([userId, score], idx) => (
                      <div key={userId} className="score-item">
                        <div className="score-rank">#{idx + 1}</div>
                        <div className="score-info">
                          <strong>{userId}</strong>
                          <span className="score-value">{score}점</span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* 당첨자 현황 */}
          <div className="admin-card">
            <div className="card-header">
              <h3>🏆 당첨자 현황</h3>
              <span className="badge badge-success">{Object.keys(state.winners).length}명</span>
            </div>
            <div className="card-body">
              {Object.keys(state.winners).length === 0 ? (
                <p className="text-center">당첨자가 없습니다</p>
              ) : (
                <div className="winner-list">
                  {Object.entries(state.winners).map(([userId, prize]) => (
                    <div key={userId} className="winner-item">
                      <div className="winner-info">
                        <strong>{userId}</strong>
                        <span className="text-small">{prize.name}</span>
                      </div>
                      <span className="badge badge-success">{prize.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
