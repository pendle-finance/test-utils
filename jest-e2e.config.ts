// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import baseConfig from './jest.config';
import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  testRegex: 'test/.*\\.spec\\.ts$',
  collectCoverageFrom: ['src/index.ts'],
  coverageDirectory: './coverage/e2e/',
  coverageThreshold: {
    global: {
      functions: 80,
      lines: 80,
    },
  },
};
export default config;
