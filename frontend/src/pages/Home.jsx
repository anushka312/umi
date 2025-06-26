import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Works from './Works';
import About from './About';
import Contact from './Contact';
import { ethers } from 'ethers';


const Home = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState('');
  const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setWalletAddress(accounts[0]);
      localStorage.setItem('walletAddress', accounts[0]); // save
      navigate('/profile', { state: { walletAddress: accounts[0] } });
    } catch (error) {
      console.error("Connection Error:", error);
    }
  } else {
    alert("Please install MetaMask");
  }
};

  return (
    <div className='w-full min-h-screen'>
      {/* navbar */}
      <div className="bg-[#14D30D] h-20 w-full flex items-center justify-between px-8">
        {/* Left: Logo and Links */}
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

        {/* Right: Button */}
        <button 
        className="bg-white font-gantari text-[#14D30D] font-semibold px-6 py-2 rounded-xl text-lg hover:bg-gray-100 transition"
        onClick={connectWallet}>
           {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
        </button>
      </div>

      <div className="w-full h-[calc(100vh-5rem)] bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/image 1.png')" }}>

        <div className="relative top-32 flex flex-col items-center justify-center">
          <h1 className="font-bold font-gantari text-black text-9xl leading-none">
            VerdeFi
          </h1>
          <p className='text-black font-gamja text-4xl mt-1'>
            Do good. Get rewarded. Play with purpose.
          </p>
          <img
            src="/assets/play.png"
            alt="Play Button"
            className="w-44 h-auto -mt-4 relative"
          />
          <p className='text-white font-gamja text-4xl relative -mt-5'>
            play a demo
          </p>

        </div>
      </div>

      <div id='works'>
        <Works />
      </div>
      <div id='about'>
        <About />
      </div>
      <div id='contact'>
        <Contact />
      </div>
    </div>
  );
};

export default Home;
