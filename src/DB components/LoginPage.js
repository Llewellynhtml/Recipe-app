import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

function LoginPage({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = existingUsers.find(user => user.email === email && user.password === password);

    if (user) {
      handleLogin({ email: user.email, username: user.firstName });
      navigate('/');  
    } else {
      alert('Invalid login credentials');
    }
  };

  return (
    <div className="auth-page-container login-container">
      <div className="auth-form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />
          <button type="submit" className="auth-button">Login</button>
        </form>
        
        
        <p>Don't have an account? <a href="/register" className="auth-link">Register here</a></p>
      </div>
    </div>
  );
}

export default LoginPage;
