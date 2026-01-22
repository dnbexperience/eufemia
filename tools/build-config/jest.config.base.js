/**
 * Base Jest configuration for DNB Eufemia
 * Can be extended by individual packages
 */

module.exports = {
  // Use jsdom test environment for browser-like testing
  testEnvironment: 'jsdom',
  
  // Setup files
  setupFilesAfterEnv: [],
  
  // Module paths
  moduleDirectories: ['node_modules', 'src'],
  
  // Transform files with babel-jest
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './babel.config.js' }],
  },
  
  // Handle static assets
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
    '!src/**/__mocks__/**',
  ],
  
  // Test match patterns
  testMatch: [
    '**/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)',
    '**/*.(test|spec).(js|jsx|ts|tsx)',
  ],
  
  // Ignore patterns
  testPathIgnorePatterns: [
    '/node_modules/',
    '/build/',
    '/dist/',
    '/.cache/',
    '/public/',
    'screenshot',
  ],
  
  // Module file extensions
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  
  // Globals
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
}
