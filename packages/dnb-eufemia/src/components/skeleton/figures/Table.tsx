/**
 * Web Skeleton Figure
 *
 */

import React, { useMemo } from 'react'
import clsx from 'clsx'
import Space from '../../space/Space'

export type SkeletonTableRows = string | number
export type SkeletonTableChildren =
  | string
  | (() => React.ReactNode)
  | React.ReactNode
export type SkeletonTableProps = {
  rows?: SkeletonTableRows
  children?: SkeletonTableChildren
} & Omit<React.HTMLProps<HTMLDivElement>, 'rows' | 'children'>

function SkeletonTable({
  rows = 3,
  children = null,
  ...rest
}: SkeletonTableProps) {
  const rowsLength = useMemo(() => {
    // Do this so we get the same result each time
    // because of static generated markup
    const fill = [70, 80, 60, 40, 50, 20, 0]
    return new Array(Number(rows)).fill(true).map((_, i) => {
      const c = i % fill.length
      if (c === fill.length - 1) {
        fill.concat(fill.reverse())
      }
      return fill[c]
    })
  }, [rows])

  return (
    <div
      className={clsx(
        'dnb-skeleton__figure',
        'dnb-skeleton__figure--show',
      )}
      aria-busy
      {...rest}
    >
      <Space
        element="div"
        bottom="large"
        className={clsx(
          'dnb-h--xx-large',
          'dnb-skeleton',
          'dnb-skeleton--shape',
        )}
        aria-hidden
        style={{
          width: '50%',
        }}
      >
        &zwnj;
      </Space>

      {rowsLength.map((p, i) => (
        <Space
          key={i}
          element="div"
          top="x-small"
          className={clsx('dnb-p', 'dnb-skeleton', 'dnb-skeleton--shape')}
          style={{
            width: `${p}%`,
          }}
        >
          &zwnj;
        </Space>
      ))}

      {typeof children === 'function' ? children() : children}
    </div>
  )
}

export default SkeletonTable
