import React, { useState } from 'react';
import './App.css';
import QRScanner from './components/QRScanner';

function App() {
  const [currentScreen, setCurrentScreen] = useState('scanner');

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎟️ QR 출석 검증 시스템</h1>
        <p>QR 코드를 스캔하여 출석을 확인하세요</p>
      </header>

      <main className="App-main">
        {currentScreen === 'scanner' && <QRScanner />}
      </main>

      <footer className="App-footer">
        <p>© 2026 QR 출석 시스템 | Frontend Only (Backend 추후 구성)</p>
      </footer>
    </div>
  );
}

export default App;
