import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import axios from 'axios';

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [wallet, setWallet] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const address = localStorage.getItem('walletAddress');
      if (!address) {
        setLoading(false);
        return;
      }
      setWallet(address);

      try {
        const [usersRes, projectsRes] = await Promise.all([
          axios.get('https://umi-b.onrender.com/api/users'),
          axios.get('https://umi-b.onrender.com/api/projects'),
        ]);

        const user = usersRes.data.find(u => u.walletAddress === address);
        const projects = projectsRes.data;

        if (user?.transactions?.length) {
          const enriched = user.transactions
            .filter(tx => tx.type === 'donation')
            .map(tx => {
              const project = projects.find(p => p.id === tx.projectId);
              return {
                ...tx,
                projectName: project?.name || 'Unknown Project',
                projectImage: project?.image || '/assets/default_project.jpg',
                description: project?.description || '',
                projectLink: project?.link || '#',
              };
            });

          setDonations(enriched);
        }
      } catch (err) {
        console.error('Error fetching donations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="p-6 sm:p-10 min-h-screen bg-gray-50">
        <h1 className="text-4xl sm:text-6xl font-gamja font-bold text-lime-800 mb-10 text-center">
          Your Donations
        </h1>

        {loading ? (
          <div className="text-center mt-20">
            <p className="text-xl font-gantari text-gray-600">Loading your donation history...</p>
          </div>
        ) : donations.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-2xl font-gantari text-gray-600">
              You haven’t made any donations yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {donations.map((tx, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-6 flex flex-col sm:flex-row gap-6"
              >
                <div className="w-full sm:w-64 h-64 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={tx.projectImage}
                    alt={tx.projectName}
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="flex flex-col justify-between flex-1 text-center sm:text-left">
                  <div>
                    <h2 className="text-3xl font-gamja font-bold text-lime-700 mb-2">
                      {tx.projectName}
                    </h2>
                    <p className="text-gray-700 text-base font-gantari mb-4">
                      {tx.description}
                    </p>
                    <p className="text-lg font-semibold font-gantari">
                      💸 Donated:{' '}
                      <span className="text-green-600">{tx.amount || '0'} ETH</span>
                    </p>
                  </div>
                  <a
                    href={tx.projectLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 text-blue-700 font-semibold hover:underline hover:text-blue-900"
                  >
                    🌍 Learn More
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
