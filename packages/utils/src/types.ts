import '@ethereum-waffle/jest/src/types';
import type { providers, Signer } from 'ethers';

export type Address = string;

export type ProviderOrSigner = providers.Provider | Signer;
