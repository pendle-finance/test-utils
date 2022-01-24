import { validateAndParseChainId, validateAndParseAddress } from './chainUtils';
import { InvalidChainIdError } from '@/exceptions';

describe('test validateChainId', () => {
  it('should return true if chainId is valid', () => {
    const mainnet = 1;
    const avalanche = 43114;

    expect(validateAndParseChainId(mainnet)).toBe(mainnet);
    expect(validateAndParseChainId(String(mainnet))).toBe(mainnet);
    expect(validateAndParseChainId(avalanche)).toBe(avalanche);
    expect(validateAndParseChainId(String(avalanche))).toBe(avalanche);
  });

  it('should fail if chainId is invalid', () => {
    expect(() => validateAndParseChainId(undefined)).toThrow(InvalidChainIdError);
    expect(() => validateAndParseChainId('111111111111111111111111111111111111111111111111111111111111')).toThrow(
      InvalidChainIdError
    );
  });
});

describe('test validateAndParseAddress', () => {
  it('returns same address if already checksummed', () => {
    const address = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
    expect(validateAndParseAddress(address)).toBe(address);
  });

  it('returns checksummed address if not checksummed', () => {
    const address = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
    expect(validateAndParseAddress(address.toLowerCase())).toBe(address);
  });

  it('throws if not valid', () => {
    const invalidAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6';
    expect(() => validateAndParseAddress(invalidAddress)).toThrow(`${invalidAddress} is not a valid address.`);
  });
});
