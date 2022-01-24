import { utils } from 'ethers';
import { InvalidChainIdError, InvalidAddressError } from '@/exceptions';
import type { Address } from '@/types';

export function validateAndParseChainId(chainId?: string | number): number {
  const chainIdNumber = Number(chainId);
  if (!Number.isSafeInteger(chainIdNumber)) {
    throw new InvalidChainIdError(chainIdNumber);
  }
  return chainIdNumber;
}

export function validateAndParseAddress(address: Address): Address {
  try {
    return utils.getAddress(address);
  } catch (error) {
    throw new InvalidAddressError(address);
  }
}
