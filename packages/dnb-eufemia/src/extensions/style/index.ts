/**
 * Web Style Import
 *
 */

import '../../style/themes/theme-ui/ui-theme-extensions.scss'

import { warn } from '../../shared/helpers'

// @deprecated - this warning should be remove when forms is out of beta
warn(
  "This import statement is not needed and can be removed: import '@dnb/eufemia/extensions/forms/style'"
)
