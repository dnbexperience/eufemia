/**
 * This file is used to enable Web Components
 *
 */

import * as lib from './index'

lib.enableWebComponents()

// use commonJS export to use object spread
module.exports = { ...lib }
