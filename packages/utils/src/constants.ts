import AvaxFlat from 'deployments/AVAX-flat.json';
import MainnetFlat from 'deployments/mainnet-flat.json';
import { BigNumber as BN } from 'ethers';
import { AvaxConsts, EthConsts, MiscConsts } from '@pendle/constants';
import type {
  AvaxTokenConstsExtendedType,
  EthereumTokenConstsExtendedType,
  ExtendedChainInfo,
  PendleMarket,
} from './types';

export const CHAIN_CONSTS = {
  [AvaxConsts.common.CHAIN_ID]: AvaxConsts,
  [EthConsts.common.CHAIN_ID]: EthConsts,
};

const TIME_30_DEC_2021 = BN.from(MainnetFlat.TIME_30_DEC_2021);
const TIME_29_DEC_2022 = BN.from(MainnetFlat.TIME_29_DEC_2022);
const TIME_24_FEB_2022 = BN.from(AvaxFlat.TIME_24_FEB_2022);

const getPendleMarkets = (flat: Record<string, any>): Record<string, PendleMarket> =>
  Object.entries(flat)
    .filter(([key]) => key.startsWith('POOL_YT'))
    .reduce((o, [key, value]) => {
      const [ytPoolName, otherName] = key.split('_X_');
      const tokenPrefix = (name: string) => `TOKEN_${name}`;
      const getTokenAddress = (name: string) => flat[tokenPrefix(name)];
      return {
        ...o,
        [value]: {
          pair: {
            yt: getTokenAddress(ytPoolName.slice(5)),
            other: getTokenAddress(otherName),
          },
        },
      };
    }, {});

// Token details
export const ETH_EXTENDED_TOKENS: EthereumTokenConstsExtendedType = {
  SUSHI_PENDLE_WETH_LP: {
    address: MainnetFlat.TOKEN_SLP_PENDLE_WETH,
    decimal: 18,
    symbol: 'SLP',
    name: 'SushiSwap LP Token',
    whale: '0x5fA58f29c6138C07C2F9E9D0066F774a7CA3b7DF',
  },
  SUSHI_USDC_WETH_LP: {
    address: MainnetFlat.TOKEN_SLP_USDC_WETH,
    decimal: 18,
    symbol: 'SLP',
    name: 'SushiSwap LP Token',
  },
  OT_AAVE_USDC_30DEC2021: {
    address: MainnetFlat.TOKEN_OT_AUSDC_30_DEC_2021,
    decimal: 6,
    symbol: 'OT-aUSDC-30DEC2021',
    name: 'OT Aave interest bearing USDC 30DEC2021',
    expiry: TIME_30_DEC_2021,
    underlyingAssetAddress: MainnetFlat.TOKEN_USDC,
    rewardTokenAddresses: [MainnetFlat.TOKEN_STKAAVE],
    yieldBearingAssetAddress: MainnetFlat.TOKEN_AUSDC,
    forgeIdInBytes: EthConsts.aave!.FORGE_ID,
  },
  YT_AAVE_USDC_30DEC2021: {
    address: MainnetFlat.TOKEN_YT_AUSDC_30_DEC_2021,
    decimal: 6,
    symbol: 'YT-aUSDC-30DEC2021',
    name: 'YT Aave interest bearing USDC 30DEC2021',
    expiry: TIME_30_DEC_2021,
    underlyingAssetAddress: MainnetFlat.TOKEN_USDC,
    rewardTokenAddresses: [MainnetFlat.TOKEN_AUSDC],
    yieldBearingAssetAddress: MainnetFlat.TOKEN_AUSDC,
    forgeIdInBytes: EthConsts.aave!.FORGE_ID,
  },
  OT_AAVE_USDC_29DEC2022: {
    address: MainnetFlat.TOKEN_OT_AUSDC_29_DEC_2022,
    decimal: 6,
    symbol: 'OT-aUSDC-29DEC2022',
    name: 'OT Aave interest bearing USDC 30DEC2021',
    expiry: TIME_29_DEC_2022,
    underlyingAssetAddress: MainnetFlat.TOKEN_USDC,
    rewardTokenAddresses: [MainnetFlat.TOKEN_STKAAVE],
    yieldBearingAssetAddress: MainnetFlat.TOKEN_AUSDC,
    forgeIdInBytes: EthConsts.aave!.FORGE_ID,
  },
  YT_AAVE_USDC_29DEC2022: {
    address: MainnetFlat.TOKEN_YT_AUSDC_29_DEC_2022,
    decimal: 6,
    symbol: 'YT-aUSDC-29DEC2022',
    name: 'YT Aave interest bearing USDC 30DEC2021',
    expiry: TIME_29_DEC_2022,
    underlyingAssetAddress: MainnetFlat.TOKEN_USDC,
    rewardTokenAddresses: [MainnetFlat.TOKEN_AUSDC],
    yieldBearingAssetAddress: MainnetFlat.TOKEN_AUSDC,
    forgeIdInBytes: EthConsts.aave!.FORGE_ID,
  },
  OT_COMPOUND_DAI_30DEC2021: {
    address: MainnetFlat.TOKEN_OT_CDAI_30_DEC_2021,
    decimal: 8,
    symbol: 'OT-cDAI-30DEC2021',
    name: 'OT Compound Dai 30DEC2021',
    expiry: TIME_30_DEC_2021,
    underlyingAssetAddress: MainnetFlat.TOKEN_DAI,
    rewardTokenAddresses: [MainnetFlat.TOKEN_COMP],
    yieldBearingAssetAddress: MainnetFlat.TOKEN_CDAI,
    forgeIdInBytes: EthConsts.compound!.FORGE_ID_V1,
  },
  YT_COMPOUND_DAI_30DEC2021: {
    address: MainnetFlat.TOKEN_YT_CDAI_30_DEC_2021,
    decimal: 8,
    symbol: 'YT-cDAI-30DEC2021',
    name: 'YT Compound Dai 30DEC2021',
    expiry: TIME_30_DEC_2021,
    underlyingAssetAddress: MainnetFlat.TOKEN_DAI,
    rewardTokenAddresses: [MainnetFlat.TOKEN_CDAI],
    yieldBearingAssetAddress: MainnetFlat.TOKEN_CDAI,
    forgeIdInBytes: EthConsts.compound!.FORGE_ID_V1,
  },
  OT_COMPOUND_DAI_29DEC2022: {
    address: MainnetFlat.TOKEN_OT_CDAI_29_DEC_2022,
    decimal: 8,
    symbol: 'OT-cDAI-29DEC2022',
    name: 'OT Compound Dai 29DEC2022',
    expiry: TIME_29_DEC_2022,
    underlyingAssetAddress: MainnetFlat.TOKEN_DAI,
    rewardTokenAddresses: [MainnetFlat.TOKEN_COMP],
    yieldBearingAssetAddress: MainnetFlat.TOKEN_CDAI,
    forgeIdInBytes: EthConsts.compound!.FORGE_ID_V1,
  },
  YT_COMPOUND_DAI_29DEC2022: {
    address: MainnetFlat.TOKEN_YT_CDAI_29_DEC_2022,
    decimal: 8,
    symbol: 'YT-cDAI-29DEC2022',
    name: 'YT Compound Dai 29DEC2022',
    expiry: TIME_29_DEC_2022,
    underlyingAssetAddress: MainnetFlat.TOKEN_DAI,
    rewardTokenAddresses: [MainnetFlat.TOKEN_CDAI],
    yieldBearingAssetAddress: MainnetFlat.TOKEN_CDAI,
    forgeIdInBytes: EthConsts.compound!.FORGE_ID_V1,
  },
  OT_SUSHI_PENDLE_ETH_29DEC2022: {
    address: MainnetFlat.TOKEN_OT_SLP_PENDLE_WETH_29_DEC_2022,
    decimal: 18,
    symbol: 'OT-SLP-29DEC2022',
    name: 'OT SushiSwap LP Token 29DEC2022',
    expiry: TIME_29_DEC_2022,
    underlyingAssetAddress: MainnetFlat.TOKEN_SLP_PENDLE_WETH,
    rewardTokenAddresses: [],
    yieldBearingAssetAddress: MainnetFlat.TOKEN_SLP_PENDLE_WETH,
    forgeIdInBytes: EthConsts.sushi!.FORGE_ID_SIMPLE,
  },
  YT_SUSHI_PENDLE_ETH_29DEC2022: {
    address: MainnetFlat.TOKEN_YT_SLP_PENDLE_WETH_29_DEC_2022,
    decimal: 18,
    symbol: 'YT-SLP-29DEC2022',
    name: 'YT SushiSwap LP Token 29DEC2022',
    expiry: TIME_29_DEC_2022,
    underlyingAssetAddress: MainnetFlat.TOKEN_SLP_PENDLE_WETH,
    rewardTokenAddresses: [MainnetFlat.TOKEN_SLP_PENDLE_WETH],
    yieldBearingAssetAddress: MainnetFlat.TOKEN_SLP_PENDLE_WETH,
    forgeIdInBytes: EthConsts.sushi!.FORGE_ID_SIMPLE,
  },
  OT_SUSHI_USDC_ETH_29DEC2022: {
    address: '0x322D6c69048330247165231EB7848A5C80a48878',
    decimal: 18,
    symbol: 'OT-SLP-29DEC2022',
    name: 'OT SushiSwap LP Token 29DEC2022',
    expiry: TIME_29_DEC_2022,
    underlyingAssetAddress: MainnetFlat.TOKEN_SLP_USDC_WETH,
    rewardTokenAddresses: [MainnetFlat.TOKEN_SUSHI],
    yieldBearingAssetAddress: MainnetFlat.TOKEN_SLP_USDC_WETH,
    forgeIdInBytes: EthConsts.sushi!.FORGE_ID_COMPLEX,
  },
  YT_SUSHI_USDC_ETH_29DEC2022: {
    address: '0x311FCB5dB45A3a5876975f8108237F20525Fa7e0',
    decimal: 18,
    symbol: 'YT-SLP-29DEC2022',
    name: 'YT SushiSwap LP Token 29DEC2022',
    expiry: TIME_29_DEC_2022,
    underlyingAssetAddress: MainnetFlat.TOKEN_SLP_USDC_WETH,
    rewardTokenAddresses: [MainnetFlat.TOKEN_SLP_USDC_WETH],
    yieldBearingAssetAddress: MainnetFlat.TOKEN_SLP_USDC_WETH,
    forgeIdInBytes: EthConsts.sushi!.FORGE_ID_COMPLEX,
  },
};

export const AVAX_EXTENDED_TOKENS: AvaxTokenConstsExtendedType = {
  OT_BENQI_USDC_28DEC2023: {
    address: AvaxFlat.TOKEN_OT_QIUSDC_28_DEC_2023,
    decimal: 6,
    symbol: 'OT-qiUSDC-28DEC2023',
    name: 'OT Benqi USDC 28DEC2023',
    expiry: MiscConsts.END_OF_2023,
    underlyingAssetAddress: AvaxFlat.TOKEN_USDC,
    rewardTokenAddresses: [AvaxFlat.TOKEN_QI, AvaxFlat.TOKEN_WAVAX],
    yieldBearingAssetAddress: AvaxFlat.TOKEN_QIUSDC,
    forgeIdInBytes: AvaxConsts.benqi!.FORGE_ID,
  },
  YT_BENQI_USDC_28DEC2023: {
    address: AvaxFlat.TOKEN_YT_QIUSDC_28_DEC_2023,
    decimal: 6,
    symbol: 'YT-qiUSDC-28DEC2023',
    name: 'YT Benqi USDC 28DEC2023',
    expiry: MiscConsts.END_OF_2023,
    underlyingAssetAddress: AvaxFlat.TOKEN_USDC,
    rewardTokenAddresses: [AvaxFlat.TOKEN_QIUSDC],
    yieldBearingAssetAddress: AvaxFlat.TOKEN_QIUSDC,
    forgeIdInBytes: AvaxConsts.benqi!.FORGE_ID,
  },
  OT_BENQI_AVAX_28DEC2023: {
    address: AvaxFlat.TOKEN_OT_QIAVAX_28_DEC_2023,
    decimal: 18,
    symbol: 'OT-qiAVAX-28DEC2023',
    name: 'OT Benqi AVAX 28DEC2023',
    expiry: MiscConsts.END_OF_2023,
    underlyingAssetAddress: AvaxFlat.TOKEN_WAVAX,
    rewardTokenAddresses: [AvaxFlat.TOKEN_QI, AvaxFlat.TOKEN_WAVAX],
    yieldBearingAssetAddress: AvaxFlat.TOKEN_QIAVAX,
    forgeIdInBytes: AvaxConsts.benqi!.FORGE_ID,
  },
  YT_BENQI_AVAX_28DEC2023: {
    address: AvaxFlat.TOKEN_YT_QIAVAX_28_DEC_2023,
    decimal: 18,
    symbol: 'YT-qiAVAX-28DEC2023',
    name: 'YT Benqi AVAX 28DEC2023',
    expiry: MiscConsts.END_OF_2023,
    underlyingAssetAddress: AvaxFlat.TOKEN_WAVAX,
    rewardTokenAddresses: [AvaxFlat.TOKEN_QIAVAX],
    yieldBearingAssetAddress: AvaxFlat.TOKEN_QIAVAX,
    forgeIdInBytes: AvaxConsts.benqi!.FORGE_ID,
  },
  OT_JOE_PENDLE_AVAX_28DEC2023: {
    address: AvaxFlat.TOKEN_OT_JLP_WAVAX_PENDLE_28_DEC_2023,
    decimal: 18,
    symbol: 'OT-JLP-28DEC2023',
    name: 'OT Joe LP Token 28DEC2023',
    expiry: MiscConsts.END_OF_2023,
    underlyingAssetAddress: AvaxFlat.TOKEN_JLP_WAVAX_PENDLE,
    rewardTokenAddresses: [AvaxFlat.TOKEN_JOE, AvaxFlat.TOKEN_WAVAX],
    yieldBearingAssetAddress: AvaxFlat.TOKEN_JLP_WAVAX_PENDLE,
    forgeIdInBytes: AvaxConsts.joe!.FORGE_ID_SIMPLE,
  },
  YT_JOE_PENDLE_AVAX_28DEC2023: {
    address: AvaxFlat.TOKEN_YT_JLP_WAVAX_PENDLE_28_DEC_2023,
    decimal: 18,
    symbol: 'YT-JLP-28DEC2023',
    name: 'YT Joe LP Token 28DEC2023',
    expiry: MiscConsts.END_OF_2023,
    underlyingAssetAddress: AvaxFlat.TOKEN_JLP_WAVAX_PENDLE,
    rewardTokenAddresses: [AvaxFlat.TOKEN_JLP_WAVAX_PENDLE],
    yieldBearingAssetAddress: AvaxFlat.TOKEN_JLP_WAVAX_PENDLE,
    forgeIdInBytes: AvaxConsts.joe!.FORGE_ID_SIMPLE,
  },
  OT_XJOE_30JUN2022: {
    address: AvaxFlat.TOKEN_OT_XJOE_30_JUN_2022,
    decimal: 18,
    symbol: 'OT-xJOE-30JUN2022',
    name: 'OT JoeBar 30JUN2022',
    expiry: MiscConsts.JUNE_OF_2022,
    underlyingAssetAddress: AvaxFlat.TOKEN_JOE,
    rewardTokenAddresses: [AvaxFlat.TOKEN_JOE, AvaxFlat.TOKEN_WAVAX],
    yieldBearingAssetAddress: AvaxFlat.TOKEN_XJOE,
    forgeIdInBytes: AvaxConsts.joe!.FORGE_ID_XJOE,
  },
  YT_XJOE_30JUN2022: {
    address: AvaxFlat.TOKEN_YT_XJOE_30_JUN_2022,
    decimal: 18,
    symbol: 'YT-xJOE-30JUN2022',
    name: 'YT JoeBar 30JUN2022',
    expiry: MiscConsts.JUNE_OF_2022,
    underlyingAssetAddress: AvaxFlat.TOKEN_JOE,
    rewardTokenAddresses: [AvaxFlat.TOKEN_XJOE],
    yieldBearingAssetAddress: AvaxFlat.TOKEN_XJOE,
    forgeIdInBytes: AvaxConsts.joe!.FORGE_ID_XJOE,
  },
  OT_WMEMO_24FEB2022: {
    address: AvaxFlat.TOKEN_OT_WMEMO_24_FEB_2022,
    decimal: 9,
    symbol: 'OT-wMEMO-24FEB2022',
    name: 'OT Wrapped MEMO 24FEB2022',
    expiry: TIME_24_FEB_2022,
    underlyingAssetAddress: AvaxFlat.TOKEN_MEMO,
    rewardTokenAddresses: [],
    yieldBearingAssetAddress: AvaxFlat.TOKEN_WMEMO,
    forgeIdInBytes: AvaxConsts.wonderland!.FORGE_ID,
  },
  YT_WMEMO_24FEB2022: {
    address: AvaxFlat.TOKEN_YT_WMEMO_24_FEB_2022,
    decimal: 9,
    symbol: 'YT-wMEMO-24FEB2022',
    name: 'YT Wrapped MEMO 24FEB2022',
    expiry: TIME_24_FEB_2022,
    underlyingAssetAddress: AvaxFlat.TOKEN_MEMO,
    rewardTokenAddresses: [AvaxFlat.TOKEN_WMEMO],
    yieldBearingAssetAddress: AvaxFlat.TOKEN_WMEMO,
    forgeIdInBytes: AvaxConsts.wonderland!.FORGE_ID,
  },
};

export const CHAIN_EXTENDED_TOKENS_MAPPING = {
  [EthConsts.common.CHAIN_ID]: ETH_EXTENDED_TOKENS,
  [AvaxConsts.common.CHAIN_ID]: AVAX_EXTENDED_TOKENS,
};

export const CHAIN_MAPPING_EXTRA_DETAILS: Record<number, ExtendedChainInfo> = {
  [EthConsts.common.CHAIN_ID]: {
    pendleSubgraphUrl: 'https://api.thegraph.com/subgraphs/name/ngfam/pendle',
    pendleRouter: MainnetFlat.PENDLE_ROUTER,
    pendleData: MainnetFlat.PENDLE_DATA,
    forges: {
      [EthConsts.aave!.FORGE_ID]: MainnetFlat.FORGE_AAVE_V2,
      [EthConsts.compound!.FORGE_ID_V1]: MainnetFlat.FORGE_COMPOUND,
      [EthConsts.sushi!.FORGE_ID_SIMPLE]: MainnetFlat.FORGE_SUSHISWAPSIMPLE,
      [EthConsts.sushi!.FORGE_ID_COMPLEX]: MainnetFlat.FORGE_SUSHISWAPCOMPLEX,
    },
    otherMarkets: {
      [MainnetFlat.TOKEN_SLP_PENDLE_WETH]: {
        pair: [MainnetFlat.TOKEN_PENDLE, MainnetFlat.TOKEN_WETH],
      },
      [MainnetFlat.TOKEN_SLP_USDC_WETH]: {
        pair: [MainnetFlat.TOKEN_WETH, MainnetFlat.TOKEN_USDC],
      },
      [MainnetFlat.POOL_OT_CDAI_29_DEC_2022_X_USDC]: {
        pair: [MainnetFlat.TOKEN_OT_CDAI_29_DEC_2022, MainnetFlat.TOKEN_USDC],
      },
      [MainnetFlat.POOL_OT_AUSDC_29_DEC_2022_X_USDC]: {
        pair: [MainnetFlat.TOKEN_OT_AUSDC_29_DEC_2022, MainnetFlat.TOKEN_USDC],
      },
      [MainnetFlat.POOL_OT_SLP_USDC_WETH_29_DEC_2022_X_USDC]: {
        pair: [MainnetFlat.TOKEN_OT_SLP_USDC_WETH_29_DEC_2022, MainnetFlat.TOKEN_USDC],
      },
      [MainnetFlat.POOL_OT_SLP_PENDLE_WETH_29_DEC_2022_X_PENDLE]: {
        pair: [MainnetFlat.TOKEN_OT_SLP_PENDLE_WETH_29_DEC_2022, MainnetFlat.TOKEN_PENDLE],
      },
    },
    get pendleMarkets() {
      return getPendleMarkets(MainnetFlat);
    },
  },
  [AvaxConsts.common.CHAIN_ID]: {
    pendleSubgraphUrl: 'https://api.thegraph.com/subgraphs/name/ngfam/pendle-avalanche',
    pendleRouter: AvaxFlat.PENDLE_ROUTER,
    pendleData: AvaxFlat.PENDLE_DATA,
    forges: {
      [AvaxConsts.joe!.FORGE_ID_SIMPLE]: AvaxFlat.FORGE_TRADERJOESIMPLE,
      [AvaxConsts.benqi!.FORGE_ID]: AvaxFlat.FORGE_BENQI,
      [AvaxConsts.joe!.FORGE_ID_XJOE]: AvaxFlat.FORGE_XJOE,
      [AvaxConsts.wonderland!.FORGE_ID]: AvaxFlat.FORGE_WONDERLAND,
    },
    otherMarkets: {
      [AvaxFlat.TOKEN_JLP_WAVAX_PENDLE]: {
        pair: [AvaxFlat.TOKEN_PENDLE, AvaxFlat.TOKEN_WAVAX],
      },
      [AvaxFlat.POOL_OT_QIUSDC_28_DEC_2023_X_USDC]: {
        pair: [AvaxFlat.TOKEN_OT_QIUSDC_28_DEC_2023, AvaxFlat.TOKEN_USDC],
      },
      [AvaxFlat.POOL_OT_QIAVAX_28_DEC_2023_X_USDC]: {
        pair: [AvaxFlat.TOKEN_OT_QIAVAX_28_DEC_2023, AvaxFlat.TOKEN_USDC],
      },
      [AvaxFlat.POOL_OT_JLP_WAVAX_PENDLE_28_DEC_2023_X_PENDLE]: {
        pair: [AvaxFlat.TOKEN_OT_JLP_WAVAX_PENDLE_28_DEC_2023, AvaxFlat.TOKEN_PENDLE],
      },
      [AvaxFlat.POOL_OT_XJOE_30_JUN_2022_X_USDC]: {
        pair: [AvaxFlat.TOKEN_OT_XJOE_30_JUN_2022, AvaxFlat.TOKEN_USDC],
      },
      [AvaxFlat.POOL_OT_WMEMO_24_FEB_2022_X_MIM]: {
        pair: [AvaxFlat.TOKEN_OT_WMEMO_24_FEB_2022, AvaxFlat.TOKEN_MIM],
      },
    },
    get pendleMarkets() {
      return getPendleMarkets(AvaxFlat);
    },
  },
};

export const sushiswapEthereumSubgraphApi = 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange';
export const traderJoeAvalancheSubgraphApi = 'https://api.thegraph.com/subgraphs/name/traderjoe-xyz/exchange';
