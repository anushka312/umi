import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from './Layout';

const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const address = localStorage.getItem('walletAddress');
    if (address) {
      setWalletAddress(address);
      fetchUser(address);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const fetchUser = async (address) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${address}`);
      setUser(res.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  return (
    <Layout>
      <div className='p-10'>

      
      <h1 className="text-6xl font-gamja font-bold mb-6 text-center">Dashboard</h1>

      {user ? (
        <div className="w-full flex justify-center">
          <div className="p-6 border rounded-xl shadow-md bg-white max-w-3xl font-gantari w-full">
            {/* Profile */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-green-500">
                <img
                  src={user.profile?.avatar || '/assets/default_avatar.jpg'}
                  alt="avatar"
                  className="w-full h-full object-cover scale-125"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{user.profile?.name || 'undefined'}</h2>
                <p className="text-sm text-gray-500">{user.walletAddress || 'undefined'}</p>
              </div>
            </div>

            <p className="text-lg text-gray-700 mb-6">
              <strong>Bio:</strong> {user.profile?.bio || 'undefined'}
            </p>

            {/* Game Stats */}
            <div className="mt-6">
              <h3 className="text-3xl font-gamja mb-4">🎮 Game Stats</h3>
              {user.gameStats && user.gameStats.length > 0 ? (
                <div className="space-y-4">
                  {user.gameStats.map((stat, index) => (
                    <div key={index} className="border p-4 rounded-lg shadow-sm bg-gray-50">
                      <p className="text-xl">
                        <strong>Game ID:</strong> {stat.gameId}
                      </p>
                      <p className="text-lg text-gray-700">
                        <strong>Highest Score:</strong> {stat.highestScore}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Last Played:</strong>{' '}
                        {new Date(stat.playedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-lg">No game activity yet.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-xl text-gray-600 text-center">Loading user data...</p>
      )}
      </div>
    </Layout>
      
  );
};

export default Dashboard;
