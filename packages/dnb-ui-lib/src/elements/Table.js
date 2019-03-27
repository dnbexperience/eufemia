/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'

const Table = p => <E is="table" {...p} />
Table.tagName = 'dnb-table'
export default Table
