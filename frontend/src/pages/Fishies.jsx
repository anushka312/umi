import React from 'react';
import Layout from './Layout';

const Fishies = () => {
  return (
    <Layout>
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <iframe
          src={`${window.location.origin}/fishies/index.html`}
          title="Fishies Game"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </Layout>
  );
};

export default Fishies;
