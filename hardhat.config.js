const dotenv = require('dotenv');
const path = require('path');

const {
    task
} = require('hardhat/config');
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');
dotenv.config({
    path: path.join(__dirname, '.env')
});

task('accounts', 'Prints the list of accounts', async(taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

const dummyPrivateKey = '1111111111111111111111111111111111111111111111111111111111111111';

/** @type{ import("hardhat/config").HardhatUserConfig } */
module.exports = {
    solidity: '0.8.11',
    networks: {
        hardhat: {
            forking: {
                url: process.env.PROVIDER_URL,
                blockNumber: parseInt(process.env.BLOCK_NUMBER),
            },

            accounts: [{
                privateKey: process.env.PRIVATE_KEY || dummyPrivateKey,
                balance: '10000000000000000000000'
            }],
        },
        avax: {
            url: `https://api.avax.network/ext/bc/C/rpc`,
            accounts: [`${process.env.PRIVATE_KEYS || dummyPrivateKey}`],
            gasPrice: 30 * 1000000000,
            timeout: 200000,
        },
    },
};