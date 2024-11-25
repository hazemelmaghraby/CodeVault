import React from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import Login from './components/Registeration/Login.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import Register from './components/Registeration/Register.jsx';
import ShowData from './components/Registeration/showData.jsx';
import Landing from './components/Home/Landing.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Test from './components/Home/test.jsx';

const App = () => {
  return (
    <div>
      {/* Navbar is placed outside Routes to appear on all pages */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/data" element={<ShowData />} />
          {/* <Route path="/test" element={<Test />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
