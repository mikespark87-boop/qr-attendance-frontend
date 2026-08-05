import React, { useContext } from 'react';
import { AppProvider, AppContext } from './contexts/AppContext';
import AdminDashboard from './components/AdminDashboard';
import ReservationScreen from './components/ReservationScreen';
import QRScanScreen from './components/QRScanScreen';
import QuizScreen from './components/QuizScreen';
import RankingScreen from './components/RankingScreen';
import './styles/cheil-brand.css';
import './App.css';

function AppContent() {
  const { state } = useContext(AppContext);

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header-content">
          <h1>🎟️ 타운홀 미팅</h1>
          <p>출석 + 퀴즈 + 경품 시스템</p>
        </div>
      </header>

      <main className="App-main">
        {state.currentScreen === 'admin' && <AdminDashboard />}
        {state.currentScreen === 'reservation' && <ReservationScreen />}
        {state.currentScreen === 'qr-scan' && <QRScanScreen />}
        {state.currentScreen === 'quiz' && <QuizScreen />}
        {state.currentScreen === 'ranking' && <RankingScreen />}
      </main>

      <footer className="App-footer">
        <p>© 2026 타운홀 미팅 시스템 | 제일기획</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
