import React from 'react';
import Navbar from '../Navbar/Navbar';
import RegistrationForms from '../Form/Register';
import Form from '../Form/Form';
import StartingPage from '../StartingPage/Starting';
import StarterPage from '../StartingPage/Starting';
function Starter() {
  return (
    <div>
      <Navbar />
      <StarterPage/>
      {/* <Form/> */}
    </div>
  );
}

export default Starter;
