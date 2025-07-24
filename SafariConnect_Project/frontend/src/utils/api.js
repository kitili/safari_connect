// utils/api.js
import axios from 'axios';

// Set API base URL (customizable via .env)
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ======================
// ✅ AUTH ROUTES
// ======================
export const signup = (data) => API.post('/auth/signup', data);   // POST /api/auth/signup
export const login = (data) => API.post('/auth/login', data);     // POST /api/auth/login
export const oauthLogin = () => API.get('/auth/oauth');           // GET /api/auth/oauth


// ======================
// ✅ USER ROUTES
// ======================
export const getAllUsers = () => API.get('/users');
export const getUserById = (id) => API.get(`/users/${id}`);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);

// ======================
// ✅ MATCH ROUTES
// ======================
export const getMatches = () => API.get('/match');
export const getMatchSuggestions = () => API.get('/match/suggestions');
export const createMatch = (data) => API.post('/match', data);
export const updateMatch = (id, data) => API.put(`/match/${id}`, data);
export const deleteMatch = (id) => API.delete(`/match/${id}`);

// ======================
// ✅ CHAT ROUTES
// ======================
export const sendMessage = (data) => API.post('/chat/send', data);
export const getMessages = (chatUserId) => API.get(`/chat/${chatUserId}`);
