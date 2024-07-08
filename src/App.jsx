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
import ServicesPage from './Components/Pages/ServicesPage';
import Services from './Components/Services/Services';
import Starter from './Components/Pages/Starter';
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/services" element={
        <PrivateRoute>
        <ServicesPage />
         </PrivateRoute>
        } />
        <Route path="/" element={<Starter />} />
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
