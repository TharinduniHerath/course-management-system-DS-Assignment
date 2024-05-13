import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Swal from 'sweetalert2';




const SignUp= () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to your backend endpoint for signup
            const response = await axios.post('http://localhost:8000/api/signup', {
                username,
                email,
                password
            });
        
            console.log("Account created");
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Account created successfully!'
            });
            navigate('/login')
        } catch (err) {
            if (err.response && err.response.status === 409) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email is already in use. Please use a different email.'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'An error occurred. Please try again.'
                });
            }
            console.error(err);
        }
        
    }

    return (
        <div>
            <form className='signup-form' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <h2>Sign Up</h2>
                    <label htmlFor="exampleInputUsername1" className="form-label">Username</label>
                    <input type="text" className="form-control" id="exampleInputUsername1" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                    
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <p className="mt-3">Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
}

export default SignUp;
