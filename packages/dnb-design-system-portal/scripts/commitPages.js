/**
 * Commit changed and new icons to the develop repo
 *
 */

import { commitToBranch } from '../../dnb-ui-lib/scripts/prepub/commitToBranch'

if (require.main === module) {
  commitToBranch({
    requiredBranch: 'develop',
    what: 'pages',
    filePathsIncludelist: ['version.json', '/src/docs/', '/src/uilib/'],
    skipCI: (files) => files.every((f) => ['version.json'].includes(f)), // in case we only update the "version.lock"
    isFeature: false
  })
}
