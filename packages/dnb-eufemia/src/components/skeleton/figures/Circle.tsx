/**
 * Web Skeleton Figure
 *
 */

import React from 'react'
import Context from '../../../shared/Context'
import classnames from 'classnames'

export type SkeletonCircleRows = string | number
export type SkeletonCircleChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode
export interface SkeletonCircleProps extends React.HTMLProps<HTMLElement> {
  rows?: SkeletonCircleRows
  children?: SkeletonCircleChildren
}

export default class SkeletonCircle extends React.Component<
  SkeletonCircleProps,
  any
> {
  static contextType = Context
  static defaultProps = {
    rows: 3,
    children: null,
  }

  rowsLength: number[]

  constructor(props: SkeletonCircleProps) {
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
