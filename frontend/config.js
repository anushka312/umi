import { bcs } from '@mysten/bcs';
import { ethers } from 'ethers';
import {
  createPublicClient,
  createWalletClient,
  custom,
  defineChain
} from 'viem';
import { publicActionsL2, walletActionsL2 } from 'viem/op-stack';
import abi from '../hardhat/artifacts/contracts/DonationNFT.sol/DonationNFT.json';

const COUNTER_CONTRACT_ADDRESS = '0x92e9c4af6eC4d46d50710B7033373ac1d2c501da'; // Replace with actual address

// BCS serializer
const FUNCTION_SERIALIZER = bcs.enum('SerializableTransactionData', {
  EoaBaseTokenTransfer: null,
  ScriptOrDeployment: null,
  EntryFunction: null,
  L2Contract: null,
  EvmContract: bcs.byteVector(),
});

const serializeFunction = (data) => {
  const code = Uint8Array.from(Buffer.from(data.replace('0x', ''), 'hex'));
  const evmFunction = FUNCTION_SERIALIZER.serialize({ EvmContract: code }).toBytes();
  return '0x' + Buffer.from(evmFunction).toString('hex');
};

// Custom Umi devnet chain
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

// Get connected wallet address
export const getAccount = async () => {
  const [account] = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  return account;
};

// Viem public client for reading
export const publicClient = () =>
  createPublicClient({
    chain: devnet,
    transport: custom(window.ethereum),
  }).extend(publicActionsL2());

// Viem wallet client for sending txs
export const walletClient = () =>
  createWalletClient({
    chain: devnet,
    transport: custom(window.ethereum),
  }).extend(walletActionsL2());

// Get encoded contract function data
export const getFunction = async (name) => {
  const counter = new ethers.Contract(COUNTER_CONTRACT_ADDRESS, abi);
  const tx = await counter.getFunction(name).populateTransaction();
  return {
    to: tx.to,
    data: serializeFunction(tx.data),
  };
};
