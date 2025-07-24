// src/Component/Layout.jsx

import React from 'react';
import Header from './Header';  // ✅ make sure the file is Header.jsx and in the same folder
import Footer from './Footer';  // ✅ same here for Footer.jsx

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Sticky header */}
      <Header />

      {/* Page content */}
      <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
};

export default Layout;
