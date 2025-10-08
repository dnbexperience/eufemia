/**
 * Inline Tag
 *
 */

import React from 'react'
import classnames from 'classnames'
import Summary from './Summary'
import { detailsBox, detailsBox__content } from './Details.module.scss'

const Details = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDetailsElement>) => {
  const [summary, ...rest] = React.Children.toArray(children)
  return (
    <details {...props} className={classnames(className, detailsBox)}>
      {React.isValidElement(summary) && summary.type === Summary ? (
        <>
          {summary}
          <div className={detailsBox__content}>{rest}</div>
        </>
      ) : (
        children
      )}
    </details>
  )
}

export default Details
