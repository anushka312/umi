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
      const res = await axios.get(`http://localhost:5000/api/users/${address}`);
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
      await axios.post('http://localhost:5000/api/users', {
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
      <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-6rem)] px-4">
        <h1 className="text-6xl font-gamja font-bold mb-6 text-center">Your Profile</h1>

        <div className="space-y-6 max-w-lg font-gamja text-2xl w-full bg-white p-6 rounded-xl shadow-md">
          <div>
            <label className="block text-3xl font-semibold mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-3xl font-semibold mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-3xl font-semibold mb-2">Choose Avatar</label>
            <div className="flex gap-4">
              {avatarOptions.map((img) => (
                <label key={img} className="cursor-pointer">
                  <input
                    type="radio"
                    name="avatar"
                    value={img}
                    checked={avatar === img}
                    onChange={() => setAvatar(img)}
                    className="hidden"
                  />
                  <div
                    className={`w-20 h-20 rounded-full overflow-hidden border-4 ${
                      avatar === img ? 'border-green-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt="avatar"
                      className="w-full h-full object-cover scale-125"
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl text-3xl"
          >
            Save Profile
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
