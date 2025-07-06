import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';

const Project = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [walletAddress, setWalletAddress] = useState('');
    const [txStatus, setTxStatus] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        const address = localStorage.getItem('walletAddress');
        if (address) setWalletAddress(address);

        axios.get(`https://umi-b.onrender.com/api/projects/${id}`)
            .then((res) => setProject(res.data))
            .catch(() => setProject(null));
    }, [id]);

    const checkUmiNetwork = async () => {
        const provider = window.rabby || window.ethereum;
        if (!provider) {
            alert('No wallet found. Please install Rabby.');
            return false;
        }

        try {
            const chainId = await provider.request({ method: 'eth_chainId' });
            console.log('Current chainId:', chainId);
            if (chainId !== '0xa455') {
                alert('Please switch to Umi Devnet in Rabby Wallet (chainId: 0xa455).');
                return false;
            }
            return true;
        } catch (err) {
            console.error('Error checking network:', err);
            return false;
        }
    };

    const donate = async () => {
        const isCorrectNetwork = await checkUmiNetwork();
        if (!isCorrectNetwork) return;

        await axios.post('https://umi-b.onrender.com/api/users', {
            walletAddress,
            name: '',
            bio: '',
            avatar: '',
        });

        if (!walletAddress) return alert('Connect your wallet first');
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            return alert('Please enter a valid donation amount');
        }

        try {
            const provider = new ethers.BrowserProvider(window.rabby || window.ethereum);
            const signer = await provider.getSigner();

            const tx = await signer.sendTransaction({
                to: project.wallet,
                value: ethers.parseEther(amount),
            });

            setTxStatus('Transaction sent. Waiting for confirmation...');
            await tx.wait();
            setTxStatus('Donation successful! Thank you ❤️');

            // Update DB
            await axios.post(`https://umi-b.onrender.com/api/projects/${id}/donate`, {
                amount: parseFloat(amount),
                walletAddress,
            });

            const updated = await axios.get(`https://umi-b.onrender.com/api/projects/${id}`);
            setProject(updated.data);
            setAmount('');
        } catch (err) {
            console.error('Donation error:', err);
            setTxStatus('Transaction failed.');
        }
    };

    if (!project) return <Layout><p>Loading or Project not found</p></Layout>;

    const progress = (project.raised / project.goal) * 100;

    return (
        <Layout>
            <div className='p-10'>
                <div className="bg-[#14D30D] bg-opacity-30 rounded-2xl shadow-xl px-10 py-8 flex flex-col md:flex-row gap-10 items-start">
                    <div className="w-full md:w-[40%]">
                        <img
                            src={project.image || "/assets/placeholder.jpg"}
                            alt={project.name}
                            className="w-full aspect-[507/436] object-cover rounded-xl"
                        />

                        <div className="flex items-center mt-4">
                            <img
                                src="/assets/avatar_black_4.jpg"
                                alt="avatar"
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                                <p className="text-sm font-bold text-gray-600">Raised By:</p>
                                <p className="text-md font-bold">{project.raisedBy}</p>
                            </div>
                        </div>

                        <div className="h-2 w-full bg-gray-300 mt-2 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-orange-500"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="flex-1 font-gantari text-gray-800">
                        <h1 className="text-6xl font-gamja font-bold mb-3">{project.name}</h1>
                        <p className="text-lg leading-7 mb-4">{project.description}</p>

                        <div className="text-lg font-medium mb-4">
                            <p className="text-green-700 font-semibold mb-1">Benefits:</p>
                            <ul className="list-disc list-inside text-green-700">
                                {project.benefits.map((b, i) => (
                                    <li key={i}>{b}</li>
                                ))}
                            </ul>
                        </div>

                        <input
                            type="number"
                            placeholder="Enter amount in ETH"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="border border-gray-300 px-4 py-2 rounded-lg text-lg mt-2 mr-4 w-[300px]"
                        />
                        <button
                            onClick={donate}
                            className="bg-lime-500 text-white font-bold px-6 py-2 text-lg rounded-xl hover:bg-lime-600 mt-2">
                            Donate Now!
                        </button>

                        {txStatus && (
                            <div className="mt-2 text-sm text-gray-800 italic">
                                {txStatus}
                            </div>
                        )}

                        <div className="mt-2 text-red-400 text-sm">
                            🔴 Just a heads up :) <br />
                            Please read all the related documents carefully before making any transaction
                        </div>

                        <div className="mt-6 bg-green-100 p-4 rounded-xl shadow-inner">
                            <p className="text-lg font-bold text-gray-900">
                                Raised: <span className="text-blue-600">{project.raised.toFixed(3)} ETH</span> / {project.goal} ETH
                            </p>
                            <p className="text-sm mt-1 text-gray-700">
                                Contributed by: {project.contributors} people
                            </p>
                            <p className="text-sm text-red-500 font-bold">
                                Highest Tip: {project.highestTip} ETH
                            </p>
                        </div>

                        <a
                            href={project.link}
                            className="block mt-6 text-blue-600 text-lg underline hover:text-blue-800"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {project.link}
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Project;
