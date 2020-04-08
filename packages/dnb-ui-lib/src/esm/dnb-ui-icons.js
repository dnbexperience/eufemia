/**
 * ES icons bundle
 *
 */

import * as primary_icons from '../icons/primary_icons'
import * as primary_icons_medium from '../icons/primary_icons_medium'
export * from '../icons/primary_icons'
export * from '../icons/primary_icons_medium'

// we have to export
export default { ...primary_icons, ...primary_icons_medium }
