/**
 * Prepublish
 *
 *
 */

import { runPrepublishTasks } from './index'

runPrepublishTasks({ preventDelete: false }).catch((error) => {
  console.error(error)

  // Every later build step reads what these tasks write, so stop here
  process.exitCode = 1
})
