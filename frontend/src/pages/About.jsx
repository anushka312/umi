import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-[#61CD5E] w-full min-h-screen flex items-center justify-center py-12">
      <div className="flex flex-col md:flex-row items-center justify-between w-11/12 max-w-6xl mx-auto gap-12">
        {/* Text Section */}
        <motion.div
          className="flex flex-col font-gamja text-white gap-y-6 max-w-3xl text-center md:text-left"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-5xl font-bold leading-snug">
            Hello! I’m Anushka
          </h2>
          <p className="text-3xl leading-relaxed">
            VerdeFi is a ReFi app; with its name ‘Verde’ meaning <span className="font-bold italic">Green</span> in Spanish 🌿.
            It focuses on bettering our environment by enabling small donations over UMI
            and letting users play fun games with real-world impact. 🎮💚
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.img
          src="/assets/image 3.png"
          alt="About"
          className="w-72 h-auto hover:scale-105 transition-transform duration-300 drop-shadow-lg"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default About;
