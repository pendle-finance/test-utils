import type { Erc20Token, PendleConstsType } from '@pendle/constants';
import type { TestAddress } from './types';
import { AvaxConsts, EthConsts } from '@pendle/constants';
import { validateAndParseChainId } from '@pendle/utils';

export const HARDHAT_PROVIDER_URL = 'http://localhost:8545';

const CHAIN_CONSTS = {
  [AvaxConsts.common.CHAIN_ID]: AvaxConsts,
  [EthConsts.common.CHAIN_ID]: EthConsts,
};

const AvaxAccounts = {
  SNOW: '0xB5E4846Db18d2B859c32951C843a5b7A2bf19126',
  RANDOM: '0x682C1297433557E3598680B48862Dd97CB8248cD',
};

const TEST_ADDRESSES = {
  [AvaxConsts.common.CHAIN_ID]: AvaxAccounts,
  [EthConsts.common.CHAIN_ID]: AvaxAccounts,
};

class TestConstants {
  private readonly chainId: number;
  constructor(chainId: number) {
    this.chainId = validateAndParseChainId(chainId);
  }

  get const(): PendleConstsType {
    return CHAIN_CONSTS[this.chainId];
  }

  get addresses(): TestAddress {
    return TEST_ADDRESSES[this.chainId];
  }

  get native(): Erc20Token {
    return this.const.tokens.NATIVE;
  }
}

export const TEST_CONSTANTS = {
  [AvaxConsts.common.CHAIN_ID]: new TestConstants(AvaxConsts.common.CHAIN_ID),
  [EthConsts.common.CHAIN_ID]: new TestConstants(EthConsts.common.CHAIN_ID),
};
