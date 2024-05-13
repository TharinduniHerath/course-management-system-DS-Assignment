import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Import jwtDecode instead of jwt-decode
import Swal from 'sweetalert2';

const LogIn = ({ handleLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/signin', {
        username,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token; // Assuming the token is in the response under the 'token' key
        localStorage.setItem('token', token);

        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role; // Assuming the role is in the 'role' claim of the JWT

        // Log the user role to the console
        console.log('User Role:', userRole);

        // Call handleLoginSuccess with the username and userRole
        handleLoginSuccess(username, userRole);

       

        navigate('/home'); // Assuming this is a generic redirection for now
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid username or password',
        });
      }
    } catch (err) {
      console.error('Error logging in:', err);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'An error occurred while logging in. Please try again later.',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(); // Call the handleLogin function
  };

  return (
    <div>
      <form className='signup-form' onSubmit={handleSubmit}>
        <div className="mb-3">
          <h2>Login</h2>
          <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
          <input type="String" className="form-control" id="exampleInputUsername" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <p className="mt-3">Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default LogIn;
