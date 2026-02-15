import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import api from '../services/api';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('individual'); // 'individual' or 'clinic'
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!consent) {
      setError('You must accept the terms and conditions');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/register', {
        email,
        password,
        account_type: accountType,
        consent: true,
      });

      login(response.data.token, response.data.user);
      navigate('/profile');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="accountType"
                  value="individual"
                  checked={accountType === 'individual'}
                  onChange={(e) => setAccountType(e.target.value)}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">Individual / Professional</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="accountType"
                  value="clinic"
                  checked={accountType === 'clinic'}
                  onChange={(e) => setAccountType(e.target.value)}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">Clinic / Organization</span>
              </label>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
            />
            <label htmlFor="consent" className="ml-3 block text-sm leading-6 text-gray-900">
              I have read and accept the terms and conditions
            </label>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button
            type="submit"
            className="w-full"
            variant="primary"
            isLoading={loading}
          >
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
}
