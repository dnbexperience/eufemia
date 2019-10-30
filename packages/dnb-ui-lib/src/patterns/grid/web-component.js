/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Grid from './Grid'
export default Grid
export * from './Grid'

registerElement(Grid.tagName, Grid, Grid.defaultProps)
