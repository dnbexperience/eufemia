/**
 * Run only Figma Icons Task
 *
 */

import { fetchFigmaIcons } from './index'
fetchFigmaIcons({
  doRefetch: null,
  forceReconvert: true,
  ignoreBranchCheck: true,
})
