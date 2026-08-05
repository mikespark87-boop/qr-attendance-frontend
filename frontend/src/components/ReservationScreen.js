import React, { useContext, useState } from 'react';
import QRCode from 'qrcode.react';
import { AppContext } from '../contexts/AppContext';
import { departments } from '../data/mockUsers';
import './ReservationScreen.css';

export default function ReservationScreen() {
  const { setScreen, addAttendee } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: departments[0],
    position: ''
  });
  const [registered, setRegistered] = useState(false);
  const [qrCode, setQrCode] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = () => {
    if (!formData.name || !formData.email || !formData.department) {
      alert('필수 정보를 입력해주세요');
      return;
    }

    // QR 코드 생성 (간단히 email 기반)
    const generatedQR = `ATTENDEE_${Date.now()}_${formData.name}`;
    setQrCode(generatedQR);

    // 참석자 추가
    addAttendee({
      id: generatedQR,
      ...formData,
      registeredAt: new Date().toISOString()
    });

    setRegistered(true);
  };

  const handleGoToQRScan = () => {
    setScreen('qr-scan');
  };

  const handleNewRegistration = () => {
    setFormData({
      name: '',
      email: '',
      department: departments[0],
      position: ''
    });
    setRegistered(false);
    setQrCode('');
  };

  return (
    <div className="reservation-screen">
      <div className="reservation-container">
        {!registered ? (
          // 예약 폼
          <div className="reservation-form-card">
            <h2>📝 타운홀 미팅 참석 예약</h2>
            <p className="form-subtitle">아래 정보를 입력하고 등록하세요</p>

            <form className="reservation-form">
              <div className="form-group">
                <label htmlFor="name">이름 *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="예: 김철수"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">이메일 *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="예: kim@cheil.com"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="department">부서 *</label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="position">직급</label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="예: 팀장"
                  />
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-large"
                onClick={handleRegister}
              >
                참석 등록하기
              </button>
            </form>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setScreen('admin')}
              style={{ marginTop: '20px', width: '100%' }}
            >
              ← 관리자 화면으로
            </button>
          </div>
        ) : (
          // 등록 완료 및 QR 코드 표시
          <div className="registration-success-card">
            <div className="success-header">
              <h2>✅ 등록 완료!</h2>
              <p>타운홀 미팅에 참석 등록되었습니다</p>
            </div>

            <div className="registered-info">
              <div className="info-item">
                <strong>이름</strong>
                <span>{formData.name}</span>
              </div>
              <div className="info-item">
                <strong>이메일</strong>
                <span>{formData.email}</span>
              </div>
              <div className="info-item">
                <strong>부서</strong>
                <span>{formData.department}</span>
              </div>
              {formData.position && (
                <div className="info-item">
                  <strong>직급</strong>
                  <span>{formData.position}</span>
                </div>
              )}
            </div>

            <div className="qr-section">
              <h3>📱 참석 QR 코드</h3>
              <p className="qr-instruction">아래 QR 코드를 저장하거나 스크린샷을 해주세요</p>
              <div className="qr-code-container">
                <QRCode
                  value={qrCode}
                  size={200}
                  level="H"
                  includeMargin={true}
                  fgColor="#1a1a1a"
                  bgColor="#ffffff"
                />
              </div>
              <p className="qr-code-text">{qrCode}</p>
            </div>

            <div className="success-actions">
              <button className="btn btn-primary btn-large" onClick={handleGoToQRScan}>
                QR 스캔 화면으로 →
              </button>
              <button className="btn btn-outline" onClick={handleNewRegistration}>
                다른 사람 등록하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
