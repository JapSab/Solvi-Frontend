// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
import { AuthProvider } from './utils/AuthContext';
import Homepage from './Components/HomePageComponent/HomePage';
import Registration from './Components/Pages/Registration';
import Login from './Components/Pages/Login';
import ChattingPage from './Components/Pages/Chatting';
// import PrivateRoute from './components/PrivateRoute';
import PrivateRoute from './utils/PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={
          <PrivateRoute>
            <ChattingPage />
          </PrivateRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;
