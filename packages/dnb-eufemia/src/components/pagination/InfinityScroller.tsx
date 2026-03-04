/**
 * Web Pagination Component
 *
 */

import React from 'react'
import Pagination, { PaginationProps } from './Pagination'

export default function InfinityScroller(props: PaginationProps) {
  return <Pagination mode="infinity" {...props} />
}

InfinityScroller._supportsSpacingProps = true
