import { ethers } from 'hardhat';

async function main() {
  const DonationNFT = await ethers.getContractFactory('DonationNFT');
  const donationNFT = await DonationNFT.deploy();
  await donationNFT.waitForDeployment();

  const receipt = await ethers.provider.getTransactionReceipt(
    donationNFT.deploymentTransaction()?.hash!
  );

  console.log('DonationNFT deployed to:', receipt?.contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
