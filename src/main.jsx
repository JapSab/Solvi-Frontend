// src/index.js or src/main.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from './utils/LanguageContext';
import { AuthProvider } from './utils/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
