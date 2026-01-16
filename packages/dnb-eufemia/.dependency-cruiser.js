module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      from: {},
      to: {
        circular: true,
      },
    },
  ],
  options: {
    includeOnly: '^src',
    tsConfig: {
      fileName: 'tsconfig.json',
    },
  },
}
