import { ethers } from 'ethers';
import {
  createPublicClient,
  createWalletClient,
  custom,
  defineChain
} from 'viem';
import { publicActionsL2, walletActionsL2 } from 'viem/op-stack';
import abi from '../hardhat/artifacts/contracts/DonationNFT.sol/DonationNFT.json';

// Replace this with your actual deployed contract address
const COUNTER_CONTRACT_ADDRESS = '0x92e9c4af6eC4d46d50710B7033373ac1d2c501da';

// Define the custom Umi devnet chain
export const devnet = defineChain({
  id: 42069,
  sourceId: 42069,
  name: 'Umi',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://devnet.uminetwork.com'],
    },
  },
});

// Get the connected wallet address (via MetaMask)
export const getAccount = async () => {
  const [account] = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  return account;
};

// Viem public client for reading data
export const publicClient = () =>
  createPublicClient({
    chain: devnet,
    transport: custom(window.ethereum),
  }).extend(publicActionsL2());

// Viem wallet client for sending transactions
export const walletClient = () =>
  createWalletClient({
    chain: devnet,
    transport: custom(window.ethereum),
  }).extend(walletActionsL2());

// Get the ABI-encoded data for the given contract function
export const getFunction = async (name) => {
  const counter = new ethers.Contract(COUNTER_CONTRACT_ADDRESS, abi);
  const tx = await counter.getFunction(name).populateTransaction();
  return {
    to: tx.to,
    data: tx.data, // ⬅️ raw ABI-encoded calldata, no BCS serialization
  };
};
