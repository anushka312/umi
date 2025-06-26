import React from 'react';

const About = () => {
  return (
    <div className="bg-[#61CD5E] w-full h-screen flex items-center justify-center">
      <div className="flex flex-row items-center justify-between w-11/12 max-w-6xl mx-auto">
        {/* Text Section */}
        <div className="flex flex-col font-gamja text-white gap-y-6 max-w-3xl">
          <div className="text-5xl font-bold">
            Hello! I’m Anushka
          </div>
          <div className="text-3xl leading-relaxed">
            VerdeFi is a ReFi app with its name ‘Verde’ meaning Green in Spanish. It focuses on the betterment of our environment and climate by enabling small donations for good causes over Umi, allowing users to play games with purpose.
          </div>
        </div>

        {/* Image */}
        <img
          src="/assets/image 3.png"
          alt="About"
          className="w-72 h-auto ml-12"
        />
      </div>
    </div>
  );
};

export default About;
