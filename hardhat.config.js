const dotenv = require('dotenv');
const path = require('path');

const { task } = require('hardhat/config');
require('@nomiclabs/hardhat-ethers');

dotenv.config({ path: path.join(__dirname, '.env') });

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const dummyPrivateKey = '1111111111111111111111111111111111111111111111111111111111111111';

/** @type{ import("hardhat/config").HardhatUserConfig } */
module.exports = {
  solidity: '0.8.4',
  networks: {
    hardhat: {
      forking: {
        url: process.env.PROVIDER_URL,
        blockNumber: parseInt(process.env.BLOCK_NUMBER),
      },

      accounts: [{ privateKey: process.env.PRIVATE_KEY || dummyPrivateKey, balance: '10000000000000000000000' }],
    },
  },
};
