const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // next.config.js と .env ファイルを読み込むために、Next.js アプリケーションへのパスを記載
  dir: './',
});

// Jest に渡すカスタム設定
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

module.exports = createJestConfig(customJestConfig);
