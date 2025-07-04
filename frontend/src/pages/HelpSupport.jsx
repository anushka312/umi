import React from 'react';
import Layout from './Layout';

const HelpSupport = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-8 bg-slate-100 shadow-lg rounded-2xl mt-8">
        <h1 className="text-5xl font-gamja font-bold text-green-700 mb-6">Help & Support</h1>
        
        <p className="text-xl text-gray-700 font-gantari font-semibold mb-6">
          Need help with VerdeFi? We're here for you! Check out the FAQs below or contact our team.
        </p>

        <div className="space-y-5">
          <div>
            <h2 className="text-3xl font-semibold font-gamja text-green-600">How do I connect my wallet?</h2>
            <p className="text-gray-700 font-gantari mt-1 text-lg">
              Click the "Connect Wallet" button in the top-right corner. Make sure MetaMask or any supported wallet extension is installed.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold font-gamja text-green-600">I can't see my name, it says 'Anonymous'?</h2>
            <p className="text-gray-700 font-gantari mt-1 text-lg">
              If you have just connected your wallet, then head to Profile tab and save your details. It will fix the problem next time you open dashboard.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold font-gamja text-green-600">I purchased a game but it won't launch</h2>
            <p className="text-gray-700 font-gantari mt-1 text-lg">
              Ensure your wallet is connected. If the problem persists, try refreshing the page or contact support.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold font-gamja text-green-600">How do I contribute to projects?</h2>
            <p className="text-gray-700 font-gantari mt-1 text-lg">
              Visit the project list, click on a project, and use the "Donate Now" button to contribute in ETH or UMI.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold font-gamja text-green-600">Still need help?</h2>
            <p className="text-gray-700 font-gantari mt-1 text-lg">
              Reach out to us at <a href="mailto:support@verdefi.app" className="text-blue-600 underline">support@verdefi.app</a>. We'll respond within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HelpSupport;
