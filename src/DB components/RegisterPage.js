import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import './AuthPage.css';

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: 'Error!',
        text: 'Passwords do not match!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = existingUsers.some(user => user.email === formData.email);
    
    if (emailExists) {
      Swal.fire({
        title: 'Error!',
        text: 'Email already registered!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };
    existingUsers.push(newUser);

    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    Swal.fire({
      title: 'Success!',
      text: 'Registration successful!',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      navigate('/');  
    });
  };

  return (
    <div className="auth-page-container register-container">
      <div className="auth-form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <button type="submit" className="auth-button">Register</button>
        </form>
        <p>Already have an account? <a href="/login" className="auth-link">Login here</a></p>
      </div>
    </div>
  );
}

export default RegisterPage;
