import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../utils/api';
import { toast } from 'react-toastify';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = form;

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const res = await signup(form);
      const isAdmin = res.user?.isAdmin;

      toast.success('Account created! Redirecting...');

      setTimeout(() => {
        navigate(isAdmin ? '/admin-dashboard' : '/explore');
      }, 1500);
    } catch (err) {
      const message = err.response?.data?.message || 'Signup failed';
      console.error('Signup error:', err.response?.data || err);
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200 flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-10 rounded-3xl shadow-2xl border border-yellow-300 space-y-6"
      >
        <h2 className="text-4xl font-extrabold text-center text-orange-600">
          Join SafariConnect 🌍
        </h2>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="e.g. Jane Doe"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="e.g. jane@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
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
            autoComplete="new-password"
            placeholder="Minimum 6 characters"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-full shadow-lg transition"
        >
          Sign Up
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-orange-600 font-medium hover:underline">Log In</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
