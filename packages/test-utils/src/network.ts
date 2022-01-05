import { ethers, network } from 'hardhat';
import { BigNumber as BN, Signer, providers } from 'ethers';
import '@nomiclabs/hardhat-ethers';
import { HARDHAT_PROVIDER_URL } from './constants';
import { type Address } from '@pendle/utils';

export type NetworkDetails = {
  provider: providers.Provider;
  signer: Signer;
};

export function getTestingNetworkDetail(): NetworkDetails {
  const provider = new providers.JsonRpcProvider(HARDHAT_PROVIDER_URL);
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

export async function resetHardhatNetwork(blockNumber?: number): Promise<void> {
  if (!blockNumber) {
    const blockNumberEnvString = process.env.BLOCK_NUMBER;
    blockNumber = blockNumberEnvString ? parseInt(blockNumberEnvString) : undefined;
  }
  await network.provider.request({
    method: 'hardhat_reset',
    params: [
      {
        forking: {
          jsonRpcUrl: HARDHAT_PROVIDER_URL,
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
