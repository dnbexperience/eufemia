/**
 * Commit changed and new icons to the develop repo
 *
 */

import { commitToBranch } from '../../dnb-ui-lib/scripts/tools/commitToBranch'

if (require.main === module) {
  commitToBranch({
    requiredBranch: 'develop',
    what: 'pages',
    filePathsWhitelist: ['/src/pages/', '/src/uilib/'],
    isFeature: false
  })
}
