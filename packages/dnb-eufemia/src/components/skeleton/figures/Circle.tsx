/**
 * Web Skeleton Figure
 *
 */

import React from 'react'
import Context from '../../../shared/Context'
import classnames from 'classnames'

type Props = {
  rows?: number
  children?: React.ReactNode
} & React.HTMLProps<HTMLDivElement>

export default class SkeletonCircle extends React.PureComponent<Props> {
  static contextType = Context

  static defaultProps = {
    rows: 3,
    children: null,
  }

  rowsLength: Array<number>

  constructor(props) {
    super(props)

    const { rows } = props

    // Do this so we get the same result each time
    // because of static generated markup
    const fill = [70, 80, 60, 40, 50, 20, 0]
    this.rowsLength = new Array(rows).fill(true).map((_, i) => {
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
          &#8288;{/* zero-width non-breaking space */}
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
            aria-hidden
            style={{
              width: `${p}%`,
            }}
          >
            &#8288;{/* zero-width non-breaking space */}
          </div>
        ))}

        {children}
      </div>
    )
  }
}
