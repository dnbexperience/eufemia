/**
 * Commit changed and new icons to the develop repo
 *
 */

import { commitToBranch } from '../../dnb-ui-lib/scripts/prepub/commitToBranch'

if (require.main === module) {
  commitToBranch({
    requiredBranch: 'develop',
    what: 'pages',
    skipCI: files => files.length === 1, // in case we only update the "version.lock"
    filePathsWhitelist: ['version.json', '/src/docs/', '/src/uilib/'],
    isFeature: false
  })
}
