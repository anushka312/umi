import { ethers } from 'ethers';
import {
  createPublicClient,
  createWalletClient,
  custom,
  defineChain
} from 'viem';
import { publicActionsL2, walletActionsL2 } from 'viem/op-stack';
import { bcs } from '@mysten/bcs';
import abi from '../hardhat/artifacts/contracts/DonationNFT.sol/DonationNFT.json';

// Replace with your actual deployed contract address
const CONTRACT_ADDRESS = '0x92e9c4af6eC4d46d50710B7033373ac1d2c501da';

// Umi Devnet Chain Definition
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

// Get user's wallet address
export const getAccount = async () => {
  const [account] = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  return account;
};

// Viem client for reading data
export const publicClient = () =>
  createPublicClient({
    chain: devnet,
    transport: custom(window.ethereum),
  }).extend(publicActionsL2());

// Viem client for sending transactions
export const walletClient = () =>
  createWalletClient({
    chain: devnet,
    transport: custom(window.ethereum),
  }).extend(walletActionsL2());

// Create a BCS serializer enum for Umi L2
const FUNCTION_SERIALIZER = bcs.enum('SerializableTransactionData', {
  EoaBaseTokenTransfer: null,
  ScriptOrDeployment: null,
  EntryFunction: null,
  L2Contract: null,
  EvmContract: bcs.byteVector(),
});

// Serialize raw EVM calldata as Umi-compatible BCS payload
const serializeFunction = (data: string): `0x${string}` => {
  const code = Uint8Array.from(Buffer.from(data.replace(/^0x/, ''), 'hex'));
  const evmFunction = FUNCTION_SERIALIZER.serialize({ EvmContract: code }).toBytes();
  return `0x${Buffer.from(evmFunction).toString('hex')}`;
};

// Return serialized BCS transaction payload for any contract function
export const getFunction = async (name: string, args: any[] = []) => {
  const iface = new ethers.utils.Interface(abi);
  const data = iface.encodeFunctionData(name, args);

  return {
    to: CONTRACT_ADDRESS as `0x${string}`,
    data: serializeFunction(data),
  };
};
