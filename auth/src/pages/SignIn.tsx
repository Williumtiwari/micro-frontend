import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || '/';
  const [error, setError] = useState<string>('');

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      // Here you would typically verify the token with your backend
      // For now, we'll just use the token as user data
      const userData = {
        token: credentialResponse.credential,
        // You can decode the JWT token to get user info
      };
      
      login(userData);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLoginFailure = () => {
    setError('Login failed. Please try again.');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: '2rem' }}>Sign In</h1>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleLoginFailure}
        />
      </div>
    </div>
  );
};

export default SignIn; 