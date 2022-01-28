import * as dotenv from 'dotenv';
import { VoidSigner, providers } from 'ethers';
import { AvaxConsts, EthConsts } from '@pendle/constants';
import {
  validateAndParseChainId,
  validateAndParseAddress,
  getProvider,
  getBlockTimestamp,
  getBlockSomeDurationEarlier,
  getCurrentBlockTimestamp,
  getCurrentTimestampLocal,
} from '@/chainUtils';
import { AbsentProviderError, InvalidChainIdError } from '@/exceptions';

dotenv.config();

const chainId = AvaxConsts.common.CHAIN_ID;
const providerUrl =
  chainId === EthConsts.common.CHAIN_ID
    ? `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`
    : 'https://api.avax.network/ext/bc/C/rpc';
const provider = new providers.JsonRpcProvider(providerUrl);
const signer = provider.getSigner();

describe('test validateChainId', () => {
  const validChainIds = [EthConsts.common.CHAIN_ID, AvaxConsts.common.CHAIN_ID];
  it.concurrent.each(validChainIds)('should return true for valid chainId %i', async (chainId) => {
    expect(validateAndParseChainId(chainId)).toBe(chainId);
    expect(validateAndParseChainId(String(chainId))).toBe(chainId);
  });

  const invalidChainIds = [undefined, '111111111111111111111111111111111111111111111111111111111111'];
  it.concurrent.each(invalidChainIds)('should fail for invalid chainId %p', async (chainId) => {
    expect(() => validateAndParseChainId(chainId)).toThrow(InvalidChainIdError);
  });
});

describe('test validateAndParseAddress', () => {
  it.concurrent('returns same address if already checksummed', () => {
    const address = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
    expect(validateAndParseAddress(address)).toBe(address);
  });

  it.concurrent('returns checksummed address if not checksummed', () => {
    const address = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
    expect(validateAndParseAddress(address.toLowerCase())).toBe(address);
  });

  it.concurrent('throws if not valid', () => {
    const invalidAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6';
    expect(() => validateAndParseAddress(invalidAddress)).toThrow(`${invalidAddress} is not a valid address.`);
  });
});

describe('test getProvider', () => {
  it.concurrent('throws if provider is not provided', () => {
    expect(() => getProvider(new VoidSigner(AvaxConsts.tokens.NATIVE.address))).toThrow(AbsentProviderError);
  });

  it.concurrent('returns provider if provider is provided', () => {
    expect(getProvider(provider)).toBe(provider);
  });

  it.concurrent('returns provider if signer is provided', () => {
    expect(getProvider(signer)).toBe(provider);
  });
});

describe('get time', () => {
  it.concurrent('gets the time at a block', async () => {
    await expect(getBlockTimestamp({ providerOrSigner: provider, block: 800000 })).resolves.toBe(1616920428);
  });

  it.concurrent('gets the current block time', async () => {
    const [expected, actual] = await Promise.all([
      getCurrentBlockTimestamp(provider),
      getBlockTimestamp({ providerOrSigner: provider, block: provider.getBlockNumber() }),
    ]);
    expect(expected).toBe(actual);
  });

  it.concurrent('gets local time', () => {
    const start = getCurrentTimestampLocal();
    setTimeout(() => {
      const end = getCurrentTimestampLocal();
      expect(end).toBeGreaterThanOrEqual(start);
    }, 1000);
  });
});

describe('test getBlockSomeDurationEarlier', () => {
  it('gets block some duration earlier', async () => {
    const duration = 100000;
    const [previous, current] = await Promise.all([
      getBlockSomeDurationEarlier({ duration, chainId, providerOrSigner: provider }),
      provider.getBlockNumber(),
    ]);
    expect(previous).toBeLessThan(current);
  });
});
