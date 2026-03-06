/**
 * Web Pagination Component
 *
 */

import React from 'react'
import Pagination, { PaginationProps } from './Pagination'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { PaginationProps } from './Pagination'
import Pagination from './Pagination'

export default function InfinityScroller(props: PaginationProps) {
  return <Pagination mode="infinity" {...props} />
}

withComponentMarkers(InfinityScroller, { _supportsSpacingProps: true })
