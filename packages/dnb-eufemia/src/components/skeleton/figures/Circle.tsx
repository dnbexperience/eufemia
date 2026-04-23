/**
 * Web Skeleton Figure
 *
 */

import React, { useMemo } from 'react'
import clsx from 'clsx'
import Space from '../../space/Space'

export type SkeletonCircleRows = string | number
export type SkeletonCircleChildren =
  | string
  | (() => React.ReactNode)
  | React.ReactNode
export type SkeletonCircleProps = {
  rows?: SkeletonCircleRows
  children?: SkeletonCircleChildren
} & Omit<React.HTMLProps<HTMLDivElement>, 'rows' | 'children'>

function SkeletonCircle({
  rows = 3,
  children = null,
  ...rest
}: SkeletonCircleProps) {
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
        'dnb-skeleton__figure--show'
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
          'dnb-skeleton--shape'
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
          key={`row-${i}`}
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

export default SkeletonCircle
