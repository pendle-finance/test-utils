import {} from '@nomiclabs/hardhat-ethers/src/internal/type-extensions';
import {} from '@nomiclabs/hardhat-waffle/src/';
import { waffle, network, ethers } from 'hardhat';
import { advanceTime, deploy, getAbiByAddressAndChainId, getContractByAbi, impersonateSomeone } from '@/chainUtils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/src/signers';
import fs from 'fs';
const ERC20Contract = require('../../../artifacts/contracts/ERC20.sol/ERC20.json');
const Test = require('./../test.json');
describe.skip('Test Deploy', () => {
  const [admin] = waffle.provider.getWallets();
  it('Deploy erc20', async () => {
    await deploy(admin, ERC20Contract, [100000000, 'Shiro', 'SRO', '18']);
  });
});
describe('Test get abi', () => {
  it('get abi', async () => {
    let result = await getAbiByAddressAndChainId(43114, '0x4Db6c78422A8CdD09d984096F68C705C7B479A58');

    fs.writeFile('test.json', result, function (err) {
      if (err) {
        console.log(err);
      }
    });
  });
});
describe('Test impersonate', () => {
  //const [admin] = waffle.provider.getWallets();
  it('impersonate', async () => {
    let impersonatePpl = '0x13A0D71FfDc9DF57efC427794ae94d0Ac6fd47EC';
    await network.provider.send('hardhat_setBalance', [impersonatePpl, '0x56bc75e2d63100000000000000']);
    let receipt: SignerWithAddress = await impersonateSomeone(impersonatePpl);
    await deploy(receipt, ERC20Contract, [100000000, 'Shiro', 'SRO', '18']);
  });
});
describe.skip('Test contract abi', () => {
  it('get contract by abi', async () => {
    //let result = await getAbiByAddressAndChainId(43114, '0x4Db6c78422A8CdD09d984096F68C705C7B479A58');
    console.log(ERC20Contract.abi);
    await getContractByAbi(Test, '0x4Db6c78422A8CdD09d984096F68C705C7B479A58');
  });
});

describe('Test time', () => {
  it('Get time', async () => {
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const timestampBefore = blockBefore.timestamp;
    console.log('hahahaha', timestampBefore);
    await advanceTime(100000);
    const blockNumAfter = await ethers.provider.getBlockNumber();
    const blockAfter = await ethers.provider.getBlock(blockNumAfter);
    const timestampAfter = blockAfter.timestamp;
    console.log('hahahaha', timestampAfter);
  });
});
