// src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed w-full top-0 bg-black text-white shadow z-50 py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold">SafariConnect</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:text-yellow-400">Home</Link>
        <Link to="/packages" className="hover:text-yellow-400">Packages</Link>
        <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
        <Link to="/login" className="hover:text-yellow-400">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
