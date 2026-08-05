import React, { useContext } from 'react';
import { AppContext, calculateRanking } from '../contexts/AppContext';
import { getPrizeByScore } from '../data/mockPrizes';
import './RankingScreen.css';

export default function RankingScreen() {
  const { state, setScreen, resetAll } = useContext(AppContext);

  const ranking = calculateRanking(state.scores);
  const currentAttendee = state.currentAttendee;
  const currentUserRank = ranking.find((r) => r.userId === currentAttendee?.id);
  const currentUserPrize = currentUserRank ? getPrizeByScore(currentUserRank.score) : null;

  return (
    <div className="ranking-screen">
      <div className="ranking-container">
        {/* 헤더 */}
        <div className="ranking-header">
          <h1>🏆 타운홀 미팅 결과</h1>
          <p>참석해주셔서 감사합니다!</p>
        </div>

        {/* 현재 사용자 결과 */}
        {currentUserRank && (
          <div className="my-result-card">
            <div className="my-result-rank">
              <span className="rank-number">#{currentUserRank.rank}</span>
              <span className="rank-text">
                {currentUserRank.rank === 1
                  ? '🥇 1등'
                  : currentUserRank.rank === 2
                  ? '🥈 2등'
                  : currentUserRank.rank === 3
                  ? '🥉 3등'
                  : `${currentUserRank.rank}등`}
              </span>
            </div>

            <div className="my-result-info">
              <div className="result-item">
                <strong>이름</strong>
                <span>{currentAttendee.name}</span>
              </div>
              <div className="result-item">
                <strong>부서</strong>
                <span>{currentAttendee.department}</span>
              </div>
              <div className="result-item">
                <strong>점수</strong>
                <span className="score-highlight">{currentUserRank.score}점</span>
              </div>
            </div>

            {currentUserPrize && (
              <div className="my-prize">
                <h3>🎁 당첨된 경품</h3>
                <div className="prize-card" style={{ borderColor: currentUserPrize.color }}>
                  <div className="prize-rank-badge" style={{ backgroundColor: currentUserPrize.color }}>
                    {currentUserPrize.rank}위
                  </div>
                  <div className="prize-info">
                    <strong>{currentUserPrize.name}</strong>
                    <span className="prize-value">{currentUserPrize.value}</span>
                    <span className="prize-detail">
                      {currentUserPrize.minScore}~{currentUserPrize.maxScore}점 대상
                    </span>
                  </div>
                </div>
                <p className="prize-notice">
                  📢 경품은 행사 종료 후 안내에 따라 수령하실 수 있습니다
                </p>
              </div>
            )}
          </div>
        )}

        {/* 전체 랭킹 */}
        <div className="overall-ranking-card">
          <h2>📊 전체 순위</h2>

          {ranking.length === 0 ? (
            <div className="empty-state">
              <p>아직 완료된 참석자가 없습니다</p>
            </div>
          ) : (
            <div className="ranking-table">
              {ranking.map((rank, idx) => {
                const prize = getPrizeByScore(rank.score);
                return (
                  <div
                    key={idx}
                    className={`ranking-row ${
                      rank.userId === currentAttendee?.id ? 'current-user' : ''
                    }`}
                  >
                    <div className="ranking-rank">
                      {rank.rank === 1 ? (
                        <span className="medal">🥇</span>
                      ) : rank.rank === 2 ? (
                        <span className="medal">🥈</span>
                      ) : rank.rank === 3 ? (
                        <span className="medal">🥉</span>
                      ) : (
                        <span className="rank-num">#{rank.rank}</span>
                      )}
                    </div>

                    <div className="ranking-info">
                      <strong>{rank.userId}</strong>
                      <span className="score">{rank.score}점</span>
                    </div>

                    <div className="ranking-prize">
                      {prize && (
                        <span
                          className="prize-tag"
                          style={{ backgroundColor: prize.color }}
                        >
                          {prize.name}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 통계 */}
        <div className="stats-card">
          <h3>📈 통계</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <strong>총 참석자</strong>
              <span className="stat-value">{ranking.length}명</span>
            </div>
            <div className="stat-item">
              <strong>평균 점수</strong>
              <span className="stat-value">
                {ranking.length > 0
                  ? Math.round(
                      ranking.reduce((sum, r) => sum + r.score, 0) / ranking.length
                    )
                  : 0}
                점
              </span>
            </div>
            <div className="stat-item">
              <strong>만점자</strong>
              <span className="stat-value">
                {ranking.filter((r) => r.score === 100).length}명
              </span>
            </div>
            <div className="stat-item">
              <strong>최고 점수</strong>
              <span className="stat-value">
                {ranking.length > 0 ? Math.max(...ranking.map((r) => r.score)) : 0}점
              </span>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="ranking-actions">
          <button
            className="btn btn-secondary"
            onClick={() => setScreen('admin')}
          >
            관리자 대시보드로
          </button>
          <button
            className="btn btn-outline"
            onClick={() => {
              if (window.confirm('정말로 모든 데이터를 초기화하시겠습니까?')) {
                resetAll();
                setScreen('admin');
              }
            }}
          >
            새로운 이벤트 시작
          </button>
        </div>

        {/* 푸터 */}
        <div className="ranking-footer">
          <p>© 2026 타운홀 미팅 | 제일기획</p>
        </div>
      </div>
    </div>
  );
}
