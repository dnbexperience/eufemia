/**
 * Web Pagination Component
 *
 */

import React from 'react'
import Pagination from './Pagination'

export default function InfinityScroller(props) {
  return <Pagination mode="infinity" {...props} />
}
