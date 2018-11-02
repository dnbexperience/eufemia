/**
 * Figma API
 *
 */

// process.env.ROOT_DIR = `${__dirname}/../../`
process.env.ROOT_DIR = require('packpath').self()

import {
  fetchFigmaData,
  fetchFigmaStyles,
  fetchFigmaIcons
} from './FigmaAPI'
export { fetchFigmaData, fetchFigmaStyles, fetchFigmaIcons }
