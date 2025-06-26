import React from 'react';

const Works = () => {
  return (
    <div className="flex w-full h-screen">
      {/* Left Image */}
      <div className="h-full w-auto">
        <img
          src="/assets/image2.png"
          className="h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <div className='bg-[#00DA0F] h-full w-full bg-opacity-20'>
          <div className='relative flex flex-col top-40 px-14'>
            <p className='font-fingerpaint text-4xl'>
              Take Action
            </p>
            <p className='font-gamja text-3xl py-3 pb-14'>
              Make a donation, fund a project or simulate one
            </p>
            <p className='font-fingerpaint text-4xl'>
              Unlock Games
            </p>
            <p className='font-gamja text-3xl py-3 pb-14'>
              Once we verify, unlock your favourite game!
            </p>
            <p className='font-fingerpaint text-4xl'>
              Get Rewarded
            </p>
            <p className='font-gamja text-3xl py-3 pb-14'>
              Get NFTs and play more to earn the top position on the leaderboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
