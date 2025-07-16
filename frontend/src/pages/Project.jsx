'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getAccount, publicClient, walletClient, serializeFunction } from '../../config';
import Layout from './Layout';
import { ethers } from 'ethers';

const NFT_CONTRACT_ADDRESS = '0x0695e768dFB857Ab13a833a260803DBFf3e2fdBA';
const OWNER_ADDRESS = '0xcBbB388677fBb1F8637db6c167c7C4b7167D414b'; // your hardcoded address

const Project = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [walletAddress, setWalletAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [txStatus, setTxStatus] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const addr = localStorage.getItem('walletAddress');
        if (addr) setWalletAddress(addr);

        axios.get(`https://umi-b.onrender.com/api/projects/${id}`)
            .then((res) => setProject(res.data))
            .catch(() => setProject(null))
            .finally(() => setLoading(false));
    }, [id]);

    const donate = async () => {
        if (!walletAddress) return alert('Connect your wallet first');
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            return alert('Please enter a valid donation amount');
        }

        try {
            const account = await getAccount();

            // ✅ Step 1: Send donation to the project wallet
            const txHash = await walletClient().sendTransaction({
                account,
                to: project.wallet,
                value: ethers.utils.parseEther(amount),
            });

            setTxStatus('Transaction sent. Waiting for confirmation...');
            await publicClient().waitForTransactionReceipt({ hash: txHash });
            setTxStatus('Donation successful! Minting NFT...');

            // ✅ Step 2: Register donor & donation in backend
            await axios.post(`https://umi-b.onrender.com/api/users`, {
                walletAddress,
                name: '',
                bio: '',
                avatar: '',
            });

            await axios.post(`https://umi-b.onrender.com/api/projects/${id}/donate`, {
                amount: parseFloat(amount),
                walletAddress,
            });

            // ✅ Step 3: Select NFT metadata
            let nftUrl = project.name.toLowerCase().includes('solar')
                ? 'https://gateway.pinata.cloud/ipfs/bafkreic65f6mfovminxi7qywtkwfl54e3lvcjmz3qnmid7gomnbgmclp5y'
                : 'https://gateway.pinata.cloud/ipfs/bafkreie6jfj6w6nnlciwzd5wc27yc376aknp5uhbyiriz7elmvczbnqety';

            // ✅ Step 4: Encode + Serialize call to mintDonationNFT()
            const iface = new ethers.utils.Interface([
                'function mintDonationNFT(address recipient, string memory tokenURI)'
            ]);
            const encoded = iface.encodeFunctionData('mintDonationNFT', [account, nftUrl]);
            const serializedData = serializeFunction(encoded);

            // ✅ Step 5: Mint NFT via Viem
            await walletClient().sendTransaction({
                account,
                to: NFT_CONTRACT_ADDRESS,
                data: serializedData,
                gas: 1_000_000n // 🛠️ optional but helps on L2s where estimation fails
            });

            setTxStatus('NFT minted successfully 🎉');
            setAmount('');

            const updated = await axios.get(`https://umi-b.onrender.com/api/projects/${id}`);
            setProject(updated.data);

        } catch (err) {
            console.error(err);
            setTxStatus('Donation failed or NFT minting error.');
        }
    };



    if (loading) return <Layout><p className="text-center py-20 text-xl">Loading project...</p></Layout>;
    if (!project) return <Layout><p className="text-center py-20 text-xl text-red-500">Project not found</p></Layout>;

    const progress = (project.raised / project.goal) * 100;

    return (
        <Layout>
            <div className="px-4 sm:px-6 lg:px-10 py-10 max-w-7xl mx-auto">
                <div className="bg-[#14D30D] bg-opacity-30 rounded-2xl shadow-xl px-6 sm:px-10 py-8 flex flex-col md:flex-row gap-10 items-start">
                    <div className="w-full md:w-[40%]">
                        <img
                            src={project.image || "/assets/placeholder.jpg"}
                            alt={project.name}
                            className="w-full aspect-[507/436] object-cover rounded-xl"
                        />
                        <div className="flex items-center mt-4">
                            <img src="/assets/avatar_black_4.jpg" alt="avatar" className="w-10 h-10 rounded-full mr-3" />
                            <div>
                                <p className="text-sm font-bold text-gray-600">Raised By:</p>
                                <p className="text-md font-bold">{project.raisedBy}</p>
                            </div>
                        </div>
                        <div className="h-2 w-full bg-gray-300 mt-2 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>

                    <div className="flex-1 font-gantari text-gray-800">
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-gamja font-bold mb-4">{project.name}</h1>
                        <p className="text-base sm:text-lg leading-7 mb-4">{project.description}</p>

                        <div className="text-lg font-medium mb-4">
                            <p className="text-green-700 font-semibold mb-1">Benefits:</p>
                            <ul className="list-disc list-inside text-green-700">
                                {Array.isArray(project.benefits) && project.benefits.length > 0
                                    ? project.benefits.map((b, i) => <li key={i}>{b}</li>)
                                    : <li>No benefits listed.</li>}
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <input
                                type="number"
                                placeholder="Enter amount in ETH"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="border border-gray-300 px-4 py-2 rounded-lg text-lg w-full sm:w-[300px]"
                            />
                            <button
                                onClick={donate}
                                disabled={txStatus.includes('Waiting')}
                                className={`bg-lime-500 text-white font-bold px-6 py-2 text-lg rounded-xl mt-1 sm:mt-0 ${txStatus.includes('Waiting') ? 'opacity-50 cursor-not-allowed' : 'hover:bg-lime-600'
                                    }`}
                            >
                                Donate Now!
                            </button>
                        </div>

                        {txStatus && <div className="mt-2 text-sm text-gray-800 italic">{txStatus}</div>}

                        <div className="mt-2 text-red-400 text-sm">
                            🔴 Just a heads up :) <br />
                            Please read all the related documents carefully before making any transaction
                        </div>

                        <div className="mt-6 bg-green-100 p-4 rounded-xl shadow-inner">
                            <p className="text-lg font-bold text-gray-900">
                                Raised: <span className="text-blue-600">{Number(project.raised).toFixed(3)} ETH</span> / {project.goal} ETH
                            </p>
                            <p className="text-sm mt-1 text-gray-700">Contributed by: {project.contributors} people</p>
                            <p className="text-sm text-red-500 font-bold">Highest Tip: {project.highestTip} ETH</p>
                        </div>

                        {project.link && (
                            <a
                                href={project.link}
                                className="block mt-6 text-blue-600 text-lg underline hover:text-blue-800 break-words"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {project.link}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Project;
