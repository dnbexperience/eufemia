/**
 * Git utils
 *
 */

import branchName from 'current-git-branch' // More info: https://github.com/steveukx/git-js#readme

// because we want the name in sync, we do not use "simple-git"
export const getCurrentBranchName = (): string => branchName()
