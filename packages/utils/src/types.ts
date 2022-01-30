import '@ethereum-waffle/jest/src/types';
import type { BigNumber as BN, Signer, providers } from 'ethers';
import type { Erc20Token, LpToken } from '@pendle/constants';

export type Address = string;

export type ProviderOrSigner = providers.Provider | Signer;

export interface ExtendedChainInfo {
  pendleSubgraphUrl: string;
  pendleRouter: Address;
  pendleData: Address;
  forges: Record<string, Address>;
  pendleMarkets: Record<Address, PendleMarket>;
  otherMarkets: Record<Address, OtherMarket>;
}

export type PendleMarket = {
  pair: {
    yt: Address;
    other: Address;
  };
};

export type OtherMarket = {
  pair: Address[];
};

export interface OtYtToken extends Erc20Token {
  expiry: BN;
  underlyingAssetAddress: Address;
  rewardTokenAddresses: Address[];
  yieldBearingAssetAddress: Address;
  forgeIdInBytes: string;
}

export interface AvaxTokenConstsExtendedType {
  // Avalanche Network
  OT_BENQI_USDC_28DEC2023: OtYtToken;
  YT_BENQI_USDC_28DEC2023: OtYtToken;
  OT_BENQI_AVAX_28DEC2023: OtYtToken;
  YT_BENQI_AVAX_28DEC2023: OtYtToken;
  OT_JOE_PENDLE_AVAX_28DEC2023: OtYtToken;
  YT_JOE_PENDLE_AVAX_28DEC2023: OtYtToken;
  OT_XJOE_30JUN2022: OtYtToken;
  YT_XJOE_30JUN2022: OtYtToken;
  OT_WMEMO_24FEB2022: OtYtToken;
  YT_WMEMO_24FEB2022: OtYtToken;
}

export interface EthereumTokenConstsExtendedType {
  // Ethereum Mainnet
  SUSHI_PENDLE_WETH_LP: Erc20Token & LpToken;
  SUSHI_USDC_WETH_LP: LpToken;
  OT_AAVE_USDC_30DEC2021: OtYtToken;
  YT_AAVE_USDC_30DEC2021: OtYtToken;
  OT_AAVE_USDC_29DEC2022: OtYtToken;
  YT_AAVE_USDC_29DEC2022: OtYtToken;
  OT_COMPOUND_DAI_30DEC2021: OtYtToken;
  YT_COMPOUND_DAI_30DEC2021: OtYtToken;
  OT_COMPOUND_DAI_29DEC2022: OtYtToken;
  YT_COMPOUND_DAI_29DEC2022: OtYtToken;
  OT_SUSHI_PENDLE_ETH_29DEC2022: OtYtToken;
  YT_SUSHI_PENDLE_ETH_29DEC2022: OtYtToken;
  OT_SUSHI_USDC_ETH_29DEC2022: OtYtToken;
  YT_SUSHI_USDC_ETH_29DEC2022: OtYtToken;
}
