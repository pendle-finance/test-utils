import { ethers, network } from 'hardhat';
import { BigNumber as BN, providers, type Signer } from 'ethers';
import '@nomiclabs/hardhat-ethers';
import { LOCAL_CHAIN_ID, PROVIDER_URL } from './constants';
import type { Address } from '@pendle/utils';
import * as dotenv from 'dotenv';

dotenv.config();

export type NetworkDetails = {
  provider: providers.Provider;
  signer: Signer;
};

export function getTestingNetworkDetail(chainId?: number): NetworkDetails {
  const provider = new providers.JsonRpcProvider(PROVIDER_URL[chainId ?? LOCAL_CHAIN_ID]);
  const signer = provider.getSigner();
  return { provider, signer };
}

export async function impersonateAccountInHardhat(address: Address): Promise<Signer> {
  await network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [address],
  });
  return ethers.getSigner(address);
}

export interface ResetOption {
  chainId: number;
  blockNumber?: number;
}

export async function resetHardhatNetwork({ chainId, blockNumber }: ResetOption): Promise<void> {
  if (!blockNumber) {
    const blockNumberEnvString = process.env.BLOCK_NUMBER;
    blockNumber = blockNumberEnvString ? parseInt(blockNumberEnvString) : undefined;
  }

  await network.provider.request({
    method: 'hardhat_reset',
    params: [
      {
        forking: {
          jsonRpcUrl: PROVIDER_URL[chainId ?? LOCAL_CHAIN_ID],
          blockNumber,
        },
      },
    ],
  });
}

export async function setBalanceInHardhatNetwork({
  address,
  balanceInETH,
}: {
  address: Address;
  balanceInETH: string;
}): Promise<void> {
  const balanceInWei = BN.from(balanceInETH).mul(ethers.constants.WeiPerEther);
  const balanceInWeiHex = balanceInWei.toHexString().replace('0x0', '0x');
  await network.provider.send('hardhat_setBalance', [address, balanceInWeiHex]);
}
