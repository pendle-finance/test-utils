import { AvaxConsts, EthConsts } from '@pendle/constants';
import { validateAndParseChainId, validateAndParseAddress } from '@/chainUtils';
import { InvalidChainIdError } from '@/exceptions';

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
  it.concurrent('returns same address if already checksummed', async () => {
    const address = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
    expect(validateAndParseAddress(address)).toBe(address);
  });

  it.concurrent('returns checksummed address if not checksummed', async () => {
    const address = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
    expect(validateAndParseAddress(address.toLowerCase())).toBe(address);
  });

  it.concurrent('throws if not valid', async () => {
    const invalidAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6';
    expect(() => validateAndParseAddress(invalidAddress)).toThrow(`${invalidAddress} is not a valid address.`);
  });
});
