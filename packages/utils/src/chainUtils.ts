import { BigNumber as BN, providers, utils } from 'ethers';
import { EthConsts, MiscConsts } from '@pendle/constants';
import { AbsentProviderError, InvalidChainIdError, InvalidAddressError } from './exceptions';
import type { Address, ProviderOrSigner } from './types';

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

export function getProvider(providerOrSigner: ProviderOrSigner) {
  const provider = providerOrSigner instanceof providers.Provider ? providerOrSigner : providerOrSigner.provider;
  if (!provider) {
    throw new AbsentProviderError();
  }
  return provider;
}

export async function getBlockTimestamp({
  providerOrSigner,
  block,
}: {
  providerOrSigner: ProviderOrSigner;
  block: number | Promise<number>;
}): Promise<number> {
  const provider = getProvider(providerOrSigner);
  return (await provider.getBlock(block)).timestamp;
}

export async function getCurrentBlockTimestamp(providerOrSigner: ProviderOrSigner): Promise<number> {
  const provider = getProvider(providerOrSigner);
  return getBlockTimestamp({ providerOrSigner, block: provider.getBlockNumber() });
}

export function getCurrentTimestampLocal(): number {
  return Math.floor(Date.now() / 1000);
}

export async function getBlockSomeDurationEarlier({
  chainId,
  providerOrSigner,
  duration,
}: {
  chainId: number;
  providerOrSigner: ProviderOrSigner;
  duration: number;
}): Promise<number | undefined> {
  const margin = 30;
  const provider = getProvider(providerOrSigner);
  const scanInterval = MiscConsts.ONE_DAY.div(chainId === EthConsts.common.CHAIN_ID ? 7 : 1);
  const marginTime = MiscConsts.ONE_HOUR.div(60).mul(margin).toNumber();

  const [currentTime, end] = await Promise.all([getCurrentBlockTimestamp(provider), provider.getBlockNumber()]);
  const targetTime = currentTime - duration;
  const marginMin = targetTime - marginTime;
  const marginMax = targetTime + marginTime;

  let leftBound = BN.from(end);
  let rightBound = leftBound;
  while (true) {
    const { timestamp } = await provider.getBlock(rightBound.sub(scanInterval).toNumber());
    if (timestamp >= marginMin && timestamp <= marginMax) {
      return rightBound.sub(scanInterval).toNumber();
    }
    if (timestamp < marginMin) {
      leftBound = rightBound.sub(scanInterval);
      break;
    }
    rightBound = rightBound.sub(scanInterval);
  }

  let l = leftBound.toNumber();
  let r = rightBound.toNumber();
  while (l < r) {
    const mid = Math.trunc((l + r) / 2);
    const { timestamp } = await provider.getBlock(mid);
    if (timestamp >= marginMin && timestamp <= marginMax) {
      return mid;
    }
    if (timestamp > targetTime) {
      r = mid - 1;
    } else if (timestamp < targetTime) {
      l = mid + 1;
    }
  }
  return undefined;
}
