// src/App.jsx
import React from 'react';
import MyComponent from './Components/HomePageComponent/HomePage';
import ResponsiveGrid from './Components/Form/Form';
import ChatHistory from './Components/ChatPage/Chatpage';
import { Routes, Route} from 'react-router-dom';
import Registration from './Components/Pages/Registration';
import Homepage from './Components/HomePageComponent/HomePage';
import Starter from './Components/Pages/Starter';
import Login from './Components/Pages/Login';
import MobileVerification from './Components/Form/MobileVerification';
import ChattingPage from './Components/Pages/Chatting';
import './App.css'


function App() {
  return( 
  <Routes>
    <Route path='/' element={<Starter/>}/>

    <Route path='/registration' element={<Registration/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/chat' element={<ChattingPage/>}/>


  </Routes>
  );
}

export default App;
