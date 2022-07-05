import { BigNumber as BN, Contract, providers, utils, Wallet } from 'ethers';
import { EthConsts, MiscConsts } from '@pendle/constants';
import { AbsentProviderError, InvalidChainIdError, InvalidAddressError } from './exceptions';
import type { Address, ProviderOrSigner } from './types';
import {} from '@nomiclabs/hardhat-ethers/src/internal/type-extensions';
import hre from 'hardhat';
import fetch from 'node-fetch';
import { getApi, getKey } from '@/api_endpoint/endpoint';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/src/signers';
// TODO

export async function verifyContract(contract: string, constructor: any[]) {
  await hre.run('verify:verify', {
    address: contract,
    constructorArguments: constructor,
  });
}

export async function deploy(deployer: Wallet | SignerWithAddress, contractName: any, args: any[], verify?: boolean) {
  const contractFactory = await hre.ethers.getContractFactory(contractName.abi, contractName.bytecode);
  const contract = await contractFactory.connect(deployer).deploy(...args);
  await contract.deployed();
  console.log(`${contractName} deployed at address: ${contract.address}`);
  if (verify === true) {
    await verifyContract(contract.address, args);
  }
  return contract as Contract;
}

export async function _impersonateAccount(address: string) {
  await hre.network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [address],
  });
}

export async function impersonateSomeone(user: string) {
  await _impersonateAccount(user);
  return await hre.ethers.getSigner(user);
}

export async function getContractByInterfaceName(contractName: string, contractAddress: Address) {
  return await hre.ethers.getContractAt(contractName, contractAddress);
}

export async function getContractByAbi(abi: any[], contractAddress: Address) {
  return await hre.ethers.getContractAt(abi, contractAddress);
}

// need an mapping

export async function getAbiByAddressAndChainId(chainid: number, contractAddress: string) {
  try {
    let url = `${getApi(chainid)}&address=${contractAddress}&apikey=${getKey(chainid)}`;
    // let url = "https://api.snowtrace.io/api?module=contract&action=getabi&address=0x4Db6c78422A8CdD09d984096F68C705C7B479A58";
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    let result = await response.json();
    return result.result;
  } catch (error) {
    if (error instanceof Error) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

// END
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
