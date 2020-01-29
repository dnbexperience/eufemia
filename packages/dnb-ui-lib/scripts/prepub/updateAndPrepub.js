/**
 * Scripts
 *
 */

import { runPrepublishTasks, log } from './index'
import { fetchFigmaAll } from '../figma'

export const run = async () => {
  const doRefetch = true
  log.start('Starting the prepublish process...')
  log.info('> Figma: Start fetching figma data ...')
  await fetchFigmaAll({ doRefetch })
  log.info('> PrePublish: Start prepublishing ...')
  await runPrepublishTasks({ preventDelete: false, doRefetch })
}

run().then(() => {
  log.succeed('> Prepublishing is complete.')
})
