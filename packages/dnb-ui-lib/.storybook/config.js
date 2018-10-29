/**
 * Storybook Config
 *
 */

// looks like babel-preset-es2015 is used for react-velocity
// therefor we add this to the .babelrc file
import { configure } from '@storybook/react'

configure(() => require('../stories'), module)
