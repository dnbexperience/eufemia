/**
 * Commit changed and new icons to the develop repo
 *
 */

import { commitToBranch } from '../../tools/commitToBranch'

if (require.main === module) {
  commitToBranch({
    requiredBranch: 'develop',
    what: 'files',
    filePathsWhitelist: [
      '/src/icons/',
      '/assets/icons/',
      '.version.lock',
      'icons.lock'
    ],
    isFeatureChecklist: ['.version.lock', 'icons.lock'] // of there are other files than theese, mark it as a feature
  })
}
