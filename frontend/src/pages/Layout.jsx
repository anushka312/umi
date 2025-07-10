import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // optional: lucide for hamburger icons

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const walletAddress = localStorage.getItem('walletAddress');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('walletAddress');
    navigate('/');
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Navbar */}
      <div className="bg-[#14D30D] h-20 w-full flex items-center justify-between px-4 md:px-8">
        <Link to="/" className="font-gantari font-bold text-white text-3xl md:text-4xl">
          VerdeFi
        </Link>

        <div className="flex items-center gap-x-4">
          <button
            className="bg-white font-gantari text-[#14D30D] font-semibold px-4 py-1.5 md:px-6 md:py-2 rounded-xl text-sm md:text-lg"
          >
            {walletAddress
              ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
              : 'Connect Wallet'}
          </button>

          {/* Hamburger menu for mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div className="flex flex-1 h-[calc(100vh-5rem)] overflow-hidden">
        {/* Sidebar: desktop only */}
        <div className="hidden md:flex w-64 bg-gray-100 p-6 shadow-md flex-col justify-between">
          <div>
            <h2 className="text-2xl font-gantari font-semibold mb-6">Menu</h2>
            <ul className="space-y-4 font-gamja text-xl">
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
            className="text-red-600 hover:underline text-base font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Sidebar Drawer: mobile only */}
        {isMobileMenuOpen && (
          <div className="fixed z-50 top-20 left-0 w-64 h-full bg-gray-100 p-6 shadow-lg flex flex-col justify-between md:hidden">
            <div>
              <h2 className="text-2xl font-gantari font-semibold mb-6">Menu</h2>
              <ul className="space-y-4 font-gamja text-xl">
                <li><Link to="/games" onClick={() => setIsMobileMenuOpen(false)}>Games</Link></li>
                <li><Link to="/projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</Link></li>
                <li><Link to="/donations" onClick={() => setIsMobileMenuOpen(false)}>My Donations</Link></li>
                <li><Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link></li>
                <li><Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link></li>
                <li><Link to="/help" onClick={() => setIsMobileMenuOpen(false)}>Help Support</Link></li>
              </ul>
            </div>
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="text-red-600 hover:underline text-base font-semibold"
            >
              Logout
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
