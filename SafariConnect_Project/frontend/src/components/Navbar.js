// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NotificationBell from './NotificationBell';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [notifications, setNotifications] = useState(3); // Mock notification count
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setIsScrolled(scrollTop > 20);
      setScrollProgress(scrollPercent);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/explore', label: 'Explore', icon: '🗺️' },
    { path: '/matchmaking', label: 'Matchmaking', icon: '🤝' },
    { path: '/trip-planner', label: 'Itinerary', icon: '📋' },
    { path: '/chat', label: 'Chat', icon: '💬' },
  ];

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-indicator" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Enhanced Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 navbar-glass ${
        isScrolled 
          ? 'bg-white/95 shadow-lg border-b border-gray-200/50' 
          : 'navbar-gradient'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3 group logo-container">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <span className="text-white text-xl font-bold">🌍</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent logo-text">
                  SafariConnect
                </span>
                <span className="text-xs text-gray-500 -mt-1 logo-subtitle">Explore Together</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 group nav-item ${
                    location.pathname === item.path
                      ? 'text-green-600 bg-green-50 shadow-sm active-indicator active'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </span>
                  {location.pathname === item.path && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <NotificationBell />

              {/* Theme Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="relative p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 transition-all duration-300 group shadow-sm hover:shadow-md theme-toggle"
                title="Toggle theme"
              >
                <span className="text-lg transition-transform duration-300 group-hover:scale-110">
                  {isDark ? '🌙' : '☀️'}
                </span>
              </button>

              {/* Login Button */}
              <Link
                to="/login"
                className="relative px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden btn-shine"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                  <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 hamburger-line ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}></span>
                  <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 hamburger-line ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}></span>
                  <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 hamburger-line ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-200/50 px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-green-600 bg-green-50 shadow-sm'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                {location.pathname === item.path && (
                  <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-200">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span className="mr-2">🔐</span>
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Action Button for Mobile */}
      <div className="md:hidden">
        <button className="fab">
          <span className="text-xl">➕</span>
        </button>
      </div>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
