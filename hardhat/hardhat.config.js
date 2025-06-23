require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@moved/hardhat-plugin");

module.exports = {
  solidity: "0.8.28",
  defaultNetwork: "devnet",
  networks: {
    devnet: {
      url: "https://devnet.moved.network",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
