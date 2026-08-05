const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Mock Data (임시)
const mockAttendance = [];
const mockQuizzes = [];
const mockPrizes = [];

// Routes - Placeholder
app.get('/api/attendance/:eventId', (req, res) => {
  res.json({ message: 'Attendance API - To be implemented' });
});

app.post('/api/attendance/verify', (req, res) => {
  res.json({ message: 'QR verification - To be implemented' });
});

app.get('/api/quizzes/:eventId', (req, res) => {
  res.json({ message: 'Quiz API - To be implemented' });
});

app.get('/api/prizes/:eventId', (req, res) => {
  res.json({ message: 'Prize API - To be implemented' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Backend Server Running on http://localhost:${PORT}`);
  console.log(`📚 Health Check: http://localhost:${PORT}/api/health`);
});
