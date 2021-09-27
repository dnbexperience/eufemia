/**
 * Commit changed and new icons to the main repo
 *
 */

const {
  commitToBranch,
} = require('@dnb/eufemia/scripts/prepub/commitToBranch')

if (require.main === module) {
  commitToBranch({
    requiredBranch: 'main',
    what: 'pages',
    filePathsIncludelist: ['/src/docs/', '/src/uilib/'],
    skipCI: (files) => files.every((f) => ['package.json'].includes(f)), // in case we only update the "version.lock"
    isFeature: false,
  })
}
