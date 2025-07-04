import React from 'react';
import { motion } from 'framer-motion';

const Works = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-[#f3fef3]">
      {/* Left Image */}
      <div className="h-full w-auto">
        <img
          src="/assets/image2.png"
          className="h-full w-auto object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="flex-1 bg-[#00DA0F]/20 py-20 px-6 lg:px-14">
        <div className="max-w-4xl mx-auto space-y-12">

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-fingerpaint text-4xl text-lime-800">Take Action</h2>
            <p className="font-gamja text-3xl pt-2 text-gray-700">
              Make a donation, fund a project or simulate one
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-fingerpaint text-4xl text-lime-800">Unlock Games</h2>
            <p className="font-gamja text-3xl pt-2 text-gray-700">
              Once we verify, unlock your favourite game!
            </p>
          </motion.div>

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="font-fingerpaint text-4xl text-lime-800">Get Rewarded</h2>
            <p className="font-gamja text-3xl pt-2 text-gray-700">
              Collect NFTs, play more, and climb the leaderboard!
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="bg-white rounded-xl shadow-xl p-6 mt-8"
          >
            <p className="font-gamja text-3xl text-center text-gray-800">
              🫧 <span className="font-bold text-lime-700 text-justify">A large portion of what you pay to play</span> goes directly towards
              verified environmental projects. You're not just playing, you're making impact.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Works;
