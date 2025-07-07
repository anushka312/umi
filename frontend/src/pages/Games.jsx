// Games.jsx
import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

const Games = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const game = query.get('game');

  const walletAddress = localStorage.getItem('walletAddress');
  axios.defaults.baseURL = 'https://umi-b.onrender.com';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/${walletAddress}`);
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    if (walletAddress) {
      fetchUser();
    }
  }, [walletAddress]);

  const handleUnlock = async () => {
    if (!window.ethereum) {
      alert('Please install Rabby Wallet or MetaMask to continue.');
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      await signer.getAddress();

      const amountInEth = '0.1';
      const tx = await signer.sendTransaction({
        to: '0x8834EDD41DCA0C832C5FE9bcE709eE9b6817f192',
        value: ethers.utils.parseEther(amountInEth),
      });

      alert('Waiting for transaction confirmation...');
      await tx.wait();

      await axios.post(`/api/users/${walletAddress}/purchase`, {
        itemId: 'fishies',
        name: 'Fishies of the Game',
        amount: parseFloat(amountInEth),
      });

      alert('Game unlocked!');
      navigate('/games?game=fishies');
    } catch (err) {
      console.error('Payment failed:', err);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = () => {
    navigate('/games?game=fishies');
  };

  const isPurchased = user?.purchases?.some(p => p.itemId === 'fishies');

  // If playing the game
  if (game === 'fishies') {
    if (!isPurchased) {
      return (
        <Layout>
          <div className="w-full h-screen flex items-center justify-center bg-black text-white text-xl">
            <p>You haven’t purchased this game yet.</p>
          </div>
        </Layout>
      );
    }

    return (
      <Layout>
        <div className="w-full h-screen bg-black flex items-center justify-center">
          <iframe
            src="/fishies/index.html"
            title="Fishies Game"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </Layout>
    );
  }

  // Game listing page
  return (
    <Layout>
      <div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat py-12 px-4"
        style={{ backgroundImage: "url('/assets/image4.png')" }}
      >
        <h1 className="text-7xl font-gamja font-bold mb-10 text-center text-white drop-shadow-lg">
          Games
        </h1>

        {loading ? (
          <p className="text-center text-xl font-gantari text-white">Loading...</p>
        ) : (
          <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
            <img
              src="/assets/fishies_thumbnail.jpg"
              alt="Fishies"
              className="w-full md:w-64 h-64 object-cover"
            />
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-4xl font-gamja font-bold mb-2">🐟 Fishies</h2>
                <p className="text-lg font-gantari mb-4 text-gray-700">
                  Dive into an underwater adventure and rescue coral reefs while dodging
                  pollution. A fun way to support ocean preservation!
                </p>
                {!isPurchased && (
                  <p className="text-green-600 font-semibold text-xl font-gantari">
                    Unlock for just <span className="font-bold">0.1 ETH</span>
                  </p>
                )}
              </div>

              {isPurchased ? (
                <button
                  onClick={handlePlay}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-xl font-semibold font-gantari"
                >
                  Play Now
                </button>
              ) : (
                <button
                  onClick={handleUnlock}
                  className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-xl font-semibold font-gantari"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Unlock & Play'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Games;
