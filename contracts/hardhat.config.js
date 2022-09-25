require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const {API_URL_MUMBAI, PRIVATE_KEY} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      url: API_URL_MUMBAI,
      accounts: [`0x${PRIVATE_KEY}`]
    },
  },
};
