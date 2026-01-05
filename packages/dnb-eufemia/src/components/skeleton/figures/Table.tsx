/**
 * Web Skeleton Figure
 *
 */

import React from 'react'
import Context from '../../../shared/Context'
import classnames from 'classnames'

export type SkeletonTableRows = string | number
export type SkeletonTableChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode
export interface SkeletonTableProps
  extends Omit<React.HTMLProps<HTMLElement>, 'rows' | 'children'> {
  rows?: SkeletonTableRows
  children?: SkeletonTableChildren
}

export default class SkeletonTable extends React.Component<
  SkeletonTableProps,
  any
> {
  static contextType = Context
  static defaultProps = {
    rows: 3,
    children: null,
  }

  rowsLength: number[]

  constructor(props: SkeletonTableProps) {
    super(props)

    const { rows } = props

    // Do this so we get the same result each time
    // because of static generated markup
    const fill = [70, 80, 60, 40, 50, 20, 0]
    this.rowsLength = new Array(Number(rows)).fill(true).map((_, i) => {
      const c = i % fill.length
      if (c === fill.length - 1) {
        fill.concat(fill.reverse())
      }
      return fill[c]
    })
  }

  render() {
    const {
      rows, // eslint-disable-line
      children,
      ...rest
    } = this.props

    return (
      <div
        className={classnames(
          'dnb-skeleton__figure',
          'dnb-skeleton__figure--show'
        )}
        aria-busy
        {...rest}
      >
        <div
          className={classnames(
            'dnb-h--xx-large',
            'dnb-skeleton',
            'dnb-skeleton--shape',
            'dnb-space__bottom--large'
          )}
          aria-hidden
          style={{
            width: '50%',
          }}
        >
          &zwnj;
        </div>

        {this.rowsLength.map((p, i) => (
          <div
            key={i}
            className={classnames(
              'dnb-p',
              'dnb-skeleton',
              'dnb-skeleton--shape',
              'dnb-space__top--x-small'
            )}
            style={{
              width: `${p}%`,
            }}
          >
            &zwnj;
          </div>
        ))}

        {children}
      </div>
    )
  }
}
