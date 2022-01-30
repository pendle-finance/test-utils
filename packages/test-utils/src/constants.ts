import * as dotenv from 'dotenv';
import { AvaxConsts, EthConsts, TokensConstsType } from '@pendle/constants';
import { CHAIN_CONSTS, validateAndParseChainId } from '@pendle/utils';
import type { Erc20Token, PendleConstsType } from '@pendle/constants';
import type { TestAddress } from '@/types';

dotenv.config();

export const LOCAL_CHAIN_ID = 31334;

export const PROVIDER_URL = {
  [EthConsts.common.CHAIN_ID]: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
  [AvaxConsts.common.CHAIN_ID]: 'https://api.avax.network/ext/bc/C/rpc',
  [LOCAL_CHAIN_ID]: 'http://localhost:8545',
};

const AvaxAccounts = {
  SNOW: '0xB5E4846Db18d2B859c32951C843a5b7A2bf19126',
  RANDOM: '0x682C1297433557E3598680B48862Dd97CB8248cD',
};

const TEST_ADDRESSES = {
  [AvaxConsts.common.CHAIN_ID]: AvaxAccounts,
};

class TestConstants {
  private readonly chainId: number;
  constructor(chainId: number) {
    this.chainId = validateAndParseChainId(chainId);
  }

  get const(): PendleConstsType {
    return CHAIN_CONSTS[this.chainId] ?? CHAIN_CONSTS[AvaxConsts.common.CHAIN_ID];
  }

  get addresses(): TestAddress {
    return TEST_ADDRESSES[this.chainId] ?? TEST_ADDRESSES[AvaxConsts.common.CHAIN_ID];
  }

  get tokens(): TokensConstsType {
    return this.const.tokens;
  }

  get native(): Erc20Token {
    return this.tokens.NATIVE;
  }

  get wnative(): Erc20Token {
    return this.tokens.WNATIVE;
  }
}

export const TEST_CONSTANTS = {
  [AvaxConsts.common.CHAIN_ID]: new TestConstants(AvaxConsts.common.CHAIN_ID),
  [EthConsts.common.CHAIN_ID]: new TestConstants(EthConsts.common.CHAIN_ID),
};
