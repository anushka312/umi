import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState('');

  // On mount, check localStorage
  useEffect(() => {
    const address = localStorage.getItem('walletAddress');
    if (address) {
      setWalletAddress(address);
    } else {
      navigate('/'); // Redirect if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('walletAddress'); // Clear wallet
    setWalletAddress('');
    navigate('/');
  };

  return (
    <div className='w-full h-full'>
      {/* Navbar */}
      <div className="bg-[#14D30D] h-20 w-full flex items-center justify-between px-8">
        <div className="flex items-center gap-x-12">
          <Link to="/" className="font-gantari font-bold text-white text-4xl">
            VerdeFi
          </Link>
        </div>
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
              <li><Link to="/profile" className="hover:text-green-600">Profile</Link></li>
              <li><a href="#" className="hover:text-green-600">Games</a></li>
              <li><a href="#" className="hover:text-green-600">My Donations</a></li>
              <li><a href="#" className="hover:text-green-600">Projects</a></li>
              <li><a href="#" className="hover:text-green-600">Help Support</a></li>
            </ul>
          </div>
          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-10 text-red-600 hover:underline text-lg font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10">
          <h1 className="text-6xl font-gamja font-bold mb-4">Welcome to Your Profile</h1>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
