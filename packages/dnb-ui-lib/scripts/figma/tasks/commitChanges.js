/**
 * Commit changed and new icons to the develop repo
 *
 */

import { commitToBranch } from '../../prepub/commitToBranch'

if (require.main === module) {
  commitToBranch({
    requiredBranch: 'develop|figma',
    what: 'icons/assets',
    filePathsIncludelist: [
      '/src/icons/',
      '/src/components/icon/', // visual snapshots
      '/assets/icons/',
      'version.lock',
      'icons.lock',
      'icons-meta.json',
      " -- ':!/src/icons/*.d.ts' ':!/src/components/icon/*.d.ts'"
    ],
    // Skip CI if files are only one or both
    skipCI: (files) => files.length < 4, // in case we only update the "version.lock"
    // is feature if there are more than 4 files
    isFeature: false
    // isFeature: files => files.length >= 4 // of there are other files than three, mark it as a feature
  })
}
