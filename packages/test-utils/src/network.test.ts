import { BigNumber as BN, constants } from 'ethers';
import { AvaxConsts, EthConsts, MiscConsts } from '@pendle/constants';
import {
  getTestingNetworkDetail,
  impersonateAccountInHardhat,
  resetHardhatNetwork,
  setBalanceInHardhatNetwork,
} from './network';
import { LOCAL_CHAIN_ID, TEST_CONSTANTS } from './constants';

const localChainId = AvaxConsts.common.CHAIN_ID;

describe('test getChainDetails', () => {
  const chainIds = [EthConsts.common.CHAIN_ID, AvaxConsts.common.CHAIN_ID, LOCAL_CHAIN_ID, undefined];

  it.concurrent.each(chainIds)('should have chain ID, provider, signer for chain ID %p', async (chainId) => {
    const details = getTestingNetworkDetail(chainId);
    expect(details).toHaveProperty('provider');
    expect(details).toHaveProperty('signer');
  });
});

describe('test impersonateTestAccount', () => {
  const constant = TEST_CONSTANTS[localChainId];
  it('should return a signer with same address as the parameter', async () => {
    const signer = await impersonateAccountInHardhat(constant.addresses.SNOW);
    await expect(signer.getAddress()).resolves.toEqual(constant.addresses.SNOW);
  });
});

describe('test setFund', () => {
  const constant = TEST_CONSTANTS[localChainId];
  it('should be able to setFund', async () => {
    const balanceInETH = MiscConsts.ONE_E_12.toString();
    const signer = await impersonateAccountInHardhat(constant.addresses.SNOW);
    const initialBalance = await signer.getBalance();
    await setBalanceInHardhatNetwork({ balanceInETH, address: constant.addresses.SNOW });

    const expectedBalance = BN.from(balanceInETH).mul(constants.WeiPerEther);
    await expect(signer.getBalance()).resolves.toEqBN(expectedBalance);

    await resetHardhatNetwork({ chainId: localChainId });
    await expect(signer.getBalance()).resolves.toEqBN(initialBalance);
  });
});
