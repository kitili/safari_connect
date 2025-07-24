import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';
import { toast } from 'react-toastify';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!form.email.trim() || !form.password.trim()) {
      toast.error('Please fill in both email and password.');
      setIsLoading(false);
      return;
    }

    try {
      console.log('🔐 Attempting login with:', { email: form.email });
      
      const res = await login(form);
      console.log('✅ Login successful:', res.data);
      
      // Store token and user data in localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      const isAdmin = res.data.user?.isAdmin;
      const userName = res.data.user?.name || 'User';

      toast.success(isAdmin ? `Welcome Admin ${userName} 👑` : `Welcome back ${userName}! 🚀`);

      setTimeout(() => {
        navigate(isAdmin ? '/admin' : '/explore');
      }, 1500);
    } catch (err) {
      console.error('❌ Login error:', err);
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (err.response) {
        // Server responded with error
        errorMessage = err.response.data?.message || 'Invalid credentials';
        console.log('Server error response:', err.response.data);
      } else if (err.request) {
        // Network error
        errorMessage = 'Network error. Please check your connection.';
        console.log('Network error:', err.request);
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-yellow-300 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-orange-600">
          Welcome Back to SafariConnect 👋
        </h2>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full border px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            placeholder="Your password"
            className="w-full border px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full font-bold py-3 rounded-full shadow-lg transition ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-yellow-500 hover:bg-yellow-600 text-white'
          }`}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          New to SafariConnect?{' '}
          <a href="/signup" className="text-orange-600 font-medium hover:underline">Sign Up</a>
        </p>

        {/* Test Credentials */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 mb-2">💡 Test Credentials:</p>
          <div className="text-xs text-gray-500 space-y-1">
            <p><strong>User:</strong> user1@example.com / password123</p>
            <p><strong>Admin:</strong> admin@example.com / password123</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
