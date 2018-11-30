/**
 * umd icons bundle
 *
 */

// do not use polyfill for now
// import 'babel-polyfill'
import * as primary_icons from '../icons/primary_icons'
import * as primary_icons_medium from '../icons/primary_icons_medium'

const dnbIcons = { ...primary_icons, ...primary_icons_medium }

// we have to export
export { dnbIcons }
