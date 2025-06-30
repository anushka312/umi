// src/components/Layout.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const walletAddress = localStorage.getItem('walletAddress');

  const handleLogout = () => {
    localStorage.removeItem('walletAddress');
    navigate('/');
  };

  return (
    <div className='w-full h-full'>
      {/* Navbar */}
      <div className="bg-[#14D30D] h-20 w-full flex items-center justify-between px-8">
        <Link to="/" className="font-gantari font-bold text-white text-4xl">
          VerdeFi
        </Link>
        <button className="bg-white font-gantari text-[#14D30D] font-semibold px-6 py-2 rounded-xl text-lg">
          {walletAddress
            ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
            : 'Connect Wallet'}
        </button>
      </div>

      {/* Sidebar + Content */}
      <div className="flex h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 p-6 shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-gantari font-semibold mb-6">Menu</h2>
            <ul className="space-y-4 font-gamja text-2xl">

              <li><Link to="/games" className="hover:text-green-600">Games</Link></li>
              <li><Link to="/projects" className="hover:text-green-600">Projects</Link></li>
              <li><Link to="/donations" className="hover:text-green-600">My Donations</Link></li>
              <li><Link to="/dashboard" className="hover:text-green-600">Dashboard</Link></li>
              <li><Link to="/profile" className="hover:text-green-600">Profile</Link></li>
              <li><Link to="/help" className="hover:text-green-600">Help Support</Link></li>
            </ul>
          </div>
          <button
            onClick={handleLogout}
            className="mt-10 text-red-600 hover:underline text-lg font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1  overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
