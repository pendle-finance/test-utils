import { BigNumber as BN, constants } from 'ethers';
import { AvaxConsts, MiscConsts } from '@pendle/constants';
import {
  getTestingNetworkDetail,
  impersonateAccountInHardhat,
  resetHardhatNetwork,
  setBalanceInHardhatNetwork,
} from './network';
import { TEST_CONSTANTS } from './constants';

const chainId = AvaxConsts.common.CHAIN_ID;

describe('test getChainDetails', () => {
  it('should have chain ID, provider, signer', () => {
    const details = getTestingNetworkDetail();
    expect(details).toHaveProperty('provider');
    expect(details).toHaveProperty('signer');
  });
});

describe('test impersonateTestAccount', () => {
  const avalancheConstant = TEST_CONSTANTS[AvaxConsts.common.CHAIN_ID];
  it('should return a signer with same address as the parameter', async () => {
    const signer = await impersonateAccountInHardhat(avalancheConstant.addresses.SNOW);
    await expect(signer.getAddress()).resolves.toEqual(avalancheConstant.addresses.SNOW);
  });
});

describe('test setFund', () => {
  const avalancheConstant = TEST_CONSTANTS[AvaxConsts.common.CHAIN_ID];
  it('should be able to setFund', async () => {
    const balanceInETH = MiscConsts.ONE_E_12.toString();
    const signer = await impersonateAccountInHardhat(avalancheConstant.addresses.SNOW);
    const initialBalance = await signer.getBalance();
    await setBalanceInHardhatNetwork({ balanceInETH, address: avalancheConstant.addresses.SNOW });

    const expectedBalance = BN.from(balanceInETH).mul(constants.WeiPerEther);
    await expect(signer.getBalance()).resolves.toEqBN(expectedBalance);

    await resetHardhatNetwork({ chainId });
    await expect(signer.getBalance()).resolves.toEqBN(initialBalance);
  });
});
