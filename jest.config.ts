import type { Config } from 'jest';

const config: Config = {
  rootDir: './',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.svg\\?react$': '<rootDir>/tests/__mocks__/fileMock.tsx',
    '\\.svg$': '<rootDir>/tests/__mocks__/fileMock.tsx',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1'
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};

export default config;
