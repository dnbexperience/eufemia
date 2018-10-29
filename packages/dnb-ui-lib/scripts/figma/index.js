/**
 * Figma API
 *
 */

process.env.ROOT_DIR = `${__dirname}/../../`

import {
  fetchFigmaData,
  fetchFigmaStyles,
  fetchFigmaIcons
} from './FigmaAPI'
export { fetchFigmaData, fetchFigmaStyles, fetchFigmaIcons }
