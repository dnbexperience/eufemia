/**
 * Commit changed and new icons to the main branch
 *
 */

import { commitToBranch } from '../../prebuild/commitToBranch'

if (require.main === module) {
  commitToBranch({
    requiredBranch: [
      'main',
      '^icon', // Test if branch is part of icons-lib.yml ("eufemia-icons")
    ],
    what: 'icons/assets',
    filePathsIncludelist: [
      '/src/icons/',
      '/src/components/icon/', // visual snapshots
      '/assets/icons/',
      'version.lock',
      'icons-svg.lock',
      'icons-pdf.lock',
      'icons-meta.json',
    ],
    isFeature: false, // because it should manually be evaluated if its a fix or feature
  })
}
