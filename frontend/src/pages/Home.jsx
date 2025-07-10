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
        const provider = new ethers.providers.Web3Provider(window.ethereum);
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
      <div className="bg-[#14D30D] h-20 w-full flex flex-wrap items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-x-6 md:gap-x-12">
          <a href="#" className="font-gantari font-bold text-white text-3xl md:text-4xl">
            VerdeFi
          </a>
          <div className="hidden md:flex gap-x-6 font-gamja text-white text-xl md:text-2xl lg:text-3xl">
            <a href="#works">how it works</a>
            <a href="#about">about us</a>
            <a href="#contact">contact</a>
          </div>
        </div>

        <button
          className="mt-2 md:mt-0 bg-white font-gantari text-[#14D30D] font-semibold px-4 md:px-6 py-2 rounded-xl text-sm md:text-lg hover:bg-gray-100 transition"
          onClick={connectWallet}
        >
          {walletAddress
            ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
            : 'Connect Wallet'}
        </button>
      </div>

      {/* Hero Section */}
      <div
        className="relative w-full h-[calc(100vh-5rem)] bg-cover bg-center flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12"
        style={{ backgroundImage: "url('/assets/image 1.png')" }}
      >
        <div className="absolute inset-0 bg-opacity-90 z-0" />

        <motion.h1
          className="z-10 font-gantari font-bold -mt-10 text-4xl sm:text-6xl md:text-7xl lg:text-9xl text-center leading-tight drop-shadow-md px-2"
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          VerdeFi
        </motion.h1>

        <motion.p
          className="z-10 mt-4 text-blue-800 font-gamja text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center px-4 drop-shadow"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Step into a world where every tap, quest, and challenge you conquer heals the Earth.
        </motion.p>

        <motion.p
          className="z-10 mt-3 text-white bg-green-500 bg-opacity-80 font-gamja text-lg sm:text-xl md:text-2xl lg:text-3xl text-center px-4 py-2 rounded drop-shadow"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Play eco-themed games, support real-world environmental projects, and unlock unique NFTs that tell your impact story.
        </motion.p>

        <motion.p
          className="z-10 mt-5 text-[#C0FFC0] font-semibold font-gantari text-base sm:text-lg md:text-xl tracking-wide text-center px-2"
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
