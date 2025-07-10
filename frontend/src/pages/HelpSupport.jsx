import React from 'react';
import Layout from './Layout';

const HelpSupport = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 bg-slate-100 shadow-lg rounded-2xl mt-8">
        <h1 className="text-4xl sm:text-5xl font-gamja font-bold text-green-700 mb-6">
          Help & Support
        </h1>

        <p className="text-lg sm:text-xl text-gray-700 font-gantari font-semibold mb-6">
          Need help with VerdeFi? We're here for you! Check out the FAQs below or contact our team.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold font-gamja text-green-600">
              How do I connect my wallet?
            </h2>
            <p className="text-gray-700 font-gantari mt-1 text-base sm:text-lg">
              Click the "Connect Wallet" button in the top-right corner. Make sure MetaMask, Rabby, or any supported wallet extension is installed and unlocked.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold font-gamja text-green-600">
              I can't see the details loaded?
            </h2>
            <p className="text-gray-700 font-gantari mt-1 text-base sm:text-lg">
              Our APIs work on a 50-second interval. Please wait a moment — this is not a technical issue.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold font-gamja text-green-600">
              I can't see my name, it says "Anonymous"?
            </h2>
            <p className="text-gray-700 font-gantari mt-1 text-base sm:text-lg">
              If you've just connected your wallet, head over to the Profile tab and save your details. This will fix the issue the next time you open your dashboard.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold font-gamja text-green-600">
              I purchased a game but it won't launch
            </h2>
            <p className="text-gray-700 font-gantari mt-1 text-base sm:text-lg">
              Make sure your wallet is still connected. If it is and the issue continues, refresh the page or contact our support team.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold font-gamja text-green-600">
              How do I contribute to projects?
            </h2>
            <p className="text-gray-700 font-gantari mt-1 text-base sm:text-lg">
              Go to the Projects page, select any project, and click the "Donate Now" button to contribute using ETH or UMI.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold font-gamja text-green-600">
              Still need help?
            </h2>
            <p className="text-gray-700 font-gantari mt-1 text-base sm:text-lg">
              Reach out to us at{' '}
              <a
                href="mailto:anushka031205@gmail.com"
                className="text-blue-600 underline"
                aria-label="Email support"
              >
                anushka031205@gmail.com
              </a>
              . We usually respond within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HelpSupport;
