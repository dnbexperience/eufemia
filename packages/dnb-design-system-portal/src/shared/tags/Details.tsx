/**
 * Inline Tag
 *
 */

import React from 'react'
import clsx from 'clsx'
import Summary from './Summary'
import { detailsBox, detailsBox__content } from './Details.module.scss'

const Details = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDetailsElement>) => {
  const [summary, ...rest] = React.Children.toArray(children)
  return (
    <details {...props} className={clsx(className, detailsBox)}>
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
