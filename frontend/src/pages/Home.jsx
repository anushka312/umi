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
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setWalletAddress(accounts[0]);
        localStorage.setItem('walletAddress', accounts[0]); //  correct
        navigate('/dashboard', { state: { walletAddress: accounts[0] } });

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

      {/* Hero Section */}
      <div
        className="w-full h-[calc(100vh-5rem)] bg-cover bg-center flex flex-col justify-center items-center"
        style={{ backgroundImage: "url('/assets/image 1.png')" }}
      >
        <motion.h1
          className="font-bold font-gantari text-black text-9xl leading-none"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          VerdeFi
        </motion.h1>

        <motion.p
          className="text-black font-gamja text-4xl mt-6"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Do good. Get rewarded. Play with purpose.
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
