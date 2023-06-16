/**
 * Run only Figma Icons Task
 *
 */

import { fetchFigmaIcons } from './index'

fetchFigmaIcons({
  forceReconvert: true,
  ignoreBranchCheck: true,
})
