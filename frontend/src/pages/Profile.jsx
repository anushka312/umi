import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from './Layout';

const avatarOptions = [
  '/assets/avatar_green_1.jpg',
  '/assets/avatar_blue_2.jpg',
  '/assets/avatar_red_3.jpg',
];

const Profile = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState(avatarOptions[0]);

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
      const res = await axios.get(`https://umi-b.onrender.com/api/users/${address}`);
      const user = res.data;
      if (user?.profile) {
        setName(user.profile.name || '');
        setBio(user.profile.bio || '');
        setAvatar(user.profile.avatar || avatarOptions[0]);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('https://umi-b.onrender.com/api/users', {
        walletAddress,
        name,
        bio,
        avatar,
      });
      alert('Profile updated!');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-6rem)] px-4 py-10 bg-gray-50">
        <h1 className="text-4xl sm:text-5xl font-gamja font-bold mb-8 text-lime-700 text-center">
          Edit Your Profile
        </h1>

        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-6 sm:p-8 space-y-8 font-gantari">
          {/* Name Input */}
          <div>
            <label className="block text-base sm:text-lg font-semibold mb-2 text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Bio Input */}
          <div>
            <label className="block text-base sm:text-lg font-semibold mb-2 text-gray-700">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write something about yourself"
              rows="4"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Avatar Picker */}
          <div>
            <label className="block text-base sm:text-lg font-semibold mb-4 text-gray-700">Choose Avatar</label>
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start">
              {avatarOptions.map((img) => (
                <label key={img} className="cursor-pointer group">
                  <input
                    type="radio"
                    name="avatar"
                    value={img}
                    checked={avatar === img}
                    onChange={() => setAvatar(img)}
                    className="hidden"
                  />
                  <div
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                      avatar === img
                        ? 'border-lime-500 ring-4 ring-lime-300'
                        : 'border-transparent group-hover:scale-105'
                    }`}
                  >
                    <img
                      src={img}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={handleSubmit}
              className="bg-lime-600 hover:bg-lime-700 text-white text-lg sm:text-xl px-6 sm:px-8 py-2 sm:py-3 rounded-xl shadow-lg transition duration-300"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
