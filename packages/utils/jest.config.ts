import type { Config } from '@jest/types';
import 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tsConfig from './tsconfig.json';

const config: Config.InitialOptions = {
  name: 'pendle-sdk-rewrite',
  moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths, { prefix: '<rootDir>/src' }),
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/**/types.ts'], // don't check coverage of index files in unit testing.
  coverageDirectory: './coverage/unit/',
  coverageReporters: ['json-summary', 'lcov', 'text'],
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['./jestSetup'],
  testTimeout: 30000,
};

export default config;
