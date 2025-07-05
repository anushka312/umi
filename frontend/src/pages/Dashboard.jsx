import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from './Layout';

const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const address = localStorage.getItem('walletAddress');
    if (!address) {
      navigate('/');
      return;
    }

    setWalletAddress(address);
    fetchUser(address);
  }, []);

  const fetchUser = async (address) => {
    try {
      const res = await axios.get(`https://umi-b.onrender.com/api/users/${address}`);
      setUser(res.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen p-6 bg-gray-50">
        <h1 className="text-5xl font-bold text-center font-gamja mb-8 text-lime-700">User Dashboard</h1>

        {loading ? (
          <div className="text-center mt-10">
            <p className="text-lg text-gray-600">Loading user data...</p>
          </div>
        ) : !user ? (
          <div className="text-center mt-10">
            <p className="text-lg text-red-600">User not found.</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-8 font-gantari">
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-lime-500 shadow-md">
                <img
                  src={user.profile?.avatar || '/assets/default_avatar.jpg'}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-800">{user.profile?.name || 'Anonymous User'}</h2>
                <p className="text-gray-500 text-sm">{walletAddress}</p>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">📝 Bio</h3>
              <p className="text-gray-600">{user.profile?.bio || 'No bio provided yet.'}</p>
            </div>

            {/* Game Stats */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">🎮 Game Stats</h3>
              {user.gameStats?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user.gameStats.map((stat, index) => (
                    <div key={index} className="bg-gray-100 p-5 rounded-xl shadow-inner">
                      <div className="mb-2">
                        <span className="text-gray-500 text-sm">Game:</span>
                        <p className="text-lg font-semibold text-blue-800">
                          Fishies (ID: {stat.gameId})
                        </p>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-500 text-sm">Highest Score:</span>
                        <p className="text-lg font-bold text-green-700">{stat.highestScore}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Last Played:</span>
                        <p className="text-sm text-gray-700">
                          {new Date(stat.playedAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No game data found. Start playing to generate stats!</p>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
