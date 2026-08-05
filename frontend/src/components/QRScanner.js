import React, { useState } from 'react';
import { mockUsers } from '../mockData';
import './QRScanner.css';

function QRScanner() {
  const [qrInput, setQrInput] = useState('');
  const [result, setResult] = useState(null);
  const [scannedUsers, setScannedUsers] = useState([]);

  const handleVerify = () => {
    if (!qrInput.trim()) {
      setResult({
        verified: false,
        message: '❌ QR 코드를 입력해주세요'
      });
      return;
    }

    const user = mockUsers.find(u => u.qrCode === qrInput);

    if (user) {
      // 중복 스캔 확인
      const isDuplicate = scannedUsers.some(u => u.id === user.id);

      if (isDuplicate) {
        setResult({
          verified: false,
          message: '⚠️ 이미 출석 처리된 사용자입니다',
          user: user
        });
      } else {
        // 첫 출석
        setScannedUsers([...scannedUsers, user]);
        setResult({
          verified: true,
          message: '✅ Verified (인증됨)',
          user: user
        });
      }
    } else {
      setResult({
        verified: false,
        message: '❌ 사용자 정보를 찾을 수 없습니다'
      });
    }

    // 입력 필드 초기화
    setQrInput('');
  };

  const handleClear = () => {
    setQrInput('');
    setResult(null);
  };

  const handleClearAll = () => {
    setScannedUsers([]);
    setResult(null);
    setQrInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  return (
    <div className="qr-scanner-container">
      <div className="scanner-card">
        <div className="scanner-section">
          <h2>📱 QR 코드 스캔</h2>
          <p className="hint">테스트용 QR 코드: QR001 ~ QR005</p>

          <div className="input-group">
            <input
              type="text"
              placeholder="QR 코드를 입력하세요"
              value={qrInput}
              onChange={(e) => setQrInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="qr-input"
              autoFocus
            />
            <button onClick={handleVerify} className="btn-verify">
              검증
            </button>
          </div>

          {result && (
            <div className={`result-box ${result.verified ? 'success' : 'error'}`}>
              <h3>{result.message}</h3>
              {result.user && (
                <div className="user-info">
                  <div className="info-row">
                    <span className="label">이름:</span>
                    <span className="value">{result.user.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">부서:</span>
                    <span className="value">{result.user.department}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">이메일:</span>
                    <span className="value">{result.user.email}</span>
                  </div>
                  {result.verified && (
                    <div className="quiz-prompt">
                      <p>✨ 출석이 확인되었습니다!</p>
                      <p>이어서 퀴즈에 참여하시겠습니까?</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="button-group">
            <button onClick={handleClear} className="btn-secondary">
              초기화
            </button>
            {scannedUsers.length > 0 && (
              <button onClick={handleClearAll} className="btn-danger">
                전체 삭제
              </button>
            )}
          </div>
        </div>

        {scannedUsers.length > 0 && (
          <div className="attendance-list">
            <h2>📋 출석 현황 ({scannedUsers.length}명)</h2>
            <div className="list-container">
              {scannedUsers.map((user, index) => (
                <div key={user.id} className="attendance-item">
                  <span className="number">{index + 1}</span>
                  <span className="name">{user.name}</span>
                  <span className="department">{user.department}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QRScanner;
