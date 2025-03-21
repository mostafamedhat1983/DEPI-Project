import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, auth } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';
      navigate(redirectPath);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 bg-white rounded-lg shadow"
        data-testid="login-form"
      >
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <div className="bg-blue-50 p-4 rounded-md mb-4">
          <p className="text-sm text-blue-800">
            <strong>Test Credentials:</strong><br />
            Email: test@example.com<br />
            Password: Test123!
          </p>
        </div>

        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          data-testid="email-input"
        />
        
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          data-testid="password-input"
        />

        {auth.error && (
          <p className="text-red-600 text-sm" data-testid="login-error">
            {auth.error}
          </p>
        )}

        <Button
          type="submit"
          className="w-full"
          isLoading={auth.isLoading}
          data-testid="login-button"
        >
          Log In
        </Button>
      </form>

      <div className="text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};