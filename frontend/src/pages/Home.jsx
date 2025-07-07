import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Works from './Works';
import About from './About';
import Contact from './Contact';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum); // ✅ v5 syntax
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        setWalletAddress(address);
        localStorage.setItem('walletAddress', address);
        navigate('/dashboard', { state: { walletAddress: address } });

      } catch (error) {
        console.error('Connection Error:', error);
      }
    } else {
      alert('Please install MetaMask');
    }
  };

  return (
    <div className="w-full min-h-screen">
      {/* Navbar */}
      <div className="bg-[#14D30D] h-20 w-full flex items-center justify-between px-8">
        <div className="flex items-center gap-x-12">
          <a href="#" className="font-gantari font-bold text-white text-4xl">
            VerdeFi
          </a>
          <div className="flex gap-x-8 font-gamja text-white text-3xl">
            <a href="#works">how it works</a>
            <a href="#about">about us</a>
            <a href="#contact">contact</a>
          </div>
        </div>

        <button
          className="bg-white font-gantari text-[#14D30D] font-semibold px-6 py-2 rounded-xl text-lg hover:bg-gray-100 transition"
          onClick={connectWallet}
        >
          {walletAddress
            ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
            : 'Connect Wallet'}
        </button>
      </div>

      <div
        className="relative w-full h-[calc(100vh-5rem)] bg-cover bg-center flex flex-col justify-center items-center text-center px-6"
        style={{ backgroundImage: "url('/assets/image 1.png')" }}
      >
        {/* Dimmed overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/25 to-black/25 z-0" />

        <motion.h1
          className="z-10 font-gantari font-bold text-white text-5xl sm:text-7xl md:text-9xl leading-tight drop-shadow-md"
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          VerdeFi
        </motion.h1>

        <motion.p
          className="z-10 mt-6 text-white font-gamja text-4xl  drop-shadow"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Step into a world where every tap, quest, and challenge you conquer heals the Earth.
        </motion.p>

        <motion.p
          className="z-10 mt-3 text-white font-gamja text-2xl drop-shadow"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Play eco-themed games, support real-world environmental projects, and unlock unique NFTs that tell your impact story.
        </motion.p>

        <motion.p
          className="z-10 mt-5 text-[#C0FFC0] font-semibold font-gantari text-lg tracking-wide"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          🌎 Games for Good. Rewards for You. A Future for All.
        </motion.p>
      </div>



      {/* Sections */}
      <motion.div
        id="works"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Works />
      </motion.div>

      <motion.div
        id="about"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <About />
      </motion.div>

      <motion.div
        id="contact"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Contact />
      </motion.div>
    </div>
  );
};

export default Home;
