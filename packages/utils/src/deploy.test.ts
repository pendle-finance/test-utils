import {} from '@nomiclabs/hardhat-ethers/src/internal/type-extensions';
import {} from '@nomiclabs/hardhat-waffle/src/';
import { waffle, network } from 'hardhat';
import { deploy, getAbiByAddressAndChainId, getContractByAbi, impersonateSomeone } from '@/chainUtils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/src/signers';

const ERC20Contract = require('../../../artifacts/contracts/ERC20.sol/ERC20.json');
describe.skip('Test Deploy', () => {
  const [admin] = waffle.provider.getWallets();
  it('Deploy erc20', async () => {
    await deploy(admin, ERC20Contract, [100000000, 'Shiro', 'SRO', '18']);
  });
});
describe('Test get abi', () => {
  it('get abi', async () => {
    let result = await getAbiByAddressAndChainId(43114, '0x4Db6c78422A8CdD09d984096F68C705C7B479A58');
    console.log(result);
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
    let result = await getAbiByAddressAndChainId(43114, '0x4Db6c78422A8CdD09d984096F68C705C7B479A58');
    await getContractByAbi(result, '0x4Db6c78422A8CdD09d984096F68C705C7B479A58');
  });
});
