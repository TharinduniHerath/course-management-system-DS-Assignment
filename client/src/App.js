
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './pages/authProvider';
import NavBar from './components/navBar';
import HomePage from './pages/homePage';
import SignUp from './pages/signUp';
import LogIn from './pages/logIn';
import AdminDashBoard from './pages/adminDashBoard'
import UserDashBoard from './pages/userDashBoard';
import InstructorDashBoard from './pages/instructorDashBoard';
import Cart from './pages/addTocart';
import CartDetails from './components/cartComponents/CartDetails';
import CartHome from "./components/cartComponents/cartHome";
import './App.css';
import SuccessPage from './components/Sucess';
import Notifications from './components/Notifications';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
       const [username, setUsername] = useState('');
   
       const [role, setRole] = useState('');

  const handleLoginSuccess = (username,role) => {
           setIsLoggedIn(true);
   setUsername(username);
    setRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <AuthProvider>
      <Router>
        <NavBar
          isLoggedIn={isLoggedIn}
          username={username}
          role={role}
          handleLogout={handleLogout}
        />

        <Routes>
          <Route path="/home" element={<CartHome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/login"
            element={<LogIn handleLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/admindashboard" element={<AdminDashBoard />} />
          <Route
            path="/instructordashboard"
            element={<InstructorDashBoard />}
          />
          <Route path="/userdashboard" element={<UserDashBoard />} />
          <Route path="/cart" element={<CartDetails />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
/*
1. <Route path="/home" element={<HomePage />} />
*/