/**
 * Git utils
 *
 */

const branchName = require('current-git-branch') // More info: https://github.com/steveukx/git-js#readme

// because we want the name in sync, we do not use "simple-git"
exports.getCurrentBranchName = () => branchName()
