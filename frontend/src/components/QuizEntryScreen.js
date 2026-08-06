import React, { useContext, useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode.react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { AppContext } from '../contexts/AppContext';
import { mockUsers } from '../data/mockUsers';
import './QuizEntryScreen.css';

// 이메일 발송 함수
const sendQREmail = async (email, qrCode, attendeeName) => {
  try {
    console.log(`📧 QR 코드 이메일 발송 시도: ${email}`);

    const response = await fetch('/api/send-qr-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, qrCode, attendeeName })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ 이메일 발송 성공:', data.message);
      alert(`✅ QR 코드가 ${email}로 발송되었습니다!`);
    } else {
      console.error('❌ 이메일 발송 실패:', data.error);
      alert(`❌ 이메일 발송 실패: ${data.error}`);
    }
  } catch (error) {
    console.error('❌ 이메일 발송 중 오류:', error);
    alert(`❌ 이메일 발송 중 오류가 발생했습니다: ${error.message}`);
  }
};

export default function QuizEntryScreen() {
  const { state, setScreen, addAttendee, setCurrentAttendee } = useContext(AppContext);
  const [step, setStep] = useState('scan'); // 'scan' -> 'confirm' -> 'ready'
  const [useCameraMode, setUseCameraMode] = useState(true);
  const [manualQR, setManualQR] = useState('');
  const [scannedAttendee, setScannedAttendee] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const scannerInstanceRef = useRef(null);
  const qrCodeRef = useRef(null);

  useEffect(() => {
    if (useCameraMode && step === 'scan' && !scannerInstanceRef.current) {
      try {
        const scanner = new Html5QrcodeScanner(
          'quiz-entry-qr-reader',
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          false
        );

        scanner.render(
          (decodedText) => {
            if (decodedText) {
              processQRCode(decodedText);
              scanner.pause();
            }
          },
          (error) => {
            console.warn('QR code scanner error:', error);
          }
        );

        scannerInstanceRef.current = scanner;
        setCameraError(null);
      } catch (err) {
        console.error('Camera initialization error:', err);
        setCameraError('카메라를 열 수 없습니다. 권한을 확인하세요.');
      }
    }

    return () => {
      if (scannerInstanceRef.current && useCameraMode && step === 'scan') {
        scannerInstanceRef.current.clear().catch(() => {});
        scannerInstanceRef.current = null;
      }
    };
  }, [useCameraMode, step, processQRCode]);

  const processQRCode = (qrValue) => {
    // ATTENDEE_xxx 형식의 QR 코드 처리
    if (qrValue.startsWith('ATTENDEE_')) {
      // 이미 참석한 사용자 확인
      const isAlreadyAttendee = state.attendees.some(a => a.id === qrValue);

      // 예약자 정보 찾기
      const user = mockUsers.find(u => u.id === qrValue || `ATTENDEE_${u.email}` === qrValue);

      const attendee = {
        id: qrValue,
        name: user?.name || '참석자',
        department: user?.department || '미분류',
        email: user?.email || '',
        position: user?.position || '',
        registeredAt: new Date().toISOString(),
        quizQR: `QUIZ_${qrValue}_${Date.now()}`,
        isNewAttendee: !isAlreadyAttendee
      };

      setScannedAttendee(attendee);
      setStep('confirm');
    }
  };

  const handleManualQR = () => {
    if (!manualQR.trim()) {
      alert('QR 코드를 입력해주세요');
      return;
    }
    processQRCode(manualQR);
    setManualQR('');
  };

  const handleConfirmAttendee = () => {
    if (scannedAttendee?.isNewAttendee) {
      addAttendee(scannedAttendee);
    }
    setCurrentAttendee(scannedAttendee);
    setStep('ready');
  };

  const toggleCamera = () => {
    setUseCameraMode(!useCameraMode);
  };

  // ReservationScreen에서 등록한 attendee 자동 처리
  useEffect(() => {
    if (state.attendees.length > 0 && step === 'scan' && !scannedAttendee) {
      // 가장 최근에 등록한 attendee를 자동으로 처리
      const latestAttendee = state.attendees[state.attendees.length - 1];
      if (latestAttendee) {
        setScannedAttendee(latestAttendee);
        setStep('confirm');
      }
    }
  }, [state.attendees, step, scannedAttendee]);

  const handleStartQuiz = () => {
    if (!state.isQuizStarted) {
      alert('관리자가 아직 퀴즈를 시작하지 않았습니다. 잠시만 기다려주세요.');
      return;
    }
    setScreen('quiz');
  };

  const handleRestart = () => {
    setScannedAttendee(null);
    setStep('scan');
    setManualQR('');
    setScreen('reservation');
  };

  const svgToCanvas = (svg) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const data = new XMLSerializer().serializeToString(svg);
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        resolve(canvas);
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(data);
    });
  };

  const handleSaveQR = async () => {
    try {
      if (!qrCodeRef.current) {
        alert('❌ QR 코드를 찾을 수 없습니다');
        return;
      }

      // 방법 1: Canvas 직접 찾기
      let canvas = qrCodeRef.current.querySelector('canvas');

      // 방법 2: SVG가 있으면 Canvas로 변환
      if (!canvas) {
        const svg = qrCodeRef.current.querySelector('svg');
        if (svg) {
          canvas = await svgToCanvas(svg);
        }
      }

      if (!canvas) {
        alert('❌ QR 코드 이미지를 생성할 수 없습니다');
        return;
      }

      // QR 코드 다운로드
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `QR_${scannedAttendee.name}_${Date.now()}.png`;
      link.click();

      // 이메일 발송
      await sendQREmail(scannedAttendee.email, scannedAttendee.quizQR, scannedAttendee.name);
    } catch (error) {
      console.error('QR 코드 저장 실패:', error);
      alert('❌ QR 코드 저장에 실패했습니다: ' + error.message);
    }
  };

  return (
    <div className="quiz-entry-screen">
      {step === 'scan' && (
        <div className="quiz-entry-container">
          <h1>📱 퀴즈 참여</h1>
          <p className="subtitle">예약 QR 코드를 스캔하여 퀴즈에 참여하세요</p>

          {cameraError && (
            <div className="error-banner">
              <p>⚠️ {cameraError}</p>
            </div>
          )}

          <div className="scan-area">
            {useCameraMode ? (
              <>
                <div id="quiz-entry-qr-reader" style={{ width: '100%' }}></div>
                <button onClick={toggleCamera} className="btn btn-secondary">
                  수동 입력으로 전환
                </button>
              </>
            ) : (
              <>
                <div className="manual-input">
                  <input
                    type="text"
                    placeholder="QR 코드를 입력하세요"
                    value={manualQR}
                    onChange={(e) => setManualQR(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleManualQR();
                    }}
                    autoFocus
                  />
                  <button onClick={handleManualQR} className="btn btn-primary">
                    입력
                  </button>
                </div>
                <button onClick={toggleCamera} className="btn btn-primary" style={{ marginTop: '15px' }}>
                  📱 카메라로 스캔
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {step === 'confirm' && scannedAttendee && (
        <div className="quiz-entry-container">
          <h1>✅ 참석자 확인</h1>

          <div className="confirm-card">
            <div className="confirm-info">
              <div className="info-group">
                <label>이름</label>
                <p>{scannedAttendee.name}</p>
              </div>
              <div className="info-group">
                <label>부서</label>
                <p>{scannedAttendee.department}</p>
              </div>
              <div className="info-group">
                <label>이메일</label>
                <p>{scannedAttendee.email || '미등록'}</p>
              </div>
            </div>

            {scannedAttendee.isNewAttendee && (
              <div className="info-badge">🎉 출석이 확인되었습니다!</div>
            )}

            <div className="confirm-actions">
              <button onClick={handleConfirmAttendee} className="btn btn-primary btn-large">
                ✓ 확인 및 계속
              </button>
              <button onClick={handleRestart} className="btn btn-secondary btn-large">
                ✕ 다시 스캔
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'ready' && scannedAttendee && (
        <div className="quiz-entry-container">
          <h1>🎯 퀴즈 참여 준비</h1>
          <p className="subtitle">{scannedAttendee.name}님</p>

          <div className="ready-card">
            <div className="greeting">
              <p>타운홀 미팅에 참석해주셔서 감사합니다!</p>
              <p>이제 퀴즈에 참여할 준비가 되었습니다.</p>
            </div>

            <div className="qr-section" ref={qrCodeRef}>
              <p className="qr-label">📱 귀사의 퀴즈 참여 코드</p>
              <div className="qr-display">
                <QRCode
                  value={scannedAttendee.quizQR}
                  size={150}
                  level="H"
                  includeMargin={true}
                  fgColor="#1a1a1a"
                  bgColor="#ffffff"
                />
              </div>
              <p className="qr-text">{scannedAttendee.quizQR}</p>
              <button onClick={handleSaveQR} className="btn btn-secondary" style={{ marginTop: '15px', width: '100%' }}>
                💾 QR 저장하기
              </button>
            </div>

            <div className="status-message">
              {!state.isQuizStarted ? (
                <>
                  <p className="wait">⏳ 관리자가 퀴즈를 시작할 때까지 기다리고 있습니다...</p>
                  <p className="hint">아래 버튼을 클릭하면 퀴즈 화면으로 이동합니다.</p>
                </>
              ) : (
                <p className="ready">✅ 퀴즈가 시작되었습니다!</p>
              )}
            </div>

            <div className="start-actions">
              <button onClick={handleStartQuiz} className="btn btn-primary btn-large">
                ▶️ 퀴즈 시작하기
              </button>
              <button onClick={handleRestart} className="btn btn-secondary btn-large">
                ← 다른 사람 등록
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
