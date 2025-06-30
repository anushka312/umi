import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import axios from 'axios';

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [wallet, setWallet] = useState('');

  useEffect(() => {
    const fetchDonations = async () => {
      const address = localStorage.getItem('walletAddress');
      if (!address) return;
      setWallet(address);

      try {
        const res = await axios.get('http://localhost:5000/api/users');
        const user = res.data.find((u) => u.walletAddress === address);
        if (user && user.transactions.length > 0) {
          setDonations(user.transactions);
        }
      } catch (err) {
        console.error('Error fetching donations:', err);
      }
    };

    fetchDonations();
  }, []);

  return (
    <Layout>
      <div className='p-10'>

      
      <h1 className="text-6xl font-gamja font-bold mb-8">Your Donations</h1>

      {donations.length === 0 ? (
        <p className="text-xl text-gray-600 font-gantari">
          You haven't made any donations yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {donations.map((tx, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6"
            >
              {/* Image placeholder */}
              <div className="w-full md:w-64 h-64 bg-gray-200 rounded-xl overflow-hidden">
                <img
                  src={tx.projectImage || '/assets/default_project.jpg'}
                  alt="Project"
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Donation Info */}
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-4xl font-gamja font-bold">
                    {tx.projectName || 'Unknown Project'}
                  </h2>
                  <p className="text-lg font-gantari text-gray-700 mt-2">
                    {tx.description || 'No description available.'}
                  </p>

                  <div className="mt-4 text-lg font-semibold">
                    <p>💸 Donated: <span className="text-green-600">{tx.amount || '0'} ETH</span></p>
                    <p className="text-sm text-gray-500 mt-1">
                      Tx Hash: <span className="break-all">{tx.txHash || 'N/A'}</span>
                    </p>
                  </div>
                </div>

                <a
                  href={tx.projectLink || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 text-blue-600 hover:underline font-semibold"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </Layout>
  );
};

export default Donations;
