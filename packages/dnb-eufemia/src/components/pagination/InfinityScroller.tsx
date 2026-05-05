/**
 * Web Pagination Component
 *
 */

import type { PaginationProps } from './Pagination'
import Pagination from './Pagination'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export default function InfinityScroller(props: PaginationProps) {
  return <Pagination mode="infinity" {...props} />
}

withComponentMarkers(InfinityScroller, { _supportsSpacingProps: true })
