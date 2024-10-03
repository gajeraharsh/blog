import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl">My Blog</h1>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; 2024 My Blog. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Layout;
