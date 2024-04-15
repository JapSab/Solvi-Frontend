import React from 'react';
import Navbar from '../Navbar/Navbar';
import Form from '../Form/Form';
import LoginForms from '../Form/Login';
import LoginForm from '../Form/LoginForm';

function Login() {
  return (
    <div>
      <Navbar />
      <LoginForm/>
      {/* <RegistrationForms /> */}
    </div>
  );
}

export default Login;
