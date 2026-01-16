module.exports = {
  testMatch: ['**/__tests__/**/*.test.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': [
      'babel-jest',
      {
        presets: [
          [
            require.resolve('@babel/preset-env'),
            { targets: { node: 'current' }, modules: 'commonjs' },
          ],
          require.resolve('@babel/preset-typescript'),
        ],
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
}
