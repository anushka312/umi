import React from 'react';
import { motion } from 'framer-motion';

const Works = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#f3fef3]">
      {/* Left Image */}
      <div className="w-auto lg:w-1/3 h-40 lg:h-auto">
        <img
          src="/assets/image2.png"
          className="w-full h-full object-cover"
          alt="How it works"
        />
      </div>

      {/* Right Content */}
      <div className="min-h-screen flex items-center justify-center bg-[#00DA0F]/20 py-10 px-4 sm:px-8 lg:px-14">

        <div className="max-w-4xl mx-auto space-y-12 ">

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-fingerpaint text-2xl sm:text-3xl lg:text-4xl text-lime-800">Take Action</h2>
            <p className="font-gamja text-xl sm:text-2xl lg:text-3xl pt-2 text-gray-700">
              Make a donation, fund a project or simulate one
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-fingerpaint text-2xl sm:text-3xl lg:text-4xl text-lime-800">Unlock Games</h2>
            <p className="font-gamja text-xl sm:text-2xl lg:text-3xl pt-2 text-gray-700">
              Once we verify, unlock your favourite game!
            </p>
          </motion.div>

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="font-fingerpaint text-2xl sm:text-3xl lg:text-4xl text-lime-800">Get Rewarded</h2>
            <p className="font-gamja text-xl sm:text-2xl lg:text-3xl pt-2 text-gray-700">
              Collect NFTs, play more, and climb the leaderboard!
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="bg-white rounded-xl shadow-xl p-4 sm:p-6 mt-6"
          >
            <p className="font-gamja text-xl sm:text-2xl text-center text-gray-800">
              🫧 <span className="font-bold text-lime-700">A large portion of what you pay to play</span> goes directly towards
              verified environmental projects. You're not just playing, you're making impact.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Works;