import React, { useContext, useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { AppContext } from '../contexts/AppContext';
import { mockUsers } from '../data/mockUsers';
import './QRScanScreen.css';

export default function QRScanScreen() {
  const { setScreen, addAttendee } = useContext(AppContext);
  const [scannedQR, setScannedQR] = useState('');
  const [manualName, setManualName] = useState('');
  const [manualDepartment, setManualDepartment] = useState('');
  const [scannedUser, setScannedUser] = useState(null);
  const [showManualInput, setShowManualInput] = useState(false);
  const [useCameraMode, setUseCameraMode] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const scannerRef = useRef(null);
  const scannerInstanceRef = useRef(null);

  useEffect(() => {
    if (useCameraMode && scannerRef.current && !scannerInstanceRef.current) {
      try {
        const scanner = new Html5QrcodeScanner(
          'qr-reader',
          {
            fps: 10,
            qrbox: { width: 250, height: 250},
            supportedScanTypes: ['image', 'canvas']
          },
          false
        );

        scanner.render(
          (decodedText) => {
            if (decodedText) {
              setScannedQR(decodedText);
              processQR(decodedText);
              scanner.pause();
            }
          },
          (error) => {
            // 에러 무시 (QR 인식 전 로그)
          }
        );

        scannerInstanceRef.current = scanner;
        setCameraError(null);
      } catch (err) {
        setCameraError('카메라를 열 수 없습니다. 브라우저 권한을 확인하세요.');
      }
    }

    return () => {
      if (scannerInstanceRef.current && useCameraMode) {
        scannerInstanceRef.current.clear().catch(() => {});
        scannerInstanceRef.current = null;
      }
    };
  }, [useCameraMode, processQR]);

  const handleQRScan = (e) => {
    const qrValue = e.target.value.trim();
    if (qrValue) {
      setScannedQR(qrValue);
      processQR(qrValue);
    }
  };

  const processQR = (qrValue) => {
    // QR001~QR010으로 시작하면 참석자 DB에서 찾음
    if (qrValue.startsWith('QR')) {
      const user = mockUsers.find((u) => u.id === qrValue);
      if (user) {
        setScannedUser(user);
        addAttendee(user);
        setTimeout(() => {
          setScreen('quiz');
        }, 1500);
      } else {
        alert('등록되지 않은 QR 코드입니다');
        resetScan();
      }
    } else if (qrValue.startsWith('ATTENDEE_')) {
      // 예약 과정에서 생성된 QR이면 수동 입력 요청
      setShowManualInput(true);
    }
  };

  const handleManualSubmit = () => {
    if (!manualName || !manualDepartment) {
      alert('이름과 부서를 입력해주세요');
      return;
    }

    const attendee = {
      id: scannedQR,
      name: manualName,
      department: manualDepartment,
      email: '',
      position: ''
    };

    addAttendee(attendee);
    setTimeout(() => {
      setScreen('quiz');
    }, 1000);
  };

  const resetScan = () => {
    setScannedQR('');
    setScannedUser(null);
    setManualName('');
    setManualDepartment('');
    setShowManualInput(false);
  };

  const toggleCamera = () => {
    setUseCameraMode(!useCameraMode);
  };

  return (
    <div className="qr-scan-screen">
      <div className="qr-scan-container">
        {!scannedUser && !showManualInput ? (
          // QR 스캔 대기
          <div className="qr-scan-card">
            <h2>📷 QR 코드 스캔</h2>
            <p className="scan-instruction">
              타운홀 미팅 장소의 QR 코드를 스캔하거나 입력하세요
            </p>

            {cameraError && (
              <div className="error-message">
                <p>⚠️ {cameraError}</p>
              </div>
            )}

            {useCameraMode ? (
              <>
                <div id="qr-reader" style={{ width: '100%', marginBottom: '20px' }}></div>
                <button onClick={toggleCamera} className="btn btn-secondary">
                  수동으로 입력하기
                </button>
              </>
            ) : (
              <>
                <div className="scan-input-section">
                  <input
                    type="text"
                    className="qr-input"
                    placeholder="QR 코드를 입력하세요"
                    value={scannedQR}
                    autoFocus
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleQRScan(e);
                      }
                    }}
                    onChange={(e) => {
                      setScannedQR(e.target.value);
                      if (e.target.value) handleQRScan(e);
                    }}
                  />
                  <div className="scan-indicator">
                    <span className="dot"></span>
                    <span>입력 대기 중...</span>
                  </div>
                </div>

                <button onClick={toggleCamera} className="btn btn-primary">
                  📱 카메라로 스캔하기
                </button>
              </>
            )}

            <div className="scan-info">
              <h3>📋 스캔 방법</h3>
              <ol>
                <li>타운홀 미팅 장소에 있는 QR 코드를 스캔합니다</li>
                <li>또는 받은 참석 QR 코드를 스캔합니다</li>
                <li>자동으로 퀴즈 화면으로 이동합니다</li>
              </ol>
            </div>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setScreen('admin')}
            >
              ← 관리자 화면으로
            </button>
          </div>
        ) : null}

        {showManualInput && (
          // 수동 입력 폼
          <div className="manual-input-card">
            <h2>✏️ 정보 입력</h2>
            <p className="manual-instruction">QR 코드가 스캔되었습니다. 정보를 입력해주세요</p>

            <div className="manual-form">
              <div className="form-group">
                <label htmlFor="manual-name">이름 *</label>
                <input
                  type="text"
                  id="manual-name"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="예: 김철수"
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label htmlFor="manual-dept">부서 *</label>
                <select
                  id="manual-dept"
                  value={manualDepartment}
                  onChange={(e) => setManualDepartment(e.target.value)}
                >
                  <option value="">부서 선택</option>
                  <option value="개발팀">개발팀</option>
                  <option value="마케팅팀">마케팅팀</option>
                  <option value="기획팀">기획팀</option>
                  <option value="디자인팀">디자인팀</option>
                  <option value="영업팀">영업팀</option>
                  <option value="인사팀">인사팀</option>
                  <option value="재무팀">재무팀</option>
                </select>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-large"
                onClick={handleManualSubmit}
              >
                출석 등록하기
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={resetScan}
              >
                다시 스캔하기
              </button>
            </div>
          </div>
        )}

        {scannedUser && (
          // 스캔 성공
          <div className="scan-success-card">
            <div className="success-animation">✅</div>
            <h2>출석 확인됨!</h2>
            <div className="scanned-user-info">
              <div className="info-item">
                <strong>이름</strong>
                <span>{scannedUser.name}</span>
              </div>
              <div className="info-item">
                <strong>부서</strong>
                <span>{scannedUser.department}</span>
              </div>
              <div className="info-item">
                <strong>직급</strong>
                <span>{scannedUser.position}</span>
              </div>
            </div>
            <p className="loading-text">퀴즈 화면으로 이동 중...</p>
          </div>
        )}
      </div>
    </div>
  );
}
