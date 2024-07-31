// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import Registration from './Components/Pages/Registration';
import Login from './Components/Pages/Login';
import ChattingPage from './Components/Pages/Chatting';
import PrivateRoute from './utils/PrivateRoute';
import './App.css';
import ServicesPage from './Components/Pages/ServicesPage';
import Starter from './Components/Pages/Starter';
import AboutUsPage from './Components/Pages/AboutUsPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/services" element={
        <PrivateRoute>
        <ServicesPage />
         </PrivateRoute>
        } />
        <Route path="/" element={
          <div>
          <Starter />
          {/* <ChatWidget/> */}
          </div>
          } />
        <Route path="/about-us" element={<AboutUsPage />} />

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
