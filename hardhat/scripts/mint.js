const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x0695e768dFB857Ab13a833a260803DBFf3e2fdBA"; // replace this
const RECIPIENT = "0x8834EDD41DCA0C832C5FE9bcE709eE9b6817f192";
const TOKEN_URI = "https://gateway.pinata.cloud/ipfs/bafkreic65f6mfovminxi7qywtkwfl54e3lvcjmz3qnmid7gomnbgmclp5y";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Minting NFT from:", deployer.address);

    const DonationNFT = await ethers.getContractFactory("DonationNFT");
    const contract = await DonationNFT.attach(CONTRACT_ADDRESS);

    const tx = await contract.mintDonationNFT(RECIPIENT, TOKEN_URI);
    console.log("Transaction sent. Hash:", tx.hash);

    const receipt = await tx.wait();
    console.log("✅ Minted! Block:", receipt.blockNumber);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
