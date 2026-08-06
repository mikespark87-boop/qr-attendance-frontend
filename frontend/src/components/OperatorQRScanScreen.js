import React, { useContext, useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { AppContext } from '../contexts/AppContext';
import { mockUsers } from '../data/mockUsers';
import './OperatorQRScanScreen.css';

export default function OperatorQRScanScreen() {
  const { state, setScreen, addAttendee, getMissingAttendees } = useContext(AppContext);
  const [useCameraMode, setUseCameraMode] = useState(true);
  const [manualQR, setManualQR] = useState('');
  const [lastScanned, setLastScanned] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const scannerRef = useRef(null);
  const scannerInstanceRef = useRef(null);

  useEffect(() => {
    if (useCameraMode && !scannerInstanceRef.current) {
      try {
        const scanner = new Html5QrcodeScanner(
          'operator-qr-reader',
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
      if (scannerInstanceRef.current && useCameraMode) {
        scannerInstanceRef.current.clear().catch(() => {});
        scannerInstanceRef.current = null;
      }
    };
  }, [useCameraMode]);

  const processQRCode = (qrValue) => {
    // ATTENDEE_xxx 형식의 QR 코드 처리
    if (qrValue.startsWith('ATTENDEE_')) {
      // 이미 출석한 사용자 확인
      const isAlreadyAttendee = state.attendees.some(a => a.id === qrValue);
      if (isAlreadyAttendee) {
        setLastScanned({
          success: false,
          message: '이미 출석 처리된 참석자입니다.',
          data: null
        });
        return;
      }

      // 예약자 정보 찾기 (mockUsers에서)
      const user = mockUsers.find(u => u.id === qrValue || `ATTENDEE_${u.email}` === qrValue);

      // 또는 예약 시스템에서 저장된 정보 사용
      const attendee = {
        id: qrValue,
        name: user?.name || '예약자',
        department: user?.department || '미분류',
        email: user?.email || '',
        position: user?.position || '',
        registeredAt: new Date().toISOString(),
        quizQR: `QUIZ_${qrValue}_${Date.now()}`
      };

      addAttendee(attendee);
      setLastScanned({
        success: true,
        message: `${attendee.name}님이 출석 처리되었습니다.`,
        data: attendee
      });

      // 2초 후 카메라 다시 스캔 준비
      setTimeout(() => {
        if (scannerInstanceRef.current) {
          scannerInstanceRef.current.resume();
        }
      }, 2000);
    } else {
      setLastScanned({
        success: false,
        message: '유효한 참석자 QR 코드가 아닙니다.',
        data: null
      });
    }
  };

  const handleManualQR = () => {
    if (!manualQR.trim()) {
      alert('QR 코드를 입력해주세요');
      return;
    }
    // ATTENDEE_ 접두사 자동 추가
    const qrCode = manualQR.startsWith('ATTENDEE_') ? manualQR : `ATTENDEE_${manualQR}`;
    processQRCode(qrCode);
    setManualQR('');
  };

  const toggleCamera = () => {
    setUseCameraMode(!useCameraMode);
  };

  const missingAttendees = getMissingAttendees();

  return (
    <div className="operator-qr-scan">
      <div className="operator-container">
        <div className="scan-section">
          <h2>🔍 참석자 QR 스캔</h2>
          <p className="subtitle">예약자의 QR 코드를 스캔하여 출석을 처리하세요</p>

          {cameraError && (
            <div className="error-banner">
              <p>⚠️ {cameraError}</p>
            </div>
          )}

          {useCameraMode ? (
            <>
              <div id="operator-qr-reader" style={{ width: '100%', marginBottom: '20px' }}></div>
              <button onClick={toggleCamera} className="btn btn-secondary">
                수동 입력으로 전환
              </button>
            </>
          ) : (
            <>
              <div className="manual-input-section">
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
                  검증
                </button>
              </div>
              <button onClick={toggleCamera} className="btn btn-primary" style={{ marginTop: '10px' }}>
                📱 카메라로 스캔
              </button>
            </>
          )}

          {lastScanned && (
            <div className={`scan-result ${lastScanned.success ? 'success' : 'error'}`}>
              <p>{lastScanned.message}</p>
              {lastScanned.data && (
                <div className="scan-details">
                  <strong>{lastScanned.data.name}</strong>
                  <span>{lastScanned.data.department}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="status-section">
          <div className="status-card">
            <h3>📊 현황</h3>
            <div className="status-stats">
              <div className="stat">
                <strong>등록자</strong>
                <span>{state.allUsers.length}명</span>
              </div>
              <div className="stat success">
                <strong>참석</strong>
                <span>{state.attendees.length}명</span>
              </div>
              <div className="stat warning">
                <strong>미참석</strong>
                <span>{missingAttendees.length}명</span>
              </div>
            </div>

            {state.attendees.length > 0 && (
              <>
                <h4>✅ 참석자</h4>
                <div className="attendee-list">
                  {state.attendees.map((attendee) => (
                    <div key={attendee.id} className="attendee-row">
                      <span className="name">{attendee.name}</span>
                      <span className="dept">{attendee.department}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {missingAttendees.length > 0 && (
              <>
                <h4>⏳ 미참석자</h4>
                <div className="missing-list">
                  {missingAttendees.map((user) => (
                    <div key={user.id} className="missing-row">
                      <span className="name">{user.name}</span>
                      <span className="dept">{user.department}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setScreen('admin')}
            className="btn btn-secondary"
            style={{ width: '100%', marginTop: '20px' }}
          >
            ← 관리자 화면으로
          </button>
        </div>
      </div>
    </div>
  );
}
