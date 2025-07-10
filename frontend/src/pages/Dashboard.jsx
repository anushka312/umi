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
    fetchUserOrCreate(address);
  }, []);

  const fetchUserOrCreate = async (address) => {
    try {
      const res = await axios.get(`https://umi-b.onrender.com/api/users/${address}`);
      setUser(res.data);
    } catch (error) {
      if (error.response?.status === 404) {
        try {
          const createRes = await axios.post(`https://umi-b.onrender.com/api/users`, {
            walletAddress: address,
            name: '',
            bio: '',
            avatar: '',
          });
          setUser(createRes.data);
        } catch (createErr) {
          console.error('Error creating user:', createErr);
        }
      } else {
        console.error('Error fetching user:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen p-4 sm:p-6 bg-gray-50">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center font-gamja mb-8 text-lime-700">
          User Dashboard
        </h1>

        {loading ? (
          <div className="text-center mt-10">
            <p className="text-base sm:text-lg text-gray-600">Loading user data...</p>
          </div>
        ) : !user ? (
          <div className="text-center mt-10">
            <p className="text-base sm:text-lg text-red-600">User not found.</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-5 sm:p-8 font-gantari">
            {/* Profile Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
              <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-full overflow-hidden border-4 border-lime-500 shadow-md">
                <img
                  src={user.profile?.avatar || '/assets/default_avatar.jpg'}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {user.profile?.name?.trim() || 'Anonymous User'}
                </h2>
                <p className="text-gray-500 text-sm break-all">{walletAddress}</p>
                {(!user.profile?.name?.trim() || !user.profile?.bio?.trim()) && (
                  <p className="text-sm text-orange-600 mt-2">
                    Looks like you're new or using an anonymous profile — go to your Profile page to update your name and bio!
                  </p>
                )}

              </div>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">📝 Bio</h3>
              <p className="text-gray-600 text-base">
                {user.profile?.bio?.trim() || 'No bio provided yet.'}
              </p>
            </div>

            {/* Game Stats */}
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">🎮 Game Stats</h3>
              {user.gameStats?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {user.gameStats.map((stat, index) => (
                    <div key={index} className="bg-gray-100 p-5 rounded-xl shadow-inner">
                      <div className="mb-2">
                        <span className="text-gray-500 text-sm">Game:</span>
                        <p className="text-base font-semibold text-blue-800">
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
                <p className="text-gray-600 text-base">
                  No game data found. Start playing to generate stats!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
