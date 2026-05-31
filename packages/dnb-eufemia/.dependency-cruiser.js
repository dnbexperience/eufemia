module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      from: {},
      to: {
        circular: true,
        viaOnly: {
          // FilterMultiSelection wraps forms/MultiSelection, creating
          // a structural cycle through the components barrel. The cycle
          // is safe because the import is only used inside a function body.
          pathNot: 'components/filter/FilterMultiSelection\\.tsx$',
        },
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
